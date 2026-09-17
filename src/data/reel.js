/* ------------------------------------------------------------------ */
/*  Reel: AI generations and traditional VFX work.                     */
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
/* ------------------------------------------------------------------ */
import manifest from './reel-manifest.json';

/* Categories in section order. The blurb is the one line under the section
   heading, and it is where a section says how its work was made (AI or
   traditional VFX), so give every new category one. A category used in META
   but missing here still gets a section, after these, with no blurb. */
const CATEGORIES = [
  {
    name: 'Episodic',
    blurb: 'AI-generated series with recurring characters and continuity across episodes.',
  },
  /* Ready for upcoming work: hidden until the first clip is filed under one.
     The blurbs assume AI-generated work; if a clip in one of these is
     traditional, change its blurb (or file it under Compositing) first. */
  {
    name: 'Short film',
    blurb: 'Standalone AI-generated narrative pieces.',
  },
  {
    name: 'Commercial',
    blurb: 'AI-generated spec ads and brand work.',
  },
  {
    name: 'Exploration / Look tests',
    blurb: 'AI-generated style frames, worlds and motion studies, not finished pieces.',
  },
  /* traditional VFX closes the reel, after all the AI work */
  {
    name: 'Compositing',
    blurb: 'Traditional VFX compositing. No generative AI was used in this work.',
  },
];

/* where clips without a category go; always the last section */
const FALLBACK_CATEGORY = 'Other';

/* `order` sets a clip's position inside its section (lower comes first).
   Reorder by changing these numbers, not by renaming files: a rename makes
   a new clip id, which re-uploads the full video. Clips with no `order` sit
   after the ordered ones, sorted by filename. */
const META = {
  Julius_Ep01: { title: 'Julius, Episode 1', category: 'Episodic', order: 1 },
  Julius_Ep02_Dialogue_01: { title: 'Julius, Episode 2: Dialogue', category: 'Episodic', order: 2 },
  Julius_Ep02_Dolabella: { title: 'Julius, Episode 2: Dolabella', category: 'Episodic', order: 3 },
  Julius_Ep02_Bloopers: { title: 'Julius, Episode 2: Bloopers', category: 'Episodic', order: 4 },
  COMP_REEL: { title: 'Compositing Reel', category: 'Compositing', order: 1 },
  // 'some-clip': { title: 'Title', category: 'Episodic', order: 5, tool: 'Veo 3', note: '' },
};

const categoryInfo = new Map(CATEGORIES.map((c) => [c.name, c]));

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

/* within a section: explicit `order` first, then unordered clips in manifest
   (filename) order. Array.prototype.sort is stable, so ties keep that order. */
const byOrder = (a, b) =>
  (Number.isFinite(a.order) ? a.order : Infinity) - (Number.isFinite(b.order) ? b.order : Infinity);

/* Clips grouped for display: declared categories first, in CATEGORIES order,
   then undeclared ones in first-use order, then the fallback. Empty
   categories are never listed. */
export const reelSections = (() => {
  const byCategory = new Map();
  for (const clip of clips) {
    if (!byCategory.has(clip.category)) byCategory.set(clip.category, []);
    byCategory.get(clip.category).push(clip);
  }

  const order = CATEGORIES.map((c) => c.name);
  const rank = (name) => {
    if (name === FALLBACK_CATEGORY) return Number.MAX_SAFE_INTEGER;
    const i = order.indexOf(name);
    return i === -1 ? order.length : i;
  };

  return [...byCategory.entries()]
    .sort(([a], [b]) => rank(a) - rank(b))
    .map(([name, items]) => ({
      name,
      blurb: categoryInfo.get(name)?.blurb ?? '',
      clips: [...items].sort(byOrder),
    }));
})();

/* Flat list in DISPLAY order (section by section), so the lightbox's
   previous/next and the home teaser follow what the viewer sees. */
export const reel = reelSections.flatMap((section) => section.clips);
