/* Feature grid - Train · Progress · Transform, plus a wide nutrition card.
   Stylised in-app components (no screenshots). */

import { ProgressChart } from "@/components/site/ProgressChart";
import { TransformMock } from "@/components/site/TransformMock";

const H = "font-[family-name:var(--font-fraunces)]";

function Ring({
  p,
  color,
  size = 62,
}: {
  p: number;
  color: string;
  size?: number;
}) {
  return (
    <div
      className="relative grid place-items-center rounded-full"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${color} ${p}%, rgba(0,0,0,.08) 0)`,
      }}
    >
      <div className="absolute rounded-full bg-white" style={{ width: "70%", height: "70%" }} />
      <b className="relative text-[13px] font-black text-[#0A0A0F]">{p}%</b>
    </div>
  );
}

/* ---------------- component mockups ---------------- */

function TrainMock() {
  const items = [
    { label: "Warm-up", done: true },
    { label: "Bench press", done: true },
    { label: "Overhead press", done: false },
    { label: "Triceps", done: false },
  ];
  return (
    <div className="animate-bob w-full max-w-[296px] rounded-3xl bg-white p-5 shadow-[0_30px_60px_rgba(40,36,90,0.18),0_4px_12px_rgba(40,36,90,0.06)]">
      <div className="mb-3.5 flex items-center justify-between">
        <span className="text-[11px] font-black uppercase tracking-[0.07em] text-[#5D5BD0]">
          Today · Push A
        </span>
        <span className="rounded-full bg-[#E9E8FF] px-2.5 py-1 text-[11px] font-extrabold text-[#414092]">
          45 min
        </span>
      </div>
      <div className={`${H} text-[22px] font-black tracking-tight text-[#0A0A0F]`}>
        Push Day A
      </div>
      <div className="mt-1 text-[12.5px] font-bold text-black/40">
        Ready when you are - just press go.
      </div>
      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#6260E0] to-[#4D4BC0] py-3.5 text-[14.5px] font-black text-white shadow-[0_10px_22px_rgba(77,75,192,0.32)]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
          <path d="M8 5.5v13l11-6.5z" />
        </svg>
        Start workout
      </button>
      <ul className="mt-4 flex flex-col gap-[11px]">
        {items.map((it) => (
          <li
            key={it.label}
            className={`flex items-center gap-[11px] text-[13.5px] font-extrabold ${
              it.done ? "text-[#0A0A0F]" : "text-black/[0.34]"
            }`}
          >
            <span
              className={`flex size-[22px] flex-none items-center justify-center rounded-full ${
                it.done ? "bg-[#5D5BD0] text-white" : "border-2 border-black/[0.16]"
              }`}
            >
              {it.done && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12l5 5 9-11"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            {it.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProgressMock() {
  return (
    <div className="animate-bob-1 w-full max-w-[296px] rounded-3xl bg-white p-5 shadow-[0_30px_60px_rgba(40,36,90,0.18),0_4px_12px_rgba(40,36,90,0.06)]">
      <ProgressChart />
      <div className="mt-3.5 flex gap-2.5">
        {[
          { k: "Weekly volume", v: "6.4k ↑" },
          { k: "Week streak", v: "18 🔥" },
        ].map((m) => (
          <div key={m.k} className="flex-1 rounded-2xl bg-[#F7F7FB] px-3 py-2.5">
            <div className="text-[10.5px] font-extrabold text-black/[0.42]">{m.k}</div>
            <div className={`${H} mt-0.5 text-[17px] font-black tracking-tight text-[#0A0A0F]`}>
              {m.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- feature cards ---------------- */

const CARDS = [
  {
    t: "Train",
    d: "Today's session is already built and scheduled - progressive overload handled for you.",
    grad: "linear-gradient(180deg,#EEEDFB 0%,#E4E3F8 100%)",
    glow: "radial-gradient(closest-side,rgba(93,91,208,.24),transparent)",
    Mock: TrainMock,
  },
  {
    t: "Progress",
    d: "Watch every lift climb. See exactly what got stronger, week over week.",
    grad: "linear-gradient(180deg,#E7F5F4 0%,#DAEFEE 100%)",
    glow: "radial-gradient(closest-side,rgba(92,192,191,.30),transparent)",
    Mock: ProgressMock,
  },
  {
    t: "Transform",
    d: "Your real training becomes a character that levels up as you do.",
    grad: "linear-gradient(180deg,#EDECFC 0%,#DCD8FA 55%,#CFC9F7 100%)",
    glow: "radial-gradient(closest-side,rgba(120,110,255,.40),transparent)",
    Mock: TransformMock,
  },
];

export function FeatureShowcase() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="grid gap-5 md:grid-cols-3">
        {CARDS.map((c, i) => (
          <article
            key={c.t}
            data-reveal
            style={{ transitionDelay: `${i * 90}ms`, background: c.grad }}
            className="reveal relative isolate flex min-h-[540px] flex-col overflow-hidden rounded-[30px] p-10"
          >
            <div className="relative z-10 flex-none">
              <h3 className={`${H} text-[32px] font-black tracking-tight text-[#0F0E17]`}>
                {c.t}
              </h3>
              <p className="mt-3.5 max-w-[290px] text-[16.5px] font-semibold leading-[1.45] text-[#3a3950]">
                {c.d}
              </p>
            </div>
            <div
              aria-hidden
              className="absolute bottom-[2%] left-1/2 z-0 h-[56%] w-[120%] -translate-x-1/2 rounded-[50%] opacity-60 blur-[34px]"
              style={{ background: c.glow }}
            />
            <div className="relative z-[2] mt-6 flex flex-1 items-center justify-center">
              <c.Mock />
            </div>
          </article>
        ))}
      </div>

      {/* wide nutrition card */}
      <article
        data-reveal
        className="reveal relative mt-5 grid min-h-[520px] items-center overflow-hidden rounded-[30px] lg:grid-cols-[1.02fr_1fr]"
        style={{
          background:
            "linear-gradient(120deg,#EFEDFC 0%,#E7E4FB 45%,#E9E0F4 100%)",
        }}
      >
        <div className="relative z-10 px-8 py-14 sm:px-14 lg:py-16 lg:pl-[60px]">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/75 px-3 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.06em] text-[#414092]">
            <span className="size-[7px] rounded-full bg-[#F2A93B] shadow-[0_0_0_4px_rgba(242,169,59,0.22)]" />
            Food · launching soon
          </span>
          <h2
            className={`${H} text-[clamp(38px,4.4vw,58px)] font-black leading-[0.98] tracking-tight text-[#0F0E17]`}
          >
            Understand
            <br />
            what you eat
          </h2>
          <p className="mt-5 max-w-[400px] text-[18px] font-semibold leading-[1.45] text-[#3a3950]">
            Scan your plate or a barcode, confirm the macros, done. Rings fill
            like fuel - no red numbers, no shame, just what&rsquo;s powering your
            training.
          </p>
        </div>

        <div className="relative min-h-[520px]">
          <div
            aria-hidden
            className="absolute right-[6%] top-1/2 z-0 size-[520px] -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side,rgba(120,110,255,.28),transparent)",
            }}
          />

          {/* macros panel */}
          <div className="animate-floatA absolute left-[2%] top-16 z-[2] w-[330px] max-w-[92%] rounded-[22px] bg-white px-[22px] py-5 shadow-[0_24px_60px_rgba(40,36,90,0.20),0_2px_6px_rgba(40,36,90,0.06)]">
            <div className="mb-3.5 flex items-center justify-between text-[14px] font-black text-[#0A0A0F]">
              Today&rsquo;s fuel
              <span className="text-[11px] font-extrabold text-black/40">
                1,540 kcal left
              </span>
            </div>
            <div className="flex justify-around text-center">
              {[
                { p: 72, c: "#5D5BD0", g: "128g", k: "PROTEIN" },
                { p: 54, c: "#5CC0BF", g: "164g", k: "CARBS" },
                { p: 40, c: "#F2A93B", g: "48g", k: "FAT" },
              ].map((m) => (
                <div key={m.k} className="flex flex-col items-center">
                  <Ring p={m.p} color={m.c} />
                  <b className="mt-2 text-[13px] font-black text-[#0A0A0F]">{m.g}</b>
                  <span className="text-[10px] font-extrabold text-black/[0.42]">
                    {m.k}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3 border-t border-black/[0.06] pt-4">
              <div className="size-11 flex-none rounded-xl bg-gradient-to-br from-[#F2A93B] to-[#F0563A]" />
              <div>
                <div className="text-[14px] font-black text-[#0A0A0F]">
                  Chicken &amp; rice bowl
                </div>
                <div className="mt-0.5 text-[11.5px] font-bold text-black/50">
                  Scanned · 42g protein
                </div>
              </div>
              <div className="ml-auto text-[13px] font-black text-[#5D5BD0]">+540</div>
            </div>
          </div>

          {/* budget panel */}
          <div className="animate-floatB absolute bottom-14 right-[1%] z-[2] w-[300px] max-w-[92%] rounded-[22px] bg-white px-[22px] py-5 shadow-[0_24px_60px_rgba(40,36,90,0.20),0_2px_6px_rgba(40,36,90,0.06)]">
            <div className="mb-3.5 flex items-center justify-between text-[14px] font-black text-[#0A0A0F]">
              Body budget
              <span className="text-[11px] font-extrabold text-black/40">on track</span>
            </div>
            <div className="mb-1.5 flex items-end justify-between">
              <div>
                <div className="text-[26px] font-black tracking-tight text-[#0A0A0F]">
                  −100 <span className="text-[13px] text-[#5CC0BF]">kcal</span>
                </div>
                <div className="text-[11px] font-extrabold text-black/[0.42]">
                  Net energy today
                </div>
              </div>
              <div className="flex items-center gap-1 text-[12px] font-black text-[#F2A93B]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3c0 4-5 5-5 10a5 5 0 0010 0c0-2-1-3-2-4 1 4-3 4-3 1 0-3 3-3 0-7z"
                    stroke="#F2A93B"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
                Deficit
              </div>
            </div>
            <div className="relative my-3 h-2 rounded-full bg-[linear-gradient(90deg,#F0563A,#F2A93B_42%,#5CC0BF_62%,#5D5BD0)]">
              <span className="absolute left-[56%] top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#5CC0BF] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.2)]" />
            </div>
            <div className="flex justify-between text-[9.5px] font-extrabold text-black/[0.35]">
              <span>−500</span>
              <span>0</span>
              <span>+500</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {[
                { t: "Fiber", pc: "50%", c: "#5CC0BF", v: "32 g left" },
                { t: "Iron", pc: "89%", c: "#F2A93B", v: "14 mg left" },
              ].map((n) => (
                <div key={n.t} className="rounded-xl bg-[#F7F7FB] px-3 py-2.5">
                  <div className="flex items-center justify-between text-[12px] font-black text-[#0A0A0F]">
                    {n.t} <span style={{ color: n.c }}>{n.pc}</span>
                  </div>
                  <div className="mt-1.5 text-[10.5px] font-bold text-black/50">{n.v}</div>
                  <div className="mt-1.5 h-[5px] overflow-hidden rounded-full bg-black/[0.08]">
                    <div
                      className="h-full rounded-full"
                      style={{ width: n.pc, background: n.c }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
