import { Bolt, Heart, Bell, Book, Dumbbell, Sparkle, Check, Clock } from "./icons";
import { Ring } from "./screens";

/** Strain detail screen — single effort score + supporting graph. */
export function StrainScreen() {
  const bars = [30, 42, 38, 55, 48, 70, 62, 80, 58, 44, 36, 50];
  return (
    <div className="flex h-full flex-col gap-3 bg-mist p-4 pt-10">
      <div className="flex items-center gap-2">
        <Bolt className="size-5 text-accent" />
        <p className="text-sm font-bold">Strain</p>
      </div>
      <div className="rounded-2xl bg-cloud p-4 text-center shadow-sm">
        <Ring value={65} label="Today" color="var(--color-accent)" size={120} />
        <p className="-mt-2 text-[11px] text-ink-soft">Moderate effort day</p>
      </div>
      <div className="rounded-2xl bg-cloud p-3 shadow-sm">
        <p className="mb-2 text-[11px] font-semibold">Daytime heart rate</p>
        <div className="flex h-14 items-end gap-1">
          {bars.map((b, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-accent/70"
              style={{ height: `${b}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Recovery detail screen — readiness + HRV. */
export function RecoveryScreen() {
  return (
    <div className="flex h-full flex-col gap-3 bg-mist p-4 pt-10">
      <div className="flex items-center gap-2">
        <Heart className="size-5 text-brand-600" />
        <p className="text-sm font-bold">Recovery</p>
      </div>
      <div className="rounded-2xl bg-cloud p-4 text-center shadow-sm">
        <Ring value={70} label="Ready" color="var(--color-brand-500)" size={120} />
        <p className="-mt-2 text-[11px] text-ink-soft">You&apos;re good to push today</p>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-2xl bg-cloud p-3 shadow-sm">
          <p className="text-[10px] text-ink-soft">HRV</p>
          <p className="text-lg font-bold">68 ms</p>
        </div>
        <div className="rounded-2xl bg-cloud p-3 shadow-sm">
          <p className="text-[10px] text-ink-soft">Resting HR</p>
          <p className="text-lg font-bold">52 bpm</p>
        </div>
      </div>
    </div>
  );
}

/** Proactive check-in screen. */
export function ProactiveScreen() {
  return (
    <div className="flex h-full flex-col gap-3 bg-mist p-4 pt-10">
      <div className="flex items-center gap-2">
        <Bell className="size-5 text-brand-600" />
        <p className="text-sm font-bold">Check-ins</p>
      </div>
      <div className="rounded-2xl bg-cloud p-3 shadow-sm">
        <p className="text-[11px] font-semibold">Daily summary · 8:00</p>
        <p className="mt-1 text-[11px] text-ink-soft">
          Solid recovery and a light strain day yesterday — a good window for an
          interval session.
        </p>
      </div>
      <div className="flex items-center gap-3 rounded-2xl bg-cloud p-3 shadow-sm">
        <span className="grid size-9 place-items-center rounded-full bg-brand-50 text-brand-600">
          <Clock className="size-5" />
        </span>
        <div className="text-[11px]">
          <p className="font-semibold">3:00 PM</p>
          <p className="text-ink-soft">Time for water — you&apos;re 600ml behind.</p>
        </div>
      </div>
      <div className="rounded-2xl bg-ink p-3 text-[11px] text-cloud shadow-sm">
        Nudges show up when they matter, without you having to ask.
      </div>
    </div>
  );
}

/** Trusted sources screen. */
export function SourcesScreen() {
  return (
    <div className="flex h-full flex-col gap-3 bg-mist p-4 pt-10">
      <div className="flex items-center gap-2">
        <Book className="size-5 text-brand-600" />
        <p className="text-sm font-bold">Sources</p>
      </div>
      <div className="rounded-2xl bg-cloud p-3 text-[11px] shadow-sm">
        <p className="font-semibold">Why magnesium before bed?</p>
        <p className="mt-1 text-ink-soft">
          It supports the systems that help your body wind down for deeper sleep.
        </p>
      </div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
        Backed by
      </p>
      {["Sleep Research Review · 2024", "Journal of Nutrition · 2023", "Clinical Sleep Med · 2022"].map(
        (s) => (
          <div
            key={s}
            className="flex items-center gap-2 rounded-xl bg-cloud p-2.5 text-[10px] shadow-sm"
          >
            <Check className="size-3.5 text-brand-600" />
            <span className="font-medium">{s}</span>
          </div>
        ),
      )}
    </div>
  );
}

/** Personalized training plan screen. */
export function TrainingScreen() {
  const moves = [
    "Goblet squat · 3 × 10",
    "Romanian deadlift · 3 × 8",
    "Walking lunge · 3 × 12",
    "Hamstring curl · 3 × 12",
  ];
  return (
    <div className="flex h-full flex-col gap-3 bg-mist p-4 pt-10">
      <div className="flex items-center gap-2">
        <Dumbbell className="size-5 text-brand-600" />
        <p className="text-sm font-bold">Lower body session</p>
      </div>
      <div className="flex items-center justify-between rounded-2xl bg-cloud p-3 text-[11px] shadow-sm">
        <span className="font-semibold">~45 min</span>
        <span className="rounded-full bg-brand-50 px-2 py-0.5 font-semibold text-brand-700">
          Tuned to today
        </span>
      </div>
      <div className="rounded-2xl bg-cloud p-2 shadow-sm">
        {moves.map((m) => (
          <div
            key={m}
            className="flex items-center gap-2 border-b border-line px-2 py-2.5 text-[11px] last:border-0"
          >
            <Sparkle className="size-3.5 text-brand-500" />
            <span className="font-medium">{m}</span>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-ink p-2.5 text-center text-[11px] font-semibold text-cloud">
        Start on phone + watch
      </div>
    </div>
  );
}
