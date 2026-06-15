import { Section, Eyebrow, PhoneFrame } from "./ui";
import { Bolt, Moon, Heart, Plate } from "./icons";
import { SleepScreen, NutritionScreen } from "./screens";

const pillars = [
  {
    icon: Bolt,
    title: "Strain",
    body: "See how much your body put in today, from steady effort to all-out sessions, and know when you've done enough.",
    color: "var(--color-accent)",
  },
  {
    icon: Moon,
    title: "Sleep",
    body: "Stage-by-stage breakdown with a nightly sleep-need target that adapts to the load you carried during the day.",
    color: "#6f7bff",
  },
  {
    icon: Heart,
    title: "Recovery",
    body: "A simple morning readiness score built from heart-rate variability, resting heart rate, and last night's rest.",
    color: "var(--color-brand-500)",
  },
  {
    icon: Plate,
    title: "Nutrition",
    body: "Scan a barcode or snap a plate to log macros and micronutrients without the tedious manual entry.",
    color: "var(--color-brand-600)",
  },
];

export function Metrics() {
  return (
    <Section id="features">
      <div className="text-center">
        <Eyebrow>Daily picture</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          Start the day knowing where you stand.
        </h2>
      </div>

      <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
        <div className="flex justify-center gap-4">
          <PhoneFrame>
            <SleepScreen />
          </PhoneFrame>
          <PhoneFrame className="mt-12 hidden sm:block">
            <NutritionScreen />
          </PhoneFrame>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-card border border-line bg-cloud p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span
                className="mb-4 grid size-11 place-items-center rounded-xl"
                style={{ background: "color-mix(in srgb, " + p.color + " 14%, white)", color: p.color }}
              >
                <p.icon className="size-5" />
              </span>
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
