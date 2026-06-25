import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

export function useTypewriterAudio(active: boolean, src: string) {
  const howlRef = useRef<Howl | null>(null);

  useEffect(() => {
    howlRef.current = new Howl({
      src: [src],
      loop: true,
      volume: 0.35,
    });
    return () => {
      howlRef.current?.unload();
    };
  }, [src]);

  useEffect(() => {
    const howl = howlRef.current;
    if (!howl) return;
    if (active) {
      // Browsers block autoplay until a user gesture; play() may be deferred,
      // but Howler queues it and starts once unlocked.
      howl.play();
    } else {
      howl.fade(0.35, 0, 600);
      const id = setTimeout(() => howl.stop(), 700);
      return () => clearTimeout(id);
    }
  }, [active]);
}
