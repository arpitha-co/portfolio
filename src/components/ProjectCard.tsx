import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/types";
import { ProjectVisual } from "./ProjectVisual";
import { Pipeline } from "./Pipeline";
import { GithubIcon, StatusBadge, Tag } from "./ui";

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-2/50 transition-colors hover:border-line-strong ${
        large ? "lg:grid lg:grid-cols-[1.1fr_1fr]" : ""
      }`}
    >
      <div className={`relative overflow-hidden border-line ${large ? "aspect-video lg:aspect-auto lg:border-r" : "aspect-video border-b"}`}>
        <ProjectVisual project={project} sizes={large ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 1024px) 560px, 100vw"} />
      </div>

      <div className="flex flex-1 flex-col p-7">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} />
          <span className="font-mono text-[11px] text-fg-dim">{project.context}</span>
        </div>

        <h3 className={`mt-4 font-serif leading-tight text-balance ${large ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
          <Link href={`/projects/${project.slug}/`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {project.shortTitle ?? project.title}
          </Link>
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-fg-muted text-pretty">{project.description}</p>

        {project.results?.length ? (
          <dl className="mt-5 flex flex-wrap gap-x-7 gap-y-4">
            {project.results.map((r) => (
              <div key={r.label}>
                <dt className="sr-only">{r.label}</dt>
                <dd>
                  <span className="font-serif text-3xl text-accent">{r.value}</span>
                  <span className="block text-xs text-fg-muted">{r.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <ul className="mt-5 space-y-1.5">
            {project.highlights.slice(0, 3).map((h) => (
              <li key={h} className="relative pl-4 text-sm text-fg-muted">
                <span aria-hidden className="absolute left-0 top-[0.65em] h-px w-2 bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {large && project.pipeline ? (
          <div className="mt-6">
            <Pipeline stages={project.pipeline} compact />
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tech.slice(0, large ? 9 : 6).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div className="relative z-10 mt-auto flex items-center gap-4 pt-7 text-sm">
          <Link
            href={`/projects/${project.slug}/`}
            className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline underline-offset-4"
          >
            View Project <ArrowRight className="size-4" aria-hidden />
          </Link>
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-fg-muted hover:text-fg"
            >
              <GithubIcon className="size-4" /> Code
              <span className="sr-only">(GitHub, opens in new tab)</span>
            </a>
          ) : (
            <span className="font-mono text-[11px] text-fg-dim">
              {project.status === "ongoing" ? "code not yet public" : "no public repo"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
