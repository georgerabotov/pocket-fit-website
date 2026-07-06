"use client";

/* The homepage "Transform" avatar card — click/tap to advance through the 12
   monthly states (kai1..kai12) and watch the character level up. */

import { useState } from "react";

const H = "font-[family-name:var(--font-fraunces)]";
const N = 12;

export function TransformMock() {
  const [i, setI] = useState(5); // start on level 6
  const lvl = i + 1;
  const next = () => setI((v) => (v + 1) % N);

  return (
    <button
      type="button"
      onClick={next}
      aria-label="Advance the transformation"
      className="group animate-bob-2 block w-full max-w-[296px] cursor-pointer rounded-3xl bg-gradient-to-b from-[#221C3E] to-[#141024] px-5 pb-6 pt-[22px] text-center shadow-[0_30px_60px_rgba(40,36,90,0.18),0_4px_12px_rgba(40,36,90,0.06)] transition-transform active:scale-[0.99]"
    >
      <style dangerouslySetInnerHTML={{ __html: "@keyframes tmNudge{0%,100%{transform:translate(0,-50%)}50%{transform:translate(4px,-50%)}}" }} />
      <div className={`${H} text-[11px] font-black tracking-[0.14em] text-[#9b9cfd]`}>
        LEVEL {lvl} {lvl === N ? "— MAXED" : "UNLOCKED"}
      </div>
      <div className="relative mt-1.5 flex flex-col items-center">
        {/* subtle tap-through affordance */}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-0 top-1/2 z-10 size-6 -translate-y-1/2 text-white/20 transition-colors duration-200 group-hover:text-white/40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 6l-6 6 6 6" />
        </svg>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute right-0 top-1/2 z-10 size-6 text-white/40 transition-colors duration-200 [animation:tmNudge_1.7s_ease-in-out_infinite] group-hover:text-white/70"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
        <div
          className="absolute rounded-full"
          style={{
            width: 190,
            height: 190,
            top: "44%",
            transform: "translateY(-50%)",
            background:
              "radial-gradient(closest-side,rgba(120,110,255,.5),transparent)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/journey/kai${lvl}.png`}
          alt={`Character at month ${lvl}`}
          className="relative h-[196px] w-auto [filter:drop-shadow(0_18px_30px_rgba(0,0,0,0.5))]"
        />
      </div>
      <div className={`${H} relative mt-0.5 text-[18px] font-black text-white`}>
        {lvl} month{lvl > 1 ? "s" : ""} stronger
      </div>
      <div className="mt-3.5 h-2 w-full overflow-hidden rounded-full bg-white/[0.14]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#9b9cfd] to-[#5CC0BF] transition-[width] duration-500"
          style={{ width: `${8 + 92 * (i / (N - 1))}%` }}
        />
      </div>
      <div className="mt-2.5 text-[11px] font-extrabold text-white/60">
        {lvl < N ? `Tap to reach Level ${lvl + 1}` : "Transformed — tap to restart"}
      </div>
    </button>
  );
}
