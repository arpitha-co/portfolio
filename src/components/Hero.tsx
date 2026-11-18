import Image from "next/image";
import { ArrowDown, Briefcase, Download, FlaskConical, GraduationCap, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "./ui";

/**
 * Hero: text on the left, the portrait framed like a camera's detection
 * viewfinder on the right, a quiet nod to perception → action.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div aria-hidden className="bg-grid mask-fade pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_0%,rgba(233,162,59,0.07),transparent_70%)]"
      />
      <TrajectoryLines />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        <div className="anim-hero min-w-0">
          <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-ink-2/70 px-3 py-1.5 font-mono text-[11px] text-fg-muted backdrop-blur">
            <span className="anim-blink size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            <span className="text-accent">{site.currently.label}:</span>
            <span className="truncate">{site.currently.text}</span>
          </p>

          <h1 className="mt-7 font-serif text-[clamp(2.75rem,6.5vw,4.75rem)] leading-[0.98] tracking-tight">
            Arpitha
            <br />
            <span className="italic text-fg-muted">Thimmegowda</span>
          </h1>

          <p className="mt-6 font-mono text-sm text-accent sm:text-[15px]">{site.headline}</p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted text-pretty">{site.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-primary group">
              Explore my work
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
            </a>
            <a href={site.cv.href} download={site.cv.fileName} className="btn btn-secondary">
              <Download className="size-4" aria-hidden />
              Download CV
            </a>
            <div className="ml-1 flex items-center gap-1">
              <a
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in new tab)"
                className="grid size-11 place-items-center rounded-lg text-fg-muted transition-colors hover:text-fg"
              >
                <GithubIcon />
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in new tab)"
                className="grid size-11 place-items-center rounded-lg text-fg-muted transition-colors hover:text-fg"
              >
                <LinkedinIcon />
              </a>
            </div>
          </div>

          <ul className="mt-10 grid gap-x-6 gap-y-2.5 border-t border-line pt-6 text-sm text-fg-muted sm:grid-cols-2">
            <li className="flex items-center gap-2.5">
              <FlaskConical className="size-4 shrink-0 text-accent" aria-hidden /> Thesis research at Fraunhofer IMS
            </li>
            <li className="flex items-center gap-2.5">
              <GraduationCap className="size-4 shrink-0 text-accent" aria-hidden /> M.Sc. AI, OTH Amberg-Weiden
            </li>
            <li className="flex items-center gap-2.5">
              <Briefcase className="size-4 shrink-0 text-accent" aria-hidden /> 2 years software engineering at Infosys
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-accent" aria-hidden /> Based in {site.location}
            </li>
          </ul>
        </div>

        <Viewfinder />
      </div>
    </section>
  );
}

function Viewfinder() {
  return (
    <div className="relative mx-auto w-full max-w-[380px] lg:max-w-none">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-ink-2">
        <Image
          src={site.photo}
          alt={`Portrait of ${site.name}`}
          fill
          priority
          sizes="(min-width: 1024px) 420px, 380px"
          className="object-cover object-[50%_60%]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

        {/* Corner brackets */}
        {[
          "left-3 top-3 border-l border-t",
          "right-3 top-3 border-r border-t",
          "left-3 bottom-3 border-l border-b",
          "right-3 bottom-3 border-r border-b",
        ].map((c) => (
          <span key={c} aria-hidden className={`absolute size-5 border-fg/60 ${c}`} />
        ))}

        <div aria-hidden className="absolute inset-x-0 bottom-0 px-5 pb-5 font-mono text-[11px] text-fg/80">
          perceive → reason → act
        </div>
      </div>

      <div aria-hidden className="mt-4 grid grid-cols-3 gap-2 font-mono text-[11px] text-fg-dim">
        {[
          ["vision", "OpenCV · YOLOv8"],
          ["language", "VLMs · VLAs"],
          ["action", "Franka · Ned2"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-md border border-line px-2.5 py-2">
            <div className="text-accent">{k}</div>
            <div className="mt-0.5 truncate">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Faint end-effector trajectories drawn once across the background. */
function TrajectoryLines() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] w-full opacity-[0.14]"
      viewBox="0 0 1200 500"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M-20 420 C 220 380, 340 140, 560 180 S 900 420, 1220 260"
        stroke="var(--color-accent)"
        strokeWidth="1"
        strokeDasharray="1400"
        strokeDashoffset="1400"
        style={{ animation: "dash 3.5s 0.4s ease-out forwards" }}
      />
      <path
        d="M-20 470 C 260 450, 420 300, 640 320 S 980 470, 1220 380"
        stroke="var(--color-fg)"
        strokeWidth="0.6"
        strokeDasharray="4 6"
      />
    </svg>
  );
}
