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
            { title: 'Two modes', desc: 'A free-form node canvas, or a guided 6-step director.' },
            { title: 'For teams', desc: 'Share, review and iterate in one place.' },
          ],
        },
        {
          num: '03',
          label: 'Scope & tradeoffs',
          lead: "Don't rebuild what specialized tools already do best — focus the build on what makes Stents different.",
          columns: [
            {
              title: 'Cut',
              items: ['Roto & bezier tools', 'Roto-paint'],
            },
            {
              title: 'Why',
              items: [
                'Slow to build, niche payoff',
                'Photoshop does it best — Stents bridges to it',
              ],
            },
          ],
        },
        {
          num: '04',
          label: 'Challenges',
          lead: 'Raw AI output is unpredictable — most of the work was making it consistent.',
          columns: [
            {
              title: 'What broke',
              items: [
                'Character drift between shots',
                'Swapping characters while keeping their pose',
                'Automating workflows in unexpected environments',
                'Complex branching logic',
              ],
            },
            {
              title: 'How I fixed it',
              items: [
                'Reference locking & seed control',
                'Pose-locked composition with reference swaps',
                'Reusable, composable node pipelines',
                'Simplified data model',
              ],
            },
          ],
        },
        {
          num: 'tech',
          label: 'Tech stack',
          lead: 'The tools I reached for to build it end-to-end, solo.',
          tech: [
            'React',
            'React Flow',
            'Supabase',
            'fal.ai',
            'Three.js',
            'Polar',
            'Resend',
            'PostHog',
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
        'Sakemly started from a frustration I lived with daily — too many busy WhatsApp groups, and the one message that mattered always buried under hundreds. I built it to turn that noise into something you can scan in seconds, privacy-first: no bot in your chats, and nothing read without your say-so.',
      meta: [
        { label: 'My role', value: 'Product Builder' },
        { label: 'Team', value: 'Solo Project' },
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
            { title: 'Smart summaries', desc: 'Turns a chat export into clear topics and key points.' },
            { title: 'Events & to-dos', desc: 'Pulls out dates, tasks and who is responsible.' },
            { title: 'Decisions & questions', desc: 'Tracks what was agreed and what is still open.' },
            { title: 'Caught-up at a glance', desc: 'A health dial shows how current each space is.' },
          ],
        },
        {
          num: '03',
          label: 'Scope & tradeoffs',
          lead: 'I made privacy a hard constraint, not a feature — and kept the product to one job.',
          columns: [
            {
              title: 'Cut',
              items: ['A bot that lives in your groups', 'Auto-reading every message', 'A full messaging / reply client'],
            },
            {
              title: 'Why',
              items: ['You choose exactly what to share', 'Nothing is read automatically', 'Do one thing remarkably well'],
            },
          ],
        },
        {
          num: '04',
          label: 'Challenges',
          lead: 'Turning a raw chat export into reliable, trustworthy structure was the hard part.',
          columns: [
            {
              title: 'What broke',
              items: [
                'Export friction — chats only update when re-shared',
                'Long exports overwhelmed the model',
                'Duplicate and fragmented items',
                'No way to trust where an item came from',
              ],
            },
            {
              title: 'How I fixed it',
              items: [
                'A freshness dial + activity-weighted refresh nudges',
                'Day-sized chunking of the chat',
                'Merge & dedupe, folding to-dos under events',
                'Message-level provenance — jump to the source',
              ],
            },
          ],

        },
        {
          num: 'tech',
          label: 'Tech stack',
          lead: 'A lean stack for shipping fast on iOS and Android.',
          tech: [
            'React Native',
            'Expo',
            'Node / Express',
            'Railway',
            'Anthropic Claude',
            'Supabase',
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
