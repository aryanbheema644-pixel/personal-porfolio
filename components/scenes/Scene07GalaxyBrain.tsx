'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { SceneProps } from './types';

// The provided galaxy-brain image already has a blank white left column and
// four brain panels stacked on the right. We overlay the escalating text onto
// that white column, aligned to each panel row.
const PANELS = [
  { text: 'do cold outreach manually like everyone else', top: '12%', cls: 'text-[11px] text-zinc-400' },
  { text: 'actually, let me talk to users first and define the ICP myself', top: '37%', cls: 'text-xs text-zinc-600' },
  {
    text: 'now build a Hermes-powered outreach agent + LinkedIn automation that runs on that ICP',
    top: '62%',
    cls: 'text-sm font-medium text-zinc-800',
  },
  { text: 'leads come in while i sleep', top: '87%', cls: 'text-base font-semibold text-indigo-900' },
];

export default function Scene07GalaxyBrain({ onOpenSubCard }: SceneProps) {
  return (
    <div className="w-full h-full flex flex-col px-4 pt-12 pb-4 text-white">
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div className="relative w-full max-h-full aspect-[857/1200]">
          <Image src="/memes/07-galaxy-brain.jpg" alt="Expanding brain" fill className="object-contain" />
          {PANELS.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 1.5 + 0.3 }}
              className={`absolute left-[3%] w-[44%] -translate-y-1/2 italic leading-snug ${p.cls}`}
              style={{ top: p.top }}
            >
              &quot;{p.text}&quot;
            </motion.p>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 6.5 }}
        className="shrink-0 text-center pt-3"
      >
        <p className="font-medium text-sm">Base — AI research intelligence platform</p>
        <p className="text-xs text-zinc-400 italic">PM Intensive Intern</p>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 6.9, type: 'spring', stiffness: 320, damping: 22 }}
          onClick={(e) => {
            e.stopPropagation();
            onOpenSubCard();
          }}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-lg transition hover:bg-zinc-100 active:scale-95"
        >
          see the full case
          <span aria-hidden className="text-base leading-none">→</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
