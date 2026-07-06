"use client";

import { useEffect, useRef, useState } from "react";

type Story = {
  src: string;
  alt: string;
};

const STORIES: Story[] = [
  { src: "/crew/story-01.png", alt: "Pocket Fit story shared by @melisande.lize - Back Day workout" },
  { src: "/crew/story-02.png", alt: "Pocket Fit story shared by @brayam.m13 - Full Body Day 2 workout" },
  { src: "/crew/story-03.png", alt: "Pocket Fit workout complete share - Quad focus session" },
  { src: "/crew/story-04.png", alt: "Pocket Fit story shared by @fitstyleamaka - workout complete" },
  { src: "/crew/story-05.png", alt: "Pocket Fit story shared by @jessechvce_gains - Upper Day workout" },
  { src: "/crew/story-06.png", alt: "Pocket Fit story shared by @hanna.13 - Upper Day workout" },
  { src: "/crew/story-07.png", alt: "Pocket Fit story collage - community workout shares" },
  { src: "/crew/story-08.png", alt: "Pocket Fit story - Still locked in, Lower 1 workout" },
  { src: "/crew/story-09.png", alt: "Pocket Fit story shared by @fivefoottren - Back + Biceps workout" },
  { src: "/crew/story-10.png", alt: "Pocket Fit story shared by @lil.merms - Full Body Day 1 workout" },
];

function StoryCard({ s }: { s: Story }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] shadow-[0_30px_60px_-20px_rgba(23,23,31,0.5)] ring-1 ring-black/10">
      <img
        src={s.src}
        alt={s.alt}
        draggable={false}
        className="h-full w-full object-cover object-center"
      />
    </div>
  );
}

export function CylinderCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const rot = useRef(0);
  const dragging = useRef(false);
  const pending = useRef(false); // pointer down, direction not yet decided
  const hovering = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startRot = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const n = STORIES.length;
  const step = 360 / n;

  // cylinder radius scales with viewport so it spreads across wide screens
  const [radius, setRadius] = useState(360);
  const radiusRef = useRef(360);
  useEffect(() => {
    const onResize = () => {
      const r = Math.min(1000, Math.max(330, window.innerWidth * 0.34));
      radiusRef.current = r;
      setRadius(r);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let raf = 0;
    let prev: number | null = null;
    const tick = (t: number) => {
      if (prev == null) prev = t;
      const dt = t - prev;
      prev = t;
      if (!dragging.current && !hovering.current) rot.current += dt * 0.006;
      if (ring.current) {
        ring.current.style.transform = `translateZ(-${radiusRef.current}px) rotateY(${rot.current}deg)`;
      }
      cards.current.forEach((c, i) => {
        if (!c) return;
        const a = ((i * step + rot.current) * Math.PI) / 180;
        const facing = Math.cos(a);
        c.style.opacity = (0.2 + 0.8 * Math.max(0, facing)).toFixed(3);
        c.style.zIndex = String(Math.round(facing * 100) + 100);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [step]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      // decide gesture direction on first meaningful move: horizontal spins the
      // ring, vertical is left to the browser so the page can scroll past it
      if (pending.current) {
        const dx = e.clientX - startX.current;
        const dy = e.clientY - startY.current;
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        if (Math.abs(dy) >= Math.abs(dx)) {
          pending.current = false; // vertical intent → let the page scroll
          return;
        }
        // horizontal → spin. Note: we deliberately do NOT setPointerCapture,
        // because capturing a pointer disables the browser's native touch
        // scrolling, which would trap vertical swipes. touch-action: pan-y lets
        // the browser hand us horizontal moves while keeping vertical for scroll.
        pending.current = false;
        dragging.current = true;
        setIsDragging(true);
      }
      if (!dragging.current) return;
      rot.current = startRot.current + (e.clientX - startX.current) * 0.28;
    };

    const endDrag = () => {
      pending.current = false;
      if (!dragging.current) return;
      dragging.current = false;
      setIsDragging(false);
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      pending.current = true;
      startX.current = e.clientX;
      startY.current = e.clientY;
      startRot.current = rot.current;
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[430px] w-full select-none overflow-hidden [perspective:1600px]"
      style={{ cursor: isDragging ? "grabbing" : "grab", touchAction: "pan-y" }}
      onPointerEnter={() => (hovering.current = true)}
      onPointerLeave={() => (hovering.current = false)}
    >
      <div
        ref={ring}
        className="pointer-events-none absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
      >
        {STORIES.map((s, i) => (
          <div
            key={s.src}
            ref={(el) => {
              cards.current[i] = el;
            }}
            className="pointer-events-none absolute left-0 top-0 h-[344px] w-[202px]"
            style={{
              transform: `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(${radius}px)`,
            }}
          >
            <StoryCard s={s} />
          </div>
        ))}
      </div>

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[300] w-24 bg-gradient-to-r from-white to-transparent sm:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[300] w-24 bg-gradient-to-l from-white to-transparent sm:w-48" />
    </div>
  );
}
