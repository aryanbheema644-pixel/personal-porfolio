'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const BATMAN_LINES = [
  'Operations, Innovation Garage — campus incubator. on the organizing team for the flagship hackathon.',
  'Executive, TEDx NIT Warangal',
  'Executive, BDACC (Big Data Analysis & Consulting Cell)',
  'Executive, Stand-Up Comedy Club (yes, that’s where this whole voice came from)',
];

export default function Scene09BatmanSlap() {
  return (
    <div className="w-full h-full flex flex-col items-center px-4 pt-12 pb-6 text-white">
      <div className="relative w-full aspect-[400/375] shrink-0 rounded-lg overflow-hidden">
        <Image src="/memes/09-batman-slap.jpg" alt="Batman slapping Robin" fill className="object-cover" />

        {/* Robin's naive take */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="absolute top-[5%] left-[4%] w-[40%] bg-white rounded-lg px-2 py-1 text-[9px] md:text-[10px] leading-tight text-zinc-900 text-center"
        >
          he&apos;s just a metallurgy kid who codes on the side...
        </motion.div>

        {/* SLAP! */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1.2, 1.5] }}
          transition={{ delay: 1.1, duration: 0.7, times: [0, 0.25, 0.7, 1] }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span className="font-meme text-white text-5xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">*SLAP*</span>
        </motion.div>
      </div>

      {/* Batman's retort, expanded below to stay legible */}
      <div className="mt-3 w-full bg-white/95 rounded-lg px-3 py-2 text-zinc-900 space-y-1">
        {BATMAN_LINES.map((l, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.9 + i * 0.5 }}
            className="text-[11px] md:text-xs leading-snug"
          >
            → {l}
          </motion.p>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9 + BATMAN_LINES.length * 0.5 }}
        className="mt-3 text-center text-sm italic text-white/90"
      >
        the brainrot was earned, not learned.
      </motion.p>
    </div>
  );
}
