import { Section, Eyebrow, PhoneFrame } from "./ui";
import { RecordsScreen } from "./screens";

const providers = [
  "City Labs",
  "MedCheck",
  "VitaPath",
  "ClearDraw",
  "NorthLab",
  "BioPoint",
  "Sequence",
  "HealthArc",
  "TrueAssay",
  "Veritas Dx",
  "CoreLabs",
  "Apex Bio",
];

export function Records() {
  return (
    <Section className="border-y border-line bg-mist">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div data-reveal className="order-2 lg:order-1">
          <Eyebrow>Bloodwork &amp; records</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Bring your lab results into the picture.
          </h2>
          <p className="mt-3 max-w-md text-ink-soft">
            Connect your test providers and Lumio reads your bloodwork, flags
            what&apos;s drifting out of range, and explains it in plain language
            alongside your daily metrics.
          </p>

          <div data-reveal-stagger="50" className="mt-8 grid grid-cols-3 gap-2">
            {providers.map((p) => (
              <div
                key={p}
                className="grid h-12 place-items-center rounded-xl border border-line bg-cloud text-xs font-semibold text-ink-soft"
              >
                {p}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-soft">
            + 30 more providers. Sample names shown for illustration.
          </p>
        </div>

        <div data-reveal className="order-1 flex justify-center lg:order-2">
          <PhoneFrame>
            <RecordsScreen />
          </PhoneFrame>
        </div>
      </div>
    </Section>
  );
}
