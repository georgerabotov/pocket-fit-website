"use client";

import { useRef, useState } from "react";

const H = "font-[family-name:var(--font-fraunces)]";

// x/y in the 260×130 viewBox; w = bench-press top-set weight that week
const PTS = [
  { x: 6, y: 104, w: 70 },
  { x: 44, y: 98, w: 72.5 },
  { x: 82, y: 84, w: 75 },
  { x: 120, y: 88, w: 74 },
  { x: 158, y: 62, w: 78 },
  { x: 196, y: 50, w: 80 },
  { x: 240, y: 24, w: 82.5 },
];
const VW = 260;
const VH = 130;
const CH = 118; // rendered chart height in px

export function ProgressChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(PTS.length - 1);
  const [hovering, setHovering] = useState(false);

  const onMove = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const fx = ((e.clientX - rect.left) / rect.width) * VW;
    let best = 0;
    let bd = Infinity;
    for (let i = 0; i < PTS.length; i++) {
      const d = Math.abs(PTS[i].x - fx);
      if (d < bd) {
        bd = d;
        best = i;
      }
    }
    setHovering(true);
    setActive(best);
  };
  const onLeave = () => {
    setHovering(false);
    setActive(PTS.length - 1);
  };

  const pt = PTS[active];
  const prev = active > 0 ? PTS[active - 1].w : 67.5;
  const delta = Math.round((pt.w - prev) * 10) / 10;
  const up = delta >= 0;
  const leftPct = (pt.x / VW) * 100;
  const topPx = (pt.y / VH) * CH;

  return (
    <div>
      <div className="mb-0.5 flex items-center justify-between">
        <span className="text-[14px] font-black text-[#0A0A0F]">
          Bench press · top set
        </span>
        <span
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-black ${
            up ? "bg-[#5CC0BF]/[0.18] text-[#2E9E8F]" : "bg-[#F2A93B]/[0.18] text-[#B4740E]"
          }`}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            style={{ transform: up ? "none" : "scaleY(-1)" }}
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke={up ? "#2E9E8F" : "#B4740E"}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {up ? "+" : "−"}
          {Math.abs(delta)} kg
        </span>
      </div>

      <div className={`${H} mt-1.5 text-[30px] font-black tabular-nums tracking-tight text-[#0A0A0F]`}>
        {pt.w} <span className="text-[14px] text-black/40">kg</span>
      </div>

      {/* interactive chart */}
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative mt-1.5 cursor-crosshair touch-none"
        style={{ height: CH }}
      >
        <svg
          viewBox="0 0 260 130"
          preserveAspectRatio="none"
          style={{ width: "100%", height: CH, display: "block" }}
        >
          <defs>
            <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5CC0BF" stopOpacity="0.30" />
              <stop offset="1" stopColor="#5CC0BF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M6 104 L44 98 L82 84 L120 88 L158 62 L196 50 L240 24 L240 130 L6 130 Z"
            fill="url(#cg)"
          />
          <path
            d="M6 104 L44 98 L82 84 L120 88 L158 62 L196 50 L240 24"
            fill="none"
            stroke="#5CC0BF"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* vertical guide */}
        <div
          className="pointer-events-none absolute top-0 w-px bg-[#5CC0BF]/40"
          style={{ left: `${leftPct}%`, height: CH }}
        />
        {/* marker dot */}
        <div
          className="pointer-events-none absolute size-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2.5px] border-white bg-[#5CC0BF] shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
          style={{ left: `${leftPct}%`, top: topPx }}
        />
        {/* tooltip */}
        <div
          className={`pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-[#0F0E17] px-2.5 py-1.5 text-center shadow-lg transition-opacity ${
            hovering ? "opacity-100" : "opacity-0"
          }`}
          style={{
            left: `${Math.min(88, Math.max(12, leftPct))}%`,
            top: topPx - 10,
          }}
        >
          <div className="text-[13px] font-black leading-none text-white">
            {pt.w} kg
          </div>
          <div className="mt-1 text-[9.5px] font-bold leading-none text-white/55">
            Week {active + 1}
          </div>
        </div>
      </div>
    </div>
  );
}
