export type NodeKind = 'spawn' | 'guild' | 'main' | 'side' | 'boss';

export interface QuestNode {
  id: string;
  kind: NodeKind;
  /** short label on the map marker */
  marker: string;
  zone?: string;
  title: string;
  role?: string;
  when?: string;
  blurb: string;
  loot?: string[];
  log?: string[];
  /** toast shown the first time the player reaches this node */
  achievement: string;
  /** logo image goes here later */
  logo?: string;
}

export const PLAYER = {
  name: 'Aryan Bheema',
  handle: 'aryan',
  className: 'Product · Growth · AI',
  origin: 'NIT Warangal · Metallurgical & Materials Engg.',
  current: 'Product · Growth · AI systems',
};

export const NODES: QuestNode[] = [
  {
    id: 'spawn',
    achievement: 'New game started',
    kind: 'spawn',
    marker: 'START',
    zone: 'NITW Plains',
    title: 'NIT Warangal',
    role: 'B.Tech, Metallurgical & Materials Engineering',
    when: '2025 – 2029',
    blurb:
      'Home base. Most of this map was built between classes.',
    loot: ['CGPA 8.53', 'Previous save: Valley Oak Jr. College, 97.5%'],
  },
  {
    id: 'guilds',
    achievement: 'Joined 5 guilds (one of them requires being funny)',
    kind: 'guild',
    marker: 'GUILDS',
    title: 'Joined the guilds',
    when: 'Aug 2025 – now',
    blurb: 'Every campus has factions. I joined five of them, one of which requires me to be funny on purpose.',
    log: [
      'Operations Executive, Innovation Garage (campus incubator) · Sept 2025 – now',
      'Operations & Outreach Executive, TEDx NIT Warangal · Jan 2026 – now',
      'Executive Team, Big Data Analytics & Consulting Cell (BDACC) · Sept 2025 – now',
      'Executive Team, MMES & IIMSC · Aug 2025 – Aug 2026',
      'Stand-up Comedian, Stand Up Comedy Club · Aug 2025 – now',
    ],
  },
  {
    id: 'noblex',
    achievement: 'Growth hacker — 10x adoption',
    kind: 'main',
    marker: 'LVL 1',
    zone: 'Growth Valley',
    title: 'NOBLEX',
    role: 'GTM Executive',
    when: 'Nov 2025 – May 2026',
    blurb: 'A closed networking platform for alumni. My job: get people onto it.',
    loot: ['10x adoption via campus distribution', 'Sponsorship + ad revenue', '3 podcasts produced'],
    log: [
      'Designed a segmented alumni GTM strategy from market research, tailoring positioning and outreach per cohort.',
      'Drove campus distribution that scaled adoption 10x.',
      'Generated sponsorship and advertising revenue through targeted partnership pitches.',
      'Produced three podcasts with seniors and alumni on their college journeys.',
    ],
  },
  {
    id: 'ace',
    achievement: 'National Finalist · out of 450+ players',
    kind: 'side',
    marker: '★',
    zone: 'Side Quest Archipelago',
    title: 'Ace the Case',
    role: 'National Finalist',
    blurb: 'Final round out of 450+ players. GTM strategy for Abhyaas entering the career-guidance market.',
    loot: ['Finalist among 450+', 'Market sizing · segments · positioning · entry roadmap'],
  },
  {
    id: 'icc',
    achievement: 'Case cracked: Ather Energy',
    kind: 'side',
    marker: '◆',
    title: 'Indian Case Competition',
    role: 'Ather Energy strategy',
    blurb: 'Profitability and market-expansion strategy: unit economics, target geographies, growth levers.',
  },
  {
    id: 'sih',
    achievement: 'Compliance, automated',
    kind: 'side',
    marker: '⚙',
    title: 'Smart India Hackathon',
    role: 'Internal round qualifier',
    blurb:
      'Built a compliance checker that validates product listings against Legal Metrology rules and flags what’s missing or wrong.',
  },
  {
    id: 'velocity',
    achievement: 'Shipped under a hackathon clock',
    kind: 'side',
    marker: '⚡',
    title: 'Velocity Hackathon',
    role: 'Coupon marketplace',
    blurb: 'A marketplace where people list coupons they’ll never use, and others find ones they will.',
  },
  {
    id: 'comet',
    achievement: 'First bounty cashed',
    kind: 'side',
    marker: '$',
    title: 'Perplexity Comet',
    role: 'Affiliate marketing & outreach',
    blurb: 'Ran independent promotion for Perplexity’s Comet browser. Earned affiliate revenue. First bounty cashed.',
  },
  {
    id: 'base',
    achievement: 'Built an AI outbound engine',
    kind: 'main',
    marker: 'LVL 2',
    zone: 'Product Peaks',
    title: 'Base',
    role: 'Product Management Intern',
    when: 'May 2026 – Jul 2026',
    blurb: 'An AI agentic SaaS for researchers. I found the researchers, talked to them, and shipped with the founders.',
    loot: ['AI outbound engine on Pi / OpenClaw / Hermes', 'Owned Amplitude + OMTMs', 'Built the first sales playbook'],
    log: [
      'Built an AI researcher-discovery & outbound engine that finds active researchers from recent papers and drafts outreach anchored in their specific contribution, booking user-research calls for MVP validation.',
      'Ran a long series of user-research calls and automated turning messy transcripts into structured insights for Confluence.',
      'Worked with the founders on product direction, PRDs and HLDs; ran sprints in Jira across multiple MVP iterations.',
      'Defined OMTMs across features and owned Amplitude analytics; usage data informed free-tier limits and packaging.',
      'Defined the ICP, segmented researchers, ran multi-channel outreach (Sales Navigator, LinkedHelper) and wrote the sales playbook from scratch.',
    ],
  },
  {
    id: 'beyond-border',
    achievement: 'RAG in production',
    kind: 'main',
    marker: 'LVL 3',
    zone: "Founder's Office Summit",
    title: 'Beyond Border',
    role: "Founder's Office",
    when: 'Jul 2026 – now',
    blurb: 'A global talent & immigration firm. I build the AI systems between a website lead and a closed deal.',
    loot: ['RAG case-intelligence (BM25 + semantic, RRF)', 'Personalised visa-screening LLM flow', 'AI lead enrichment → CRM'],
    log: [
      'Architected a RAG case-intelligence system with hybrid BM25 + semantic retrieval and RRF fusion, giving the screening LLM precedent context from past qualified profiles.',
      'Re-engineered the visa-screening LLM workflow: personalised, profile-specific responses instead of generic auto-replies, with human-in-the-loop for edge cases.',
      'Extended the RAG system into a live assistant for Account Executives to pull matching past cases mid-call.',
      'Automated knowledge-base ingestion (Google Service Account + daily job) and LinkedIn data cleaning via Apify.',
      'Built an AI lead-enrichment pipeline (Firecrawl, Apify, Tavily, OpenRouter) that resolves incomplete leads, with founder review for uncertain matches.',
      'Automated CRM intake, enrichment, validation routing and handoff so leads reach sales qualified.',
    ],
  },
  {
    id: 'boss',
    achievement: 'You finished the game. Now hire the player?',
    kind: 'boss',
    marker: '???',
    zone: 'Next level',
    title: 'Player 2 wanted',
    blurb: 'The next level isn’t built yet. If you’re hiring, building, or just want to talk product, growth or AI, press a button.',
  },
];

export const INVENTORY: { slot: string; items: string[] }[] = [
  { slot: 'AI / LLM', items: ['RAG', 'Prompt engineering', 'Agent harnesses (Pi, OpenClaw, Hermes)', 'OpenRouter model routing'] },
  { slot: 'Automation', items: ['n8n', 'Make', 'Clay', 'Apify', 'Firecrawl', 'Tavily', 'Cron jobs', 'Google Service Accounts'] },
  { slot: 'Product', items: ['PRDs', 'User research', 'MVP validation', 'OMTM', 'ICP & segmentation', 'Amplitude', 'Jira', 'Confluence'] },
  { slot: 'Growth & GTM', items: ['Lead gen', 'Enrichment', 'Outbound systems', 'CRM workflows', 'Sales playbooks', 'Sales Navigator', 'LinkedHelper'] },
  { slot: 'Code / Data', items: ['Python', 'C++', 'SQL', 'JavaScript', 'Sheets', 'Excel'] },
];
