import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./icons";

export function Button({
  children,
  href = "#download",
  variant = "primary",
  showArrow = false,
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "dark";
  showArrow?: boolean;
}) {
  const styles = {
    primary:
      "bg-brand-500 text-white hover:bg-brand-600 shadow-[0_8px_24px_-8px_var(--color-brand-500)]",
    ghost: "bg-mist text-ink hover:bg-line",
    dark: "bg-ink text-white hover:bg-ink-soft",
  }[variant];

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${styles}`}
    >
      {children}
      {showArrow && (
        <Arrow className="size-4 transition-transform group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
      {children}
    </span>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-5 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

/** A full-width alternating block: phone screen on one side, copy + cards on the other. */
export function FeatureBlock({
  eyebrow,
  title,
  body,
  screen,
  cards,
  flip = false,
}: {
  eyebrow?: ReactNode;
  title: string;
  body: string;
  screen: ReactNode;
  cards?: { label: string; value: string }[];
  flip?: boolean;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div className={`flex justify-center ${flip ? "lg:order-2" : ""}`}>
        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 m-auto size-64 rounded-full bg-brand-100 blur-3xl"
          />
          <PhoneFrame>{screen}</PhoneFrame>
        </div>
      </div>
      <div className={flip ? "lg:order-1" : ""}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h3>
        <p className="mt-3 max-w-md text-ink-soft">{body}</p>
        {cards && (
          <div className="mt-6 grid max-w-md grid-cols-2 gap-3">
            {cards.map((c) => (
              <div
                key={c.label}
                className="rounded-2xl border border-line bg-cloud p-4 shadow-sm"
              >
                <p className="text-xs text-ink-soft">{c.label}</p>
                <p className="text-xl font-bold">{c.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** A stylized phone frame that wraps arbitrary "screen" content. */
export function PhoneFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative w-[260px] rounded-[2.5rem] border-[6px] border-ink bg-ink p-1.5 shadow-2xl ${className}`}
    >
      <div className="absolute left-1/2 top-2.5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />
      <div className="relative h-[520px] overflow-hidden rounded-[2rem] bg-mist">
        {children}
      </div>
    </div>
  );
}
