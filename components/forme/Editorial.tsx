export function Editorial() {
  return (
    <>
      <section className="relative bg-forme-bone px-6 py-32 sm:py-44">
        <div className="mx-auto max-w-3xl text-center">
          <p data-reveal className="label mb-10">
            The Philosophy
          </p>
          <p
            data-reveal
            className="display text-[clamp(1.8rem,4vw,3.2rem)] leading-tight text-forme-espresso"
          >
            Strength is not loud. It is composed - a single, deliberate line
            drawn from the floor to full extension, then returned with the same
            intention it began.
          </p>
        </div>
      </section>

      <section className="border-y border-forme-line bg-forme-bone-deep px-6 py-28">
        <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-3">
          {[
            {
              n: "I",
              t: "Tempo",
              d: "Movement measured in breath, not in haste. The descent earns the lift.",
            },
            {
              n: "II",
              t: "Form",
              d: "A neutral spine, a braced core, the bar tracing the body the whole way.",
            },
            {
              n: "III",
              t: "Intent",
              d: "Every repetition chosen on purpose. Nothing left to momentum.",
            },
          ].map((p) => (
            <div key={p.n} data-reveal className="text-center">
              <div className="display mb-4 text-3xl text-forme-gold">{p.n}</div>
              <h3 className="display mb-3 text-2xl">{p.t}</h3>
              <p className="body-sans mx-auto max-w-xs text-sm leading-relaxed text-forme-stone">
                {p.d}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-forme-bone px-6 py-32 text-center">
      <div data-reveal>
        <p className="label mb-8">Pocket Fit</p>
        <h2 className="display text-[clamp(2.4rem,6vw,5rem)]">
          The art of the lift.
        </h2>
        <a
          href="/pricing"
          className="body-sans mt-12 inline-block rounded-full border border-forme-ink px-10 py-4 text-xs uppercase tracking-[0.3em] text-forme-ink transition-colors hover:bg-forme-ink hover:text-forme-bone"
        >
          About our app
        </a>
        <p className="body-sans mt-16 text-xs tracking-widest text-forme-stone">
          © Pocket Fit · 2026
        </p>
      </div>
    </footer>
  );
}
