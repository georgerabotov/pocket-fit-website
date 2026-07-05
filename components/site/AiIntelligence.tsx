"use client";

/* AI coach feature section (Kai & Maia). One pinned phone stays centred while
   the cards scroll past; its screen crossfades per section. The phone is
   masked in real time to whichever rectangle(s) it overlaps, so it only ever
   shows *inside* a card — never in the gaps between them.
   Phone screens are placeholders — drop a screenshot into a section's `img`. */

import { useEffect, useRef, useState } from "react";

const H = "font-[family-name:var(--font-fraunces)]";

const COACHES: Record<string, { name: string; img: string }> = {
  kai: { name: "Kai", img: "/journey/kai6.png" },
  maia: { name: "Maia", img: "/journey/fit-female.png" },
};

type Section = {
  id: string;
  title: string;
  desc: string;
  accent: string;
  grad: string;
  coach: "kai" | "maia";
  sample: string;
  img?: string; // ← drop a screenshot path here to replace the placeholder
};

const SECTIONS: Section[] = [
  {
    id: "data",
    title: "An AI trainer that\nknows your data",
    desc: "Kai and Maia reference your real workouts, recovery, and history — every answer is grounded in your own numbers, not generic advice.",
    accent: "#7c6cff",
    grad: "from-indigo-50 to-violet-100",
    coach: "kai",
    sample: "Why am I not feeling rested today?",
  },
  {
    id: "log",
    title: "Log by chat\nor voice",
    desc: "Just say it — “Bench 80 for 5” or a quick voice note — and your session is logged. No forms, no tapping through menus.",
    accent: "#f0563a",
    grad: "from-rose-50 to-orange-50",
    coach: "maia",
    sample: "Log bench press — 80kg for 5 reps",
  },
  {
    id: "adjust",
    title: "Adjust your plan\non the fly",
    desc: "Sore, short on time, or travelling? Ask to swap an exercise or reshape your week and your plan updates instantly.",
    accent: "#14b8a6",
    grad: "from-sky-50 to-violet-50",
    coach: "kai",
    sample: "Swap deadlifts today — my back is sore",
  },
  {
    id: "learn",
    title: "Learn as\nyou train",
    desc: "Ask why, not just what. Understand technique, programming, and the reasoning behind every session you do.",
    accent: "#10b981",
    grad: "from-teal-50 to-emerald-50",
    coach: "maia",
    sample: "Why does progressive overload work?",
  },
];

