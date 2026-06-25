'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Scene10SurprisedPikachu() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between px-6 pt-14 pb-8 text-zinc-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-sm md:text-base italic leading-relaxed"
      >
        learning how a company actually works —
        <br />
        its operations, its moving parts —
        <br />
        through case competitions and engaging with sponsors.
        <br />
        pitched my solution to the sponsoring company&apos;s CEO
        <br />
        (who happens to be ex-McKinsey)
        <br />
        <br />
        (he actually engaged with it)
      </motion.div>
      <div className="relative w-full max-w-[260px] aspect-square my-3">
        <Image src="/memes/10-surprised-pikachu.jpg" alt="Surprised Pikachu" fill className="object-contain" />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="text-sm font-medium text-center leading-snug"
      >
        this is where i actually learn — case comps are how i figure out what really makes a company tick.
      </motion.p>
    </div>
  );
}
