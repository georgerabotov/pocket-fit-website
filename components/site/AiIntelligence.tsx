"use client";

/* AI coach feature section (Kai & Maia). One pinned phone stays centred while
   the cards scroll past; its screen crossfades per section. The phone is
   masked in real time to whichever rectangle(s) it overlaps, so it only ever
   shows *inside* a card - never in the gaps between them.
   Phone screens are placeholders - drop a screenshot into a section's `img`. */

import { useEffect, useRef } from "react";

const H = "font-[family-name:var(--font-fraunces)]";

const COACHES: Record<string, { name: string; img: string; demo: string }> = {
  kai: { name: "Kai", img: "/journey/kai6.png", demo: "/intelligence/demo-kai.mp4" },
  maia: { name: "Maia", img: "/journey/fit-female.png", demo: "/intelligence/demo-maia.mp4" },
};

// exercise shown in the coach demo pop-up
const DEMO_EXERCISE = "Flat bench press";

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
    desc: "Kai and Maia reference your real workouts, recovery, and history - every answer is grounded in your own numbers, not generic advice.",
    accent: "#7c6cff",
    grad: "from-indigo-50 to-violet-100",
    coach: "kai",
    sample: "Why am I not feeling rested today?",
    img: "/intelligence/chatbot-1.png",
  },
  {
    id: "log",
    title: "Log by chat\nor voice",
    desc: "Just say it - “Bench 80 for 5” or a quick voice note - and your session is logged. No forms, no tapping through menus.",
    accent: "#f0563a",
    grad: "from-rose-50 to-orange-50",
    coach: "maia",
    sample: "Log bench press - 80kg for 5 reps",
    img: "/intelligence/chatbot-2.png",
  },
  {
    id: "adjust",
    title: "Adjust your plan\non the fly",
    desc: "Sore, short on time, or travelling? Ask to swap an exercise or reshape your week and your plan updates instantly.",
    accent: "#14b8a6",
    grad: "from-sky-50 to-violet-50",
    coach: "kai",
    sample: "Swap deadlifts today - my back is sore",
    img: "/intelligence/chatbot-3.png",
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
  // Real screenshot → render full-bleed (it already has its own chrome)
  if (s.img) {
    return (
      <div className="absolute inset-0 bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.img} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }
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

/* A phone frame showing a single section's screen. Stacked one per rectangle
   and masked to that rectangle's band, so each rectangle reveals its own
   screen - even when the phone straddles two rectangles. */
function PhoneFrame({
  s,
  frameRef,
  className = "",
}: {
  s: Section;
  frameRef?: React.Ref<HTMLDivElement>;
  className?: string;
}) {
  return (
    <div
      ref={frameRef}
      className={`w-full rounded-[2.2rem] border border-black/50 bg-black p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div className="absolute left-1/2 top-2.5 z-20 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
      <div className="relative aspect-[9/19.3] overflow-hidden rounded-[1.7rem] bg-white">
        <PhoneScreen s={s} />
      </div>
    </div>
  );
}

const ACCENT: Record<"kai" | "maia", string> = {
  kai: "#7c6cff",
  maia: "#14b8a6",
};

const GLOW: Record<"kai" | "maia", string> = {
  kai: "rgba(124,108,255,0.45)",
  maia: "rgba(20,184,166,0.42)",
};

function CoachAvatar({ coach }: { coach: "kai" | "maia" }) {
  return (
    <div className="relative flex flex-col items-center gap-3">
      <div className="relative grid size-24 place-items-center">
        {/* soft coloured glow + slow pulse ring */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-full blur-xl"
          style={{ background: GLOW[coach], opacity: 0.7 }}
        />
        <div
          aria-hidden
          className="absolute inset-0 rounded-full border-2 [animation:coachPulse_2.8s_ease-in-out_infinite]"
          style={{ borderColor: ACCENT[coach] }}
        />
        <div className="relative grid size-24 place-items-end justify-items-center overflow-hidden rounded-full bg-white shadow-[0_18px_44px_-14px_rgba(0,0,0,0.4)] ring-1 ring-black/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={COACHES[coach].img} alt={COACHES[coach].name} className="h-[94%] w-auto object-contain" />
        </div>
      </div>
      <span className="text-sm font-bold" style={{ color: ACCENT[coach] }}>
        {COACHES[coach].name}
      </span>
    </div>
  );
}

function CoachVideo({ coach }: { coach: "kai" | "maia" }) {
  return (
    <div className="w-full max-w-[320px] shrink-0 overflow-hidden rounded-[22px] bg-white shadow-[0_34px_80px_-30px_rgba(0,0,0,0.5)] ring-1 ring-black/5 lg:w-[300px] xl:w-[330px]">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        src={COACHES[coach].demo}
        autoPlay
        muted
        loop
        playsInline
        className="aspect-video w-full object-cover"
      />
      <div className="flex items-center justify-center gap-2 py-2.5">
        <span className="size-1.5 rounded-full" style={{ background: ACCENT[coach] }} />
        <span className="text-[11px] font-bold tracking-wide text-stone-500">
          {COACHES[coach].name} · {DEMO_EXERCISE}
        </span>
      </div>
    </div>
  );
}

/* short hand-drawn curved arrow: dir "left" points toward the left video,
   "right" is mirrored to point right */
function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 84 46"
      className="h-11 w-16 shrink-0 text-stone-300"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={dir === "right" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M78 12 C 54 34, 32 34, 10 24" />
      <path d="M10 24 L 24 15" />
      <path d="M10 24 L 21 36" />
    </svg>
  );
}

export function AiIntelligence() {
  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const cards = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const setMask = (el: HTMLElement, g: string) => {
      el.style.maskImage = g;
      (el.style as unknown as { webkitMaskImage: string }).webkitMaskImage = g;
    };
    const update = () => {
      raf = 0;
      const el0 = frames.current[0];
      if (!el0) return;
      const pr = el0.getBoundingClientRect(); // all layers share the same rect
      const Hpx = pr.height;
      if (Hpx === 0) return;

      // Each rectangle's phone layer is masked to only the band where the phone
      // overlaps THAT rectangle - so every rectangle shows its own screen, even
      // when the phone straddles two of them.
      cards.current.forEach((c, i) => {
        const f = frames.current[i];
        if (!f) return;
        const r = c?.getBoundingClientRect();
        if (!r) {
          f.style.opacity = "0";
          return;
        }
        const top = Math.max(pr.top, r.top) - pr.top;
        const bot = Math.min(pr.bottom, r.bottom) - pr.top;
        if (bot <= top) {
          f.style.opacity = "0";
          return;
        }
        f.style.opacity = "1";
        setMask(
          f,
          `linear-gradient(to bottom, transparent 0px, transparent ${top}px, #000 ${top}px, #000 ${bot}px, transparent ${bot}px, transparent ${Hpx}px)`,
        );
      });
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
        className="pointer-events-none absolute left-1/2 top-6 h-64 w-[42rem] max-w-full -translate-x-1/2 rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(closest-side,rgba(124,108,255,0.16),rgba(20,184,166,0.08),transparent)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* header - title + both coach demos */}
        <div className="flex flex-col items-center text-center">
          <h2 className={`${H} mt-7 text-4xl font-semibold tracking-tight sm:text-5xl`}>
            <span className="text-stone-400">Go deeper with</span>
            <br />
            <span className="text-stone-900">Pocket Fit Intelligence</span>
          </h2>
          <p className="mt-4 max-w-md text-base text-stone-500">
            Personalized guidance and actionable advice from Kai and Maia - your
            own 24/7 AI trainers who even show you how each exercise is done.
          </p>

          {/* desktop: two coach icons in the middle, each pointing out to its
              own demo video — Kai to the left, Maia to the right */}
          <div className="mt-14 hidden w-full items-center justify-center gap-4 lg:flex xl:gap-6">
            <CoachVideo coach="kai" />
            <Arrow dir="left" />
            <div className="flex shrink-0 items-center gap-5">
              <CoachAvatar coach="kai" />
              <CoachAvatar coach="maia" />
            </div>
            <Arrow dir="right" />
            <CoachVideo coach="maia" />
          </div>

          {/* mobile / tablet: stacked icon + video per coach */}
          <div className="mt-10 grid w-full max-w-md grid-cols-1 gap-9 lg:hidden">
            {(["kai", "maia"] as const).map((k) => (
              <div key={k} className="flex flex-col items-center gap-4">
                <CoachAvatar coach={k} />
                <CoachVideo coach={k} />
              </div>
            ))}
          </div>
        </div>

        {/* cards + one pinned, mask-clipped phone */}
        <div className="relative mt-24">
          {/* pinned phone (desktop) */}
          <div className="pointer-events-none absolute -top-[90vh] -bottom-[90vh] right-[5%] z-20 hidden w-[280px] lg:block">
            <div className="sticky top-[50vh] -translate-y-1/2">
              <div className="relative w-full">
                {SECTIONS.map((s, i) => (
                  <PhoneFrame
                    key={s.id}
                    s={s}
                    frameRef={(el) => {
                      frames.current[i] = el;
                    }}
                    className={i === 0 ? "relative" : "absolute inset-0"}
                  />
                ))}
              </div>
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
                <div className="mx-auto mt-8 w-[248px] lg:hidden">
                  <PhoneFrame s={s} className="relative" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
