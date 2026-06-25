'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Howl, Howler } from 'howler';
import { useStoryState } from '@/hooks/useStoryState';
import { useResponsive } from '@/hooks/useResponsive';
import { SCENES } from '@/data/scenes';
import type { SceneProps } from './scenes/types';
import ProgressBars from './ProgressBars';
import HintOverlay from './HintOverlay';
import TLDRButton from './TLDRButton';
import SubCard from './SubCard';

import Scene01Doge from './scenes/Scene01Doge';
import Scene02Gru from './scenes/Scene02Gru';
import Scene03Squidward from './scenes/Scene03Squidward';
import Scene04Drake from './scenes/Scene04Drake';
import Scene05RollSafe from './scenes/Scene05RollSafe';
import Scene06WomanYellingCat from './scenes/Scene06WomanYellingCat';
import Scene07GalaxyBrain from './scenes/Scene07GalaxyBrain';
import Scene08DisasterGirl from './scenes/Scene08DisasterGirl';
import Scene09BatmanSlap from './scenes/Scene09BatmanSlap';
import Scene10SurprisedPikachu from './scenes/Scene10SurprisedPikachu';
import Scene11DistractedBoyfriend from './scenes/Scene11DistractedBoyfriend';
import Scene12TwoButtons from './scenes/Scene12TwoButtons';
import Scene13HideThePainHarold from './scenes/Scene13HideThePainHarold';
import Scene14Bernie from './scenes/Scene14Bernie';

const SCENE_COMPONENTS: React.ComponentType<SceneProps>[] = [
  Scene01Doge,
  Scene02Gru,
  Scene03Squidward,
  Scene04Drake,
  Scene05RollSafe,
  Scene06WomanYellingCat,
  Scene07GalaxyBrain,
  Scene08DisasterGirl,
  Scene09BatmanSlap,
  Scene10SurprisedPikachu,
  Scene11DistractedBoyfriend,
  Scene12TwoButtons,
  Scene13HideThePainHarold,
  Scene14Bernie,
];

const HOLD_MS = 180;

