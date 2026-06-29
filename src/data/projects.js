/* ------------------------------------------------------------------ */
/*  Single source of truth for project + case-study content.          */
/*  Edit copy here — components read from this file.                   */
/* ------------------------------------------------------------------ */

import stentsOg from '../assets/Stents/OG_IMAGE.png';

const DRAFT = 'Draft — copy coming soon.';

export const shipped = [
  {
    slug: 'stents',
    name: 'Stents.ai',
    status: 'Live',
    tag: 'Scene 02 · Shot 03',
    bg: 'linear-gradient(135deg,#1b1b24,#2a2233)',
    fg: '#c9b8ff',
    frame: 'brief  →  beats  →  storyboard  →  consistent shots',
    image: stentsOg,
    desc: 'An AI production pipeline that carries a creator from written brief to a consistent storyboard and video — built node by node from my own VFX workflow.',

    // TODO: confirm the real URLs before pushing.
    website: 'https://stents.ai',
    demo: '',

    caseStudy: {
      intro:
        'Stents.ai carries a creator from written brief to a consistent storyboard and video, node by node.',
      meta: [
        { label: 'My role', value: 'Product Builder' },
        { label: 'Duration', value: '2024 – Present' },
        { label: 'Team', value: 'Solo Project' },
        { label: 'Tech', value: 'React Flow, Supabase, AI APIs, Node.js' },
        { label: 'Industry', value: 'AI / Creative Tools · Film & Advertising' },
      ],
      sections: [
        {
          num: '01',
          label: 'The problem',
          lead: 'Creative teams waste hours jumping between tools, struggling to keep consistency across text, images, storyboard and video.',
          bullets: [
            'Too many disconnected tools',
            'Inconsistency in characters and shots',
            'Hard to iterate and manage feedback',
            'Slow from idea to final video',
          ],
        },
        {
          num: '02',
          label: 'What it does',
          lead: 'A node-based production platform that connects the entire creative workflow — from brief to final cut.',
          features: [
            { title: 'Visual workflow', desc: 'Node-by-node production pipeline.' },
            { title: 'Consistency engine', desc: 'Characters, style and scenes stay consistent.' },
            { title: 'AI-powered', desc: 'Leverages leading image & video models.' },
            { title: 'For teams', desc: 'Share, review and iterate in one place.' },
          ],
        },
        {
          num: '03',
          label: 'Scope & tradeoffs',
          lead: 'Focused on a clean, flexible core. Cut complex timeline and editing features to ship faster and validate with real users.',
          columns: [
            {
              title: 'Cut',
              items: [
                'Full timeline editor (v1)',
                'Advanced 3D camera tools',
                'Built-in asset marketplace',
              ],
            },
            {
              title: 'Why',
              items: ['Focus on the core workflow', 'Faster development', 'Ship, learn, iterate'],
            },
          ],
        },
        {
          num: '04',
          label: 'Challenges solved',
          lead: 'Early AI outputs were inconsistent and unpredictable. Workflows got messy as projects scaled.',
          columns: [
            {
              title: 'What broke',
              items: [
                'Character drift between shots',
                'Wrong camera angles',
                'Long render times',
                'Complex branching logic',
              ],
            },
            {
              title: 'How I fixed it',
              items: [
                'Reference locking & seed control',
                'Smarter prompts & constraints',
                'Caching & async rendering',
                'Simplified data model',
              ],
            },
          ],
        },
        {
          num: '05',
          label: 'Where it stands',
          lead: 'From brief to consistent storyboard and video — and still growing.',
          features: [
            { title: 'Live', desc: 'stents.ai is live and used in real projects.' },
            { title: 'Growing', desc: 'New features and models added regularly.' },
            { title: 'Next', desc: 'Team collaboration, advanced editing and more control.' },
          ],
        },
      ],
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
    website: '',
    demo: '',
    caseStudy: {
      intro:
        'Sakemly turns the noise of busy WhatsApp groups into structured, searchable knowledge.',
      sections: [
        { num: '01', label: 'The problem', lead: DRAFT },
        { num: '02', label: 'What it does', lead: DRAFT },
        { num: '03', label: 'Scope & tradeoffs', lead: DRAFT },
        { num: '04', label: 'Challenges solved', lead: DRAFT },
        { num: '05', label: 'Where it stands', lead: DRAFT },
      ],
    },
  },
];

export function getProject(slug) {
  return shipped.find((p) => p.slug === slug);
}
