"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 84;
const framePath = (i: number) =>
  `/head/head_${String(i).padStart(3, "0")}.jpg`;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/**
 * The character's head follows the cursor. Frames run monotonically from
 * full-left (index 0) to full-right (last), so the pointer's normalized X
 * position maps straight onto a frame. The index is eased toward its target
 * each tick for a natural turn, with a gentle idle sway before any pointer
 * input (and on touch devices).
 */
export function HeadTrack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const images: HTMLImageElement[] = [];
    let drawn = -1;

    const center = (FRAME_COUNT - 1) / 2;
    let current = center; // eased frame index
    let target = center; // desired frame index
    let interacted = false;

    const paint = (frame: number) => {
      const idx = clamp(Math.round(frame), 0, FRAME_COUNT - 1);
      if (idx === drawn) return;
      const img = images[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      drawn = idx;
      const cw = canvas.width;
      const ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      // cover, bottom-anchored (crop from the top)
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
      drawn = -1;
      paint(current);
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i + 1);
      if (i === Math.round(center)) img.onload = () => paint(current);
      images[i] = img;
    }

    const onPointer = (e: PointerEvent) => {
      const xnorm = clamp(e.clientX / window.innerWidth, 0, 1);
      target = xnorm * (FRAME_COUNT - 1);
      // stop the idle sway once the user takes over (hint stays visible)
      interacted = true;
    };

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let rafId = 0;
    const loop = (t: number) => {
      if (!interacted && !reduce) {
        // gentle idle sway so the character feels alive before interaction
        target = center + Math.sin(t / 900) * (FRAME_COUNT * 0.16);
      }
      current += (target - current) * (reduce ? 1 : 0.12);
      paint(current);
      rafId = requestAnimationFrame(loop);
    };

    resize();
    rafId = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="forme-hero relative h-screen w-full overflow-hidden bg-black"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Legibility scrim for the caption */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(15,12,8,0.72)_0%,rgba(15,12,8,0.12)_38%,transparent_60%)]"
      />

      {/* Caption */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-16 text-center sm:px-12">
        <p className="label mb-5">Surrounded by machines</p>
        <h2 className="display text-[clamp(2.4rem,6.5vw,5.5rem)]">
          Wait… what do I do now?
        </h2>
        <div
          ref={hintRef}
          className="mt-8 flex items-center justify-center gap-4 transition-opacity duration-700"
          style={{ opacity: 1 }}
        >
          <span className="hint-arrow-l text-xl leading-none">←</span>
          <span className="label">Move left &amp; right to look around</span>
          <span className="hint-arrow-r text-xl leading-none">→</span>
        </div>
      </div>
    </section>
  );
}
