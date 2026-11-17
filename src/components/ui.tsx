import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Section wrapper with a consistent telemetry-style eyebrow and serif title. */
export function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative border-t border-line py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-fg-dim uppercase">
            <span className="text-accent">{index}</span>
            <span className="mx-2 text-line-strong">/</span>
            {eyebrow}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] text-balance sm:text-5xl"
          >
            {title}
          </h2>
          {intro ? <p className="mt-5 max-w-2xl text-fg-muted text-pretty">{intro}</p> : null}
        </Reveal>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}

export function Tag({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" }) {
  return (
    <span
      className={
        tone === "accent"
          ? "inline-flex items-center rounded-full border border-accent/30 bg-accent-soft px-2.5 py-0.5 font-mono text-[11px] text-accent"
          : "inline-flex items-center rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-fg-muted"
      }
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: "ongoing" | "completed" }) {
  if (status === "ongoing") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-2.5 py-0.5 font-mono text-[11px] text-accent">
        <span className="anim-blink size-1.5 rounded-full bg-accent" aria-hidden />
        In progress
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-fg-muted">
      <span className="size-1.5 rounded-full bg-ok" aria-hidden />
      Completed
    </span>
  );
}

/** Lucide dropped brand icons, so these are small inline SVGs. */
export function GithubIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 .5C5.73.5.67 5.56.67 11.83c0 5 3.24 9.25 7.75 10.75.57.1.78-.25.78-.55v-1.93c-3.15.69-3.82-1.52-3.82-1.52-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.66 1.24 3.31.95.1-.74.4-1.24.72-1.52-2.51-.29-5.16-1.26-5.16-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.44.11-3 0 0 .95-.3 3.12 1.16a10.8 10.8 0 0 1 5.68 0c2.17-1.46 3.12-1.16 3.12-1.16.62 1.56.23 2.71.11 3 .73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.79.55a11.17 11.17 0 0 0 7.74-10.75C23.33 5.56 18.27.5 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
