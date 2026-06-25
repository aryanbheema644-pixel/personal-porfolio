'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Scene03Squidward() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between px-6 pt-14 pb-8 text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-sm md:text-base italic leading-relaxed"
      >
        POV: you&apos;re in metallurgy lab.
        <br />
        watching every PM, founder, and builder
        <br />
        ship cool stuff on twitter.
      </motion.div>
      <div className="relative w-full max-w-sm aspect-[4/3] my-4">
        <Image src="/memes/03-squidward.jpg" alt="Squidward looking out the window" fill className="object-contain" />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="text-lg font-medium italic"
      >
        &quot;i had to go outside.&quot;
      </motion.p>
    </div>
  );
}
