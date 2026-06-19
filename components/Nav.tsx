import Link from "next/link";
import { Logo } from "./icons";
import { Button } from "./ui";

const links = [
  { label: "About", href: "#features" },
  { label: "The Lift", href: "/forme" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-cloud/80 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
        <Link href="#" className="flex items-center gap-2 font-semibold">
          <Logo />
          <span className="text-lg tracking-tight">Lumio</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="#login"
            className="hidden text-sm font-medium text-ink-soft transition-colors hover:text-ink sm:block"
          >
            Log in
          </Link>
          <Button>Download app</Button>
        </div>
      </nav>
    </header>
  );
}
