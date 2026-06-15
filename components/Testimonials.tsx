import { Section, Eyebrow } from "./ui";
import { Star } from "./icons";

const reviews = [
  {
    name: "Jordan R.",
    date: "Mar 2026",
    text: "A day in and I'm hooked. It's the first app that ties my ring, my runs, and my bloodwork into something I actually understand.",
  },
  {
    name: "Lena M.",
    date: "Feb 2026",
    text: "The morning readiness score is scary accurate. I stopped overtraining and my sleep has never been better.",
  },
  {
    name: "Sam K.",
    date: "Feb 2026",
    text: "The design is gorgeous and nothing feels cluttered. The AI answers are genuinely useful, not generic fluff.",
  },
  {
    name: "Aisha B.",
    date: "Jan 2026",
    text: "Finally one place for everything. Connecting my labs was a two-minute job and the explanations are clear.",
  },
  {
    name: "Marco V.",
    date: "Jan 2026",
    text: "Switched from three separate apps. Lumio replaced all of them and does it better.",
  },
];

function Card({ r }: { r: (typeof reviews)[number] }) {
  return (
    <figure className="w-80 shrink-0 rounded-card border border-line bg-cloud p-6 shadow-sm">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-4 text-accent" />
        ))}
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed text-ink-soft">
        “{r.text}”
      </blockquote>
      <figcaption className="mt-4 text-sm font-semibold">
        {r.name}{" "}
        <span className="font-normal text-ink-soft">· {r.date}</span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const row = [...reviews, ...reviews];
  return (
    <Section>
      <div className="text-center">
        <Eyebrow>Loved everywhere</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          Crafted with care, loved by members.
        </h2>
      </div>

      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cloud to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cloud to-transparent" />
        <div className="flex w-max animate-marquee gap-4">
          {row.map((r, i) => (
            <Card key={i} r={r} />
          ))}
        </div>
      </div>
    </Section>
  );
}
