/* ------------------------------------------------------------------ */
/*  Single source of truth for project + case-study content.          */
/*  Edit copy here — components read from this file.                   */
/* ------------------------------------------------------------------ */

import stentsOg from '../assets/Stents/OG_IMAGE.png';
import sakemlyOg from '../assets/Sakemly/OG_IMAGE.png';

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
    heroBg: '#080808',
    accent: '#f5a623',
    desc: 'An AI production pipeline that carries a creator from written brief to a consistent storyboard and video — built node by node from my own VFX workflow.',

    // TODO: confirm the real URLs before pushing.
    website: 'https://stents.ai',
    demo: '',

    caseStudy: {
      intro:
        'Stents.ai carries a creator from written brief to a consistent storyboard and video, node by node.',
      overview:
        'This one is personal: after sixteen years as a compositor and colorist, I knew exactly where creative production breaks down. Stents.ai is my answer — an AI pipeline built solo, node by node, that takes a project from brief to consistent storyboard and video without the tool-juggling.',
      meta: [
        { label: 'My role', value: 'Product Builder' },
        { label: 'Team', value: 'Solo Project' },
        { label: 'Tech', value: 'React Flow, Supabase, AI APIs, Node.js' },
        { label: 'Industry', value: 'AI / Creative Tools · Film & Advertising' },
      ],
      sections: [
        {
          num: '01',
          label: 'The problem',
          lead: 'The hard part was never any single step — it was holding the whole pipeline together.',
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
          lead: 'One connected workflow, from the first brief to the final cut.',
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
          lead: 'I kept the core sharp by saying no to the obvious-but-distracting features.',
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
          lead: 'Raw AI output is unpredictable — most of the work was making it consistent.',
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
          lead: 'Live, in use, and still moving.',
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
    image: sakemlyOg,
    heroBg: '#022c2d',
    accent: '#3da68d',
    website: 'https://sakemly.com',
    demo: '',
    caseStudy: {
      intro:
        'Sakemly turns the noise of busy WhatsApp groups into structured, searchable knowledge — every event, to-do and decision, without the scroll.',
      overview:
        'Sakemly started from a frustration I lived with daily — too many busy WhatsApp groups, and the one message that actually mattered always buried under hundreds. I built it to turn that noise into something you can scan in seconds.',
      meta: [
        { label: 'My role', value: 'Product Builder' },
        { label: 'Team', value: 'Solo Project' },
        { label: 'Tech', value: 'React Native, Supabase, AI / LLM' },
        { label: 'Platform', value: 'iOS & Android · Community & family groups' },
      ],
      sections: [
        {
          num: '01',
          label: 'The problem',
          lead: 'Active group chats move faster than anyone can keep up with.',
          bullets: [
            'Hundreds of messages, no structure',
            'Events and to-dos get lost in the scroll',
            'Decisions are hard to track and easy to forget',
            'Catching up after a busy day is exhausting',
          ],
        },
        {
          num: '02',
          label: 'What it does',
          lead: 'It reads the chat and hands back only the parts that matter.',
          features: [
            { title: 'Smart summaries', desc: 'Turns long chats into clear topics and key points.' },
            { title: 'Events & to-dos', desc: 'Surfaces dates, tasks and who is responsible.' },
            { title: 'Decisions & questions', desc: 'Tracks what was agreed and what is still open.' },
            { title: 'Caught-up at a glance', desc: 'A simple score shows how on top of things you are.' },
          ],
        },
        {
          num: '03',
          label: 'Scope & tradeoffs',
          lead: 'I built one thing well instead of a second messaging app.',
          columns: [
            {
              title: 'Cut',
              items: ['A full messaging / reply client', 'Every chat platform at launch', 'Manual tagging and folders'],
            },
            {
              title: 'Why',
              items: ['Do one thing remarkably well', 'Validate with real groups first', 'Let the AI do the organizing'],
            },
          ],
        },
        {
          num: '04',
          label: 'Challenges solved',
          lead: 'Turning messy, human conversation into reliable structure was the hard part.',
          columns: [
            {
              title: 'What broke',
              items: ['Noisy chats produced messy summaries', 'Important items got missed or duplicated', 'Cost and latency on long histories'],
            },
            {
              title: 'How I fixed it',
              items: ['Tighter prompts, chunked by topic', 'Structured extraction with validation', 'Caching and incremental processing'],
            },
          ],
        },
        {
          num: '05',
          label: 'Where it stands',
          lead: "Shipped, and part of people's daily routine.",
          features: [
            { title: 'Live', desc: 'Shipped on iOS and Android, used by real groups.' },
            { title: 'Recurring use', desc: 'People come back to stay caught up.' },
            { title: 'Next', desc: 'More platforms and smarter reminders.' },
          ],
        },
      ],
    },
  },
];

export function getProject(slug) {
  return shipped.find((p) => p.slug === slug);
}
