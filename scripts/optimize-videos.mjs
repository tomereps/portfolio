/*
 * Turns raw AI generations into what the reel page ships, and writes the
 * manifest the page reads.
 *
 * Run: npm run optimize:videos   (from the Portfolio folder)
 *
 * For every .mp4/.mov/.webm/.m4v in media/reel/ (GITIGNORED: raw masters):
 *
 *   public/reel/<id>-preview.mp4   short SILENT loop for the grid tile.
 *                                  Small, committed to the repo.
 *   public/reel/<id>.webp          poster = the preview's first frame, so the
 *                                  tile does not jump when playback starts.
 *   media/reel-web/<id>.mp4        full piece with sound, web-encoded.
 *                                  NOT committed: uploaded to Vercel Blob.
 *
 * The full file is uploaded to Blob under a content-hashed name
 * (reel/<id>-<hash>.mp4). A changed encode gets a new URL, so it can be cached
 * for a year without anyone being served a stale copy. The replaced blob is
 * deleted.
 *
 * Blob credentials, read from .env.local (gitignored), either of:
 *   BLOB_READ_WRITE_TOKEN                  long-lived store token, or
 *   BLOB_STORE_ID + VERCEL_OIDC_TOKEN      what `vercel env pull` writes.
 *                                          The OIDC token expires after a
 *                                          few hours; pull again when an
 *                                          upload says it is missing/expired.
 * Credentials are only used here, locally; the live site reads public Blob
 * URLs and needs none. If an upload is needed and no credentials are found,
 * nothing is written to the manifest, so the site never points at a file
 * that is not there.
 *
 * Re-running skips encodes whose output is newer than the source, and skips
 * uploads whose file has not changed.
 */
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import path from 'node:path';
import { del, put } from '@vercel/blob';

const run = promisify(execFile);

const SRC_DIR = 'media/reel';
const FULL_DIR = 'media/reel-web';
const OUT_DIR = 'public/reel';
const MANIFEST = 'src/data/reel-manifest.json';

// Full piece: longest edge, so portrait is capped by height and landscape by
// width. 26 is visually clean for generated footage.
const FULL_EDGE = 1280;
const FULL_CRF = 26;

// Preview: the tile renders at most ~680px tall, so 960 is sharp on retina.
// A higher CRF is fine for a muted thumbnail loop.
const PREVIEW_EDGE = 960;
const PREVIEW_CRF = 28;
const PREVIEW_SECONDS = 6;

const VIDEO_EXT = new Set(['.mp4', '.mov', '.webm', '.m4v']);
const YEAR = 60 * 60 * 24 * 365;

/* Fit inside EDGE x EDGE without upscaling, then round to even dimensions
   because h.264 refuses odd ones. */
