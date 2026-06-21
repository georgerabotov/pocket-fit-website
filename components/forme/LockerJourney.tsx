"use client";

import { useEffect, useRef } from "react";

// Two consecutive clips united into one continuous scrub:
// dress[0..120] = walk across gym to the "Men" door
// sit[0..120]   = through the door, into the locker room, sit down
const DRESS_COUNT = 121;
const SIT_COUNT = 121;
const TOTAL = DRESS_COUNT + SIT_COUNT;
const dressPath = (i: number) =>
  `/dress/dress_${String(i).padStart(3, "0")}.jpg`;
const sitPath = (i: number) => `/sit/sit_${String(i).padStart(3, "0")}.jpg`;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

export function LockerJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const balloonRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const dress: HTMLImageElement[] = [];
    const sit: HTMLImageElement[] = [];
    let current = -1;

    const frameAt = (g: number) =>
      g < DRESS_COUNT ? dress[g] : sit[g - DRESS_COUNT];

    const draw = (g: number, force = false) => {
      if (g === current && !force) return;
      const img = frameAt(g);
      if (!img || !img.complete || img.naturalWidth === 0) return;
      current = g;
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
      draw(current < 0 ? 0 : current, true);
    };

    for (let i = 0; i < DRESS_COUNT; i++) {
      const img = new Image();
      img.src = dressPath(i + 1);
      if (i === 0) img.onload = () => draw(0, true);
      dress[i] = img;
    }
    for (let i = 0; i < SIT_COUNT; i++) {
      const img = new Image();
      img.src = sitPath(i + 1);
      sit[i] = img;
    }

    // line reveal windows (after he is seated)
    const windows = [
      [0.82, 0.86],
      [0.87, 0.9],
      [0.905, 0.93],
      [0.94, 0.985],
    ];

    const update = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;

      // scrub the whole journey over the first 80%, then hold seated
      draw(Math.round(clamp(p / 0.8, 0, 1) * (TOTAL - 1)));

      const cue = cueRef.current;
      if (cue) cue.style.opacity = String(1 - smoothstep(0.02, 0.1, p));

      const balloon = balloonRef.current;
      if (balloon) {
        const inn = smoothstep(0.8, 0.84, p);
        balloon.style.opacity = String(inn);
        balloon.style.transform = `translateY(${12 * (1 - inn)}px) scale(${0.94 + 0.06 * inn})`;
      }
      lineRefs.current.forEach((el, i) => {
        if (!el) return;
        const w = windows[i];
        const r = smoothstep(w[0], w[1], p);
        el.style.opacity = String(r);
        el.style.transform = `translateY(${10 * (1 - r)}px)`;
      });
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
    <section ref={sectionRef} className="relative h-[820vh]">
      <div className="forme-hero sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* subtle bottom scrim for the cue */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(15,12,8,0.55)_0%,transparent_30%)]"
        />

        {/* Keep-scrolling cue */}
        <div
          ref={cueRef}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2"
        >
          <span className="label">Keep scrolling</span>
          <span className="hint-down text-xl leading-none">↓</span>
        </div>

        {/* Thought balloon (reveals once he's seated) */}
        <div
          ref={balloonRef}
          className="pointer-events-none absolute inset-x-0 top-[5vh] z-20 mx-auto w-[min(86vw,30rem)] opacity-0"
        >
          <div className="rounded-[2.2rem] bg-white/95 px-8 py-7 text-center shadow-2xl ring-1 ring-black/5 backdrop-blur-sm">
            <p
              ref={(el) => {
                lineRefs.current[0] = el;
              }}
              className="body-sans text-lg text-ink/70"
            >
              I&apos;m so weak.
            </p>
            <p
              ref={(el) => {
                lineRefs.current[1] = el;
              }}
              className="body-sans mt-2 text-lg text-ink/80"
            >
              I really want to get strong.
            </p>
            <p
              ref={(el) => {
                lineRefs.current[2] = el;
              }}
              className="body-sans mt-4 text-base italic text-ink/60"
            >
              F*** it…
            </p>
            <p
              ref={(el) => {
                lineRefs.current[3] = el;
              }}
              className="display mt-3 text-[clamp(1.8rem,4.2vw,2.8rem)] font-semibold text-[var(--color-forme-gold)]"
            >
              I WILL GET STRONG.
            </p>
          </div>
          <div className="mx-auto mt-2 flex flex-col items-center gap-1.5">
            <span className="block size-4 rounded-full bg-white/95 shadow-md" />
            <span className="block size-2.5 rounded-full bg-white/95 shadow" />
            <span className="block size-1.5 rounded-full bg-white/90" />
          </div>
        </div>
      </div>
    </section>
  );
}
