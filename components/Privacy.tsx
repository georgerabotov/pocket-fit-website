import { Section } from "./ui";
import { Shield } from "./icons";

export function Privacy() {
  return (
    <Section id="privacy">
      <div className="relative overflow-hidden rounded-card bg-ink px-6 py-16 text-center text-cloud">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,var(--color-brand-700),transparent_40%),radial-gradient(circle_at_80%_70%,#3b4bd8,transparent_40%)]"
        />
        <div className="relative">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-white/10 text-brand-300">
            <Shield className="size-7" />
          </span>
          <h2 className="mx-auto mt-6 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
            Built for privacy, by default.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/70">
            Your health data is yours. We never sell it and never share it with
            advertisers. Records are encrypted in transit and at rest, and you
            can export or delete everything at any time.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
            {["End-to-end encryption", "No data selling", "One-tap export", "Delete anytime"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 font-medium"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
