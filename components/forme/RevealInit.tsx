"use client";

import { useEffect } from "react";

/** Fade-up reveal for the editorial sections of the /forme page. */
export function RevealInit() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("motion-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.2 },
    );
    document
      .querySelectorAll(".forme-scope [data-reveal]")
      .forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
