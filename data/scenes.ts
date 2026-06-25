export type Treatment = 'frame' | 'label' | 'caption' | 'special';

export interface SubCard {
  title: string;
  sections: { heading?: string; bullets: string[] }[];
}

export interface Scene {
  id: number;
  name: string;
  treatment: Treatment;
  memeImage: string;
  durationMs: number;
  background: string;
  audioCue?: string;
  subCard?: SubCard;
}

export const SCENES: Scene[] = [
  // —— ACT 1: SETUP ——
  {
    id: 1,
    name: 'doge',
    treatment: 'special',
    memeImage: '/memes/01-doge.jpg',
    durationMs: 13000,
    background: '#d4a847',
    audioCue: '/audio/01-typewriter.mp3',
  },
  {
    id: 2,
    name: 'gru',
    treatment: 'label',
    memeImage: '/memes/02-gru.jpg',
    durationMs: 8000,
    background: '#1a1a1a',
  },
  {
    id: 3,
    name: 'squidward',
    treatment: 'caption',
    memeImage: '/memes/03-squidward.jpg',
    durationMs: 6000,
    background: '#2d1f3d',
  },
  {
    id: 4,
    name: 'drake',
    treatment: 'label',
    memeImage: '/memes/04-drake.jpg',
    durationMs: 6000,
    background: '#e8b923',
  },
  // —— ACT 2: RECEIPTS ——
  {
    id: 5,
    name: 'roll-safe',
    treatment: 'caption',
    memeImage: '/memes/05-roll-safe.jpg',
    durationMs: 6000,
    background: '#1f3a52',
  },
  {
    id: 6,
    name: 'woman-yelling-cat',
    treatment: 'label',
    memeImage: '/memes/06-woman-yelling-cat.jpg',
    durationMs: 7000,
    background: '#2a2a2a',
  },
  {
    id: 7,
    name: 'galaxy-brain',
    treatment: 'frame',
    memeImage: '/memes/07-galaxy-brain.jpg',
    durationMs: 12000,
    background: '#0a0a1a',
    subCard: {
      title: 'Base — the full case',
      sections: [
        {
          heading: 'the flagship build',
          bullets: [
            'talked to users → defined the ICP myself',
            'built a Hermes-powered outreach agent + LinkedIn automation running on that ICP',
            'outcome: leads flow in on autopilot, sales focuses on closes',
          ],
        },
        {
          heading: 'also at Base',
          bullets: [
            'wrote PRDs, ran sprints in Jira, shipped features on schedule',
            'instrumented an Amplitude dashboard that informed free-tier limit decisions',
            'built automation cutting 3–4 hrs/day of manual team work',
            'sat with the founder on pitch deck + valuation framing + investor-facing materials',
            'drove LinkedIn growth via build-in-public',
          ],
        },
      ],
    },
  },
  {
    id: 8,
    name: 'disaster-girl',
    treatment: 'frame',
    memeImage: '/memes/08-disaster-girl.jpg',
    durationMs: 9000,
    background: '#1a0a0a',
  },
  {
    id: 9,
    name: 'batman-slap',
    treatment: 'label',
    memeImage: '/memes/09-batman-slap.jpg',
    durationMs: 7000,
    background: '#c1281e',
  },
  {
    id: 10,
    name: 'surprised-pikachu',
    treatment: 'caption',
    memeImage: '/memes/10-surprised-pikachu.jpg',
    durationMs: 7000,
    background: '#f5d033',
  },
  {
    id: 11,
    name: 'distracted-boyfriend',
    treatment: 'label',
    memeImage: '/memes/11-distracted-boyfriend.jpg',
    durationMs: 8000,
    background: '#c8b8a8',
    subCard: {
      title: 'Athlix — what\'s cooking',
      sections: [
        {
          bullets: [
            'sport-agnostic coaching academy management platform',
            'buyer: academy owner. critical daily user: coach. proof: parents.',
          ],
        },
        {
          heading: 'the build',
          bullets: [
            'player profile management — the spine of the product',
            'benchmark drill tracking as a time-series',
            'AI match analyzer powered by video RAG — natural language querying of match footage',
            'auto-generated progress reports for parents',
          ],
        },
        {
          heading: 'stack & status',
          bullets: [
            'next.js + supabase + vercel',
            'site deployed. analyzer in design.',
          ],
        },
      ],
    },
  },
  // —— ACT 3: CLOSE ——
  {
    id: 12,
    name: 'two-buttons',
    treatment: 'label',
    memeImage: '/memes/12-two-buttons.jpg',
    durationMs: 6000,
    background: '#3a8acc',
  },
  {
    id: 13,
    name: 'hide-the-pain-harold',
    treatment: 'caption',
    memeImage: '/memes/13-hide-the-pain-harold.jpg',
    durationMs: 6000,
    background: '#e8e8e8',
  },
  {
    id: 14,
    name: 'bernie',
    treatment: 'special',
    memeImage: '/memes/14-bernie.jpg',
    durationMs: 10000,
    background: '#2a3a2a',
  },
];
