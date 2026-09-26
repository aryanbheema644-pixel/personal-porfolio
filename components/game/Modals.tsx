import { INVENTORY, NODES, PLAYER } from '@/data/journey';
import { CONTACT } from '@/data/contact';

export function InventoryModal() {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--coin)]">Inventory</p>
      <h2 className="mt-2 font-pixel text-3xl">What’s in the bag</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {INVENTORY.map((slot) => (
          <section key={slot.slot} className="slot">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{slot.slot}</h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {slot.items.map((it) => (
                <li key={it} className="loot">
                  {it}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export function SpeedrunModal() {
  const roles = NODES.filter((n) => n.kind === 'main').reverse();
  const sides = NODES.filter((n) => n.kind === 'side');
  const spawn = NODES.find((n) => n.kind === 'spawn');
  const guilds = NODES.find((n) => n.kind === 'guild');

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--coin)]">Speedrun · any%</p>
      <h2 className="mt-2 font-pixel text-3xl">{PLAYER.name}</h2>
      <p className="mt-1 text-[var(--text-2)]">{PLAYER.current}</p>

      <h3 className="speed-h">Experience</h3>
      <ul className="space-y-3">
        {roles.map((r) => (
          <li key={r.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <span className="font-semibold">
                {r.title} <span className="font-normal text-[var(--accent)]">· {r.role}</span>
              </span>
              <span className="font-mono text-xs text-[var(--muted)]">{r.when}</span>
            </div>
            <p className="text-sm text-[var(--text-2)]">{r.loot?.join(' · ')}</p>
          </li>
        ))}
      </ul>

      <h3 className="speed-h">Competitions & builds</h3>
      <ul className="space-y-1.5 text-sm">
        {sides.map((s) => (
          <li key={s.id}>
            <span className="font-semibold">{s.title}</span> <span className="text-[var(--text-2)]">— {s.role}</span>
          </li>
        ))}
      </ul>

      <h3 className="speed-h">Education</h3>
      <p className="text-sm">
        <span className="font-semibold">{spawn?.title}</span>{' '}
        <span className="text-[var(--text-2)]">
          — {spawn?.role}, {spawn?.when} · {spawn?.loot?.join(' · ')}
        </span>
      </p>

      <h3 className="speed-h">On campus</h3>
      <ul className="space-y-1 text-sm text-[var(--text-2)]">
        {guilds?.log?.map((g) => <li key={g}>{g}</li>)}
      </ul>

      <div className="mt-7 flex flex-wrap gap-3">
        <a className="btn btn-primary" href={CONTACT.emailHref}>
          ✉ {CONTACT.email}
        </a>
        <a className="btn" href={CONTACT.linkedinHref} target="_blank" rel="noopener noreferrer">
          LinkedIn ↗
        </a>
        <a className="btn" href={CONTACT.resumeHref} target="_blank" rel="noopener noreferrer">
          Resume ↗
        </a>
      </div>
    </div>
  );
}
