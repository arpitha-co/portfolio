"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ArrowRight, ChevronDown, PlayCircle } from "lucide-react";
import type { Project } from "@/content/types";
import { ProjectVisual } from "./ProjectVisual";
import { Pipeline } from "./Pipeline";
import { GithubIcon, StatusBadge, Tag } from "./ui";

const hasVideo = (p: Project) => Boolean(p.coverVideo || p.demos?.length);

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const href = `/projects/${project.slug}/`;
  const name = project.shortTitle ?? project.title;

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-2/50 transition-colors hover:border-line-strong ${
        large ? "lg:grid lg:grid-cols-[1.15fr_1fr]" : ""
      }`}
    >
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className={`relative block overflow-hidden border-line bg-black ${large ? "aspect-video lg:aspect-auto lg:min-h-full lg:border-r" : "aspect-video border-b"}`}
      >
        <ProjectVisual project={project} videoFit={large ? "cover" : "contain"} sizes={large ? "(min-width: 1024px) 620px, 100vw" : "(min-width: 1024px) 560px, 100vw"} />
        {hasVideo(project) ? (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[11px] text-white/90 backdrop-blur">
            <PlayCircle className="size-3.5" aria-hidden /> Video
          </span>
        ) : null}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} />
          <span className="font-mono text-[11px] text-fg-dim">{project.context}</span>
        </div>

        <h3 className={`mt-4 font-serif leading-tight text-balance ${large ? "text-3xl sm:text-[2.25rem]" : "text-2xl"}`}>
          <Link href={href} className="transition-colors hover:text-accent">
            {name}
          </Link>
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-fg-muted text-pretty">{project.description}</p>

        {project.results?.length ? (
          <dl className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
            {project.results.map((r) => (
              <div key={r.label}>
                <dt className="sr-only">{r.label}</dt>
                <dd>
                  <span className="font-serif text-3xl text-accent">{r.value}</span>
                  <span className="block max-w-[14rem] text-xs text-fg-muted">{r.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <ul className="mt-5 space-y-1.5">
            {project.highlights.map((h) => (
              <li key={h} className="relative pl-4 text-sm text-fg-muted">
                <span aria-hidden className="absolute top-[0.65em] left-0 h-px w-2 bg-accent" />
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

        {/* Expandable: how it works */}
        <div className="mt-6 border-t border-line pt-4">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="flex w-full items-center justify-between gap-3 text-left text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <span className="font-mono text-[11px] tracking-widest uppercase">How it works</span>
            <ChevronDown className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden />
          </button>
          <div id={panelId} className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="overflow-hidden" inert={!open}>
              <ol className="mt-3 space-y-2">
                {project.architecture.map((s, i) => (
                  <li key={s.label} className="flex gap-3 text-sm">
                    <span className="font-mono text-[11px] text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="text-fg">{s.label}</span>
                      <span className="text-fg-muted">: {s.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.slice(0, 8).map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm">
          <Link href={href} className="inline-flex items-center gap-1.5 font-medium text-accent underline-offset-4 hover:underline">
            View project <ArrowRight className="size-4" aria-hidden />
            <span className="sr-only">: {name}</span>
          </Link>
          {project.github ? (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-fg-muted hover:text-fg">
              <GithubIcon className="size-4" /> Code
              <span className="sr-only"> for {name} on GitHub (opens in new tab)</span>
            </a>
          ) : (
            <span className="font-mono text-[11px] text-fg-dim">{project.status === "ongoing" ? "code not yet public" : "no public repo"}</span>
          )}
        </div>
      </div>
    </article>
  );
}
