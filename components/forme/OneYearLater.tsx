"use client";

/* "One year later" title-card interlude — a small scroll beat that leads into
   the transformation finale. The handmade sign reveals + parallaxes as it
   scrolls into view. */

import { useEffect, useRef, useState } from "react";

export function OneYearLater() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // gentle scroll parallax on the photo
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      const ph = photoRef.current;
      if (!el || !ph) return;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight / 2 - (r.top + r.height / 2)) / window.innerHeight;
      ph.style.transform = `translateY(${(-p * 42).toFixed(1)}px) rotate(-1.6deg)`;
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
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 py-28 text-center"
    >
      <p
        className="label mb-9"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "none" : "translateY(16px)",
          transition:
            "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        Chapter two
      </p>

      <div
        ref={photoRef}
        className="w-full max-w-[640px] overflow-hidden rounded-[1.25rem] border-[10px] border-white bg-white shadow-[0_50px_90px_-32px_rgba(30,26,20,0.55)] will-change-transform"
        style={{
          opacity: shown ? 1 : 0,
          scale: shown ? "1" : "0.94",
          transition:
            "opacity 1.2s cubic-bezier(0.16,1,0.3,1), scale 1.2s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/one-year-later.jpg"
          alt="One year later"
          className="block aspect-[4/3] w-full select-none object-cover"
          draggable={false}
        />
      </div>

      <p
        className="mt-10 max-w-md font-[family-name:var(--font-cormorant)] text-2xl italic"
        style={{
          color: "var(--color-forme-stone)",
          opacity: shown ? 1 : 0,
          transform: shown ? "none" : "translateY(16px)",
          transition:
            "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 1.2s cubic-bezier(0.16,1,0.3,1) 0.15s",
        }}
      >
        The story continues.
      </p>
    </section>
  );
}