const scale = (edge) =>
  `scale=w=min(${edge}\\,iw):h=min(${edge}\\,ih)` +
  `:force_original_aspect_ratio=decrease:flags=lanczos` +
  `,scale=trunc(iw/2)*2:trunc(ih/2)*2`;

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)}MB`;
const kb = (bytes) => `${(bytes / 1024).toFixed(0)}KB`;

async function probe(file) {
  const { stdout } = await run('ffprobe', [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height',
    '-show_entries', 'format=duration',
    '-of', 'json',
    file,
  ]);
  const json = JSON.parse(stdout);
  const stream = json.streams?.[0] ?? {};
  return {
    width: stream.width ?? 0,
    height: stream.height ?? 0,
    duration: parseFloat(json.format?.duration) || 0,
  };
}

async function isStale(src, out) {
  try {
    const [a, b] = await Promise.all([stat(src), stat(out)]);
    return a.mtimeMs > b.mtimeMs;
  } catch {
    return true; // output missing
  }
}

async function readPreviousManifest() {
  try {
    const list = JSON.parse(await readFile(MANIFEST, 'utf8'));
    return new Map(list.map((c) => [c.id, c]));
  } catch {
    return new Map();
  }
}

/* Credentials: never logged. With a read-write token we pass it explicitly;
   with OIDC we pass nothing and @vercel/blob reads BLOB_STORE_ID and
   VERCEL_OIDC_TOKEN from the environment itself. Blank values count as
   missing, so the placeholder line in .env.local does not look like a token. */
if (existsSync('.env.local')) process.loadEnvFile('.env.local');
const env = (name) => process.env[name]?.trim() || '';
const rwToken = env('BLOB_READ_WRITE_TOKEN');
const hasOidc = Boolean(env('BLOB_STORE_ID') && env('VERCEL_OIDC_TOKEN'));
const hasCredentials = Boolean(rwToken) || hasOidc;
const auth = rwToken ? { token: rwToken } : {};

let sources;
try {
  sources = (await readdir(SRC_DIR))
    .filter((f) => VIDEO_EXT.has(path.extname(f).toLowerCase()))
    .sort();
} catch {
  console.error(`No ${SRC_DIR}/ directory. Create it and drop your generations in.`);
  process.exit(1);
}

await Promise.all([OUT_DIR, FULL_DIR, path.dirname(MANIFEST)].map((d) => mkdir(d, { recursive: true })));

const previous = await readPreviousManifest();
const manifest = [];
const needsCredentials = [];
let committedBytes = 0;
let hostedBytes = 0;

for (const file of sources) {
  const id = path.basename(file, path.extname(file));
  const src = path.join(SRC_DIR, file);
  const full = path.join(FULL_DIR, `${id}.mp4`);
  const preview = path.join(OUT_DIR, `${id}-preview.mp4`);
  const poster = path.join(OUT_DIR, `${id}.webp`);

  const { duration: srcDuration } = await probe(src);

  /* Preview window: start at the midpoint (generated clips often open on a
     fade from black), but never run past the end. Short clips use all of it. */
  const len = Math.min(PREVIEW_SECONDS, srcDuration);
  const start = Math.max(0, Math.min(srcDuration / 2, srcDuration - len));

  const notes = [];

  if (await isStale(src, full)) {
    await run('ffmpeg', [
      '-y', '-i', src,
      '-vf', scale(FULL_EDGE),
      '-c:v', 'libx264', '-crf', String(FULL_CRF), '-preset', 'slow',
      '-pix_fmt', 'yuv420p', // Safari/iOS will not decode anything else
      '-c:a', 'aac', '-b:a', '128k', '-ac', '2',
      '-movflags', '+faststart', // header first, so it starts before full download
      full,
    ]);
    notes.push('full encoded');
  }

  if (await isStale(src, preview)) {
    await run('ffmpeg', [
      '-y', '-ss', start.toFixed(2), '-t', len.toFixed(2), '-i', src,
      '-vf', scale(PREVIEW_EDGE),
      '-c:v', 'libx264', '-crf', String(PREVIEW_CRF), '-preset', 'slow',
      '-pix_fmt', 'yuv420p',
      '-an', // tiles are always muted, so do not ship the bytes
      '-movflags', '+faststart',
      preview,
    ]);
    notes.push('preview cut');
  }

  if (await isStale(src, poster)) {
    await run('ffmpeg', [
      '-y', '-ss', start.toFixed(2), '-i', src,
      '-frames:v', '1',
      '-vf', scale(FULL_EDGE),
      '-c:v', 'libwebp', '-quality', '82',
      poster,
    ]);
  }

  // probe the OUTPUT so the manifest matches what actually ships
  const { width, height, duration } = await probe(full);
  const [fullStat, previewStat, posterStat] = await Promise.all([stat(full), stat(preview), stat(poster)]);
  committedBytes += previewStat.size + posterStat.size;
  hostedBytes += fullStat.size;

  /* Upload only when the full file differs from what the manifest already
     points at. The hash is both the change check and the cache-busting name. */
  const bytes = await readFile(full);
  const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 10);
  const prior = previous.get(id);
  let url = prior?.hash === hash ? prior.src : null;

  if (!url) {
    if (!hasCredentials) {
      needsCredentials.push(id);
      continue;
    }

    const blob = await put(`reel/${id}-${hash}.mp4`, bytes, {
      ...auth,
      access: 'public',
      contentType: 'video/mp4',
      addRandomSuffix: false,
      allowOverwrite: true, // same hash means same bytes, so this is idempotent
      cacheControlMaxAge: YEAR, // safe: a new encode gets a new name
      multipart: true, // episodes can be large; upload in parts
    });
    url = blob.url;
    notes.push('uploaded');

    // the superseded upload is unreachable now; do not leave it billing storage
    if (prior?.src && prior.src !== url) {
      await del(prior.src, auth).catch(() => {});
    }
  }

  manifest.push({
    id,
    src: url,
    hash,
    preview: `/reel/${id}-preview.mp4`,
    poster: `/reel/${id}.webp`,
    width,
    height,
    duration: Number(duration.toFixed(2)),
  });

  console.log(
    `${id.padEnd(24)} full ${mb(fullStat.size).padStart(7)} (Blob)  ` +
      `preview ${kb(previewStat.size).padStart(6)}  poster ${kb(posterStat.size).padStart(5)}` +
      (notes.length ? `  [${notes.join(', ')}]` : '  [up to date]'),
  );
}

if (needsCredentials.length) {
  console.error(
    `\nCannot upload ${needsCredentials.join(', ')}: no Vercel Blob credentials found in .env.local.\n` +
      `Either paste a token into BLOB_READ_WRITE_TOKEN, or run \`vercel env pull .env.local\`\n` +
      `(which writes BLOB_STORE_ID and VERCEL_OIDC_TOKEN), then re-run.\n` +
      `The manifest was NOT updated, so the site still matches what is uploaded.`,
  );
  process.exit(1);
}

await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`\nwrote ${MANIFEST} (${manifest.length} clip${manifest.length === 1 ? '' : 's'})`);

if (manifest.length === 0) {
  console.log(`No videos in ${SRC_DIR}/ yet. Drop some in and re-run.`);
  process.exit(0);
}

console.log(`committed to repo (previews + posters): ${mb(committedBytes)}`);
console.log(`hosted on Vercel Blob (full pieces):   ${mb(hostedBytes)}`);
