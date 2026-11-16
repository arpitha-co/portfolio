import type { PipelineStage } from "@/content/types";

/** Research progress strip: done → active → next. */
export function Pipeline({ stages, compact = false }: { stages: PipelineStage[]; compact?: boolean }) {
  return (
    <ol aria-label="Research progress" className={`flex flex-wrap items-center gap-y-3 ${compact ? "text-[11px]" : "text-xs"}`}>
      {stages.map((s, i) => (
        <li key={s.label} className="flex items-center font-mono">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${
              s.state === "done"
                ? "border-line-strong text-fg"
                : s.state === "active"
                  ? "border-accent/50 bg-accent-soft text-accent"
                  : "border-dashed border-line-strong text-fg-dim"
            }`}
          >
            <span
              aria-hidden
              className={`size-1.5 rounded-full ${
                s.state === "done" ? "bg-ok" : s.state === "active" ? "anim-blink bg-accent" : "border border-fg-dim"
              }`}
            />
            {s.label}
            <span className="sr-only">
              {s.state === "done" ? " (done)" : s.state === "active" ? " (in progress)" : " (up next)"}
            </span>
          </span>
          {i < stages.length - 1 ? <span aria-hidden className="mx-1.5 h-px w-4 bg-line-strong" /> : null}
        </li>
      ))}
    </ol>
  );
}
