"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Lenis from "lenis";

const FRAME_COUNT = 183;
const framePath = (i: number) =>
  `/frames/frame_${String(i).padStart(3, "0")}.jpg`;

// The woman's parting lines — shown one at a time as the two meet. Each entry
// is [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd] in scroll progress, so
// one balloon fully disappears before the next appears.
const HER_LINES: { text: string; win: [number, number, number, number] }[] = [
  { text: "We're done here.", win: [0.55, 0.585, 0.63, 0.66] },
  { text: "I train, you game, we're so done!", win: [0.67, 0.7, 0.75, 0.78] },
  { text: "Good luck with the controller.", win: [0.79, 0.82, 0.88, 0.91] },
];

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

export function ScrollScrub() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const images: HTMLImageElement[] = [];
    let currentFrame = -1;

    const draw = (frame: number, force = false) => {
      if (frame === currentFrame && !force) return;
      const img = images[frame];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      currentFrame = frame;
      const cw = canvas.width;
      const ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      // object-fit: cover, bottom-anchored - full-bleed with no seam. Any
      // vertical overflow is cropped from the TOP (sky), so the subjects at
      // the bottom of the frame are always kept in view. Horizontal overflow
      // stays centered.
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw: number;
      let dh: number;
      if (ir > cr) {
        dh = ch;
        dw = ch * ir;
      } else {
        dw = cw;
        dh = cw / ir;
      }
      ctx.drawImage(img, (cw - dw) / 2, ch - dh, dw, dh);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      draw(currentFrame < 0 ? 0 : currentFrame, true);
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i + 1);
      if (i === 0) img.onload = () => draw(0, true);
      images[i] = img;
    }

    const update = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      // Skip all draw/choreography work while the section is off-screen.
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;

      draw(Math.round(p * (FRAME_COUNT - 1)));

      const intro = introRef.current;
      const cue = cueRef.current;
      const bar = barRef.current;
      if (intro) {
        const out = smoothstep(0.02, 0.18, p);
        intro.style.opacity = String(1 - out);
        intro.style.transform = `translateY(${-40 * out}px)`;
      }
      if (cue) cue.style.opacity = String(1 - smoothstep(0, 0.06, p));
      if (bar) bar.style.transform = `scaleX(${p})`;

      // the woman's parting lines at the face-to-face beat, one at a time
      lineRefs.current.forEach((el, i) => {
        if (!el) return;
        const w = HER_LINES[i].win;
        const s =
          smoothstep(w[0], w[1], p) * (1 - smoothstep(w[2], w[3], p));
        el.style.opacity = String(s);
        // translate(-50%) centres the balloon over the girl's head
        el.style.transform = `translate(-50%, ${14 * (1 - s)}px)`;
      });
    };

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let lenis: Lenis | undefined;
    if (!reduce) lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

    let rafId = 0;
    const loop = (time: number) => {
      lenis?.raf(time);
      update();
      rafId = requestAnimationFrame(loop);
    };

    resize();
    rafId = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[760vh]">
      <div className="forme-hero sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Full-bleed cinematic scrub */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
        />

        {/* Legibility scrim - darkens top/bottom for the overlaid text, and
            eases the final frame into the bone editorial section below. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,12,8,0.45)_0%,rgba(15,12,8,0.05)_24%,rgba(15,12,8,0.05)_62%,rgba(15,12,8,0.6)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_46%,rgba(15,12,8,0.35)_0%,transparent_70%)]"
        />

        <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 pt-7 sm:px-12">
          <Link href="/" className="display text-2xl tracking-tight">Pocket Fit</Link>
          <Link
            href="/"
            className="body-sans rounded-full border border-forme-bone/50 bg-white/10 px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.22em] text-forme-bone backdrop-blur-sm transition-colors hover:bg-forme-bone hover:text-forme-ink"
          >
            About our app
          </Link>
        </div>

        <div
          ref={introRef}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="label mb-7">Day one</p>
          <h1 className="display text-[clamp(2.6rem,7vw,6.5rem)]">
            Are you ready to
            <br />
            <em className="text-forme-gold">start your workout?</em>
          </h1>
          <div className="mt-9 h-px w-24 bg-forme-bone/50" />
        </div>

        {/* The woman's parting lines — shown one at a time on her side (right).
            The guy says nothing. */}
        {HER_LINES.map((l, i) => (
          <div
            key={i}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            className="pointer-events-none absolute left-[55%] top-[35%] z-20 w-[min(74vw,17rem)] opacity-0 sm:left-[56%]"
          >
            <div className="relative rounded-[1.7rem] bg-white px-6 py-5 text-center shadow-[0_30px_70px_-15px_rgba(0,0,0,0.65)] ring-1 ring-black/10">
              <p className="body-sans text-lg font-bold leading-snug text-[#1c1a16] sm:text-xl">
                {l.text}
              </p>
              {/* tail points straight down to the girl's head */}
              <span className="absolute -bottom-2 left-1/2 size-5 -translate-x-1/2 rotate-45 bg-white" />
            </div>
          </div>
        ))}

        <div
          ref={cueRef}
          className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-3"
        >
          <span className="label">Scroll</span>
          <span className="block h-10 w-px animate-pulse bg-forme-bone/60" />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 h-px bg-forme-bone/30">
          <div ref={barRef} className="h-full origin-left scale-x-0 bg-forme-gold" />
        </div>
      </div>
    </section>
  );
}
