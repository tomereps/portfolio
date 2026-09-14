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
/*  Copy and filing live in META below, keyed by clip id (the source    */
/*  filename without extension), so re-encoding never clobbers them.   */
/*  A clip with no META entry still renders: its title comes from the   */
/*  filename and it lands in the fallback category.                    */
/* ------------------------------------------------------------------ */
import manifest from './reel-manifest.json';

/* Section order on the reel page. A category used in META but missing here
   still shows up, after these, in the order it is first used. */
const CATEGORY_ORDER = ['Episodic'];

/* where clips without a category go; always the last section */
const FALLBACK_CATEGORY = 'Other';

const META = {
  Julius_Ep01: { title: 'Julius, Episode 1', category: 'Episodic' },
  Julius_Ep02_Dialogue_01: { title: 'Julius, Episode 2: Dialogue', category: 'Episodic' },
  // 'some-clip': { title: 'Title', category: 'Shot tests', tool: 'Veo 3', note: '' },
};

/* '02-paper-bloom' -> 'Paper Bloom'. Leading sort-order digits are dropped so
   you can control order by filename without it showing up in the UI. */
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

const clips = manifest.map((clip) => {
  const meta = META[clip.id] ?? {};
  return {
    ...clip,
    ...meta,
    title: meta.title ?? titleFromId(clip.id),
    category: meta.category?.trim() || FALLBACK_CATEGORY,
    orientation: orientation(clip.width, clip.height),
  };
});

/* Clips grouped for display: known categories first, then any new ones in
   first-use order, then the fallback. Empty categories are never listed. */
export const reelSections = (() => {
  const byCategory = new Map();
  for (const clip of clips) {
    if (!byCategory.has(clip.category)) byCategory.set(clip.category, []);
    byCategory.get(clip.category).push(clip);
  }

  const rank = (name) => {
    if (name === FALLBACK_CATEGORY) return Number.MAX_SAFE_INTEGER;
    const i = CATEGORY_ORDER.indexOf(name);
    return i === -1 ? CATEGORY_ORDER.length : i;
  };

  // Array.prototype.sort is stable, so unlisted categories keep first-use order
  return [...byCategory.entries()]
    .sort(([a], [b]) => rank(a) - rank(b))
    .map(([name, items]) => ({ name, clips: items }));
})();

/* Flat list in DISPLAY order (section by section), so the lightbox's
   previous/next and the home teaser follow what the viewer sees. */
export const reel = reelSections.flatMap((section) => section.clips);
