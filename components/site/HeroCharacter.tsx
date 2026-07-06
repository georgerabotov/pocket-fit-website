"use client";

/* The "guy pushes the phone in" intro clip. Plays once on load, and replays on
   hover (desktop) or tap (mobile). */

import { useRef } from "react";

export function HeroCharacter() {
  const ref = useRef<HTMLVideoElement>(null);
  const replay = () => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };
  return (
    <button
      type="button"
      aria-label="Replay intro animation"
      onMouseEnter={replay}
      onClick={replay}
      className="absolute bottom-0 left-0 z-0 block cursor-pointer select-none"
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={ref}
        src="/hero-character.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden
        className="h-[150px] w-auto select-none sm:h-[210px] lg:h-[320px] xl:h-[400px]"
      />
    </button>
  );
}
