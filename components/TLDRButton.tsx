'use client';

import { CONTACT } from '@/data/contact';

export default function TLDRButton() {
  return (
    <a
      href={CONTACT.resumeHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="absolute bottom-3 right-3 z-30 text-[10px] text-white/60 hover:text-white border border-white/30 rounded-full px-3 py-1 backdrop-blur-sm"
    >
      skip to TL;DR
    </a>
  );
}
