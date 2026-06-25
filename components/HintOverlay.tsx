'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HintOverlay({ isMobile }: { isMobile: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('hint-seen')) return;
    setShow(true);
    const t = setTimeout(() => {
      setShow(false);
      localStorage.setItem('hint-seen', '1');
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 pointer-events-none"
        >
          <p className="text-white text-sm font-medium px-4 py-2 bg-black/60 rounded-full">
            {isMobile ? 'tap right to continue, hold to pause' : '→ to continue, space to pause'}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
