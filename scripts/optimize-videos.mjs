/*
 * Emits web-ready .mp4 clips + .webp posters from raw AI generations,
 * and writes the manifest the reel page reads.
 *
 * Sources live in media/reel/ which is GITIGNORED: raw generations are 20MB+
 * each and would bloat the repo forever. Keep the masters in your own cloud
 * drive; this script turns them into something small enough to ship.
 *
 * Run: node scripts/optimize-videos.mjs   (npm run optimize:videos)
 *
 * Every .mp4/.mov/.webm in media/reel/ produces two files in public/reel/:
 *   <name>.mp4   long edge 1280, AAC 128k stereo, faststart
 *   <name>.webp  poster frame from the midpoint
 *
 * Audio is kept because the clips carry sound, but tiles still autoplay MUTED:
 * every browser blocks audible autoplay. The page unmutes on user intent.
 *
 * It also rewrites src/data/reel-manifest.json with the real dimensions and
 * duration of each clip, so the grid can reserve correct aspect boxes before
 * any video loads. Titles and captions are NOT stored here: those live in
 * src/data/reel.js, keyed by id, so re-encoding never clobbers your copy.
 *
 * Re-running skips clips whose output is newer than the source.
 */
import { execFile } from 'node:child_process';
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import path from 'node:path';

const run = promisify(execFile);

const SRC_DIR = 'media/reel';
const OUT_DIR = 'public/reel';
const MANIFEST = 'src/data/reel-manifest.json';

// Longest edge, so a 1080x1920 portrait clip is capped by its HEIGHT and a
// landscape one by its width. Fitting both into a square box means neither
// orientation gets upscaled into a needlessly heavy file.
const LONG_EDGE = 1280;

/* Fit inside LONG_EDGE x LONG_EDGE without upscaling, then round to even
   dimensions because h.264 refuses odd ones. */
const SCALE =
  `scale=w=min(${LONG_EDGE}\\,iw):h=min(${LONG_EDGE}\\,ih)` +
  `:force_original_aspect_ratio=decrease:flags=lanczos` +
  `,scale=trunc(iw/2)*2:trunc(ih/2)*2`;
// 26 is visually clean for generated footage; raise to 28 if you need smaller.
const CRF = 26;

const VIDEO_EXT = new Set(['.mp4', '.mov', '.webm', '.m4v']);

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

let sources;
try {
  sources = (await readdir(SRC_DIR))
    .filter((f) => VIDEO_EXT.has(path.extname(f).toLowerCase()))
    .sort();
} catch {
  console.error(`No ${SRC_DIR}/ directory. Create it and drop your generations in.`);
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });
await mkdir(path.dirname(MANIFEST), { recursive: true });

const manifest = [];
let before = 0;
let after = 0;

for (const file of sources) {
  const id = path.basename(file, path.extname(file));
  const src = path.join(SRC_DIR, file);
  const mp4 = path.join(OUT_DIR, `${id}.mp4`);
  const poster = path.join(OUT_DIR, `${id}.webp`);

  const srcStat = await stat(src);
  before += srcStat.size;

  const stale = await isStale(src, mp4);

  if (stale) {
    await run('ffmpeg', [
      '-y', '-i', src,
      '-vf', SCALE,
      '-c:v', 'libx264',
      '-crf', String(CRF),
      '-preset', 'slow',
      '-pix_fmt', 'yuv420p', // Safari/iOS will not decode anything else
      '-c:a', 'aac', '-b:a', '128k', '-ac', '2',
      '-movflags', '+faststart', // header first, so it starts before full download
      mp4,
    ]);

    // Poster from the midpoint: generated clips often fade in from black.
    const { duration: srcDur } = await probe(src);
    await run('ffmpeg', [
      '-y', '-ss', (srcDur / 2).toFixed(2), '-i', src,
      '-frames:v', '1',
      '-vf', SCALE,
      '-c:v', 'libwebp', '-quality', '82',
      poster,
    ]);
  }

  // probe the OUTPUT so the manifest matches what actually ships
  const { width, height, duration } = await probe(mp4);
  const dstStat = await stat(mp4);
  const posterStat = await stat(poster);
  after += dstStat.size;

  manifest.push({
    id,
    src: `/reel/${id}.mp4`,
    poster: `/reel/${id}.webp`,
    width,
    height,
    duration: Number(duration.toFixed(2)),
  });

  console.log(
    stale
      ? `${id.padEnd(26)} ${mb(srcStat.size)} -> ${mb(dstStat.size)}  poster ${kb(posterStat.size)}`
      : `${id.padEnd(26)} up to date  ${mb(dstStat.size)}`,
  );
}

await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`\nwrote ${MANIFEST} (${manifest.length} clip${manifest.length === 1 ? '' : 's'})`);

if (manifest.length === 0) {
  console.log(`\nNo videos in ${SRC_DIR}/ yet. Drop some in and re-run.`);
  process.exit(0);
}

console.log(`total ${mb(before)} -> ${mb(after)} (${(100 - (after / before) * 100).toFixed(0)}% smaller)`);

if (after > 50 * 1024 * 1024) {
  console.log(
    `\npublic/reel/ is over 50MB. Move the encoded clips to Vercel Blob and\npoint REEL_BASE in src/data/reel.js at the bucket instead of committing them.`,
  );
}
