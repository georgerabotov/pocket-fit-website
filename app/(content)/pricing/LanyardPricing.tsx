"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { APP_STORE, FEATURES, PLANS, type Plan } from "./plans";

const Badges = dynamic(() => import("./Badges"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
        Loading passes…
      </p>
    </div>
  ),
});

const ACCENT_BG: Record<Plan["accent"], string> = {
  amber: "bg-amber-600",
  violet: "bg-violet-600",
  teal: "bg-teal-600",
  pink: "bg-pink-600",
};
const ACCENT_TEXT_LIGHT: Record<Plan["accent"], string> = {
  amber: "text-amber-600",
  violet: "text-violet-600",
  teal: "text-teal-600",
  pink: "text-pink-600",
};
const ACCENT_TEXT_DARK: Record<Plan["accent"], string> = {
  amber: "text-amber-400",
  violet: "text-violet-400",
  teal: "text-teal-400",
  pink: "text-pink-400",
};

type Side = "left" | "right";

function panelShell(side: Side) {
  return `pointer-events-auto absolute inset-y-0 z-20 flex w-full max-w-md flex-col justify-center px-8 sm:px-14 ${
    side === "right"
      ? "right-0 animate-[panelInRight_0.5s_cubic-bezier(0.16,1,0.3,1)_both]"
      : "left-0 animate-[panelInLeft_0.5s_cubic-bezier(0.16,1,0.3,1)_both]"
  }`;
}

function palette(dark: boolean) {
  return dark
    ? {
        back: "text-white/50 hover:text-white",
        eyebrow: "text-white/45",
        head: "text-white",
        period: "text-white/50",
        note: "text-white/55",
        feat: "text-white",
        border: "border-white/15",
      }
    : {
        back: "text-stone-400 hover:text-stone-700",
        eyebrow: "text-stone-400",
        head: "text-stone-900",
        period: "text-stone-400",
        note: "text-stone-500",
        feat: "text-stone-700",
        border: "border-stone-300",
      };
}

