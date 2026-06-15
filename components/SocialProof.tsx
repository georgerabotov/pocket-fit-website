import { Section } from "./ui";

const stats = [
  { value: "1M+", label: "members tracking daily" },
  { value: "120M", label: "nights of sleep analyzed" },
  { value: "40+", label: "lab providers connected" },
  { value: "4.8★", label: "average app rating" },
];

const cards = [
  { name: "Maya", note: "ran her first half-marathon", tone: "bg-brand-100" },
  { name: "Tomás", note: "fixed his afternoon energy dips", tone: "bg-accent-soft" },
  { name: "Priya", note: "lowered resting heart rate by 8 bpm", tone: "bg-[#e7eaff]" },
  { name: "Devon", note: "finally sleeps through the night", tone: "bg-brand-50" },
];

export function SocialProof() {
  return (
    <Section>
      <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-4xl">
        Over a million people on their health journey.
      </h2>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-card border border-line bg-cloud p-6 text-center shadow-sm"
          >
            <div className="text-3xl font-bold text-brand-600">{s.value}</div>
            <div className="mt-1 text-sm text-ink-soft">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.name}
            className={`flex aspect-[4/5] flex-col justify-end rounded-card ${c.tone} p-5`}
          >
            <p className="text-lg font-bold">{c.name}</p>
            <p className="text-sm text-ink-soft">{c.note}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
