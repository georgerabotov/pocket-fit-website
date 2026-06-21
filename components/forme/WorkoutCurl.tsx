"use client";

import { useEffect, useRef } from "react";

const RIGHT_COUNT = 34; // his right arm (image-left): rest -> curled
const LEFT_COUNT = 17; // his left arm (image-right): rest -> curled
const rightPath = (i: number) =>
  `/curl/right_${String(i).padStart(3, "0")}.jpg`;
const leftPath = (i: number) => `/curl/left_${String(i).padStart(3, "0")}.jpg`;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/**
 * Interactive bicep-curl. Cursor X selects the arm (left half of the screen =
 * his right hand, right half = his left hand); moving the cursor up drives that
 * arm's curl. Each arm has its own eased "amount"; we draw whichever arm is
 * more raised, so the two sequences cross-fade through their shared rest pose
 * and there's no pop when switching sides.
 */
export function WorkoutCurl() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const right: HTMLImageElement[] = [];
    const left: HTMLImageElement[] = [];

    let amountR = 0;
    let amountL = 0;
    let targetR = 0;
    let targetL = 0;
    let lastKey = "";

    const load = (arr: HTMLImageElement[], count: number, path: (i: number) => string, onFirst?: () => void) => {
      for (let i = 0; i < count; i++) {
        const img = new Image();
        img.src = path(i + 1);
        if (i === 0 && onFirst) img.onload = onFirst;
        arr[i] = img;
      }
    };

    const paint = () => {
      // Dominant arm decides which sequence is shown; they meet at rest.
      const useRight = amountR >= amountL;
      const arr = useRight ? right : left;
      const count = useRight ? RIGHT_COUNT : LEFT_COUNT;
      const amt = useRight ? amountR : amountL;
      const idx = clamp(Math.round(amt * (count - 1)), 0, count - 1);
      const key = (useRight ? "r" : "l") + idx;
      if (key === lastKey) return;
      const img = arr[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      lastKey = key;

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
      lastKey = "";
      paint();
    };

    load(right, RIGHT_COUNT, rightPath, () => {
      lastKey = "";
      paint();
    });
    load(left, LEFT_COUNT, leftPath);

    const onPointer = (e: PointerEvent) => {
      const xnorm = e.clientX / window.innerWidth;
      // map vertical position to curl amount: low on screen = rest, high = curled
      const ynorm = e.clientY / window.innerHeight;
      const amt = clamp((0.82 - ynorm) / 0.5, 0, 1);
      if (xnorm < 0.5) {
        targetR = amt;
        targetL = 0;
      } else {
        targetL = amt;
        targetR = 0;
      }
    };
    const onLeave = () => {
      targetR = 0;
      targetL = 0;
    };

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const k = reduce ? 1 : 0.18;

    let rafId = 0;
    const loop = () => {
      amountR += (targetR - amountR) * k;
      amountL += (targetL - amountL) * k;
      paint();
      rafId = requestAnimationFrame(loop);
    };

    resize();
    rafId = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className="relative h-[220vh]">
      <div className="forme-hero sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Legibility scrim */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(15,12,8,0.72)_0%,rgba(15,12,8,0.12)_38%,transparent_60%)]"
      />

      {/* Caption */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-16 text-center sm:px-12">
        <p className="label mb-5">Now we lift</p>
        <h2 className="display text-[clamp(2.4rem,6.5vw,5.5rem)]">
          One arm at a time.
        </h2>
        <div className="mt-7 flex items-center justify-center gap-3">
          <span className="hint-up text-xl leading-none">↑</span>
          <span className="label">Hover an arm &amp; drag up to curl</span>
          <span className="hint-up text-xl leading-none">↑</span>
        </div>
      </div>
      </div>
    </section>
  );
}
