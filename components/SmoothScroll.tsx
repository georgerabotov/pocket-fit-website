"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth/eased scrolling for standard pages (e.g. /app). The home page
 * runs its own Lenis inside the scroll-scrub, so only mount this where there
 * isn't already one. In-page anchor links route through Lenis.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href*="#"]',
      );
      if (!link) return;
      const url = new URL(link.href, location.href);
      // only smooth-scroll hash links that point somewhere on the current page
      // (e.g. "#features" or "/#download" while already on "/")
      if (url.pathname !== location.pathname || !url.hash || url.hash === "#") {
        return;
      }
      const target = document.querySelector(url.hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -72 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
