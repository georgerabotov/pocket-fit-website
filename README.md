# Lumio Health — landing page

A marketing landing page for **Lumio**, a fictional "connected health coach" product
that unifies wearables, lab results, and nutrition with a private AI coach.

> This is an **original, inspired-by** build. It mirrors the *structure and UX patterns*
> of a connected-health landing page but uses entirely original copy, branding, iconography,
> and mock UI. "Lumio" is a placeholder brand — rename it to whatever you like.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [Tailwind CSS v4](https://tailwindcss.com/)
- TypeScript
- Zero external UI deps — all icons and device mockups are hand-built SVG/CSS

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm start        # serve production build
```

## Page anatomy

The page (`app/page.tsx`) is composed of section components in `components/`:

| Section | File | Purpose |
|---|---|---|
| Nav | `Nav.tsx` | Sticky top bar + CTA |
| Hero | `Hero.tsx` | Headline, rating badge, phone mockup |
| Integrations | `Integrations.tsx` | "Works with" device marquee |
| Social proof | `SocialProof.tsx` | Member stats + story cards |
| Metrics | `Metrics.tsx` | Strain / Sleep / Recovery / Nutrition |
| Records | `Records.tsx` | Lab/bloodwork integration + provider grid |
| Intelligence | `Intelligence.tsx` | AI coaching features |
| Feature grid | `FeatureGrid.tsx` | Secondary feature checklist |
| Privacy | `Privacy.tsx` | Trust / privacy callout |
| Testimonials | `Testimonials.tsx` | Review carousel |
| Final CTA | `FinalCta.tsx` | Closing call to action |
| Footer | `Footer.tsx` | Link columns + socials |

Shared building blocks live in `components/ui.tsx` (Button, Section, PhoneFrame),
`components/icons.tsx` (SVG icon set), and `components/screens.tsx` (phone-screen mockups).

## Customizing

- **Brand name:** find/replace `Lumio` across `components/` and `app/layout.tsx`.
- **Colors:** edit the `@theme` block in `app/globals.css` (`--color-brand-*`, `--color-accent`).
- **Copy:** all text lives inline in each section component.
- **Real images:** the phone screens and member cards use CSS/SVG mockups — swap in
  `next/image` assets when you have real product screenshots.
