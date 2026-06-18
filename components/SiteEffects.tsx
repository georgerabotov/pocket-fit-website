"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Client-only effects that reproduce the source site's motion feel:
 *  - Lenis smooth/eased momentum scrolling
 *  - Scroll-reveal (fade + translateY) via IntersectionObserver, with stagger
 *
 * Reveal hiding is gated behind the `motion-ready` class so content stays
 * visible if JS never runs, and is skipped entirely under prefers-reduced-motion.
 */
export function SiteEffects() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // --- Reveal on scroll -----------------------------------------------
    let io: IntersectionObserver | undefined;
    if (!reduce) {
      document.documentElement.classList.add("motion-ready");

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;

            if (el.hasAttribute("data-reveal-stagger")) {
              const step = Number(el.dataset.revealStagger) || 90;
              Array.from(el.children).forEach((child, i) => {
                (child as HTMLElement).style.transitionDelay = `${i * step}ms`;
                child.classList.add("is-visible");
              });
            } else {
              el.classList.add("is-visible");
            }
            io!.unobserve(el);
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
      );

      document
        .querySelectorAll("[data-reveal], [data-reveal-stagger]")
        .forEach((el) => io!.observe(el));
    }

    // --- Smooth scroll ---------------------------------------------------
    let lenis: Lenis | undefined;
    let rafId = 0;
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
      const raf = (time: number) => {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    // In-page anchor links should ride Lenis (or fall back to native smooth).
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -72 });
      else target.scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("click", onClick);

    return () => {
      io?.disconnect();
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
