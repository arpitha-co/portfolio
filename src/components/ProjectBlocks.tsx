import type { ArchitectureStep, DemoBlock } from "@/content/types";
import { VideoPlayer } from "./VideoPlayer";
import { EpisodeSelector } from "./EpisodeSelector";
import { ChapterVideo } from "./ChapterVideo";

const toneClass = {
  ok: "border-ok/40 text-ok",
  warn: "border-accent/40 text-accent",
  fail: "border-red-400/40 text-red-300",
  neutral: "border-line-strong text-fg-muted",
};

/** System workflow as numbered steps: horizontal on wide screens, vertical on phones. */
export function ArchitectureFlow({ steps }: { steps: ArchitectureStep[] }) {
  return (
    <ol className="grid gap-2 lg:grid-flow-col lg:auto-cols-fr lg:gap-0">
      {steps.map((s, i) => (
        <li key={s.label} className="relative flex lg:block">
          <div className="flex-1 rounded-lg border border-line bg-ink-2 p-4 lg:mr-5 lg:h-full">
            <p className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-1.5 text-sm font-medium leading-snug">{s.label}</p>
            <p className="mt-1 text-[13px] leading-snug text-fg-muted">{s.detail}</p>
          </div>
          {i < steps.length - 1 ? (
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-0 hidden w-5 -translate-y-1/2 text-center text-fg-dim lg:block"
            >
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function DemoBlockView({ block }: { block: DemoBlock }) {
  return (
    <div>
      <h3 className="text-lg font-medium">{block.title}</h3>
      {block.intro ? <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{block.intro}</p> : null}
      <div className="mt-5">
        {block.kind === "episodes" ? <EpisodeSelector episodes={block.episodes} /> : null}
        {block.kind === "feature" ? <ChapterVideo video={block.video} chapters={block.chapters} /> : null}
        {block.kind === "grid" ? (
          <div className={`grid gap-4 ${block.columns === 2 ? "sm:grid-cols-2" : ""}`}>
            {block.items.map((d) => (
              <figure key={d.video.sources[0].src} className="overflow-hidden rounded-xl border border-line bg-ink-2">
                <VideoPlayer video={d.video} />
                <figcaption className="flex items-start gap-2.5 border-t border-line px-4 py-3 text-sm text-fg-muted">
                  <span className={`mt-0.5 shrink-0 rounded-full border px-2 py-0.5 font-mono text-[11px] ${toneClass[d.tone ?? "neutral"]}`}>
                    {d.label}
                  </span>
                  <span>{d.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
