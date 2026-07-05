"use client";

import { useEffect, useRef, useState } from "react";

// NOTE: the questions are migrated verbatim from pocket-fit.app. The answers
// there are loaded client-side and were not present in the page source, so
// these answers are written to match the app and the other pages — swap them
// for the exact copy if it differs.
const FAQ: { q: string; a: string }[] = [
  {
    q: "What is Pocket Fit and how does it work?",
    a: "Pocket Fit is an AI fitness app that builds a personalized workout program around your real life. Tell it your goals, experience, schedule, and the equipment you have, and it generates a plan that adapts as you train — then guides you through each session with live exercise tracking.",
  },
  {
    q: "Who is Pocket Fit for?",
    a: "Anyone who wants structured, effective training without hiring a personal trainer — from complete beginners taking their first session to experienced lifters who want smarter programming. It works whether you train at a full gym, at home, or somewhere in between.",
  },
  {
    q: "How is Pocket Fit different from other fitness apps?",
    a: "Most apps hand you a static plan and leave you to follow it. Pocket Fit generates a program tailored to you and keeps adapting it to your progress, schedule, and the equipment available — with an AI coach you can talk to and live tracking built in.",
  },
  {
    q: "Do I need gym equipment to use Pocket Fit?",
    a: "No. Pocket Fit builds your workouts around whatever you have — a fully kitted gym, a few dumbbells at home, or just your bodyweight. Update your available equipment any time and your plan adjusts.",
  },
  {
    q: "How do I get started with Pocket Fit?",
    a: "Download the app, answer a few quick questions about your goals, experience, and schedule, and Pocket Fit generates your first personalized program. You can start your first workout straight away.",
  },
  {
    q: "Is Pocket Fit free to use?",
    a: "You can get started for free. A subscription unlocks full access — personalized AI programs, live workouts with tracking, scheduling, advanced analytics, and the AI coach. See the Pricing page for current plans.",
  },
  {
    q: "How does Pocket Fit protect my data and privacy?",
    a: "Your data is used to personalize your training and is never sold. You can request access to or deletion of your personal data at any time. Full details are in our Privacy Policy.",
  },
  {
    q: "Can I use Pocket Fit if I’m injured or recovering?",
    a: "Yes. You can let Pocket Fit know about injuries or limitations and it will work around them when building your sessions. Always consult a healthcare provider before starting or changing any program.",
  },
  {
    q: "How does Pocket Fit track my progress?",
    a: "Pocket Fit logs your workouts as you go and gives you advanced analytics — including body weight and exercise progression over time — so you can see exactly how you’re improving and your plan can adapt to it.",
  },
];

/** Adds `is-visible` to children as they scroll into view, for staggered reveals. */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

function Item({
  q,
  a,
  index,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      data-reveal
      style={{ transitionDelay: `${index * 60}ms` }}
      className="translate-y-5 opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [&.is-visible]:translate-y-0 [&.is-visible]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none"
    >
      <div className="group relative border-b border-stone-200">
        {/* animated left accent bar */}
        <span
          aria-hidden
          className={`absolute left-0 top-1/2 w-[3px] -translate-y-1/2 rounded-full bg-violet-500 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "h-[calc(100%-1.25rem)] opacity-100" : "h-0 opacity-0"
          }`}
        />

        <button
          onClick={onToggle}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 py-5 pl-6 text-left"
        >
          <span
            className={`text-lg font-semibold transition-all duration-300 ${
              open
                ? "text-violet-700"
                : "text-stone-900 group-hover:translate-x-2 group-hover:text-violet-700"
            }`}
          >
            {q}
          </span>

          {/* animated +/✕ icon */}
          <span
            className={`relative grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 ${
              open
                ? "rotate-[135deg] border-violet-500 bg-violet-500/10"
                : "rotate-0 border-stone-300"
            }`}
          >
            <span
              className={`absolute h-[1.5px] w-3.5 rounded-full transition-colors duration-300 ${
                open ? "bg-violet-600" : "bg-stone-500"
              }`}
            />
            <span
              className={`absolute h-3.5 w-[1.5px] rounded-full transition-colors duration-300 ${
                open ? "bg-violet-600" : "bg-stone-500"
              }`}
            />
          </span>
        </button>

        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <p
              className={`max-w-2xl pb-6 pl-6 leading-relaxed text-stone-600 transition-all duration-500 ${
                open
                  ? "translate-y-0 opacity-100 delay-100"
                  : "-translate-y-2 opacity-0"
              }`}
            >
              {a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const listRef = useReveal<HTMLDivElement>();
  // single-open accordion — opening one closes the previous
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  // slide the coaches out of the way once you reach the footer
  const [nearFooter, setNearFooter] = useState(false);
  useEffect(() => {
    const onScroll = () =>
      setNearFooter(
        window.innerHeight + window.scrollY >
          document.documentElement.scrollHeight - 380,
      );
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const coachWrap = (side: "left" | "right") =>
    `pointer-events-none fixed bottom-0 z-30 hidden select-none transition-all duration-500 xl:block ${
      side === "left" ? "left-0" : "right-0"
    } ${nearFooter ? "translate-y-16 opacity-0" : "translate-y-0 opacity-100"}`;
  const coachImg =
    "pointer-events-auto h-[min(56vh,480px)] w-auto origin-bottom cursor-pointer drop-shadow-[0_24px_30px_rgba(15,23,20,0.18)] transition-transform duration-300 ease-out hover:-translate-y-3 hover:scale-[1.06]";

  return (
    <div className="relative">
      {/* Interactive coaches — fixed to the viewport corners on wide screens */}
      <div className={coachWrap("left")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/journey/fit-female.png" alt="" aria-hidden className={coachImg} />
      </div>
      <div className={coachWrap("right")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/journey/kai12.png" alt="" aria-hidden className={coachImg} />
      </div>

      <section className="relative z-10 mx-auto w-full max-w-3xl px-5 py-20 sm:py-28">
        <div className="text-center">
          <p className="faq-head text-xs font-semibold uppercase tracking-[0.3em] text-violet-700">
            FAQ
          </p>
          <h1 className="faq-head mt-4 font-[family-name:var(--font-fraunces)] text-4xl font-semibold tracking-tight text-stone-900 [animation-delay:120ms] sm:text-5xl">
            All You Need to Know
          </h1>
        </div>

        <div ref={listRef} className="mt-12">
          {FAQ.map((f, i) => (
            <Item
              key={f.q}
              index={i}
              q={f.q}
              a={f.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
