'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const CAT_LINES = ['PM at Base.', 'BD at NOBLEX.', 'Building Athlix.', 'Doing case comps.', 'On 5 clubs.'];

export default function Scene06WomanYellingCat() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-3 py-10">
      <div className="relative w-full aspect-[680/430]">
        <Image src="/memes/06-woman-yelling-cat.jpg" alt="Woman yelling at cat" fill className="object-contain" />

        {/* Two shouting women on the left → red-bordered speech bubbles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="absolute top-[3%] left-[2%] w-[31%] bg-white border-2 border-red-600 rounded-lg px-1.5 py-1 font-meme uppercase text-[8px] md:text-[10px] leading-tight text-zinc-900 text-center"
        >
          You&apos;re a metallurgy student you can&apos;t do all this
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.3 }}
          className="absolute top-[31%] left-[5%] w-[31%] bg-white border-2 border-red-600 rounded-lg px-1.5 py-1 font-meme uppercase text-[8px] md:text-[10px] leading-tight text-zinc-900 text-center"
        >
          Pick one thing and focus
        </motion.div>

        {/* Calm cat → clean white card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.3 }}
          className="absolute top-[5%] left-[53%] w-[44%] bg-white/95 rounded-lg px-2 py-1.5 text-[9px] md:text-[11px] leading-snug text-zinc-900"
        >
          {CAT_LINES.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
