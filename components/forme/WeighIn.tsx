"use client";

/* Weigh-in beat — the locker-room scale scene, scroll-scrubbed frame by frame
   (not an autoplaying video), with the "Down 38 kilos" line revealing as you
   scroll. Continues the scroll after the 12-level Journey. */

import { useEffect, useRef } from "react";

const FRAME_COUNT = 81;
const framePath = (i: number) =>
  `/scale/scale_${String(i).padStart(3, "0")}.jpg`;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

export function WeighIn() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const images: HTMLImageElement[] = [];
    let current = -1;

    const draw = (frame: number, force = false) => {
      if (frame === current && !force) return;
      const img = images[frame];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      current = frame;
      const cw = canvas.width;
      const ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      // cover, vertically centered (matches the previous video's object-cover)
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
      draw(current < 0 ? 0 : current, true);
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
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;

      // scrub the scene over the first 90% of scroll, then hold the last frame
      draw(Math.round(clamp(p / 0.9, 0, 1) * (FRAME_COUNT - 1)));

      const t = textRef.current;
      if (t) {
        const v = smoothstep(0.34, 0.54, p) * (1 - smoothstep(0.93, 1, p));
        t.style.opacity = String(v);
        t.style.transform = `translateY(${18 * (1 - v)}px)`;
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
    <section ref={sectionRef} className="relative h-[320vh]">
      <div className="forme-hero sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* cinematic grading */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/5 to-black/80"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 40%, transparent 45%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* revealing caption */}
        <div
          ref={textRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-24 text-center opacity-0 sm:pb-28"
        >
          <p className="label">The proof</p>
          <h2 className="display mt-4 text-5xl text-[color:var(--color-forme-bone)] sm:text-7xl">
            Down 38 kilos.
          </h2>
        </div>
      </div>
    </section>
  );
}
