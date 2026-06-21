import { Section, Eyebrow } from "./ui";
import {
  Activity,
  Calendar,
  Dumbbell,
  Book,
  Coffee,
  Clock,
  Drop,
  Widget,
  Sparkle,
} from "./icons";

const features = [
  {
    icon: Activity,
    label: "Biological age",
    body: "One score that shows how you're aging and where to improve.",
  },
  {
    icon: Calendar,
    label: "Cycle tracking",
    body: "Understand your body's rhythm and train smarter around it.",
  },
  {
    icon: Dumbbell,
    label: "Strength training",
    body: "Log your lifts and watch your progress stack up.",
  },
  {
    icon: Book,
    label: "Journal",
    body: "Track your habits and connect the dots over time.",
  },
  {
    icon: Coffee,
    label: "Caffeine tracking",
    body: "Keep tabs on your coffee, tea, and everything in between.",
  },
  {
    icon: Clock,
    label: "Smart alarm",
    body: "Wake up at the right moment in your sleep cycle.",
  },
  {
    icon: Sparkle,
    label: "Activity status",
    body: "Let Pocket Fit know when you're traveling, sick, or back at it.",
  },
  {
    icon: Drop,
    label: "Water tracking",
    body: "Track every glass and hit your daily goal.",
  },
  {
    icon: Widget,
    label: "Home-screen widgets",
    body: "Style your home screen with beautifully crafted widgets.",
  },
];

export function FeatureGrid() {
  return (
    <Section className="border-y border-line bg-mist">
      <div className="text-center">
        <Eyebrow>And there&apos;s more</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          And that&apos;s not all.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-ink-soft">
          Pocket Fit also includes the following:
        </p>
      </div>

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.label}
            className="rounded-2xl border border-line bg-cloud p-5 shadow-sm transition-colors hover:border-brand-300"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <f.icon className="size-5" />
            </span>
            <h3 className="mt-3 font-bold">{f.label}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{f.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
