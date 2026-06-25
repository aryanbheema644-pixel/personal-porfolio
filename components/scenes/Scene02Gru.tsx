'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { SceneProps } from './types';

// Text cards sit on the cyan whiteboard at the right of each Gru panel.
// Positions are percentages of the image box (locked to the meme's aspect).
const PANELS = [
  { text: 'Get into NIT Warangal ✅', top: '26%', left: '38%' },
  { text: 'Pick Metallurgical & Materials Engineering ✅', top: '26%', left: '88%' },
  { text: 'Become a metallurgical engineer 😐', top: '74%', left: '38%' },
  { text: 'Become a metallurgical engineer 💀', top: '74%', left: '88%' },
];

export default function Scene02Gru() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 py-10 text-white">
      <div className="relative w-full aspect-[700/457]">
        <Image src="/memes/02-gru.jpg" alt="Gru's plan" fill className="object-contain" />
        {PANELS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.6, duration: 0.3 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-[20%] text-center text-[9px] md:text-[11px] font-medium leading-tight text-zinc-900 bg-white/55 rounded-[3px] px-1 py-0.5"
            style={{ top: p.top, left: p.left }}
          >
            {p.text}
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="mt-4 text-sm italic text-zinc-400 text-center px-4"
      >
        the plan was airtight. then i opened the internet.
      </motion.p>
    </div>
  );
}
