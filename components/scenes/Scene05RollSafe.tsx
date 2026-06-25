'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Scene05RollSafe() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between px-6 pt-14 pb-8 text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-base md:text-lg font-medium leading-relaxed"
      >
        can&apos;t lose the game
        <br />
        if you&apos;re learning product, BD, and code
        <br />
        at the same time 🧠
      </motion.div>
      <div className="relative w-full max-w-sm aspect-[4/3] my-4">
        <Image src="/memes/05-roll-safe.jpg" alt="Roll Safe tapping head" fill className="object-contain" />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="text-sm italic text-white/90"
      >
        i call it portfolio theory. for myself.
      </motion.p>
    </div>
  );
}
