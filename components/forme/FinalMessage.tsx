"use client";

/* Closing message — the portrait video (1.5x, no audio) is pinned and stays
   perfectly still on the right, while the inspiring quotes cross-fade one by
   one on the left as you scroll. The final beat of the Our Story scroll. */

import { useEffect, useRef, useState } from "react";

const QUOTES: { t: string; sig?: string }[] = [
  {
    t: "I wish this will inspire a lot of people, and I hope that everyone starts believing in themselves and that everything is possible.",
  },
  { t: "If I have done it, then everyone can. This is why I built Pocket Fit." },
  {
    t: "It's all about discipline, rather than motivation. We go through our ups and downs in life, but we should never give up.",
  },
  { t: "When you're tolerating something, you're admitting you deserve it." },
  { t: "Thank you for following my story.", sig: "Georgi" },
];
const N = QUOTES.length;

export function FinalMessage() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const sec = sectionRef.current;
      if (!sec) return;
      const vh = window.innerHeight;
      const r = sec.getBoundingClientRect();
      const total = r.height - vh;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      const idx = Math.min(N - 1, Math.floor(p * N));
      setActive((a) => (a === idx ? a : idx));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // only play while in view
  useEffect(() => {
    const el = sectionRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          v.currentTime = 0; // always start from the beginning
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.02 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${N * 92}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* scroll cue — keep going to read the rest */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-7 z-10 flex justify-center transition-opacity duration-700"
          style={{ opacity: active < N - 1 ? 0.8 : 0 }}
        >
          <div className="flex flex-col items-center gap-1.5">
            <span
              className="text-[0.62rem] uppercase tracking-[0.32em]"
              style={{ color: "var(--color-forme-stone)" }}
            >
              Scroll
            </span>
            <svg
              viewBox="0 0 24 24"
              className="size-4 animate-bounce"
              style={{ color: "var(--color-forme-stone)" }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        <div className="mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-6 px-6 lg:grid-cols-2 lg:gap-16">
          {/* left — quotes cross-fade in place */}
          <div className="relative order-2 h-[42vh] lg:order-1 lg:h-[72vh]">
            {QUOTES.map((q, i) => {
              const on = active === i;
              return (
                <div
                  key={i}
                  className="absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    opacity: on ? 1 : 0,
                    transform: on
                      ? "none"
                      : `translateY(${i < active ? -26 : 26}px)`,
                    pointerEvents: on ? "auto" : "none",
                  }}
                >
                  <p className="font-[family-name:var(--font-cormorant)] text-3xl italic leading-[1.28] tracking-tight sm:text-4xl md:text-[2.7rem]">
                    {q.t}
                  </p>
                  {q.sig ? (
                    <p className="mt-6 font-[family-name:var(--font-cormorant)] text-2xl not-italic text-[color:var(--color-forme-stone)]">
                      - {q.sig}
                    </p>
                  ) : null}
                </div>
              );
            })}

            {/* progress ticks */}
            <div className="absolute -bottom-2 left-0 flex gap-2 lg:bottom-0">
              {QUOTES.map((_, i) => (
                <span
                  key={i}
                  className="h-[3px] w-7 rounded-full transition-colors duration-500"
                  style={{
                    background:
                      i <= active
                        ? "var(--color-forme-ink)"
                        : "rgba(30,26,20,0.14)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* right — pinned, static video (1.5x baked in, muted) */}
          <div className="order-1 flex items-center justify-center lg:order-2">
            <div className="overflow-hidden rounded-[1.6rem] shadow-[0_55px_95px_-30px_rgba(30,26,20,0.6)]">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                ref={videoRef}
                src="/georgi-message.mp4"
                muted
                loop
                playsInline
                preload="auto"
                className="block max-h-[44vh] w-auto lg:max-h-[80vh]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
