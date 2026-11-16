import type { ReactNode } from "react";

/** CSS-only entrance so the hero is visible even before (or without) JavaScript. */
export function HeroIntro({ children }: { children: ReactNode }) {
  return <div className="anim-hero">{children}</div>;
}