export default function StoryPlayer() {
  // The story (and its timer) stays gated until the viewer taps "begin" — that
  // first gesture is also what unlocks audio so the typewriter cue can play.
  const [started, setStarted] = useState(false);
  const state = useStoryState(started);
  const { isMobile } = useResponsive();
  const currentScene = SCENES[state.currentSceneIndex];
  const SceneComponent = SCENE_COMPONENTS[state.currentSceneIndex];

  // Tracks an active pointer press for tap-vs-hold disambiguation.
  const pressRef = useRef<{ goPrev: boolean; holding: boolean; timer: ReturnType<typeof setTimeout> } | null>(null);
  const unlockRef = useRef<Howl | null>(null);

  const begin = () => {
    // Unlock the Web Audio context inside this user gesture so Scene 1's
    // typewriter loop is allowed to play.
    try {
      if (!unlockRef.current) {
        unlockRef.current = new Howl({ src: ['/audio/01-typewriter.mp3'], volume: 0 });
      }
      unlockRef.current.play();
      if (Howler.ctx && Howler.ctx.state !== 'running') Howler.ctx.resume();
    } catch {
      /* audio is best-effort; never block the story */
    }
    setStarted(true);
  };

  // Keyboard handlers (desktop / presentation mode)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!started) {
        if (e.key !== 'Tab') begin();
        return;
      }
      if (e.key === 'ArrowRight') state.next();
      if (e.key === 'ArrowLeft') state.prev();
      if (e.key === ' ') {
        e.preventDefault();
        state.togglePause();
      }
      if (e.key === 'Escape' && state.isSubCardOpen) state.closeSubCard();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [state, started]);

  // Tap = navigate (left third → prev, else → next). Press-and-hold = pause
  // while held. Taps that land on a link/button are left to that element.
  const handlePointerDown = (e: React.PointerEvent) => {
    if (state.isSubCardOpen) return;
    if ((e.target as HTMLElement).closest('a, button')) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const goPrev = relX < rect.width / 3;
    const timer = setTimeout(() => {
      if (pressRef.current) {
        pressRef.current.holding = true;
        state.togglePause();
      }
    }, HOLD_MS);
    pressRef.current = { goPrev, holding: false, timer };
  };

  const handlePointerUp = () => {
    const press = pressRef.current;
    if (!press) return;
    clearTimeout(press.timer);
    pressRef.current = null;
    if (press.holding) {
      state.togglePause(); // resume after a hold
      return;
    }
    if (press.goPrev) state.prev();
    else state.next();
  };

  const handlePointerLeave = () => {
    const press = pressRef.current;
    if (!press) return;
    clearTimeout(press.timer);
    pressRef.current = null;
    if (press.holding) state.togglePause(); // resume if we leave mid-hold
  };

  // —— Start gate: holds the story until a gesture unlocks audio ——
  if (!started) {
    return (
      <div
        onClick={begin}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black text-white cursor-pointer select-none"
      >
        <p className="font-terminal text-2xl md:text-3xl text-white/90 tracking-wide">
          &gt; aryan_bheema.portfolio<span className="animate-pulse">▊</span>
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            begin();
          }}
          className="font-terminal text-lg md:text-xl text-black bg-white rounded-full px-6 py-2 hover:bg-white/90 transition"
        >
          {isMobile ? 'tap to begin ▶' : 'press any key to begin ▶'}
        </button>
        <p className="font-terminal text-sm text-white/45">🔊 sound on — best with audio</p>
      </div>
    );
  }

  // The 9:16 stage — identical content on both platforms, only the frame differs.
  const card = (
    <div
      className={`relative select-none touch-none ${
        isMobile
          ? 'w-full h-full'
          : 'h-[min(88vh,840px)] aspect-[9/16] rounded-[28px] overflow-hidden ring-1 ring-white/15 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.75)]'
      }`}
      style={{ background: currentScene.background }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      <ProgressBars
        total={state.totalScenes}
        current={state.currentSceneIndex}
        progress={state.progress}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentSceneIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <SceneComponent
            scene={currentScene}
            isActive={!state.isPaused && !state.isSubCardOpen}
            onOpenSubCard={state.openSubCard}
          />
        </motion.div>
      </AnimatePresence>

      {state.currentSceneIndex >= 2 && state.currentSceneIndex < state.totalScenes - 1 && <TLDRButton />}

      <AnimatePresence>
        {state.isSubCardOpen && currentScene.subCard && (
          <SubCard data={currentScene.subCard} onClose={state.closeSubCard} />
        )}
      </AnimatePresence>

      {isMobile && <HintOverlay isMobile />}
    </div>
  );

  // —— Mobile: full-bleed Instagram-story ——
  if (isMobile) {
    return (
      <div
        className="relative w-screen h-dvh overflow-hidden"
        style={{ background: currentScene.background }}
      >
        {card}
      </div>
    );
  }

  // —— Desktop: centered 9:16 stage framed like a presentation deck ——
  const isFirst = state.currentSceneIndex === 0;
  const isLast = state.currentSceneIndex === state.totalScenes - 1;

  const arrow = (dir: 'prev' | 'next', disabled: boolean, onClick: () => void) => (
    <button
      type="button"
      aria-label={dir === 'prev' ? 'Previous scene' : 'Next scene'}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="grid place-items-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 ring-1 ring-white/15 text-white/80 hover:text-white backdrop-blur-md transition disabled:opacity-20 disabled:pointer-events-none"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {dir === 'prev' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-black">
      {/* Ambient backdrop, tinted to the current scene */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{ backgroundColor: currentScene.background }}
      />
      <AnimatePresence>
        <motion.div
          key={currentScene.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image src={currentScene.memeImage} alt="" fill className="object-cover blur-3xl scale-125" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/30" />
      {/* stage spotlight — keeps the card in a pool of light on any scene */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(closest-side at 50% 50%, rgba(255,255,255,0.10), transparent 78%)' }}
      />
      {/* edge vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.6) 100%)' }}
      />

      {/* Deck: arrows flank the stage, meta sits below */}
      <div className="relative z-10 flex flex-col items-center gap-5">
        <div className="flex items-center gap-5 md:gap-7">
          {arrow('prev', isFirst, state.prev)}
          {card}
          {arrow('next', isLast, state.next)}
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="text-[11px] uppercase tracking-[0.25em] text-white/60 tabular-nums">
            {String(state.currentSceneIndex + 1).padStart(2, '0')} / {state.totalScenes}
          </div>
          <div className="text-[11px] tracking-wide text-white/35">
            ← → navigate · space pause · click advances
          </div>
        </div>
      </div>
    </div>
  );
}
