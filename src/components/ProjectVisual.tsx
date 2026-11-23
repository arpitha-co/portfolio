import Image from "next/image";
import type { Project } from "@/content/types";
import { VideoPlayer } from "./VideoPlayer";

/**
 * Cover for a project: a muted looping clip if the project has one, then its
 * line illustration if set, otherwise the first image.
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
  if (project.illustration) {
    return <Illustration kind={project.illustration} />;
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
  return <div aria-hidden className="bg-grid absolute inset-0 bg-ink-2 opacity-70" />;
}

const A = "var(--color-accent)";
const F = "var(--color-fg)";

const LABELS = {
  herbarium: "Illustration: herbarium sheet with detected leaves and a handwritten label",
  equations:
    "Illustration: the symbol u in the equation u = (1/m)∇S linked to its definition 'flow velocity' in the text, next to a graph of equations joined by strong and potential relations",
} as const;

/** Labelled line illustration for projects without a publishable photo. */
function Illustration({ kind }: { kind: keyof typeof LABELS }) {
  return (
    <div className="absolute inset-0 bg-ink-2" role="img" aria-label={LABELS[kind]}>
      <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
      <svg aria-hidden viewBox="0 0 400 225" className="absolute inset-0 size-full" fill="none" strokeLinecap="round">
        {kind === "herbarium" ? <Herbarium /> : <Equations />}
      </svg>
      <span className="absolute right-3 bottom-3 rounded border border-line bg-ink/70 px-2 py-0.5 font-mono text-[11px] text-fg-dim">
        illustration
      </span>
    </div>
  );
}

function Herbarium() {
  return (
    <>
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
    </>
  );
}

/** Symbol → definition on the left, equation relation graph on the right. */
function Equations() {
  const serif = "Georgia, 'Times New Roman', serif";
  const nodes: [string, number, number][] = [
    ["1", 258, 62],
    ["2", 338, 58],
    ["3", 262, 160],
    ["4", 346, 150],
  ];
  const r = 13;
  return (
    <>
      {/* sentence with the definition */}
      <text x="22" y="58" fontSize="10" fontFamily="monospace" fill={F} fillOpacity=".55">
        where the <tspan fill={F} fillOpacity="1">flow velocity</tspan> is
      </text>
      <line x1="82" y1="63" x2="160" y2="63" stroke={A} strokeWidth="1.5" />
      <text x="22" y="74" fontSize="10" fontFamily="monospace" fill={F} fillOpacity=".55">
        defined as
      </text>

      {/* equation: u = (1/m) ∇S */}
      <rect x="44" y="99" width="28" height="36" stroke={A} strokeDasharray="3 3" />
      <path d="M51 104 h14 m-4 -3 l4 3 l-4 3" stroke={F} strokeOpacity=".85" />
      <text x="51" y="128" fontSize="24" fontFamily={serif} fontStyle="italic" fill={F}>u</text>
      <text x="84" y="126" fontSize="22" fontFamily={serif} fill={F} fillOpacity=".85">=</text>
      <text x="113" y="113" fontSize="15" fontFamily={serif} fill={F} fillOpacity=".85">1</text>
      <line x1="108" y1="118" x2="126" y2="118" stroke={F} strokeOpacity=".85" />
      <text x="110" y="134" fontSize="15" fontFamily={serif} fontStyle="italic" fill={F} fillOpacity=".85">m</text>
      <text x="132" y="126" fontSize="22" fontFamily={serif} fill={F} fillOpacity=".85">∇<tspan fontStyle="italic">S</tspan></text>

      {/* symbol → definition link */}
      <path d="M58 99 C 58 84, 121 90, 121 66" stroke={A} strokeDasharray="2 3" />
      <text x="22" y="164" fill={A} fontSize="8" fontFamily="monospace">symbol · u → flow velocity</text>
      <text x="22" y="178" fill={F} fillOpacity=".5" fontSize="8" fontFamily="monospace">meaning · EQ_2 defines flow velocity</text>

      <line x1="215" y1="30" x2="215" y2="195" stroke={F} strokeOpacity=".12" />

      {/* relation graph */}
      <defs>
        <marker id="eq-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 z" fill={A} />
        </marker>
      </defs>
      <line x1={258 + r} y1="62" x2={338 - r} y2="58" stroke={F} strokeOpacity=".45" strokeDasharray="3 4" />
      <line x1="339" y1={58 + r} x2="345" y2={150 - r - 2} stroke={A} strokeWidth="1.5" markerEnd="url(#eq-arrow)" />
      <line x1={262 + r} y1="158" x2={346 - r - 2} y2="151" stroke={A} strokeWidth="1.5" markerEnd="url(#eq-arrow)" />
      <line x1="259" y1={62 + r} x2="261" y2={160 - r} stroke={F} strokeOpacity=".45" strokeDasharray="3 4" />
      {nodes.map(([n, x, y]) => (
        <g key={n}>
          <circle cx={x} cy={y} r={r} stroke={n === "4" ? A : F} strokeOpacity={n === "4" ? 1 : 0.6} fill="var(--color-ink)" />
          <text x={x} y={y + 3} textAnchor="middle" fontSize="8" fontFamily="monospace" fill={F}>
            Eq.{n}
          </text>
        </g>
      ))}
      <text x="352" y="108" fill={A} fontSize="8" fontFamily="monospace">strong</text>
      <text x="270" y="44" fill={F} fillOpacity=".5" fontSize="8" fontFamily="monospace">potential</text>
    </>
  );
}
