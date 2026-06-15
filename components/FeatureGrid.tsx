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
  { icon: Activity, label: "Biological age" },
  { icon: Calendar, label: "Cycle tracking" },
  { icon: Dumbbell, label: "Strength logs" },
  { icon: Book, label: "Daily journal" },
  { icon: Coffee, label: "Caffeine tracking" },
  { icon: Clock, label: "Smart alarm" },
  { icon: Sparkle, label: "Activity status" },
  { icon: Drop, label: "Water tracking" },
  { icon: Widget, label: "Home-screen widgets" },
];

export function FeatureGrid() {
  return (
    <Section className="border-y border-line bg-mist">
      <div className="text-center">
        <Eyebrow>And there&apos;s more</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          Everything else you&apos;d want in one place.
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.label}
            className="flex items-center gap-3 rounded-2xl border border-line bg-cloud p-4 shadow-sm transition-colors hover:border-brand-300"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <f.icon className="size-5" />
            </span>
            <span className="font-semibold">{f.label}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
