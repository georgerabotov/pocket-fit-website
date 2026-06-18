import { Section, Eyebrow, FeatureBlock } from "./ui";
import { SleepScreen, NutritionScreen } from "./screens";
import { StrainScreen, RecoveryScreen } from "./screens2";

export function Metrics() {
  return (
    <Section id="features">
      <div data-reveal className="text-center">
        <Eyebrow>Daily picture</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          Start the day with confidence.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-ink-soft">
          Turn your body&apos;s signals into a handful of clear numbers you can
          actually act on.
        </p>
      </div>

      <div className="mt-16 space-y-20 sm:space-y-28">
        <FeatureBlock
          eyebrow="Strain"
          title="Know how hard you pushed."
          body="One effort score captures your whole day, from a steady commute to an all-out session, so you can tell when you've done enough."
          screen={<StrainScreen />}
          cards={[
            { label: "Effort score", value: "65" },
            { label: "Energy burned", value: "2,140" },
          ]}
        />

        <FeatureBlock
          flip
          eyebrow="Sleep"
          title="Understand your rest."
          body="A stage-by-stage breakdown with a nightly sleep-need target that adapts to the load you carried during the day."
          screen={<SleepScreen />}
          cards={[
            { label: "Time asleep", value: "8h 12m" },
            { label: "Efficiency", value: "94%" },
          ]}
        />

        <FeatureBlock
          eyebrow="Recovery"
          title="See if you're ready."
          body="A simple morning readiness score built from heart-rate variability, resting heart rate, and last night's rest tells you when to push and when to ease off."
          screen={<RecoveryScreen />}
          cards={[
            { label: "Readiness", value: "70%" },
            { label: "HRV", value: "68 ms" },
          ]}
        />

        <FeatureBlock
          flip
          eyebrow="Nutrition"
          title="Understand what you eat."
          body="Scan a barcode or snap a plate to log macros and micronutrients in seconds — no tedious manual entry."
          screen={<NutritionScreen />}
          cards={[
            { label: "Logged today", value: "312 kcal" },
            { label: "Protein", value: "32%" },
          ]}
        />
      </div>
    </Section>
  );
}
