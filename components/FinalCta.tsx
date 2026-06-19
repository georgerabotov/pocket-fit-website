import { Section, Button } from "./ui";

export function FinalCta() {
  return (
    <Section id="download">
      <div className="rounded-card border border-line bg-gradient-to-b from-brand-50 to-cloud px-6 py-16 text-center">
        <h2 className="mx-auto max-w-xl text-3xl font-bold tracking-tight sm:text-5xl">
          Ready when you are.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink-soft">
          Start with one step. Connect a device, log a meal, ask a question —
          Lumio builds your picture from there.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button showArrow>Download app</Button>
          <Button href="#features" variant="ghost">
            Explore features
          </Button>
        </div>
        <p className="mt-5 text-xs text-ink-soft">
          Free to start · iOS &amp; Android
        </p>
      </div>
    </Section>
  );
}
