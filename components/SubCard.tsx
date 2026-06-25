'use client';

import { motion } from 'framer-motion';
import type { SubCard as SubCardData } from '@/data/scenes';

export default function SubCard({ data, onClose }: { data: SubCardData; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        exit={{ y: 30 }}
        className="bg-zinc-900 text-white rounded-xl max-w-md w-full max-h-[85vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="font-medium text-lg">{data.title}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white text-xl leading-none">
            ×
          </button>
        </div>
        {data.sections.map((sec, i) => (
          <div key={i} className="mb-4">
            {sec.heading && (
              <p className="text-xs uppercase tracking-wider text-zinc-400 mb-2">{sec.heading}</p>
            )}
            <ul className="space-y-2 text-sm leading-relaxed">
              {sec.bullets.map((b, j) => (
                <li key={j}>→ {b}</li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
