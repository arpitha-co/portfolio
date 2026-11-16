"use client";

import { useEffect, useState } from "react";

interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const LEVEL_FILL = [
  "rgb(255 255 255 / 0.05)",
  "rgb(233 162 59 / 0.28)",
  "rgb(233 162 59 / 0.5)",
  "rgb(233 162 59 / 0.75)",
  "rgb(233 162 59 / 1)",
];

/**
 * GitHub contribution calendar rendered in the site's own palette, using the
 * public github-contributions-api.jogruber.de service (no token needed).
 * Hides itself entirely if the service fails or returns nothing.
 */
export function ContributionChart({ user }: { user: string }) {
  const [state, setState] = useState<{ days: Day[]; total: number } | "error" | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { contributions?: Day[]; total?: { lastYear?: number } }) => {
        const days = d.contributions ?? [];
        if (!days.length) return setState("error");
        setState({ days, total: d.total?.lastYear ?? days.reduce((s, x) => s + x.count, 0) });
      })
      .catch((e: Error) => {
        if (e.name !== "AbortError") setState("error");
      });
    return () => ctrl.abort();
  }, [user]);

  if (state === "error") return null;

  const cell = 11;
  const gap = 3;
  let weeks: (Day | null)[][] = [];
  if (state) {
    const first = new Date(state.days[0].date).getDay();
    const padded: (Day | null)[] = [...Array(first).fill(null), ...state.days];
    for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));
  } else {
    weeks = Array.from({ length: 53 }, () => Array(7).fill(null));
  }

  return (
    <figure className="rounded-xl border border-line bg-ink-2/40 p-5 sm:p-6">
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-2 font-mono text-[11px] tracking-widest text-fg-dim uppercase">
        <span>Contribution activity · last 12 months</span>
        {state ? <span className="normal-case tracking-normal text-fg-muted">{state.total} contributions</span> : null}
      </figcaption>
      <div className="overflow-x-auto pb-1">
        <svg
          role="img"
          aria-label={state ? `${state.total} GitHub contributions in the last year` : "Loading contribution activity"}
          width={weeks.length * (cell + gap)}
          height={7 * (cell + gap)}
          className={state ? "" : "animate-pulse"}
        >
          {weeks.map((w, x) =>
            w.map((d, y) => (
              <rect
                key={`${x}-${y}`}
                x={x * (cell + gap)}
                y={y * (cell + gap)}
                width={cell}
                height={cell}
                rx={2}
                fill={d ? LEVEL_FILL[d.level] : state ? "transparent" : LEVEL_FILL[0]}
              >
                {d ? <title>{`${d.count} on ${d.date}`}</title> : null}
              </rect>
            )),
          )}
        </svg>
      </div>
    </figure>
  );
}
