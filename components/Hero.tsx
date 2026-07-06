import { Button, PhoneFrame } from "./ui";
import { Star } from "./icons";
import { DashboardScreen } from "./screens";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-16 sm:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,var(--color-brand-50),transparent)]"
      />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-cloud px-3 py-1 text-xs font-medium text-ink-soft">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 text-accent" />
              ))}
            </span>
            4.8 · 26K ratings worldwide
          </div>

          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Your connected
            <br />
            health coach.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg text-ink-soft lg:mx-0">
            Pocket Fit brings your wearables, lab results, and meals together into one
            clear daily picture - then a private AI coach helps you act on it.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <Button showArrow>Download app</Button>
            <Button href="#features" variant="ghost">
              See how it works
            </Button>
          </div>

          <p className="mt-5 text-xs text-ink-soft">
            Free to start · iOS &amp; Android · No card required
          </p>
        </div>

        <div className="relative flex justify-center">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 m-auto size-72 rounded-full bg-brand-100 blur-3xl"
          />
          <PhoneFrame className="animate-float">
            <DashboardScreen />
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}
