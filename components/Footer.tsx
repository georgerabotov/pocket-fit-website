import Link from "next/link";
import { Logo } from "./icons";

const columns = [
  {
    title: "Company",
    links: ["About us", "Careers", "Blog"],
  },
  {
    title: "Product",
    links: ["Download app", "Knowledge base", "Release notes", "Roadmap"],
  },
  {
    title: "Support",
    links: ["FAQ", "Request a feature", "Report a bug", "Contact us"],
  },
  {
    title: "Legal",
    links: ["Terms of service", "Privacy policy"],
  },
];

const socials = ["Instagram", "X", "Reddit", "YouTube", "Facebook"];

export function Footer() {
  return (
    <footer className="border-t border-line bg-mist px-5 py-16">
      <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[1.5fr_repeat(4,1fr)]">
        <div>
          <Link href="#" className="flex items-center gap-2 font-semibold">
            <Logo />
            <span className="text-lg">Lumio</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-ink-soft">
            Your connected health coach. Wearables, labs, and nutrition in one
            clear picture.
          </p>
        </div>

        {columns.map((c) => (
          <div key={c.title}>
            <h4 className="text-sm font-semibold">{c.title}</h4>
            <ul className="mt-3 space-y-2">
              {c.links.map((l) => (
                <li key={l}>
                  <Link
                    href="#"
                    className="text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-6xl flex-col items-center justify-between gap-4 border-t border-line pt-6 text-sm text-ink-soft sm:flex-row">
        <p>© Lumio Health, Inc. 2026. A demo project.</p>
        <div className="flex gap-4">
          {socials.map((s) => (
            <Link key={s} href="#" className="transition-colors hover:text-ink">
              {s}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
