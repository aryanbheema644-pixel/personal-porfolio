'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { SceneProps } from './types';

// In this image the boyfriend looks toward the woman in RED (left); the woman
// in blue (right) is the girlfriend being ignored. So the joke maps as:
//   looked-at (red)  → Athlix, the shiny new thing
//   ignored  (blue)  → metallurgy semester exams
export default function Scene11DistractedBoyfriend({ onOpenSubCard }: SceneProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 py-10 text-zinc-900">
      <div className="relative w-full aspect-[3/2]">
        <Image src="/memes/11-distracted-boyfriend.jpg" alt="Distracted boyfriend" fill className="object-contain" />

        {/* boyfriend (center) */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute top-[2%] left-[57%] -translate-x-1/2 bg-black/75 text-white rounded px-1.5 py-0.5 text-[9px] md:text-[10px] font-medium whitespace-nowrap"
        >
          you (looking back)
        </motion.div>

        {/* girlfriend being ignored (blue, right) */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="absolute top-[7%] left-[83%] -translate-x-1/2 bg-black/75 text-white rounded px-1.5 py-0.5 text-[9px] md:text-[10px] font-medium whitespace-nowrap"
        >
          metallurgy semester exams
        </motion.div>

        {/* the new interest (red, left) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute top-[4%] left-[30%] -translate-x-1/2 w-[40%] bg-white/90 rounded-md px-2 py-1 text-center leading-tight"
        >
          <p className="text-xs md:text-sm font-semibold">Athlix</p>
          <p className="text-[9px] md:text-[10px]">sport-agnostic coaching SaaS</p>
          <p className="text-[9px] md:text-[10px]">site deployed. product cooking.</p>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-4 text-sm italic text-zinc-800 text-center"
      >
        she knows. she&apos;s accepted it.
      </motion.p>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3 }}
        onClick={(e) => {
          e.stopPropagation();
          onOpenSubCard();
        }}
        className="mt-2 text-xs text-zinc-700 underline underline-offset-4 hover:text-black"
      >
        tap to see what&apos;s cooking →
      </motion.button>
    </div>
  );
}
