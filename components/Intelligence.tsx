import { Section, Eyebrow, FeatureBlock } from "./ui";
import { ChatScreen } from "./screens";
import { ProactiveScreen, SourcesScreen, TrainingScreen } from "./screens2";

export function Intelligence() {
  return (
    <Section id="intelligence">
      <div className="text-center">
        <Eyebrow>Lumio Intelligence</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          Go deeper with your own 24/7 coach.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-ink-soft">
          Personalized guidance and practical advice, grounded in your own
          metrics.
        </p>
      </div>

      <div className="mt-16 space-y-20 sm:space-y-28">
        <FeatureBlock
          eyebrow="Get answers"
          title="Answers from your own data."
          body="Ask anything about how you feel and get a reply grounded in your sleep, HRV, and recent training — not generic advice."
          screen={<ChatScreen />}
        />
        <FeatureBlock
          flip
          eyebrow="Proactive"
          title="Reminders before you ask."
          body="Daily summaries and well-timed nudges show up on their own, so the right move is always one tap away."
          screen={<ProactiveScreen />}
        />
        <FeatureBlock
          eyebrow="Trusted sources"
          title="Findings you can trust."
          body="Every insight links to the latest research and reputable sources, so you can see exactly why Lumio suggested it."
          screen={<SourcesScreen />}
        />
        <FeatureBlock
          flip
          eyebrow="Training plans"
          title="Personalized training plans."
          body="Generate workouts and full plans tailored to your goals and schedule, then have them adjust automatically when life gets in the way."
          screen={<TrainingScreen />}
        />
      </div>
    </Section>
  );
}
