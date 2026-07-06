/* "Built for privacy" data disclaimer - slick dark-green card with a lock
   watermark, plus the platforms we're built on (AWS · Apple · Android). */

function ShieldBadge() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-7 text-violet-300" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 2.5v5.5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V5.5L12 3z" />
      <path d="M9 12l2 2 4-4.5" />
    </svg>
  );
}

function Aws() {
  return (
    <span className="flex flex-col items-center leading-none">
      <span className="text-[19px] font-extrabold tracking-tight">aws</span>
      <svg viewBox="0 0 48 12" className="mt-1 h-2 w-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4c13 9 29 9 42 0" />
        <path d="M39 6l6-2-1.5 6" />
      </svg>
    </span>
  );
}

function Apple() {
  return (
    <svg viewBox="0 0 384 512" className="h-7 w-auto" fill="currentColor" aria-label="Apple">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function Android() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-auto" fill="currentColor" aria-label="Android">
      <path d="M17.6 9.48l1.84-3.18a.38.38 0 0 0-.14-.52.38.38 0 0 0-.52.14l-1.87 3.24a11.43 11.43 0 0 0-8.82 0L6.22 5.92a.38.38 0 0 0-.52-.14.38.38 0 0 0-.14.52L7.4 9.48A10.81 10.81 0 0 0 2 18h20a10.81 10.81 0 0 0-4.4-8.52zM7 15.25a1.25 1.25 0 1 1 1.25-1.25A1.25 1.25 0 0 1 7 15.25zm10 0a1.25 1.25 0 1 1 1.25-1.25A1.25 1.25 0 0 1 17 15.25z" />
    </svg>
  );
}

export function PrivacySection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div
          data-reveal
          className="reveal relative overflow-hidden rounded-[2.25rem] px-6 py-20 text-center shadow-[0_40px_90px_-40px_rgba(49,24,96,0.65)] sm:py-24"
          style={{
            background:
              "radial-gradient(120% 130% at 12% 92%, rgba(139,92,246,0.5), transparent 46%), radial-gradient(120% 120% at 88% 6%, rgba(124,58,237,0.45), transparent 42%), linear-gradient(160deg,#170f2b 0%,#0b0716 55%,#0e0a1e 100%)",
          }}
        >
          {/* dotted texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          {/* shield watermark */}
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="currentColor"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[155%] -translate-x-1/2 -translate-y-1/2 text-white/[0.04]"
          >
            <path d="M12 1.4l9 3.2v7c0 5.9-3.9 9.9-9 11.7-5.1-1.8-9-5.8-9-11.7v-7l9-3.2z" />
          </svg>

          <div className="relative mx-auto max-w-xl">
            <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-inset ring-white/15 backdrop-blur">
              <ShieldBadge />
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-[2.6rem]">
              Built for privacy
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/55">
              Your data is yours. We never sell it - and we protect it with
              encryption and industry-standard security, every step of the way.
            </p>

            <div className="mt-11">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/35">
                Secured &amp; built on
              </p>
              <div className="mt-6 flex items-center justify-center gap-7 text-white/75 sm:gap-9">
                <Aws />
                <span className="text-lg font-light text-white/20">×</span>
                <Apple />
                <span className="text-lg font-light text-white/20">×</span>
                <Android />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
