/* ------------------------------------------------------------------ */
/*  Reel: AI generations.                                              */
/*                                                                     */
/*  reel-manifest.json is MACHINE-WRITTEN by scripts/optimize-videos    */
/*  (ids, URLs, real dimensions, durations). Never hand-edit it: the    */
/*  next encode overwrites it.                                          */
/*                                                                     */
/*  Each clip has two videos:                                          */
/*    preview  short silent loop, committed under public/reel/, played  */
/*             by the grid tiles                                       */
/*    src      the full piece with sound, hosted on Vercel Blob, loaded */
/*             only when the lightbox opens                            */
/*                                                                     */
/*  Copy lives in META below, keyed by clip id, so re-encoding never    */
/*  clobbers what you wrote. A clip with no META entry still renders;   */
/*  it just falls back to a title derived from the filename.            */
/* ------------------------------------------------------------------ */
import manifest from './reel-manifest.json';

const META = {
  // 'Julius_Ep01': { title: 'Julius, Episode 1', tool: 'Veo 3', note: '' },
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
    title: meta.title ?? titleFromId(clip.id),
    orientation: orientation(clip.width, clip.height),
  };
});
