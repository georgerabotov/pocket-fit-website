"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 121;
const framePath = (i: number) =>
  `/dress/dress_${String(i).padStart(3, "0")}.jpg`;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

/**
 * Closing scroll-driven scrub: the camera follows the character across the
 * gym to the "Men" locker-room door. Same full-bleed treatment as the hero.
 */
export function DressingRoom() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const capRef = useRef<HTMLDivElement>(null);

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
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
      draw(Math.round(p * (FRAME_COUNT - 1)));

      const cap = capRef.current;
      if (cap) {
        const inn = smoothstep(0.72, 0.94, p);
        cap.style.opacity = String(inn);
        cap.style.transform = `translateY(${20 * (1 - inn)}px)`;
      }
    };

    let rafId = 0;
    const loop = () => {
      update();
      rafId = requestAnimationFrame(loop);
    };

    resize();
    rafId = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[400vh]">
      <div className="forme-hero sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Legibility scrim */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(15,12,8,0.7)_0%,rgba(15,12,8,0.1)_36%,transparent_60%)]"
        />

        {/* Closing caption — fades in at the door */}
        <div
          ref={capRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-16 text-center opacity-0 sm:px-12"
        >
          <p className="label mb-5">Workout complete</p>
          <h2 className="display text-[clamp(2.6rem,7vw,6rem)]">Earned it.</h2>
        </div>
      </div>
    </section>
  );
}
