import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Logo = (props: IconProps) => (
  <svg width={28} height={28} viewBox="0 0 32 32" fill="none" {...props}>
    <circle cx="16" cy="16" r="14" fill="var(--color-brand-500)" />
    <path
      d="M9 19c2.5 0 2.5-7 4.5-7s2 10 4 10 2.5-6 4.5-6"
      stroke="white"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Heart = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M19 14c1.5-1.5 2-3.5 2-5a4 4 0 0 0-7-2.5A4 4 0 0 0 7 9c0 1.5.5 3.5 2 5l5 5 5-5Z" />
  </svg>
);

export const Moon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
);

export const Bolt = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </svg>
);

export const Apple = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 7c0-2 1.5-3.5 3.5-3.5M16 12c0-2.5 1.5-4 3-4.5-1-1.5-2.5-2-4-1.8-1 .1-1.8.6-3 .6s-2-.5-3-.6c-2-.2-4 1-4.7 3.2-1 3 .2 7.5 1.7 9.7.7 1 1.5 2.2 2.7 2.2 1 0 1.4-.6 2.6-.6s1.6.6 2.6.6c1.2 0 2-1.1 2.7-2.2.5-.7.8-1.4 1-2-1.5-.6-2.6-2-2.6-4Z" />
  </svg>
);

export const Plate = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4.5" />
  </svg>
);

export const Drop = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
  </svg>
);

export const Shield = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Sparkle = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
  </svg>
);

export const Chat = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 5h16v11H9l-5 4V5Z" />
  </svg>
);

export const Bell = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M18 9a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
);

export const Book = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3V4Z" />
  </svg>
);

export const Calendar = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="4" y="5" width="16" height="16" rx="2" />
    <path d="M4 9h16M9 3v4M15 3v4" />
  </svg>
);

export const Dumbbell = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M3 9v6M6 6v12M18 6v12M21 9v6M6 12h12" />
  </svg>
);

export const Clock = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const Activity = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M3 12h4l2-6 4 14 2-8h6" />
  </svg>
);

export const Widget = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </svg>
);

export const Coffee = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M5 8h12v4a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8Z" />
    <path d="M17 9h2a2 2 0 0 1 0 4h-2M6 3v2M10 3v2M14 3v2" />
  </svg>
);

export const Star = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="m12 2 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.7 6.1 20.8l1.2-6.6L2.5 9.6l6.6-.9L12 2Z" />
  </svg>
);

export const Check = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="m5 12 5 5 9-11" />
  </svg>
);

export const Arrow = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
