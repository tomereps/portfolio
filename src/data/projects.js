/* ------------------------------------------------------------------ */
/*  Single source of truth for project + case-study content.          */
/*  Edit copy here — components read from this file.                   */
/* ------------------------------------------------------------------ */

/*
 * Case-study sections follow a fixed shape so the CaseStudy template
 * can render any project. Tomer is writing the raw material; the
 * placeholder text below is clearly marked and meant to be replaced.
 *
 *   problem      — the real user and the pain
 *   built        — what I actually shipped
 *   cut          — what I chose NOT to build, and why
 *   broke        — what broke / surprised me
 *   status       — where it stands now
 */

const PLACEHOLDER = '_Draft — Tomer to supply the real copy._';

export const shipped = [
  {
    slug: 'stents',
    name: 'Stents.ai',
    status: 'In progress',
    tag: 'Scene 02 · Shot 03',
    bg: 'linear-gradient(135deg,#1b1b24,#2a2233)',
    fg: '#c9b8ff',
    frame: 'brief  →  beats  →  storyboard  →  consistent shots',
    desc: 'An AI production pipeline that carries a creator from written brief to a consistent storyboard and video — built node by node from my own VFX workflow.',
    stack: ['React Flow', 'AI Pipeline', 'UX', 'Video Gen'],
    caseStudy: {
      intro:
        'Stents.ai carries a creator from written brief to a consistent storyboard and video, node by node.',
      sections: {
        problem: PLACEHOLDER,
        built: PLACEHOLDER,
        cut: PLACEHOLDER,
        broke: PLACEHOLDER,
        status: PLACEHOLDER,
      },
    },
  },
  {
    slug: 'sakemly',
    name: 'Sakemly',
    status: 'Live',
    tag: 'summaries · 09:41',
    bg: 'linear-gradient(135deg,#0d2818,#123a22)',
    fg: '#7ee2a8',
    frame: 'noisy group chat  →  structured, searchable knowledge',
    desc: 'Turns busy WhatsApp groups into clean, searchable summaries — so you stop scrolling 400 messages to find the one that mattered.',
    outcome: 'Shipped and live. Real users, real groups, recurring use.',
    stack: ['React Native', 'Supabase', 'AI / LLM', 'Summaries'],
    caseStudy: {
      intro:
        'Sakemly turns the noise of busy WhatsApp groups into structured, searchable knowledge.',
      sections: {
        problem: PLACEHOLDER,
        built: PLACEHOLDER,
        cut: PLACEHOLDER,
        broke: PLACEHOLDER,
        status: PLACEHOLDER,
      },
    },
  },
];

/* Ordered section metadata for the case-study template. */
export const caseStudyOrder = [
  { key: 'problem', label: 'The problem', num: '01' },
  { key: 'built', label: 'What I built', num: '02' },
  { key: 'cut', label: 'What I cut & why', num: '03' },
  { key: 'broke', label: 'What broke', num: '04' },
  { key: 'status', label: 'Where it stands', num: '05' },
];

/* Lookup helper used by the case-study route. */
export function getProject(slug) {
  return shipped.find((p) => p.slug === slug);
}
