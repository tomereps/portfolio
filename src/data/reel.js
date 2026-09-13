/* ------------------------------------------------------------------ */
/*  Reel: AI generations.                                              */
/*                                                                     */
/*  reel-manifest.json is MACHINE-WRITTEN by scripts/optimize-videos    */
/*  (ids, paths, real dimensions, durations). Never hand-edit it: the   */
/*  next encode overwrites it.                                          */
/*                                                                     */
/*  Copy lives in META below, keyed by clip id, so re-encoding never    */
/*  clobbers what you wrote. A clip with no META entry still renders;   */
/*  it just falls back to a title derived from the filename.            */
/* ------------------------------------------------------------------ */
import manifest from './reel-manifest.json';

/* Clips are served from public/reel/ while the folder stays small. When it
   passes ~50MB, upload public/reel/ to Vercel Blob and set this to the bucket
   origin (no trailing slash) - nothing else in the app has to change. */
export const REEL_BASE = '';

const META = {
  // '01-neon-drift': { title: 'Neon Drift', tool: 'Veo 3', note: 'Camera test' },
};

/* '02-paper-bloom' -> 'Paper Bloom'. Leading sort-order digits are dropped so
   you can control grid order by filename without it showing up in the UI. */
function titleFromId(id) {
  return id
    .replace(/^\d+[-_]?/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function orientation(w, h) {
  const a = w / h;
  if (a > 1.2) return 'landscape';
  if (a < 0.85) return 'portrait';
  return 'square';
}

export const reel = manifest.map((clip) => {
  const meta = META[clip.id] ?? {};
  return {
    ...clip,
    ...meta,
    src: REEL_BASE + clip.src,
    poster: REEL_BASE + clip.poster,
    title: meta.title ?? titleFromId(clip.id),
    orientation: orientation(clip.width, clip.height),
  };
});
