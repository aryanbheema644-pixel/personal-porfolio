'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuestNode } from '@/data/journey';
import { CONTACT } from '@/data/contact';

const BADGE: Record<QuestNode['kind'], string> = {
  spawn: 'Spawn point',
  guild: 'Guilds',
  main: 'Main quest',
  side: 'Side quest',
  boss: 'Final level',
};

export default function QuestCard({
  node,
  current,
  revealed,
}: {
  node: QuestNode;
  current?: boolean;
  revealed?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const small = node.kind === 'side';

  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
      initial="hidden"
      animate={revealed ? 'show' : undefined}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`card ${small ? 'card-sm' : ''} ${node.kind === 'boss' ? 'card-boss' : ''}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className={`badge badge-${node.kind}`}>{BADGE[node.kind]}</span>
        {current && <span className="badge badge-now">● you are here</span>}
        {node.when && <span className="font-mono text-xs text-[var(--muted)]">{node.when}</span>}
      </div>

      <h3 className={`mt-3 font-pixel leading-none ${small ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>{node.title}</h3>
      {node.role && <p className="mt-1.5 text-sm font-medium text-[var(--accent)]">{node.role}</p>}
      <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-2)]">{node.blurb}</p>

      {node.loot && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Loot">
          {node.loot.map((l) => (
            <li key={l} className="loot">
              <span aria-hidden className="text-[var(--coin)]">◆</span> {l}
            </li>
          ))}
        </ul>
      )}

      {node.log && (
        <>
          <button className="log-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? '▾ close quest log' : '▸ open quest log'}
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="space-y-2.5 pt-3">
                  {node.log.map((l) => (
                    <li key={l} className="flex gap-2.5 text-sm leading-relaxed text-[var(--text-2)]">
                      <span aria-hidden className="mt-0.5 font-mono text-[var(--accent)]">›</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </div>
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      )}

      {node.kind === 'boss' && (
        <div className="mt-5 flex flex-wrap gap-3">
          <a className="btn btn-primary" href={CONTACT.emailHref}>
            ✉ Email me
          </a>
          <a className="btn" href={CONTACT.linkedinHref} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a className="btn" href={CONTACT.resumeHref} target="_blank" rel="noopener noreferrer">
            Resume ↗
          </a>
        </div>
      )}
    </motion.article>
  );
}
