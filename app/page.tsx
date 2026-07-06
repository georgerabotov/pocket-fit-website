import type { Metadata } from "next";
import Link from "next/link";
import { Fraunces, Jost } from "next/font/google";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { StoreBadges } from "@/components/site/StoreBadges";
import { HeroCharacter } from "@/components/site/HeroCharacter";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Reveal } from "@/components/site/Reveal";
import { CylinderCarousel } from "@/components/site/CylinderCarousel";
import { RateVideo } from "@/components/site/RateVideo";
import { FeatureShowcase } from "@/components/site/FeatureShowcase";
import { AiIntelligence } from "@/components/site/AiIntelligence";
import { MoreFeatures } from "@/components/site/MoreFeatures";
import { PrivacySection } from "@/components/site/PrivacySection";
import { Reviews } from "@/components/site/Reviews";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
});
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Pocket Fit - AI workouts around your real life",
  description:
    "Pocket Fit is a simple fitness app that builds personalized, AI-generated workout programs around your goals, equipment, and schedule. Live now on iOS and Android.",
};

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto w-full max-w-6xl px-5 ${className}`}>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <div
      className={`${fraunces.variable} ${jost.variable} min-h-screen bg-white font-[family-name:var(--font-jost)] text-stone-800`}
    >
      <SmoothScroll />
      <Reveal />
      <SiteNav />

      <main>
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(60%_60%_at_50%_0%,#ede9fe,transparent)]"
          />

          {/* Character pushes the phone in - hover to replay. Desktop only here;
              on mobile it lives under the Apple Watch pill so it doesn't overlap
              the hero copy. */}
          <HeroCharacter className="absolute bottom-0 left-0 z-0 hidden sm:block" />

          {/* Hero copy */}
          <Section className="relative z-10 pb-16 pt-28 text-center sm:pb-24 sm:pt-32">
            <span
              data-reveal
              className="reveal inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-600"
            >
              <span className="text-amber-400">★★★★★</span>
              Live on iOS &amp; Android
            </span>
            <h1
              data-reveal
              style={{ transitionDelay: "80ms" }}
              className="reveal mx-auto mt-5 max-w-2xl font-[family-name:var(--font-jost)] text-4xl font-semibold leading-[1.06] tracking-[-0.02em] text-stone-900 sm:text-5xl"
            >
              Workouts that fit your real life.
            </h1>
            <p
              data-reveal
              style={{ transitionDelay: "160ms" }}
              className="reveal mx-auto mt-4 max-w-md text-base text-stone-500"
            >
              Pocket Fit builds a personalised, AI-generated training program
              around your goals, equipment, and schedule. Focus on your gains,
              not the planning.
            </p>

            <div
              data-reveal
              style={{ transitionDelay: "240ms" }}
              className="reveal"
            >
              <StoreBadges className="mt-8 justify-center" />
            </div>

            <p
              data-reveal
              style={{ transitionDelay: "320ms" }}
              className="reveal mt-5 text-xs text-stone-400"
            >
              Free to get started · Personalised in minutes · No card required
            </p>
          </Section>
        </div>

        {/* Works with - Apple Watch */}
        <Section className="pb-16 text-center">
          <div
            data-reveal
            className="reveal group inline-flex items-center gap-2.5 rounded-full border border-stone-200/80 bg-white/70 py-2 pl-3 pr-4 text-sm text-stone-600 shadow-[0_6px_24px_-10px_rgba(23,23,31,0.3)] ring-1 ring-inset ring-white/60 backdrop-blur-md transition-transform hover:-translate-y-0.5"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-violet-500" />
            </span>
            <span className="font-medium">Works with</span>
            <span className="flex items-center gap-1.5 font-semibold text-stone-900">
              <svg viewBox="0 0 384 512" className="size-4" fill="currentColor" aria-hidden>
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              Apple Watch
            </span>
          </div>

          {/* mobile: character pushes the phone in here, clear of the hero copy */}
          <div className="mt-8 flex justify-center overflow-hidden sm:hidden">
            <HeroCharacter
              className="relative z-0"
              videoClassName="h-[240px] w-auto"
            />
          </div>
        </Section>

        {/* Feature grid - "See the whole picture" */}
        <FeatureShowcase />

        {/* AI coach intelligence (pinned-phone scroller) */}
        <AiIntelligence />

        {/* And that's not all - feature list that switches phone screens */}
        <MoreFeatures />

        {/* Community carousel */}
        <div className="overflow-hidden py-20">
          <div className="mx-auto max-w-2xl px-5 text-center">
            <p
              data-reveal
              className="reveal text-xs font-semibold uppercase tracking-[0.3em] text-violet-700"
            >
              The crew
            </p>
            <h2
              data-reveal
              style={{ transitionDelay: "80ms" }}
              className="reveal mt-4 font-[family-name:var(--font-fraunces)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl"
            >
              Better with your crew
            </h2>
            <p
              data-reveal
              style={{ transitionDelay: "160ms" }}
              className="reveal mx-auto mt-4 max-w-md text-base text-stone-500"
            >
              Share every session, cheer each other on, and stay accountable.
              Pocket Fit is just getting started - grab your spot in the first
              wave. Drag to spin.
            </p>
          </div>
          <div data-reveal className="reveal mt-12">
            <CylinderCarousel />
          </div>
        </div>

        {/* Privacy disclaimer */}
        <PrivacySection />

        {/* Pricing teaser */}
        <Section className="py-20 text-center">
          <p
            data-reveal
            className="reveal text-xs font-semibold uppercase tracking-[0.3em] text-violet-700"
          >
            Pricing
          </p>
          <h2
            data-reveal
            style={{ transitionDelay: "80ms" }}
            className="reveal mt-4 font-[family-name:var(--font-fraunces)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl"
          >
            One plan, total access
          </h2>
          <p
            data-reveal
            style={{ transitionDelay: "160ms" }}
            className="reveal mx-auto mt-4 max-w-md text-stone-500"
          >
            Full access from{" "}
            <span className="font-semibold text-stone-900">$9.99/mo</span> - or
            save 50% at{" "}
            <span className="font-semibold text-stone-900">$59.99/year</span>.
          </p>
          <div
            data-reveal
            style={{ transitionDelay: "240ms" }}
            className="reveal"
          >
            <Link
              href="/pricing"
              className="mt-8 inline-block rounded-full bg-stone-900 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
            >
              See plans
            </Link>
          </div>
        </Section>

        {/* Reviews marquee */}
        <Reviews />

        {/* Download CTA */}
        <Section className="pb-24">
          <div
            id="download"
            data-reveal
            className="reveal relative scroll-mt-24 overflow-hidden rounded-3xl bg-stone-900 px-6 py-16 text-center"
          >
            {/* Spinning orbit video background (2× - smooth on 24fps source) */}
            <RateVideo
              rate={2}
              src="/orbit.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-60"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-stone-900/70 via-stone-900/40 to-stone-900/80"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(50%_80%_at_50%_0%,rgba(124,58,237,0.3),transparent)]"
            />
            <h2 className="relative z-10 font-[family-name:var(--font-fraunces)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              We&rsquo;re live on iOS and Android
            </h2>
            <p className="relative z-10 mx-auto mt-4 max-w-md text-stone-300">
              Download Pocket Fit and get your first personalised program today.
            </p>
            <StoreBadges className="relative z-10 mt-8 justify-center" dark />
          </div>
        </Section>
      </main>

      <SiteFooter />
    </div>
  );
}
