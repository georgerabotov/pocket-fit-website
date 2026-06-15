import { Section, Eyebrow, PhoneFrame } from "./ui";
import { Chat, Bell, Book, Dumbbell } from "./icons";
import { ChatScreen } from "./screens";

const features = [
  {
    icon: Chat,
    title: "Answers from your own data",
    body: "Ask why you feel off and get a reply grounded in last night's sleep, your HRV, and recent training — not generic advice.",
  },
  {
    icon: Bell,
    title: "Proactive check-ins",
    body: "Gentle nudges at the right moment: hydrate before a hot run, wind down earlier, or take a planned rest day.",
  },
  {
    icon: Book,
    title: "Sources you can trust",
    body: "Every insight links to the reasoning and the research behind it, so you can see exactly why Lumio suggested it.",
  },
  {
    icon: Dumbbell,
    title: "Plans that adapt to you",
    body: "Training sessions are generated from your goals and recovery, then adjusted automatically when life gets in the way.",
  },
];

export function Intelligence() {
  return (
    <Section id="intelligence">
      <div className="text-center">
        <Eyebrow>Lumio Intelligence</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          Go deeper with a coach that knows your numbers.
        </h2>
      </div>

      <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
        <div className="grid gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex gap-4 rounded-card border border-line bg-cloud p-5 shadow-sm"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <f.icon className="size-5" />
              </span>
              <div>
                <h3 className="font-bold">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {f.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative flex justify-center">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 m-auto size-72 rounded-full bg-brand-100 blur-3xl"
          />
          <PhoneFrame>
            <ChatScreen />
          </PhoneFrame>
        </div>
      </div>
    </Section>
  );
}