function PhoneScreen({ s }: { s: Section }) {
  const coach = COACHES[s.coach];
  return (
    <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-white to-stone-50">
      <div className="flex items-center justify-between px-5 pt-3 text-[10px] font-semibold text-stone-800">
        <span>9:41</span>
        <span>􀙇 􀖀 􀛨</span>
      </div>
      <div className="flex items-center gap-2 border-b border-stone-100 px-4 py-2.5">
        <div className="grid size-7 place-items-center overflow-hidden rounded-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coach.img} alt={coach.name} className="h-8 w-auto object-cover" />
        </div>
        <div className="leading-tight">
          <p className="text-[11px] font-bold text-stone-900">{coach.name}</p>
          <p className="text-[8px] font-medium text-stone-400">AI trainer · online</p>
        </div>
        <span className="ml-auto text-stone-300">✕</span>
      </div>

      {s.img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={s.img} alt="" className="min-h-0 w-full flex-1 object-cover" />
      ) : (
        <div className="flex min-h-0 flex-1 flex-col gap-2 px-3.5 py-3">
          <div
            className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm px-3 py-2 text-[10.5px] font-medium leading-snug text-white"
            style={{ background: s.accent }}
          >
            {s.sample}
          </div>
          <div className="mt-1 space-y-1.5">
            {["Reviewing your recent data", "Analyzing trends", "Preparing insights"].map(
              (t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full" style={{ background: s.accent }} />
                  <span className="text-[9px] font-medium text-stone-400">{t}</span>
                </div>
              ),
            )}
          </div>
          <div className="mt-1 max-w-[88%] space-y-1.5 rounded-2xl rounded-tl-sm bg-white p-2.5 shadow-sm ring-1 ring-stone-100">
            <span className="block h-1.5 w-full rounded-full bg-stone-200" />
            <span className="block h-1.5 w-[92%] rounded-full bg-stone-200" />
            <span className="block h-1.5 w-[74%] rounded-full bg-stone-200" />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 border-t border-stone-100 px-3 py-2.5">
        <span className="grid size-6 place-items-center rounded-full bg-stone-100 text-stone-400">
          +
        </span>
        <span className="flex-1 rounded-full bg-stone-100 px-3 py-1.5 text-[9px] text-stone-400">
          Ask {coach.name} anything
        </span>
        <span
          className="grid size-6 place-items-center rounded-full text-white"
          style={{ background: s.accent }}
        >
          􀊄
        </span>
      </div>
    </div>
  );
}

function PhoneBody({
  active,
  frameRef,
}: {
  active: number;
  frameRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={frameRef}
      className="relative w-full rounded-[2.2rem] border border-black/50 bg-black p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]"
    >
      <div className="absolute left-1/2 top-2.5 z-20 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
      <div className="relative aspect-[9/19.3] overflow-hidden rounded-[1.7rem] bg-white">
        {SECTIONS.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: active === i ? 1 : 0 }}
          >
            <PhoneScreen s={s} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CoachOrb({ coach, glow }: { coach: "kai" | "maia"; glow: string }) {
  const c = COACHES[coach];
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="relative grid size-24 place-items-center">
        <div
          aria-hidden
          className="absolute inset-2 rounded-full blur-xl"
          style={{ background: glow, opacity: 0.45 }}
        />
        <div className="relative grid size-20 place-items-end justify-items-center overflow-hidden rounded-full bg-white ring-1 ring-black/5 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.3)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.img} alt={c.name} className="h-[76px] w-auto object-contain" />
        </div>
      </div>
      <span className="rounded-full bg-stone-100 px-3.5 py-1 text-[13px] font-semibold text-stone-700 ring-1 ring-inset ring-black/5">
        {c.name}
      </span>
    </div>
  );
}

export function AiIntelligence() {
  const [active, setActive] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const setMask = (el: HTMLElement, g: string) => {
      el.style.maskImage = g;
      (el.style as unknown as { webkitMaskImage: string }).webkitMaskImage = g;
    };
    const update = () => {
      raf = 0;
      const el = frameRef.current;
      if (!el) return;
      const pr = el.getBoundingClientRect();
      const Hpx = pr.height;
      if (Hpx === 0) return;

      // phone stays pinned at viewport centre; mask it to whichever
      // rectangle(s) it overlaps, hidden outside them and in the gaps
      const intervals: [number, number][] = [];
      let bestIdx = 0;
      let bestOverlap = -1;
      cards.current.forEach((c, i) => {
        const r = c?.getBoundingClientRect();
        if (!r) return;
        const top = Math.max(pr.top, r.top);
        const bot = Math.min(pr.bottom, r.bottom);
        if (bot > top) {
          intervals.push([top - pr.top, bot - pr.top]);
          if (bot - top > bestOverlap) {
            bestOverlap = bot - top;
            bestIdx = i;
          }
        }
      });

      if (intervals.length === 0) {
        el.style.opacity = "0";
        return;
      }
      el.style.opacity = "1";

      intervals.sort((a, b) => a[0] - b[0]);
      const merged: [number, number][] = [];
      for (const iv of intervals) {
        const last = merged[merged.length - 1];
        if (last && iv[0] <= last[1] + 0.5) last[1] = Math.max(last[1], iv[1]);
        else merged.push([iv[0], iv[1]]);
      }
      const stops: string[] = [];
      let cur = 0;
      for (const [s, e] of merged) {
        stops.push(`transparent ${cur}px`, `transparent ${s}px`, `#000 ${s}px`, `#000 ${e}px`);
        cur = e;
      }
      stops.push(`transparent ${cur}px`, `transparent ${Hpx}px`);
      setMask(el, `linear-gradient(to bottom, ${stops.join(",")})`);

      setActive((p) => (p === bestIdx ? p : bestIdx));
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
    <section className="relative border-t border-stone-100 bg-white py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 h-64 w-[42rem] -translate-x-1/2 rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(closest-side,rgba(124,108,255,0.16),rgba(20,184,166,0.08),transparent)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* header — coaches + title */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-end gap-8">
            <CoachOrb coach="kai" glow="rgba(124,108,255,0.9)" />
            <CoachOrb coach="maia" glow="rgba(20,184,166,0.85)" />
          </div>
          <h2 className={`${H} mt-8 text-4xl font-semibold tracking-tight sm:text-5xl`}>
            <span className="text-stone-400">Go deeper with</span>
            <br />
            <span className="text-stone-900">Pocket Fit Intelligence</span>
          </h2>
          <p className="mt-4 max-w-md text-base text-stone-500">
            Personalized guidance and actionable advice from Kai and Maia — your
            own 24/7 AI trainers.
          </p>
        </div>

        {/* cards + one pinned, mask-clipped phone */}
        <div className="relative mt-16">
          {/* pinned phone (desktop) */}
          <div className="pointer-events-none absolute -top-[90vh] -bottom-[90vh] right-[6%] z-20 hidden w-[220px] lg:block">
            <div className="sticky top-[50vh] -translate-y-1/2">
              <PhoneBody active={active} frameRef={frameRef} />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {SECTIONS.map((s, i) => (
              <div
                key={s.id}
                ref={(el) => {
                  cards.current[i] = el;
                }}
                className={`relative flex min-h-[300px] flex-col justify-center overflow-hidden rounded-[30px] bg-gradient-to-br ${s.grad} p-8 sm:p-12`}
              >
                <div className="relative z-10 max-w-md">
                  <h3
                    className={`${H} whitespace-pre-line text-3xl font-semibold leading-[1.05] tracking-tight text-stone-900 sm:text-4xl`}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-3.5 max-w-sm text-[15px] leading-relaxed text-stone-500">
                    {s.desc}
                  </p>
                </div>

                {/* phone for mobile / tablet (one per card) */}
                <div className="mx-auto mt-8 w-[200px] lg:hidden">
                  <PhoneBody active={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
