'use client';

import { useEffect, useState } from 'react';

/*
  Two aligned illustrations stacked on top of each other. The smile is a short
  crossfade + squash driven by `data-smile` on the parent .face-layer, and
  `--lean` (deg) tilts the head while walking. No pointer tracking.
*/
export default function Face({ onReady }: { onReady?: () => void }) {
  const [loaded, setLoaded] = useState<string[]>([]);

  useEffect(() => {
    if (loaded.length === 2) onReady?.();
  }, [loaded, onReady]);

  // images can finish loading before hydration attaches onLoad, so also check .complete
  const track = (el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth) done(el);
  };
  const done = (el: HTMLImageElement) =>
    setLoaded((l) => (l.includes(el.src) ? l : [...l, el.src]));

  return (
    <div className="face">
      <div className="face-bob">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="face-img face-neutral" src="/face/neutral.webp" alt="" draggable={false} ref={track} onLoad={(e) => done(e.currentTarget)} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="face-img face-smile" src="/face/smile.webp" alt="" draggable={false} ref={track} onLoad={(e) => done(e.currentTarget)} />
      </div>
    </div>
  );
}