function FeaturePanel({
  plan,
  side,
  dark,
  onClose,
}: {
  plan: Plan;
  side: Side;
  dark: boolean;
  onClose: () => void;
}) {
  const t = palette(dark);
  const accentText = (dark ? ACCENT_TEXT_DARK : ACCENT_TEXT_LIGHT)[plan.accent];
  return (
    <div className={panelShell(side)}>
      <button
        onClick={onClose}
        className={`mb-8 w-fit text-[0.7rem] uppercase tracking-[0.3em] transition-colors ${t.back}`}
      >
        ← All plans
      </button>

      {plan.badge && (
        <span
          className={`mb-5 w-fit rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white ${ACCENT_BG[plan.accent]}`}
        >
          {plan.badge}
        </span>
      )}

      <p className={`text-xs uppercase tracking-[0.32em] ${t.eyebrow}`}>
        {plan.name} membership
      </p>
      <p
        className={`mt-3 font-[family-name:var(--font-fraunces)] text-6xl font-semibold ${t.head}`}
      >
        {plan.price}
        <span className={`ml-2 text-xl font-normal ${t.period}`}>
          {plan.period}
        </span>
      </p>
      <p className={`mt-3 text-sm ${t.note}`}>{plan.note}</p>

      <ul className="mt-9 space-y-4">
        {FEATURES.map((f) => (
          <li
            key={f}
            className={`flex gap-3 text-[0.95rem] leading-relaxed ${t.feat}`}
          >
            <svg
              viewBox="0 0 24 24"
              className={`mt-0.5 size-5 shrink-0 ${accentText}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 12 5 5 9-11" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <a
        href={APP_STORE}
        className={`mt-10 block w-full rounded-full px-6 py-4 text-center text-sm font-semibold text-white shadow-lg shadow-black/10 transition-opacity hover:opacity-90 ${ACCENT_BG[plan.accent]}`}
      >
        {plan.cta}
      </a>
    </div>
  );
}

function ComingSoonPanel({
  plan,
  side,
  dark,
  onClose,
}: {
  plan: Plan;
  side: Side;
  dark: boolean;
  onClose: () => void;
}) {
  const t = palette(dark);
  const accentText = (dark ? ACCENT_TEXT_DARK : ACCENT_TEXT_LIGHT)[plan.accent];
  return (
    <div className={panelShell(side)}>
      <button
        onClick={onClose}
        className={`mb-8 w-fit text-[0.7rem] uppercase tracking-[0.3em] transition-colors ${t.back}`}
      >
        ← All plans
      </button>

      <span
        className={`mb-5 w-fit rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white ${ACCENT_BG[plan.accent]}`}
      >
        Coming soon
      </span>

      <p className={`text-xs uppercase tracking-[0.32em] ${t.eyebrow}`}>
        Pocket Fit {plan.name}
      </p>
      <p
        className={`mt-3 font-[family-name:var(--font-fraunces)] text-6xl font-semibold ${t.head}`}
      >
        Coming soon
      </p>
      <p className={`mt-5 max-w-sm text-[0.95rem] leading-relaxed ${t.note}`}>
        {plan.tagline}
      </p>

      <div
        className={`mt-10 w-full cursor-not-allowed rounded-full border px-6 py-4 text-center text-sm font-semibold ${accentText} ${t.border}`}
      >
        In development
      </div>
    </div>
  );
}

function LightSwitch({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`pointer-events-auto absolute left-1/2 top-20 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold shadow-lg transition-colors ${
        dark
          ? "bg-white text-stone-900 hover:bg-stone-100"
          : "bg-stone-900 text-white hover:bg-stone-800"
      }`}
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.2 1 2.5h6c0-1.3.3-1.8 1-2.5A6 6 0 0 0 12 3z" />
      </svg>
      {dark ? "Turn on the light" : "Turn off the light"}
    </button>
  );
}

export default function LanyardPricing() {
  const [selected, setSelected] = useState<string | null>(null);
  const [dark, setDark] = useState(false);

  // let the (glass) site nav re-theme itself over the dark pricing backdrop
  useEffect(() => {
    document.documentElement.setAttribute("data-nav", dark ? "dark" : "light");
    return () => document.documentElement.removeAttribute("data-nav");
  }, [dark]);
  const idx = PLANS.findIndex((p) => p.id === selected);
  const active = idx >= 0 ? PLANS[idx] : null;
  // place the panel opposite the selected pass so it stays visible
  const side: Side = idx < PLANS.length / 2 ? "right" : "left";

  return (
    <section
      className={`relative h-[calc(100vh-4rem)] min-h-[640px] w-full overflow-hidden transition-colors duration-500 ${
        dark ? "bg-stone-950" : "bg-gradient-to-b from-violet-50 to-white"
      }`}
    >
      {/* vignette to focus the isolated pass */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(70% 60% at ${
            side === "right" ? "30%" : "70%"
          } 50%, transparent 0%, ${
            dark ? "rgba(0,0,0,0.55)" : "rgba(76,29,149,0.10)"
          } 100%)`,
        }}
      />

      {/* 3D canvas */}
      <div className="absolute inset-0 z-0">
        <Badges
          plans={PLANS}
          selected={selected}
          dark={dark}
          onSelect={setSelected}
        />
      </div>

      {/* light switch - sits between the middle chains */}
      {!active && <LightSwitch dark={dark} onToggle={() => setDark((d) => !d)} />}

      {/* isolate panel */}
      {active &&
        (active.comingSoon ? (
          <ComingSoonPanel
            plan={active}
            side={side}
            dark={dark}
            onClose={() => setSelected(null)}
          />
        ) : (
          <FeaturePanel
            plan={active}
            side={side}
            dark={dark}
            onClose={() => setSelected(null)}
          />
        ))}
    </section>
  );
}
