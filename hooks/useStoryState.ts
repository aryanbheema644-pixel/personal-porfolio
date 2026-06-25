import { useEffect, useState, useRef, useCallback } from 'react';
import { SCENES } from '@/data/scenes';

export interface StoryState {
  currentSceneIndex: number;
  isPaused: boolean;
  isSubCardOpen: boolean;
  progress: number;
  totalScenes: number;
  next: () => void;
  prev: () => void;
  togglePause: () => void;
  openSubCard: () => void;
  closeSubCard: () => void;
  jumpTo: (index: number) => void;
}

export function useStoryState(enabled: boolean = true): StoryState {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSubCardOpen, setIsSubCardOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const accumulatedRef = useRef<number>(0);
  // Guards against advancing the same scene more than once if a stale tick fires.
  const advancedFromRef = useRef<number>(-1);

  const currentScene = SCENES[currentSceneIndex];

  // Reset progress and timers when scene changes
  useEffect(() => {
    setProgress(0);
    startTimeRef.current = Date.now();
    accumulatedRef.current = 0;
  }, [currentSceneIndex]);

  // Start the clock fresh once the viewer begins (gates the intro until then).
  useEffect(() => {
    if (enabled) {
      setProgress(0);
      startTimeRef.current = Date.now();
      accumulatedRef.current = 0;
    }
  }, [enabled]);

  // Tick progress every 50ms; advance exactly once when the scene completes.
  useEffect(() => {
    if (!enabled || isPaused || isSubCardOpen) return;
    const id = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current + accumulatedRef.current;
      const newProgress = Math.min(elapsed / currentScene.durationMs, 1);
      setProgress(newProgress);
      if (newProgress >= 1) {
        clearInterval(id); // stop ticking immediately so we can't re-advance
        if (currentSceneIndex < SCENES.length - 1 && advancedFromRef.current !== currentSceneIndex) {
          advancedFromRef.current = currentSceneIndex;
          setCurrentSceneIndex((i) => (i < SCENES.length - 1 ? i + 1 : i));
        }
      }
    }, 50);
    return () => clearInterval(id);
  }, [enabled, isPaused, isSubCardOpen, currentSceneIndex, currentScene.durationMs]);

  // When pausing, accumulate elapsed time so resume picks up where we left off
  const togglePause = useCallback(() => {
    setIsPaused((prev) => {
      if (!prev) {
        // Pausing now: accumulate elapsed
        accumulatedRef.current += Date.now() - startTimeRef.current;
      } else {
        // Resuming now: reset start time
        startTimeRef.current = Date.now();
      }
      return !prev;
    });
  }, []);

  const next = useCallback(() => {
    setCurrentSceneIndex((i) => (i < SCENES.length - 1 ? i + 1 : i));
  }, []);

  const prev = useCallback(() => {
    setCurrentSceneIndex((i) => (i > 0 ? i - 1 : i));
  }, []);

  const jumpTo = useCallback((index: number) => {
    if (index >= 0 && index < SCENES.length) setCurrentSceneIndex(index);
  }, []);

  const openSubCard = useCallback(() => setIsSubCardOpen(true), []);
  const closeSubCard = useCallback(() => setIsSubCardOpen(false), []);

  return {
    currentSceneIndex,
    isPaused,
    isSubCardOpen,
    progress,
    totalScenes: SCENES.length,
    next,
    prev,
    togglePause,
    openSubCard,
    closeSubCard,
    jumpTo,
  };
}
