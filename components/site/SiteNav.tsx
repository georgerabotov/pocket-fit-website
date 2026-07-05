"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Our Story", href: "/our-story", featured: true },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Members", href: "https://members.pocket-fit.app", external: true },
] as const;

function isActive(pathname: string, href: string) {
  if (href.startsWith("http")) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteNav() {
  const pathname = usePathname();
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const [drag, setDrag] = useState<number | null>(null);
  const ds = useRef({ active: false, grabDX: 0, moved: false, left: 0 });

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      '[data-active="true"]',
    );
    setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [pathname]);

  const onDown = (e: React.PointerEvent) => {
    if (!pill || !listRef.current) return;
    const x = e.clientX - listRef.current.getBoundingClientRect().left;
    if (x < pill.left - 8 || x > pill.left + pill.width + 8) return; // not on the pill
    ds.current = { active: true, grabDX: x - pill.left, moved: false, left: pill.left };
    setDrag(pill.left);
    listRef.current.setPointerCapture(e.pointerId);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!ds.current.active || !listRef.current || !pill) return;
    const x = e.clientX - listRef.current.getBoundingClientRect().left;
    let left = x - ds.current.grabDX;
    left = Math.max(0, Math.min(listRef.current.clientWidth - pill.width, left));
    if (Math.abs(left - pill.left) > 3) ds.current.moved = true;
    ds.current.left = left;
    setDrag(left);
  };

  const onUp = (e: React.PointerEvent) => {
    if (!ds.current.active) return;
    ds.current.active = false;
    try {
      listRef.current?.releasePointerCapture(e.pointerId);
    } catch {}
    if (ds.current.moved && listRef.current && pill) {
      const center = ds.current.left + pill.width / 2;
      const targets = Array.from(
        listRef.current.querySelectorAll<HTMLElement>("[data-href]"),
      );
      let best: HTMLElement | null = null;
      let bd = Infinity;
      for (const t of targets) {
        const c = t.offsetLeft + t.offsetWidth / 2;
        const d = Math.abs(c - center);
        if (d < bd) {
          bd = d;
          best = t;
        }
      }
      const href = best?.getAttribute("data-href");
      setDrag(null);
      if (href && !isActive(pathname, href)) router.push(href);
      return;
    }
    setDrag(null);
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (ds.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      ds.current.moved = false;
    }
  };

  const left = drag ?? pill?.left ?? 0;
  const isHome = pathname === "/";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-4">
      <nav className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/50 bg-white/45 p-1.5 pl-2 shadow-[0_10px_40px_-8px_rgba(23,23,31,0.28)] ring-1 ring-inset ring-white/40 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/40">
        {/* Logo → home, with a "Home" tooltip */}
        <div className="group relative flex items-center rounded-full py-1 pl-1 pr-2">
          {isHome ? (
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-gradient-to-b from-white/95 to-white/70 shadow-[0_2px_10px_rgba(23,23,31,0.12)] ring-1 ring-inset ring-white/70 backdrop-blur"
            />
          ) : null}
          <Link
            href="/"
            aria-label="Pocket Fit — home"
            aria-current={isHome ? "page" : undefined}
            className="relative z-10 flex items-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Pocket Fit"
              className="h-6 w-auto cursor-pointer transition-transform duration-200 group-hover:scale-105"
            />
          </Link>
          <span className="pointer-events-none absolute left-1/2 top-full mt-2.5 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-stone-900 px-2.5 py-1 text-[0.65rem] font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
            <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" />
            </svg>
            Home
          </span>
        </div>

        <div
          ref={listRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onClickCapture={onClickCapture}
          style={{ touchAction: "none", cursor: drag != null ? "grabbing" : undefined }}
          className="relative hidden items-center gap-1 md:flex"
        >
          {/* draggable liquid-glass balloon indicator */}
          <span
            aria-hidden
            className={`absolute inset-y-0 z-0 rounded-full bg-gradient-to-b from-white/95 to-white/70 ring-1 ring-inset ring-white/70 backdrop-blur ${
              pill ? "opacity-100" : "opacity-0"
            } ${
              drag != null
                ? "scale-105 shadow-[0_8px_20px_-4px_rgba(124,58,237,0.4)] ring-violet-300"
                : "shadow-[0_2px_10px_rgba(23,23,31,0.12)] transition-[left,width,opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            }`}
            style={pill ? { left, width: pill.width } : undefined}
          />

          {links.map((l) => {
            const active = isActive(pathname, l.href);
            const cls = `relative z-10 select-none rounded-full px-3 py-2 text-sm transition-colors ${
              active
                ? "cursor-grab font-semibold text-violet-700"
                : "font-medium text-stone-600 hover:text-stone-900"
            }`;
            return "external" in l && l.external ? (
              <a key={l.href} href={l.href} className={cls}>
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                data-href={l.href}
                data-active={active}
                className={cls}
              >
                {l.label}
                {"featured" in l && l.featured && !active ? (
                  <span
                    aria-hidden
                    className="absolute -right-0.5 top-1.5 size-1.5 rounded-full bg-violet-500 ring-2 ring-white/80"
                  />
                ) : null}
              </Link>
            );
          })}
        </div>

        <a
          href="/#download"
          className="ml-1 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-violet-700"
        >
          Download
        </a>
      </nav>
    </div>
  );
}
