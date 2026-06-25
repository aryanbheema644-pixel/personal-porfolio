'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CONTACT } from '@/data/contact';

const LINKS = [
  { icon: '📧', label: CONTACT.email, href: CONTACT.emailHref, external: false },
  { icon: '🔗', label: CONTACT.linkedin, href: CONTACT.linkedinHref, external: true },
  { icon: '📄', label: 'resume', href: CONTACT.resumeHref, external: true },
];

export default function Scene14Bernie() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between px-5 pt-12 pb-5 text-center text-white">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-meme text-2xl md:text-3xl leading-tight"
      >
        i am once again asking...
        <br />
        for a startup that gets it.
      </motion.div>

      <div className="relative flex-1 w-full my-3 min-h-0">
        <Image src="/memes/14-bernie.jpg" alt="Bernie asking" fill className="object-contain" />
      </div>

      <div className="w-full bg-black/30 rounded-xl px-4 py-3 space-y-2">
        {LINKS.map((l, i) => (
          <motion.a
            key={l.label}
            href={l.href}
            target={l.external ? '_blank' : undefined}
            rel={l.external ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 + i * 0.5 }}
            className="block text-sm md:text-base text-white hover:underline underline-offset-4 break-words"
          >
            {l.icon} {l.label}
          </motion.a>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="mt-3 text-[11px] italic text-white/70 px-2"
      >
        warning: i might become your competitor in 2 years if you don&apos;t reply.
      </motion.p>
    </div>
  );
}
