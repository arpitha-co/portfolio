import Image from "next/image";
import type { Project } from "@/content/types";
import { AutoVideo } from "./AutoVideo";

/**
 * Cover image for a project. Uses the first screenshot if there is one,
 * otherwise a clearly-labelled schematic placeholder (swap in real images
 * via `images` in content/projects.ts).
 */
export function ProjectVisual({ project, priority = false, sizes }: { project: Project; priority?: boolean; sizes?: string }) {
  if (project.coverVideo) {
    return (
      <AutoVideo
        src={project.coverVideo.src}
        poster={project.coverVideo.poster}
        label={project.coverVideo.alt}
        className="absolute inset-0 size-full bg-black object-contain"
      />
    );
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
        className={`${img.fit === "contain" ? "object-contain p-6" : "object-cover"} transition-transform duration-700 group-hover:scale-[1.03]`}
      />
    );
  }
  return <Schematic slug={project.slug} />;
}

function Schematic({ slug }: { slug: string }) {
  return (
    <div className="absolute inset-0 bg-ink-2">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
      <svg aria-hidden viewBox="0 0 400 225" className="absolute inset-0 size-full" fill="none">
        {slug === "vla-robotic-manipulation" ? <ArmScene /> : null}
        {slug === "herbarium-detection" ? <LeafScene /> : null}
        {slug === "rl-race-track" ? <TrackScene /> : null}
      </svg>
      <span className="absolute bottom-3 right-3 rounded border border-line bg-ink/70 px-2 py-0.5 font-mono text-[10px] text-fg-dim">
        image placeholder
      </span>
    </div>
  );
}

const A = "var(--color-accent)";
const F = "var(--color-fg)";

function ArmScene() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <rect x="70" y="182" width="70" height="14" rx="2" stroke={F} strokeOpacity=".5" />
      <path d="M105 182 L120 120 L200 88 L250 120" stroke={F} strokeOpacity=".75" strokeWidth="2" />
      {[
        [105, 182],
        [120, 120],
        [200, 88],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="6" stroke={F} strokeOpacity=".75" fill="var(--color-ink-2)" />
      ))}
      <path d="M250 120 l-6 14 M250 120 l8 13" stroke={F} strokeOpacity=".75" strokeWidth="2" />
      <rect x="256" y="152" width="26" height="26" stroke={A} />
      <rect x="248" y="144" width="42" height="42" stroke={A} strokeDasharray="3 3" strokeOpacity=".7" />
      <text x="248" y="139" fill={A} fontSize="8" fontFamily="monospace">cube · target</text>
      <path d="M250 120 C 270 105, 300 115, 300 150" stroke={A} strokeDasharray="2 4" />
      <rect x="20" y="20" width="180" height="22" rx="4" stroke={F} strokeOpacity=".25" />
      <text x="30" y="35" fill={F} fillOpacity=".6" fontSize="9" fontFamily="monospace">&quot;pick up the cube and place it…&quot;</text>
      <text x="300" y="40" fill={F} fillOpacity=".45" fontSize="8" fontFamily="monospace">π0.5 · action chunk</text>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={300 + i * 12} y="48" width="8" height={8 + ((i * 7) % 18)} fill={A} fillOpacity={0.25 + i * 0.1} />
      ))}
    </g>
  );
}

function LeafScene() {
  return (
    <g strokeLinecap="round">
      <rect x="110" y="18" width="180" height="190" rx="2" stroke={F} strokeOpacity=".3" />
      <path d="M200 190 C 196 140, 205 90, 200 40" stroke={F} strokeOpacity=".7" strokeWidth="1.5" />
      {[
        [200, 70, -1],
        [200, 95, 1],
        [200, 120, -1],
        [200, 145, 1],
      ].map(([x, y, d]) => (
        <path
          key={y}
          d={`M${x} ${y} q ${d * 30} -18 ${d * 50} -4 q ${d * -22} 18 ${d * -50} 4`}
          stroke={F}
          strokeOpacity=".6"
        />
      ))}
      <rect x="146" y="55" width="110" height="105" stroke={A} strokeDasharray="3 3" />
      <text x="146" y="50" fill={A} fontSize="8" fontFamily="monospace">leaf · detected</text>
      <rect x="215" y="172" width="66" height="28" stroke={A} />
      <text x="219" y="168" fill={A} fontSize="7" fontFamily="monospace">label · htr</text>
      <path d="M222 186 c 6 -6 10 6 16 0 s 10 6 16 0 s 10 6 18 -2" stroke={F} strokeOpacity=".5" />
    </g>
  );
}

function TrackScene() {
  return (
    <g strokeLinecap="round">
      <path d="M60 160 C 60 60, 160 40, 210 90 S 340 160, 340 90" stroke={F} strokeOpacity=".25" strokeWidth="22" />
      <path d="M60 160 C 60 60, 160 40, 210 90 S 340 160, 340 90" stroke={A} strokeDasharray="3 5" />
      {[
        [60, 150],
        [118, 62],
        [210, 90],
        [300, 140],
        [340, 95],
      ].map(([x, y]) => (
        <path key={x} d={`M${x - 12} ${y} h24`} stroke={F} strokeOpacity=".7" strokeWidth="2" />
      ))}
      <text x="250" y="190" fill={A} fontSize="9" fontFamily="monospace">SAC · gates</text>
    </g>
  );
}
