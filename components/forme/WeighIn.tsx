"use client";

/* Cinematic weigh-in beat — full-bleed locker-room scale footage that plays
   as it scrolls into view, closing out the transformation. Continues the
   scroll after the 12-level Journey. */

import { useEffect, useRef, useState } from "react";

export function WeighIn() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    const vid = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          vid?.play().catch(() => {});
        } else {
          vid?.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="forme-hero relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src="/scale-scene.mp4"
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* cinematic grading */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 40%, transparent 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-end px-6 pb-24 text-center sm:pb-28">
        <p
          className="label"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(18px)",
            transition:
              "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          The proof
        </p>
        <h2
          className="display mt-4 text-5xl text-[color:var(--color-forme-bone)] sm:text-7xl"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(22px)",
            transition:
              "opacity 1.3s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 1.3s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          Down 38 kilos.
        </h2>
      </div>
    </section>
  );
}
