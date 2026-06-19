import { Section } from "./ui";

const stats = [
  { value: "1M+", label: "members tracking daily" },
  { value: "120M", label: "nights of sleep analyzed" },
  { value: "40+", label: "lab providers connected" },
  { value: "4.8★", label: "average app rating" },
];

const members = [
  { name: "Maya", note: "Half-marathon, first time", tone: "from-brand-200 to-brand-400" },
  { name: "Tomás", note: "Steadier afternoons", tone: "from-[#9aa6ff] to-[#6f7bff]" },
  { name: "Priya", note: "Resting HR −8 bpm", tone: "from-accent-soft to-accent" },
  { name: "Devon", note: "Sleeps through the night", tone: "from-brand-100 to-brand-300" },
  { name: "Sara", note: "Back to lifting", tone: "from-[#cdd4ff] to-[#9aa6ff]" },
  { name: "Leo", note: "Marathon training block", tone: "from-brand-200 to-brand-500" },
];

export function SocialProof() {
  const row = [...members, ...members];
  return (
    <Section>
      <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-4xl">
        Join over 1 million members on their health journey.
      </h2>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl font-bold text-brand-600">{s.value}</div>
            <div className="mt-1 text-sm text-ink-soft">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cloud to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cloud to-transparent" />
        <div className="flex w-max animate-marquee gap-4">
          {row.map((m, i) => (
            <div
              key={i}
              className={`flex aspect-[3/4] w-52 shrink-0 flex-col justify-end rounded-card bg-gradient-to-br ${m.tone} p-5`}
            >
              <p className="text-lg font-bold text-ink">{m.name}</p>
              <p className="text-sm font-medium text-ink/70">{m.note}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
