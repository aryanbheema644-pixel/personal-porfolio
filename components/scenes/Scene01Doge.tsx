'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTypewriterAudio } from '@/hooks/useTypewriterAudio';
import type { SceneProps } from './types';

const INTRO_LINES = [
  '> in a world where every portfolio',
  '  looks the same...',
  '> one student dared to ask...',
  '> what if...',
];

const DOGE_LINES = [
  { text: 'ayy chill 💀', color: '#e63946', top: '14%', left: '6%', rotate: -6 },
  { text: 'nah this just', color: '#2a9d8f', top: '28%', left: '4%', rotate: 4 },
  { text: 'a portfolio', color: '#2a9d8f', top: '35%', left: '7%', rotate: 4 },
  { text: 'sorry for the drama', color: '#5a2d82', top: '50%', left: '5%', rotate: -3 },
  { text: 'anyway scroll—', color: '#e76f51', top: '66%', left: '8%', rotate: 5 },
  { text: '*wait no*', color: '#c1121f', top: '74%', left: '13%', rotate: -8 },
  { text: 'tap right →', color: '#1d3557', top: '85%', left: '6%', rotate: 0 },
];

export default function Scene01Doge({ isActive }: SceneProps) {
  const [phase, setPhase] = useState<'intro' | 'flash' | 'doge'>('intro');
  const [typedChars, setTypedChars] = useState(0);
  const fullText = INTRO_LINES.join('\n');

  useTypewriterAudio(phase === 'intro' && isActive, '/audio/01-typewriter.mp3');

  useEffect(() => {
    if (phase !== 'intro') return;
    if (typedChars >= fullText.length) {
      const t = setTimeout(() => setPhase('flash'), 1200);
      return () => clearTimeout(t);
    }
    const speed = fullText[typedChars] === '\n' ? 400 : 55;
    const timeout = setTimeout(() => setTypedChars((c) => c + 1), speed);
    return () => clearTimeout(timeout);
  }, [typedChars, phase, fullText]);

  useEffect(() => {
    if (phase === 'flash') {
      const t = setTimeout(() => setPhase('doge'), 120);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === 'intro') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black p-8">
        <pre className="font-terminal text-white text-xl md:text-2xl whitespace-pre-wrap leading-relaxed">
          {fullText.slice(0, typedChars)}
          <span className="animate-pulse">▊</span>
        </pre>
      </div>
    );
  }

  if (phase === 'flash') {
    return <div className="w-full h-full bg-white" />;
  }

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #d4a847 0%, #c89a3a 100%)' }}
    >
      <motion.div
        initial={{ scale: 0.6, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 12 }}
        className="absolute inset-y-0 right-0 w-[60%]"
      >
        <Image
          src="/memes/01-doge.jpg"
          alt="doge"
          fill
          className="object-cover"
          style={{ objectPosition: '68% 30%' }}
          priority
        />
      </motion.div>
      {DOGE_LINES.map((line, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.2, type: 'spring', damping: 14 }}
          className="absolute font-doge font-bold text-2xl md:text-3xl drop-shadow-sm"
          style={{
            top: line.top,
            left: line.left,
            color: line.color,
            transform: `rotate(${line.rotate}deg)`,
          }}
        >
          {line.text}
        </motion.div>
      ))}
    </div>
  );
}
