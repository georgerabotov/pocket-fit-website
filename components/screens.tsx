import { Heart, Moon, Bolt, Plate, Chat, Sparkle, Check } from "./icons";

/** A small donut-style progress ring used inside the phone screens. */
export function Ring({
  value,
  label,
  sub,
  color = "var(--color-brand-500)",
  size = 84,
}: {
  value: number;
  label: string;
  sub?: string;
  color?: string;
  size?: number;
}) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div
      className="flex flex-col items-center"
      style={{ width: size }}
    >
      <svg viewBox="0 0 80 80" className="w-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="var(--color-line)" strokeWidth="9" />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
        />
      </svg>
      <div className="-mt-12 mb-7 text-center">
        <div className="text-xl font-bold">{value}%</div>
        <div className="text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
          {label}
        </div>
      </div>
      {sub && <div className="-mt-4 text-[10px] text-ink-soft">{sub}</div>}
    </div>
  );
}

/** Hero dashboard screen. */
export function DashboardScreen() {
  return (
    <div className="flex h-full flex-col gap-3 bg-mist p-4 pt-10 text-ink">
      <div>
        <p className="text-xs text-ink-soft">Good morning, Alex</p>
        <p className="text-base font-bold">Today you&apos;re ready to go.</p>
      </div>
      <div className="grid grid-cols-3 gap-2 rounded-2xl bg-cloud p-3 shadow-sm">
        <Ring value={70} label="Recovery" />
        <Ring value={65} label="Strain" color="var(--color-accent)" />
        <Ring value={88} label="Sleep" color="#6f7bff" />
      </div>
      <div className="flex items-center gap-3 rounded-2xl bg-cloud p-3 shadow-sm">
        <span className="grid size-9 place-items-center rounded-full bg-accent-soft text-accent">
          <Heart className="size-5" />
        </span>
        <div className="flex-1">
          <p className="text-xs font-semibold">Resting heart rate</p>
          <p className="text-[10px] text-ink-soft">52 bpm · 3 below baseline</p>
        </div>
        <span className="text-sm font-bold text-brand-600">↓</span>
      </div>
      <div className="rounded-2xl bg-ink p-3 text-cloud shadow-sm">
        <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold text-brand-300">
          <Sparkle className="size-3.5" /> LUMIO INTELLIGENCE
        </div>
        <p className="text-xs leading-relaxed">
          Your recovery is up after an early night. A moderate session would
          land well today.
        </p>
      </div>
    </div>
  );
}

/** Sleep detail screen. */
export function SleepScreen() {
  const stages = [
    { label: "Awake", h: 8, color: "var(--color-line)" },
    { label: "REM", h: 26, color: "#6f7bff" },
    { label: "Core", h: 44, color: "#9aa6ff" },
    { label: "Deep", h: 60, color: "#3b4bd8" },
  ];
  return (
    <div className="flex h-full flex-col gap-3 bg-mist p-4 pt-10">
      <div className="flex items-center gap-2">
        <Moon className="size-5 text-[#6f7bff]" />
        <p className="text-sm font-bold">Sleep</p>
      </div>
      <div className="rounded-2xl bg-cloud p-4 shadow-sm">
        <p className="text-2xl font-bold">
          8h 12m <span className="text-xs font-medium text-ink-soft">/ 8h need</span>
        </p>
        <div className="mt-4 flex items-end justify-between gap-3">
          {stages.map((s) => (
            <div key={s.label} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-md"
                style={{ height: s.h, background: s.color }}
              />
              <span className="text-[9px] text-ink-soft">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl bg-cloud p-3 text-xs shadow-sm">
        <p className="font-semibold">Sleep efficiency</p>
        <p className="text-ink-soft">94% — time asleep vs. time in bed</p>
      </div>
    </div>
  );
}

/** Nutrition scan screen. */
export function NutritionScreen() {
  const macros = [
    { label: "Protein", pct: 32, color: "var(--color-brand-500)" },
    { label: "Carbs", pct: 45, color: "#6f7bff" },
    { label: "Fat", pct: 23, color: "var(--color-accent)" },
  ];
  return (
    <div className="flex h-full flex-col gap-3 bg-mist p-4 pt-10">
      <div className="flex items-center gap-2">
        <Plate className="size-5 text-brand-600" />
        <p className="text-sm font-bold">Nutrition</p>
      </div>
      <div className="rounded-2xl bg-cloud p-4 shadow-sm">
        <p className="text-xs text-ink-soft">Scanned · Greek yogurt bowl</p>
        <p className="text-xl font-bold">312 kcal</p>
        <div className="mt-3 flex h-2 overflow-hidden rounded-full">
          {macros.map((m) => (
            <div key={m.label} style={{ width: `${m.pct}%`, background: m.color }} />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-ink-soft">
          {macros.map((m) => (
            <span key={m.label}>
              {m.label} {m.pct}%
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[10px]">
        {["Fiber 6g", "Magnesium 28%", "Potassium 14%", "Calcium 22%"].map((n) => (
          <div key={n} className="rounded-xl bg-cloud p-2 font-medium shadow-sm">
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}

/** AI chat screen. */
export function ChatScreen() {
  return (
    <div className="flex h-full flex-col gap-3 bg-mist p-4 pt-10">
      <div className="flex items-center gap-2">
        <Chat className="size-5 text-brand-600" />
        <p className="text-sm font-bold">Ask Pocket Fit</p>
      </div>
      <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-brand-500 p-3 text-xs text-white">
        I feel a bit flat today. What happened?
      </div>
      <div className="mr-auto max-w-[85%] rounded-2xl rounded-tl-sm bg-cloud p-3 text-xs shadow-sm">
        You slept 1h 20m less than your average and your HRV dipped 14%. Try a
        lighter day and an earlier wind-down tonight.
      </div>
      <div className="mr-auto flex max-w-[85%] items-center gap-2 rounded-xl bg-brand-50 p-2 text-[10px] text-brand-700">
        <Check className="size-3.5" /> Based on last night&apos;s sleep + HRV
      </div>
    </div>
  );
}

/** Records / labs screen. */
export function RecordsScreen() {
  const rows = [
    { name: "Vitamin D", value: "Optimal", ok: true },
    { name: "Ferritin", value: "Low", ok: false },
    { name: "HbA1c", value: "Optimal", ok: true },
    { name: "ApoB", value: "Borderline", ok: false },
  ];
  return (
    <div className="flex h-full flex-col gap-3 bg-mist p-4 pt-10">
      <p className="text-sm font-bold">Lab results</p>
      <div className="rounded-2xl bg-cloud p-2 shadow-sm">
        {rows.map((r) => (
          <div
            key={r.name}
            className="flex items-center justify-between border-b border-line px-2 py-2.5 text-xs last:border-0"
          >
            <span className="font-medium">{r.name}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                r.ok
                  ? "bg-brand-50 text-brand-700"
                  : "bg-accent-soft text-accent"
              }`}
            >
              {r.value}
            </span>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-ink p-3 text-[11px] leading-relaxed text-cloud shadow-sm">
        <Bolt className="mb-1 size-4 text-brand-300" />
        Ferritin is trending low. Pairing iron-rich meals with vitamin C can
        help absorption.
      </div>
    </div>
  );
}
