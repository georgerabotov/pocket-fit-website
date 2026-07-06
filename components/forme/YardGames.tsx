"use client";

/* Real-world epilogue — the Yard Games photos are stacked on top of each other
   and, as you scroll, the top one flies up and off the screen to reveal the
   next. A pinned, scroll-driven card deck. */

import { useEffect, useRef } from "react";

const PHOTOS = [
  "/yard/yard-1.jpg",
  "/yard/yard-2.jpg",
  "/yard/yard-3.jpg",
  "/yard/yard-4.jpg",
];
const N = PHOTOS.length;

export function YardGames() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);

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
      const seg = p * N; // 0..N — how many cards have started flying

      cards.current.forEach((c, i) => {
        if (!c) return;
        const s = Math.min(1, Math.max(0, seg - i)); // this card's fly progress
        const e = s * s * (3 - 2 * s); // smoothstep — tied to scroll
        const ty = -e * 100; // vh — fly up and just off the top
        const rot = -e * 5;
        const op = s >= 1 ? 0 : s > 0.88 ? (1 - s) / 0.12 : 1;
        c.style.transform = `translate(-50%,-50%) translateY(${ty}vh) rotate(${rot}deg)`;
        c.style.opacity = String(op);
      });

      // fade the heading out once the last photo has left, so the section
      // flows cleanly into the next one instead of sitting on an empty screen
      if (labelRef.current) {
        labelRef.current.style.opacity = String(
          Math.max(0, Math.min(1, 1 - (p - 0.82) / 0.13)),
        );
      }
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

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${(N + 0.35) * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* persistent label */}
        <div
          ref={labelRef}
          className="pointer-events-none absolute inset-x-0 top-[7vh] z-0 text-center"
        >
          <p className="label">The Yard Games</p>
          <h2 className="display mt-3 text-3xl sm:text-5xl">Where the work led.</h2>
        </div>

        {/* stacked deck */}
        {PHOTOS.map((src, i) => (
          <div
            key={src}
            ref={(el) => {
              cards.current[i] = el;
            }}
            className="absolute left-1/2 top-1/2 will-change-transform"
            style={{ transform: "translate(-50%,-50%)", zIndex: N - i + 1 }}
          >
            <div className="overflow-hidden rounded-[1rem] border-[9px] border-white bg-white shadow-[0_50px_90px_-28px_rgba(30,26,20,0.6)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="The Yard Games"
                draggable={false}
                className="block max-h-[62vh] w-auto max-w-[86vw] select-none"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
