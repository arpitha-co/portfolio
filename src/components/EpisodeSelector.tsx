"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Episode } from "@/content/types";
import { VideoPlayer } from "./VideoPlayer";

/**
 * Tabbed comparison of training episodes. Selecting an episode swaps the video
 * and starts it (muted). Keyboard: ←/→, Home, End. Previous/next buttons step
 * through the progression.
 */
export function EpisodeSelector({ episodes }: { episodes: Episode[] }) {
  const [index, setIndex] = useState(0);
  const [userPicked, setUserPicked] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const current = episodes[index];

  const first = episodes[0].episode;
  const last = episodes[episodes.length - 1].episode;
  // Log scale so 10 → 400 spreads evenly along the training timeline.
  const pos = (ep: number) => (Math.log(ep / first) / Math.log(last / first)) * 100;

  const select = (i: number, focus = false) => {
    const next = (i + episodes.length) % episodes.length;
    setIndex(next);
    setUserPicked(true);
    if (focus) tabs.current[next]?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") select(index + 1, true);
    else if (e.key === "ArrowLeft") select(index - 1, true);
    else if (e.key === "Home") select(0, true);
    else if (e.key === "End") select(episodes.length - 1, true);
    else return;
    e.preventDefault();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-ink-2">
      {/* Training timeline + tabs */}
      <div className="border-b border-line px-4 pt-5 pb-4 sm:px-6">
        <div aria-hidden className="relative mx-3 mb-4 hidden h-px bg-line-strong sm:block">
          <div className="absolute inset-y-0 left-0 bg-accent transition-all duration-500" style={{ width: `${pos(current.episode)}%`, height: 1 }} />
          {episodes.map((ep) => (
            <span
              key={ep.episode}
              className={`absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors ${
                ep.episode <= current.episode ? "border-accent bg-accent" : "border-line-strong bg-ink-2"
              }`}
              style={{ left: `${pos(ep.episode)}%` }}
            />
          ))}
        </div>
        <div role="tablist" aria-label="Training episode" className="grid grid-cols-2 gap-2 sm:grid-cols-4" onKeyDown={onKey}>
          {episodes.map((ep, i) => {
            const selected = i === index;
            return (
              <button
                key={ep.episode}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={selected}
                aria-label={`Episode ${ep.episode} (${ep.stage})`}
                aria-controls={`${id}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                className={`rounded-lg border px-3 py-2.5 text-left transition-colors ${
                  selected ? "border-accent/60 bg-accent-soft" : "border-line hover:border-line-strong hover:bg-ink-3"
                }`}
              >
                <span className={`block font-mono text-[11px] tracking-wider uppercase ${selected ? "text-accent" : "text-fg-dim"}`}>
                  {ep.stage}
                </span>
                <span className={`mt-0.5 block font-medium ${selected ? "text-fg" : "text-fg-muted"}`}>Episode {ep.episode}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected episode */}
      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${index}`} className="grid gap-0 md:grid-cols-[1.35fr_1fr]">
        <div className="min-w-0 border-line md:border-r">
          <VideoPlayer key={current.episode} video={current.video} autoPlay={userPicked} className="mx-auto max-w-[560px]" />
        </div>
        <div className="flex flex-col p-5 sm:p-6">
          <p className="font-mono text-[11px] tracking-widest text-fg-dim uppercase">
            {current.stage} · {index + 1} / {episodes.length}
          </p>
          <h4 className="mt-2 font-serif text-3xl">Episode {current.episode}</h4>
          <p className="mt-3 text-[15px] leading-relaxed text-fg-muted" aria-live="polite">
            {current.observation}
          </p>
          <div className="mt-auto flex gap-2 pt-6">
            <button type="button" onClick={() => select(index - 1)} className="btn btn-secondary btn-sm" aria-label="Previous episode">
              <ChevronLeft className="size-4" aria-hidden /> Previous
            </button>
            <button type="button" onClick={() => select(index + 1)} className="btn btn-secondary btn-sm" aria-label="Next episode">
              Next <ChevronRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
