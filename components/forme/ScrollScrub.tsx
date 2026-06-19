"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Lenis from "lenis";

const FRAME_COUNT = 121;
const framePath = (i: number) =>
  `/frames/frame_${String(i).padStart(3, "0")}.jpg`;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

export function ScrollScrub() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

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
      // object-fit: cover — full-bleed so the studio backdrop fills the
      // viewport uniformly and leaves no visible frame seam.
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
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
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
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;

      draw(Math.round(p * (FRAME_COUNT - 1)));

      const intro = introRef.current;
      const outro = outroRef.current;
      const cue = cueRef.current;
      const bar = barRef.current;
      if (intro) {
        const out = smoothstep(0.02, 0.18, p);
        intro.style.opacity = String(1 - out);
        intro.style.transform = `translateY(${-40 * out}px)`;
      }
      if (cue) cue.style.opacity = String(1 - smoothstep(0, 0.06, p));
      if (outro) {
        const inn = smoothstep(0.72, 0.92, p);
        outro.style.opacity = String(inn);
        outro.style.transform = `translateY(${24 * (1 - inn)}px)`;
      }
      if (bar) bar.style.transform = `scaleX(${p})`;
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
    <section ref={sectionRef} className="relative h-[360vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ mixBlendMode: "multiply" }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-forme-bone)_0%,transparent_18%,transparent_82%,var(--color-forme-bone-deep)_100%)]"
        />

        <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 pt-7 sm:px-12">
          <Link href="/" className="display text-2xl tracking-tight">
            FORME
          </Link>
          <Link
            href="/app"
            className="body-sans rounded-full border border-forme-ink/40 bg-forme-bone/40 px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.22em] text-forme-ink backdrop-blur-sm transition-colors hover:bg-forme-ink hover:text-forme-bone"
          >
            About our app
          </Link>
        </div>

        <div
          ref={introRef}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="label mb-7">Deficit Deadlift</p>
          <h1 className="display text-[clamp(2.6rem,7vw,6.5rem)]">
            Are you ready to
            <br />
            <em className="text-forme-gold">start your workout?</em>
          </h1>
          <div className="mt-9 h-px w-24 bg-forme-line" />
        </div>

        <div
          ref={outroRef}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center opacity-0"
        >
          <p className="label mb-6">Every rep, considered</p>
          <h2 className="display text-[clamp(3rem,9vw,8rem)]">Begin.</h2>
        </div>

        <div
          ref={cueRef}
          className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-3"
        >
          <span className="label">Scroll</span>
          <span className="block h-10 w-px animate-pulse bg-forme-stone/60" />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 h-px bg-forme-line/60">
          <div ref={barRef} className="h-full origin-left scale-x-0 bg-forme-gold" />
        </div>
      </div>
    </section>
  );
}
