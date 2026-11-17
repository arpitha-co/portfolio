"use client";

import { useRef, useState } from "react";
import type { Chapter, VideoAsset } from "@/content/types";
import { VideoPlayer, type VideoPlayerHandle } from "./VideoPlayer";

const fmt = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

/** A long demonstration with chapter buttons that jump to a moment and play. */
export function ChapterVideo({ video, chapters }: { video: VideoAsset; chapters?: Chapter[] }) {
  const player = useRef<VideoPlayerHandle>(null);
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-ink-2">
      <VideoPlayer ref={player} video={video} />
      {chapters?.length ? (
        <div className="border-t border-line p-3 sm:p-4">
          <p className="px-1 font-mono text-[11px] tracking-widest text-fg-dim uppercase">Chapters</p>
          <ol className="mt-2 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {chapters.map((c, i) => (
              <li key={c.t}>
                <button
                  type="button"
                  onClick={() => {
                    setActive(i);
                    player.current?.seek(c.t);
                  }}
                  aria-label={`Play from ${fmt(c.t)}: ${c.label}`}
                  className={`flex w-full items-baseline gap-3 rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
                    active === i ? "bg-accent-soft text-fg" : "text-fg-muted hover:bg-ink-3 hover:text-fg"
                  }`}
                >
                  <span className="font-mono text-xs text-accent tabular-nums">{fmt(c.t)}</span>
                  <span>{c.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
