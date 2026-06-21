"use client";

import { useEffect, useRef, useState } from "react";

// Kai's 12-month journey: 122 kg -> 84 kg, June -> May. Adapted from the
// provided Kai Journey prototype, recolored to the gym's dark/gold vibe.
const MONTHS = [
  "June", "July", "Aug", "Sept", "Oct", "Nov",
  "Dec", "Jan", "Feb", "Mar", "Apr", "May",
];
const KICKERS = [
  "The journey begins",
  "Finding the rhythm",
  "Building momentum",
  "Showing up",
  "The work shows",
  "Stronger every week",
  "Locked in",
  "Past the doubt",
  "Lean and driven",
  "Dialed in",
  "The final push",
  "Transformed",
];
const N = 12;
const START = 122;
const END = 84;
const weightAt = (i: number) => Math.round(START - (START - END) * (i / (N - 1)));
const charSrc = (i: number) => `/journey/kai${i + 1}.png`;
const ADVANCE_MS = 2200;

export function Journey() {
  const [cur, setCur] = useState(0);
  const [playing, setPlaying] = useState(true);
  const wtRef = useRef<HTMLSpanElement>(null);
  const curRef = useRef(0);
  curRef.current = cur;

  // auto-advance loop
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setCur((c) => (c + 1) % N), ADVANCE_MS);
    return () => clearTimeout(t);
  }, [playing, cur]);

  // animated weight count
  useEffect(() => {
    const node = wtRef.current;
    if (!node) return;
    const to = weightAt(cur);
    const from = parseInt(node.textContent || "") || to;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 600);
      node.textContent = String(Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [cur]);

  const go = (i: number) => {
    setPlaying(false);
    setCur((i + N) % N);
  };
  const toggle = () => setPlaying((p) => !p);

  // keyboard control
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(curRef.current + 1);
      else if (e.key === "ArrowLeft") go(curRef.current - 1);
      else if (e.key === " ") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const level = cur + 1;

  return (
    <section className="journey">
      <div className="stage">
        {/* tap anywhere on the card to take control + advance */}
        <div className="card" onClick={() => go(cur + 1)}>
          <div className="glow" />

          <div className="ghostwrap">
            {Array.from({ length: N }).map((_, i) => (
              <div key={i} className={"ghost" + (i === cur ? " on" : "")}>
                {String(i + 1).padStart(2, "0")}
              </div>
            ))}
          </div>

          <div className="chars">
            {Array.from({ length: N }).map((_, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={charSrc(i)}
                alt={`Kai level ${i + 1}`}
                className={i === cur ? "on" : ""}
              />
            ))}
          </div>

          <div className="meta">
            <div className="kicker">{KICKERS[cur]}</div>
            <div className="lvl">
              <span className="n">{level}</span>
              <span className="lab">Level</span>
            </div>
            <div className="rule" />
            <div className="stats">
              <div className="st">
                <div className="k">Weight</div>
                <div className="v t">
                  <span ref={wtRef}>{START}</span>
                  <small>kg</small>
                </div>
              </div>
              <div className="st">
                <div className="k">Month</div>
                <div className="v">{MONTHS[cur]}</div>
              </div>
              <div className="st">
                <div className="k">Stage</div>
                <div className="v">
                  {String(level).padStart(2, "0")}
                  <small>/12</small>
                </div>
              </div>
            </div>
            <div className="prog">
              <div className="bar">
                <i style={{ width: `${8 + 92 * (cur / (N - 1))}%` }} />
              </div>
              <div className="cap">
                {cur === N - 1
                  ? "Journey complete — transformed"
                  : `Next evolution at Level ${level + 1}`}
              </div>
            </div>
          </div>

          <div className="ticks">
            {Array.from({ length: N }).map((_, i) => (
              <i key={i} className={i <= cur ? "on" : ""} />
            ))}
          </div>

          <div className="hint">
            <span className={"dot" + (playing ? " live" : "")} />
            {playing ? "Auto-playing · tap to take control" : "Paused · tap to advance"}
          </div>

          <div className="ctl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => go(cur - 1)} aria-label="Previous">
              ‹
            </button>
            <button className="play" onClick={toggle}>
              {playing ? "❚❚ Pause" : "▶ Play"}
            </button>
            <button onClick={() => go(cur + 1)} aria-label="Next">
              ›
            </button>
          </div>

          <div className="grain" />
          <div className="frame" />
        </div>
      </div>
    </section>
  );
}
