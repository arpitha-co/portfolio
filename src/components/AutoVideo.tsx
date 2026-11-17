"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted, looping clip that only plays while on screen (saves CPU and data).
 * With reduced motion it doesn't autoplay; the poster shows and controls appear.
 */
export function AutoVideo({
  src,
  poster,
  label,
  className = "",
  controls = false,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
  /** Show play/pause/scrub controls (always shown for reduced-motion users). */
  controls?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(rm);
    if (rm || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
      controls={controls || reduced}
      className={className}
    />
  );
}
