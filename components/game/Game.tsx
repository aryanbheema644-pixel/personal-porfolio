'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NODES, PLAYER, type QuestNode } from '@/data/journey';
import QuestCard from './QuestCard';
import { InventoryModal, SpeedrunModal } from './Modals';
import Face from './Face';
import Scenery from './Scenery';
import { sfx, unlock, isMuted, setMuted, onMuteChange } from './sfx';

const CURRENT_ID = 'beyond-border';

// group nodes into zones: a zone runs until the next node that names a new one
const ZONES = NODES.reduce<{ name: string; nodes: QuestNode[] }[]>((acc, n) => {
  if (n.zone || acc.length === 0) acc.push({ name: n.zone ?? '', nodes: [n] });
  else acc[acc.length - 1].nodes.push(n);
  return acc;
}, []);

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type Modal = null | 'inventory' | 'speedrun';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
// every node pays out one coin per loot item (min 1)
const coinsFor = (reached: number) => NODES.slice(0, reached).reduce((n, node) => n + (node.loot?.length ?? 1), 0);

export default function Game() {
  const faceRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const xpRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const samples = useRef<{ x: number[]; y: number[]; len: number[]; total: number }>({ x: [], y: [], len: [], total: 0 });
  const markerPts = useRef<{ x: number; y: number }[]>([]);
  const heroHover = useRef(false);
  const introSmile = useRef(false);
  const sceneryRef = useRef<HTMLDivElement>(null);
  const startBtnRef = useRef<HTMLButtonElement>(null);
  const maxReached = useRef(0);
  const konamiPos = useRef(0);

  const [path, setPath] = useState({ d: '', w: 0, h: 0 });
  const [heroSize, setHeroSize] = useState(0);
  const [faceReady, setFaceReady] = useState(false);
  const [reached, setReached] = useState(0);
  const [modal, setModal] = useState<Modal>(null);
  const [toast, setToast] = useState<{ key: number; title: string; label: string } | null>(null);
  const muted = useSyncExternalStore(onMuteChange, isMuted, () => false);
  const [rain, setRain] = useState(0);

  // ---- build the road through every marker ----
  const layoutPath = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    const mr = map.getBoundingClientRect();
    const pts = markerRefs.current.filter(Boolean).map((el) => {
      const r = el!.getBoundingClientRect();
      return { x: r.left + r.width / 2 - mr.left, y: r.top + r.height / 2 - mr.top };
    });
    if (!pts.length) return;
    markerPts.current = pts;
    let d = `M ${pts[0].x} 0 L ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1];
      const b = pts[i];
      const my = (a.y + b.y) / 2;
      d += ` C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`;
    }
    setPath({ d, w: mr.width, h: mr.height });
  }, []);

  useEffect(() => {
    layoutPath();
    const ro = new ResizeObserver(layoutPath);
    if (mapRef.current) ro.observe(mapRef.current);
    return () => ro.disconnect();
  }, [layoutPath]);

  // sample the path so the player can find "where on the road is y"
  useEffect(() => {
    const p = pathRef.current;
    if (!p || !path.d) return;
    const total = p.getTotalLength();
    const N = 800;
    const s = { x: [] as number[], y: [] as number[], len: [] as number[], total };
    let maxY = -Infinity;
    for (let i = 0; i <= N; i++) {
      const l = (i / N) * total;
      const pt = p.getPointAtLength(l);
      maxY = Math.max(maxY, pt.y); // keep y monotonic for the binary search
      s.x.push(pt.x);
      s.y.push(maxY);
      s.len.push(l);
    }
    samples.current = s;
    if (trailRef.current) trailRef.current.style.strokeDasharray = `${total}`;
  }, [path.d]);

  // ---- hero face size ----
  useEffect(() => {
    const onResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setHeroSize(vw >= 900 ? Math.min(vh * 0.77, vw * 0.43) : Math.min(vw * 1.0, vh * 0.48));
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ---- the per-frame controller: hero → shrink → walk the map ----
  useEffect(() => {
    if (!heroSize) return;
    let raf = 0;
    let lastX = 0;
    let lastReached = -1;
    let lastSmile = false;
    let lean = 0;

    const frame = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const sy = window.scrollY;
      const map = mapRef.current;
      const face = faceRef.current;
      const s = samples.current;
      if (!map || !face || !s.y.length) {
        raf = requestAnimationFrame(frame);
        return;
      }

      const mapTop = map.getBoundingClientRect().top + sy;
      const desktop = vw >= 900;

      // where the player stands on the road: level with ~55% of the viewport
      const localY = sy + vh * 0.55 - mapTop;
      let lo = 0;
      let hi = s.y.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (s.y[mid] < localY) lo = mid + 1;
        else hi = mid;
      }
      const px = s.x[lo];
      const py = s.y[lo];
      const walked = s.len[lo];

      if (trailRef.current) trailRef.current.style.strokeDashoffset = `${s.total - walked}`;

      // parallax scenery: each layer drifts at its own speed, wrapped to its tile height
      const layers = sceneryRef.current?.children;
      if (layers) {
        for (const el of Array.from(layers) as HTMLElement[]) {
          const off = (sy * Number(el.dataset.speed)) % Number(el.dataset.tile);
          el.style.transform = `translate3d(0, ${-off}px, 0)`;
        }
      }

      // hero → player blend
      const h = clamp(sy / (vh * 0.85));
      const e = easeInOut(h);
      const heroCx = desktop ? vw * 0.72 : vw / 2;
      const heroCy = desktop ? vh * 0.53 : heroSize * 0.5 + 44;
      const playerSize = desktop ? 120 : 84;
      const pCx = px;
      const pCy = mapTop - sy + py - playerSize * 0.18;
      const cx = lerp(heroCx, pCx, e);
      const cy = lerp(heroCy, pCy, e);
      const size = Math.exp(lerp(Math.log(heroSize), Math.log(playerSize), e));
      const scale = size / heroSize;
      face.style.transform = `translate3d(${cx - heroSize / 2}px, ${cy - heroSize / 2}px, 0) scale(${scale})`;

      if (shadowRef.current) {
        shadowRef.current.style.transform = `translate3d(${pCx - 36}px, ${mapTop - sy + py + playerSize * 0.26}px, 0)`;
        shadowRef.current.style.opacity = `${clamp((h - 0.7) / 0.3) * 0.9}`;
      }
      if (heroTextRef.current) {
        heroTextRef.current.style.opacity = `${1 - clamp(h * 1.8)}`;
        heroTextRef.current.style.transform = `translateY(${-h * 60}px)`;
      }

      // lean into the direction of travel
      const vx = pCx - lastX;
      lastX = pCx;
      lean += (clamp(vx * 1.2, -14, 14) * e - lean) * 0.12;
      face.style.setProperty('--lean', `${lean.toFixed(2)}deg`);

      // levels reached + smile when standing on one
      const pts = markerPts.current;
      let r = 0;
      let near = false;
      for (let i = 0; i < pts.length; i++) {
        if (py >= pts[i].y - 4) r = i + 1;
        if (Math.abs(py - pts[i].y) < 70) near = true;
      }
      if (h < 1) r = 0;
      if (r !== lastReached) {
        lastReached = r;
        setReached(r);
      }
      if (xpRef.current) xpRef.current.style.transform = `scaleX(${pts.length ? (h < 1 ? 0 : walked / s.total) : 0})`;

      const smile = h < 0.5 ? introSmile.current || heroHover.current : near && h >= 1;
      if (smile !== lastSmile) {
        lastSmile = smile;
        face.dataset.smile = smile ? '1' : '0';
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [heroSize]);

  const onFaceReady = useCallback(() => setFaceReady(true), []);

  // say hi with a smile once the face has loaded
  useEffect(() => {
    if (!faceReady) return;
    const a = setTimeout(() => (introSmile.current = true), 900);
    const b = setTimeout(() => (introSmile.current = false), 2600);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [faceReady]);

  // scroll so the player stands on marker i
  const goToLevel = useCallback((i: number) => {
    const map = mapRef.current;
    const pt = markerPts.current[i];
    if (!map || !pt) return;
    const mapTop = map.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: mapTop + pt.y - window.innerHeight * 0.55 + 2, behavior: 'smooth' });
  }, []);

  // arcade-style: button blinks + jingle, then the camera moves
  const start = useCallback(() => {
    unlock();
    sfx.start();
    startBtnRef.current?.classList.add('is-pressed');
    setTimeout(() => {
      startBtnRef.current?.classList.remove('is-pressed');
      goToLevel(0);
    }, 380);
  }, [goToLevel]);

  // new levels reached → coin sound + achievement toast (each only once)
  useEffect(() => {
    if (reached <= maxReached.current) return;
    maxReached.current = reached;
    const node = NODES[reached - 1];
    sfx.coin();
    setToast({ key: Date.now(), title: node.achievement, label: node.kind === 'boss' ? 'Game complete' : 'Achievement unlocked' });
  }, [reached]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  // sound can only start after a user gesture
  useEffect(() => {
    const first = () => unlock();
    window.addEventListener('pointerdown', first, { once: true });
    window.addEventListener('keydown', first, { once: true });
    return () => {
      window.removeEventListener('pointerdown', first);
      window.removeEventListener('keydown', first);
    };
  }, []);

  useEffect(() => {
    if (!rain) return;
    const t = setTimeout(() => setRain(0), 3200);
    return () => clearTimeout(t);
  }, [rain]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // konami code easter egg
      const want = KONAMI[konamiPos.current];
      konamiPos.current = e.key.toLowerCase() === want.toLowerCase() ? konamiPos.current + 1 : e.key === KONAMI[0] ? 1 : 0;
      if (konamiPos.current === KONAMI.length) {
        konamiPos.current = 0;
        unlock();
        sfx.powerup();
        setRain(Date.now());
        setToast({ key: Date.now(), title: '+30 lives. Stand-up comedians need them.', label: 'Cheat code activated' });
        return;
      }

      if (e.key === 'Escape') setModal(null);
      if (modal) return;
      // mid-code (after ↑↑↓↓) the arrows belong to the cheat, not level jumps
      if (konamiPos.current >= 4) return;
      if (e.key === 'Enter' && window.scrollY < 40) start();
      if (e.key === 'i' || e.key === 'I') setModal('inventory');
      if (e.key === 'm' || e.key === 'M') setMuted(!isMuted());
      // ← → hop between levels (reached = index of the next level)
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (reached === 0) start();
        else goToLevel(Math.min(reached, NODES.length - 1));
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (reached <= 1) window.scrollTo({ top: 0, behavior: 'smooth' });
        else goToLevel(reached - 2);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal, reached, start, goToLevel]);

  const mainTotal = NODES.length;

  return (
    <main className="relative">
      {/* ---------- HUD ---------- */}
      <header className="hud">
        <div className="flex min-w-0 items-center gap-3">
          <span className="font-pixel text-lg leading-none tracking-wide">aryan.exe</span>
          <span className="hidden font-mono text-xs text-[var(--muted)] sm:inline">
            LVL {Math.max(1, reached)} / {mainTotal}
          </span>
          <span key={reached} className="coins" aria-label={`${coinsFor(reached)} coins`}>
            <span aria-hidden className="text-[var(--coin)]">◆</span> {coinsFor(reached)}
          </span>
        </div>
        <div className="xp" aria-hidden>
          <div ref={xpRef} className="xp-fill" />
        </div>
        <nav className="flex items-center gap-2">
          <button
            className="hud-btn"
            onClick={() => {
              unlock();
              setMuted(!muted);
            }}
            aria-label={muted ? 'Unmute sound' : 'Mute sound'}
            title="Sound (M)"
          >
            {muted ? '🔇' : '🔊'}
          </button>
          <button className="hud-btn" onClick={() => setModal('inventory')}>
            <span className="kbd">I</span> <span className="hidden sm:inline">Inventory</span>
          </button>
          <button className="hud-btn hud-btn-hot" onClick={() => setModal('speedrun')}>
            ≫ <span className="hidden sm:inline">Speedrun</span>
            <span className="sm:hidden">TL;DR</span>
          </button>
        </nav>
      </header>

      <Scenery ref={sceneryRef} />

      {/* ---------- the face / player ---------- */}
      <div ref={shadowRef} className="player-shadow" aria-hidden />
      <div
        ref={faceRef}
        className="face-layer"
        style={{ width: heroSize, height: heroSize, opacity: faceReady ? 1 : 0 }}
        aria-hidden
      >
        <Face onReady={onFaceReady} />
      </div>

      {/* ---------- title screen ---------- */}
      <section className="hero" style={{ '--face-h': `${heroSize}px` } as React.CSSProperties}>
        <div ref={heroTextRef} className="hero-text">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--coin)]">
            <span className="blink">●</span> Player 1 ready
          </p>
          <h1 className="mt-4 font-pixel text-[clamp(3rem,9vw,7.5rem)] leading-[0.85]">
            Aryan
            <br />
            Bheema
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--text-2)] md:mt-6 md:text-lg">
            I work where product, growth and AI meet — talking to users, writing the PRD, reading the numbers, and
            building the systems that take it to market.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 md:mt-8">
            <button
              ref={startBtnRef}
              className="btn btn-primary btn-start"
              onClick={start}
              onPointerEnter={() => (heroHover.current = true)}
              onPointerLeave={() => (heroHover.current = false)}
              onFocus={() => (heroHover.current = true)}
              onBlur={() => (heroHover.current = false)}
            >
              ▶ Press start
            </button>
            <button className="btn" onClick={() => setModal('speedrun')}>
              Skip the game, show me the resume
            </button>
          </div>
          <p className="mt-10 hidden font-mono text-xs text-[var(--muted)] md:block">
            ↵ enter to start · or just scroll, same thing · ← → jump levels
          </p>
        </div>
        <p className="scroll-hint font-mono text-xs text-[var(--muted)] md:hidden">scroll to play ↓</p>
      </section>

      {/* ---------- the world map ---------- */}
      <div ref={mapRef} className="map">
        <svg className="road" width={path.w} height={path.h} viewBox={`0 0 ${path.w || 1} ${path.h || 1}`} aria-hidden>
          <path d={path.d} className="road-bed" />
          <path ref={pathRef} d={path.d} className="road-dash" />
          <path ref={trailRef} d={path.d} className="road-trail" />
        </svg>

        {ZONES.map((zone, zi) => (
          <section key={zone.name + zi} className={`zone zone-${zi}`}>
            {zone.nodes.map((node, ni) => {
              const i = NODES.indexOf(node);
              const side = i % 2 === 0 ? 'L' : 'R';
              return (
                <div key={node.id} className={`row row-${side} ${node.kind === 'side' ? 'row-side' : ''}`}>
                  <div className="row-marker">
                    <div
                      ref={(el) => {
                        markerRefs.current[i] = el;
                      }}
                      className={`marker marker-${node.kind} ${reached > i ? 'is-reached' : ''} ${
                        node.id === CURRENT_ID ? 'is-current' : ''
                      }`}
                    >
                      <span>{node.marker}</span>
                    </div>
                  </div>
                  <div className="row-card">
                    <div className="w-full max-w-[540px]">
                      {ni === 0 && zone.name && (
                        <div className="zone-banner">
                          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
                            World {zi + 1}
                          </span>
                          <h2 className="font-pixel text-2xl md:text-3xl">{zone.name}</h2>
                        </div>
                      )}
                      <QuestCard node={node} current={node.id === CURRENT_ID} revealed={reached > i} />
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        ))}

        <footer className="relative z-10 pb-16 pt-24 text-center font-mono text-xs text-[var(--muted)]">
          <p>thanks for playing · {PLAYER.name} · {new Date().getFullYear()}</p>
          <p className="mt-2 opacity-50">psst: ↑↑↓↓←→←→BA</p>
          <button className="mt-3 underline underline-offset-4 hover:text-[var(--text)]" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            ↺ play again
          </button>
        </footer>
      </div>

      {/* ---------- achievement toast ---------- */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.key}
            className="toast"
            role="status"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
          >
            <span className="toast-icon" aria-hidden>
              🏆
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--coin)]">
                {toast.label}
              </span>
              <span className="block text-sm font-semibold leading-snug">{toast.title}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- konami coin rain ---------- */}
      {rain > 0 && (
        <div key={rain} className="coin-rain" aria-hidden>
          {Array.from({ length: 36 }, (_, i) => (
            <span
              key={i}
              style={{
                left: `${(i * 37) % 100}%`,
                animationDelay: `${(i % 9) * 0.12}s`,
                animationDuration: `${1.6 + (i % 5) * 0.25}s`,
              }}
            >
              ◆
            </span>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modal && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              className="modal"
              initial={{ y: 30, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setModal(null)} aria-label="Close">
                esc ✕
              </button>
              {modal === 'inventory' ? <InventoryModal /> : <SpeedrunModal />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
