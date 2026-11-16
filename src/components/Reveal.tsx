"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Fade-and-rise on first scroll into view.
 * Progressive: content is fully visible in the server HTML (good for SEO,
 * no-JS and crawlers). Only elements still below the fold are hidden after
 * hydration, then revealed by an IntersectionObserver. Respects reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.classList.add("reveal-pending");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ "--reveal-delay": `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}
