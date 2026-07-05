const APP_STORE = "https://apps.apple.com/gb/app/pocket-squats/id6748518785";
const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.pocketsquats&hl=en_GB";

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" fill="currentColor" className={className} aria-hidden>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden>
      <path
        fill="#00d3ff"
        d="M47 24C40 28 36 35 36 45v422c0 10 4 17 11 21l1 1 236-236v-6L48 23z"
      />
      <path
        fill="#00f076"
        d="M363 335 284 256v-6l79-79 2 1 94 53c27 15 27 40 0 55l-94 53z"
      />
      <path fill="#ffce00" d="M365 335 284 254l-1 2 234 234 3-2 45-25z" opacity="0" />
      <path fill="#ffcd00" d="M283 250l82-82 96 54c27 15 27 40 0 55l-96 54z" opacity="0" />
      <path fill="#ff3945" d="M283 262 48 497c8 8 21 9 35 1l283-160z" />
      <path fill="#ffce00" d="M366 168 83 8C70 0 57 1 48 9l235 235z" />
      <path fill="#ffcd00" d="M283 250l83 85 95-54c27-15 27-40 0-55l-95-54z" />
    </svg>
  );
}

export function StoreBadges({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  const base =
    "flex items-center gap-3 rounded-xl px-5 py-2.5 transition-transform hover:-translate-y-0.5";
  const skin = dark
    ? "bg-white text-stone-900"
    : "bg-stone-900 text-white";
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={APP_STORE}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${skin}`}
        aria-label="Download on the App Store"
      >
        <AppleLogo className="size-7" />
        <span className="flex flex-col leading-none text-left">
          <span className="text-[0.62rem]">Download on the</span>
          <span className="-mt-0.5 text-lg font-semibold tracking-tight">
            App Store
          </span>
        </span>
      </a>

      <a
        href={PLAY_STORE}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${skin}`}
        aria-label="Get it on Google Play"
      >
        <PlayLogo className="size-6" />
        <span className="flex flex-col leading-none text-left">
          <span className="text-[0.62rem] uppercase">Get it on</span>
          <span className="-mt-0.5 text-lg font-semibold tracking-tight">
            Google Play
          </span>
        </span>
      </a>
    </div>
  );
}
