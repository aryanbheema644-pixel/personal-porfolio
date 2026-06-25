'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Scene13HideThePainHarold() {
  return (
    <div className="w-full h-full flex flex-col px-4 pt-12 pb-5 text-zinc-800">
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div className="relative w-full max-h-full aspect-[480/590]">
          <Image src="/memes/13-hide-the-pain-harold.jpg" alt="Hide the pain Harold" fill className="object-contain" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[94%] text-center text-[11px] md:text-sm text-white bg-black/55 rounded px-2 py-1 leading-tight"
          >
            &quot;yeah man i love debugging Supabase RLS at 3am 🙂&quot;
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="absolute top-[52%] left-1/2 -translate-x-1/2 w-[94%] text-center text-[11px] md:text-sm text-white bg-black/55 rounded px-2 py-1 leading-tight"
          >
            &quot;i love it&quot;
          </motion.p>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="shrink-0 text-center text-sm italic mt-3"
      >
        the joy is real. the sleep dep is also real.
      </motion.p>
    </div>
  );
}
