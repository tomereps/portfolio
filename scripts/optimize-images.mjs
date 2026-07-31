/*
 * Emits .webp derivatives next to each source image. Sources stay in the repo
 * as masters; components import only the .webp files.
 *
 * Run: node scripts/optimize-images.mjs
 *
 * Widths are 2x the largest CSS box each image renders into, so the derivative
 * is sharp on retina without shipping a 4K master to a 550px card.
 */
import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const JOBS = [
  // hero: renders at ~440px wide. Flipped so the strip anchors the page edge
  // and the paper negative space faces the copy column.
  { in: 'src/assets/hero/hero-raw.png', out: 'src/assets/hero/hero.webp', width: 880, flop: true },
  { in: 'src/assets/hero/hero-raw.png', out: 'src/assets/hero/hero-sm.webp', width: 560, flop: true },

  // card previews: render at 549x288
  { in: 'src/assets/Stents/OG_IMAGE.png', out: 'src/assets/Stents/preview.webp', width: 1100 },
  { in: 'src/assets/Sakemly/OG_IMAGE.png', out: 'src/assets/Sakemly/preview.webp', width: 1100 },

  // portrait: renders at 358px
  { in: 'src/assets/profile.png', out: 'src/assets/profile.webp', width: 720 },

  // case-study screenshots: openable fullscreen, so keep them large
  { in: 'src/assets/Stents/Screenshots/NodeGraph.jpg', out: 'src/assets/Stents/Screenshots/NodeGraph.webp', width: 1920 },
  { in: 'src/assets/Stents/Screenshots/Storyboard_Render.jpg', out: 'src/assets/Stents/Screenshots/Storyboard_Render.webp', width: 1920 },
  { in: 'src/assets/Stents/Screenshots/Edit.jpg', out: 'src/assets/Stents/Screenshots/Edit.webp', width: 1920 },
  { in: 'src/assets/Sakemly/shot_home.jpeg', out: 'src/assets/Sakemly/shot_home.webp', width: 945 },
  { in: 'src/assets/Sakemly/shot_topics.jpeg', out: 'src/assets/Sakemly/shot_topics.webp', width: 945 },
  { in: 'src/assets/Sakemly/shot_todos.jpeg', out: 'src/assets/Sakemly/shot_todos.webp', width: 945 },
  { in: 'src/assets/Sakemly/shot_reminders.jpeg', out: 'src/assets/Sakemly/shot_reminders.webp', width: 945 },
];

const kb = (bytes) => `${(bytes / 1024).toFixed(0)}KB`;

let before = 0;
let after = 0;

for (const job of JOBS) {
  await mkdir(path.dirname(job.out), { recursive: true });

  let pipeline = sharp(job.in).resize({ width: job.width, withoutEnlargement: true });
  if (job.flop) pipeline = pipeline.flop();

  const { width, height } = await pipeline.webp({ quality: 82, effort: 6 }).toFile(job.out);

  const src = await stat(job.in);
  const dst = await stat(job.out);
  before += src.size;
  after += dst.size;

  console.log(`${path.basename(job.out).padEnd(26)} ${width}x${height}  ${kb(src.size)} -> ${kb(dst.size)}`);
}

console.log(`\ntotal ${kb(before)} -> ${kb(after)} (${(100 - (after / before) * 100).toFixed(0)}% smaller)`);
