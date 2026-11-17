import Image from "next/image";
import type { Project } from "@/content/types";
import { VideoPlayer } from "./VideoPlayer";

/**
 * Cover for a project: a muted looping clip if the project has one, otherwise
 * the first image, otherwise a labelled schematic illustration.
 * The parent must be `relative` with a fixed aspect ratio.
 */
export function ProjectVisual({
  project,
  priority = false,
  sizes,
  videoFit = "contain",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
  videoFit?: "contain" | "cover";
}) {
  if (project.coverVideo) {
    return <VideoPlayer video={project.coverVideo} variant="ambient" fill fit={videoFit} />;
  }
  const img = project.images[0];
  if (img) {
    return (
      <Image
        src={img.src}
        alt={img.alt}
        fill
        priority={priority}
        sizes={sizes ?? "(min-width: 1024px) 560px, 100vw"}
        className={`${img.fit === "contain" ? "object-contain p-6" : "object-cover"} transition-transform duration-700 group-hover:scale-[1.02]`}
      />
    );
  }
  return <Schematic />;
}

/** Line illustration for projects whose images can't be published yet. */
function Schematic() {
  const A = "var(--color-accent)";
  const F = "var(--color-fg)";
  return (
    <div className="absolute inset-0 bg-ink-2" role="img" aria-label="Illustration: herbarium sheet with detected leaves and a handwritten label">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
      <svg aria-hidden viewBox="0 0 400 225" className="absolute inset-0 size-full" fill="none" strokeLinecap="round">
        <rect x="110" y="18" width="180" height="190" rx="2" stroke={F} strokeOpacity=".3" />
        <path d="M200 190 C 196 140, 205 90, 200 40" stroke={F} strokeOpacity=".7" strokeWidth="1.5" />
        {[
          [70, -1],
          [95, 1],
          [120, -1],
          [145, 1],
        ].map(([y, d]) => (
          <path key={y} d={`M200 ${y} q ${d * 30} -18 ${d * 50} -4 q ${d * -22} 18 ${d * -50} 4`} stroke={F} strokeOpacity=".6" />
        ))}
        <rect x="146" y="55" width="110" height="105" stroke={A} strokeDasharray="3 3" />
        <text x="146" y="50" fill={A} fontSize="8" fontFamily="monospace">leaf · detected</text>
        <rect x="215" y="172" width="66" height="28" stroke={A} />
        <text x="219" y="168" fill={A} fontSize="7" fontFamily="monospace">label · htr</text>
        <path d="M222 186 c 6 -6 10 6 16 0 s 10 6 16 0 s 10 6 18 -2" stroke={F} strokeOpacity=".5" />
      </svg>
      <span className="absolute right-3 bottom-3 rounded border border-line bg-ink/70 px-2 py-0.5 font-mono text-[11px] text-fg-dim">
        illustration
      </span>
    </div>
  );
}
