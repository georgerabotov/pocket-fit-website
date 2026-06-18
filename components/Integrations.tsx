import { Section, Eyebrow } from "./ui";
import { Heart, Moon, Activity, Clock, Drop, Dumbbell } from "./icons";

const devices = [
  { label: "Smartwatches", icon: Clock },
  { label: "Smart rings", icon: Activity },
  { label: "Chest straps", icon: Heart },
  { label: "Sleep trackers", icon: Moon },
  { label: "Glucose sensors", icon: Drop },
  { label: "Gym equipment", icon: Dumbbell },
];

export function Integrations() {
  const row = [...devices, ...devices];
  return (
    <Section id="integrations" className="border-y border-line bg-mist">
      <div data-reveal className="text-center">
        <Eyebrow>Works with your gear</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          One home for every device you already wear.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-ink-soft">
          Lumio syncs across the wearables and sensors you own, so nothing lives
          in a silo.
        </p>
      </div>

      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-mist to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-mist to-transparent" />
        <div className="flex w-max animate-marquee gap-4">
          {row.map((d, i) => (
            <div
              key={i}
              className="flex items-center gap-3 whitespace-nowrap rounded-2xl border border-line bg-cloud px-6 py-4 shadow-sm"
            >
              <d.icon className="size-5 text-brand-600" />
              <span className="font-semibold">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
