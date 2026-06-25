'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const FIRES = [
  'NOBLEX — BD + user segmentation + on the 5-person team behind 3 podcasts (speaker curation, question prep, on-set support).',
  'Case comp R2 — pitched my solution to the sponsoring company’s CEO (ex-McKinsey background). he engaged. i survived.',
  'Flutter hackathon prototype — built end-to-end under time pressure.',
  'Custom AI assistants — workflows automating content + comms, cutting hours of manual work per week.',
];

export default function Scene08DisasterGirl() {
  return (
    <div className="w-full h-full flex flex-col px-5 pt-12 pb-6 text-white">
      <div className="relative w-full aspect-[4/3] shrink-0 rounded-lg overflow-hidden">
        <Image src="/memes/08-disaster-girl.jpg" alt="Disaster girl" fill className="object-cover" />
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto py-3 space-y-2">
        {FIRES.map((f, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.8 }}
            className="text-[11px] md:text-xs leading-snug text-white/90"
          >
            🔥 {f}
          </motion.p>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 + FIRES.length * 0.8 }}
        className="shrink-0 text-center text-sm italic text-white/80"
      >
        i did this. on purpose.
      </motion.p>
    </div>
  );
}
