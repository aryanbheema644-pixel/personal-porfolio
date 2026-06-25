'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Scene04Drake() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 py-10">
      {/* Drake occupies the left half; the right half of the source is blank yellow. */}
      <div className="relative w-full aspect-square">
        <Image src="/memes/04-drake.jpg" alt="Drake choosing" fill className="object-contain" />

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-[14%] left-[52%] w-[44%] text-zinc-900"
        >
          <p className="font-meme text-xl leading-none mb-1">nah</p>
          <p className="text-[11px] md:text-xs font-medium leading-snug">
            phase diagrams, crystal structures, dislocation theory
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
          className="absolute top-[62%] left-[52%] w-[44%] text-zinc-900"
        >
          <p className="font-meme text-xl leading-none mb-1">this →</p>
          <p className="text-[11px] md:text-xs font-medium leading-snug">
            product, distribution, founders, shipping
          </p>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="mt-4 text-sm italic text-zinc-800 text-center"
      >
        i made my choice. mom is recovering.
      </motion.p>
    </div>
  );
}
