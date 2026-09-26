// Tiny 8-bit synth on WebAudio — no audio files. Audio only starts after a user
// gesture (browser rule), so `unlock()` is called on the first click/keypress.

let ctx: AudioContext | null = null;
let muted = false;
const listeners = new Set<(m: boolean) => void>();

try {
  muted = localStorage.getItem('sfx-muted') === '1';
} catch {}

export function unlock() {
  if (typeof window === 'undefined') return;
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
}

export const isMuted = () => muted;

export function setMuted(m: boolean) {
  muted = m;
  try {
    localStorage.setItem('sfx-muted', m ? '1' : '0');
  } catch {}
  listeners.forEach((fn) => fn(m));
}

export function onMuteChange(fn: (m: boolean) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function tone(freq: number, at: number, dur: number, type: OscillatorType = 'square', vol = 0.045) {
  if (!ctx) return;
  const t = ctx.currentTime + at;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(vol, t + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

const ready = () => !muted && ctx !== null && ctx.state === 'running';

export const sfx = {
  coin() {
    if (!ready()) return;
    tone(988, 0, 0.08);
    tone(1319, 0.075, 0.28);
  },
  start() {
    if (!ready()) return;
    [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.07, 0.12));
    tone(1568, 0.3, 0.35, 'triangle', 0.06);
  },
  powerup() {
    if (!ready()) return;
    [392, 494, 587, 784, 988, 1175, 1568].forEach((f, i) => tone(f, i * 0.05, 0.09));
  },
  blip() {
    if (!ready()) return;
    tone(660, 0, 0.05, 'square', 0.03);
  },
};
