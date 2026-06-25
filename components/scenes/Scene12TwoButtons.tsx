'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Scene12TwoButtons() {
  return (
    <div className="w-full h-full flex flex-col px-4 pt-12 pb-4">
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div className="relative h-full aspect-[600/900]">
          <Image src="/memes/12-two-buttons.jpg" alt="Two buttons decision" fill className="object-contain" />

          {/* labels on the white panels above each red button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute top-[10%] left-[27%] -translate-x-1/2 text-zinc-900 font-meme text-sm md:text-base whitespace-nowrap"
          >
            sleep
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="absolute top-[8%] left-[64%] -translate-x-1/2 w-[34%] text-center text-zinc-900 font-meme text-[11px] md:text-sm leading-none"
          >
            ship one more feature
          </motion.div>

          {/* caption over the sweating man */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="absolute bottom-[3%] left-1/2 -translate-x-1/2 w-[92%] text-center text-xs md:text-sm italic text-white bg-black/55 rounded-md px-2 py-1"
          >
            i pick button 2. that&apos;s the actual resume.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
