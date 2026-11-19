import Image from "next/image";
import { hobbies } from "@/content/interests";
import type { Hobby } from "@/content/types";
import { Reveal } from "./Reveal";

/**
 * Personal interests. Deliberately switches to a warm paper palette and
 * hand-drawn-style illustrations so it reads differently from the tech sections.
 */
export function Beyond() {
  return (
    <section id="beyond" aria-labelledby="beyond-title" className="relative bg-paper py-20 text-paper-ink sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-paper-muted uppercase">
            <span className="text-clay">07</span>
            <span className="mx-2 opacity-40">/</span>
            Beyond technology
          </p>
          <h2 id="beyond-title" className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] text-balance sm:text-5xl">
            The person behind <span className="italic text-clay">the robot arm.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-paper-muted text-pretty">
            Patience, iteration and attention to detail aren&apos;t only engineering habits. They show up in everything
            I enjoy outside work.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {hobbies.map((h, i) => (
            <li key={h.title} className="lg:col-span-2">
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-paper-ink/10 bg-paper-2/60">
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-paper-ink/10">
                    {h.photos?.length ? (
                      <div className={`absolute inset-0 grid gap-px bg-paper-ink/10 ${h.photos.length > 1 ? "grid-cols-2" : ""}`}>
                        {h.photos.map((ph) => (
                          <div key={ph.src} className="relative overflow-hidden">
                            <Image
                              src={ph.src}
                              alt={ph.alt}
                              fill
                              sizes={h.photos!.length > 1 ? "(min-width:1024px) 200px, 50vw" : "(min-width:1024px) 400px, 100vw"}
                              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                              style={{ objectPosition: ph.position ?? "50% 50%" }}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Illustration kind={h.illustration} />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl">{h.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-paper-muted">{h.blurb}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const S = { stroke: "var(--color-paper-ink)", strokeWidth: 1.6, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;
const C = "var(--color-clay)";

function Illustration({ kind }: { kind: Hobby["illustration"] }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(196,100,59,0.10),transparent_60%)]">
      <svg aria-hidden viewBox="0 0 200 110" className="h-[78%] w-auto">
        {kind === "yarn" && (
          <g>
            <circle cx="88" cy="58" r="32" {...S} fill={C} fillOpacity=".18" />
            <path d="M60 44 C 80 60, 100 30, 118 48 M58 62 C 80 80, 104 46, 120 66 M66 80 C 84 90, 104 66, 114 82" {...S} />
            <path d="M118 74 C 140 92, 150 60, 172 76" {...S} stroke={C} />
            <path d="M140 20 L 176 92 M150 18 L 168 94" {...S} />
          </g>
        )}
        {kind === "whisk" && (
          <g>
            <path d="M50 70 Q 100 108 150 70 Z" {...S} fill={C} fillOpacity=".16" />
            <path d="M44 70 H156" {...S} />
            <path d="M112 16 L 96 50" {...S} strokeWidth={3} />
            <path d="M96 50 C 70 56, 74 82, 92 74 C 104 70, 108 56, 96 50 M96 50 C 84 60, 92 80, 100 70" {...S} />
            <circle cx="132" cy="30" r="3" fill={C} stroke="none" />
            <circle cx="142" cy="44" r="2" fill={C} stroke="none" />
          </g>
        )}
        {kind === "compass" && (
          <g>
            <path d="M24 84 C 60 60, 70 96, 110 72 S 160 70, 180 50" {...S} strokeDasharray="4 5" />
            <circle cx="180" cy="50" r="4" fill={C} stroke="none" />
            <circle cx="70" cy="44" r="26" {...S} fill={C} fillOpacity=".14" />
            <path d="M70 26 L 76 44 L 70 62 L 64 44 Z" {...S} />
            <path d="M70 26 L 76 44 L 64 44 Z" fill={C} stroke="none" />
          </g>
        )}
        {kind === "speech" && (
          <g>
            <path d="M30 22 H104 a8 8 0 0 1 8 8 V58 a8 8 0 0 1 -8 8 H56 L40 80 V66 H30 a8 8 0 0 1 -8 -8 V30 a8 8 0 0 1 8 -8 Z" {...S} fill={C} fillOpacity=".15" />
            <text x="40" y="50" fontFamily="var(--font-instrument), serif" fontSize="18" fill="var(--color-paper-ink)">Hallo!</text>
            <path d="M120 40 H170 a8 8 0 0 1 8 8 V74 a8 8 0 0 1 -8 8 H160 V94 L146 82 H120 a8 8 0 0 1 -8 -8 V48 a8 8 0 0 1 8 -8 Z" {...S} />
            <text x="121" y="67" fontSize="13" textLength="50" lengthAdjust="spacingAndGlyphs" fill={C}>ನಮಸ್ಕಾರ</text>
          </g>
        )}
        {kind === "spark" && (
          <g>
            <path d="M100 18 a26 26 0 0 1 16 46 V74 H84 V64 a26 26 0 0 1 16 -46 Z" {...S} fill={C} fillOpacity=".16" />
            <path d="M88 82 H112 M92 90 H108" {...S} />
            <path d="M100 4 V10 M64 18 l5 5 M136 18 l-5 5 M54 46 h6 M140 46 h6" {...S} stroke={C} />
          </g>
        )}
      </svg>
    </div>
  );
}
