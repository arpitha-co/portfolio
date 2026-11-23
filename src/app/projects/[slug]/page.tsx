import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Pipeline } from "@/components/Pipeline";
import { ArchitectureFlow, DemoBlockView } from "@/components/ProjectBlocks";
import { GithubIcon, StatusBadge, Tag } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const image = p.coverVideo?.poster ?? p.images[0]?.src;
  return {
    title: p.shortTitle ?? p.title,
    description: p.description,
    alternates: { canonical: `/projects/${p.slug}/` },
    openGraph: { title: p.title, description: p.description, images: image ? [image] : undefined },
  };
}

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24">
      <h2 id={`${id}-h`} className="font-mono text-xs tracking-widest text-fg-dim uppercase">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const hasResults = Boolean(p.results?.length || p.resultsTable);
  // images[0] is already the cover unless a video or illustration takes its place.
  const gallery = p.coverVideo || p.illustration ? p.images : p.images.slice(1);

  const toc = [
    { id: "problem", label: "Problem" },
    { id: "approach", label: "Approach" },
    { id: "architecture", label: "Architecture" },
    p.demos?.length ? { id: "demos", label: "Demonstrations" } : null,
    hasResults ? { id: "results", label: "Results" } : null,
    { id: "contribution", label: "My contribution" },
    gallery.length ? { id: "gallery", label: "Gallery" } : null,
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <article className="pt-28 pb-24 sm:pt-32">
      {/* Header */}
      <header className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link href="/#projects" className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg">
          <ArrowLeft className="size-4" aria-hidden /> All projects
        </Link>
        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
          <StatusBadge status={p.status} />
          <span className="font-mono text-xs text-fg-dim">{p.context}</span>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-fg-dim">
            <Calendar className="size-3.5" aria-hidden /> {p.period}
          </span>
        </div>
        <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.06] text-balance">{p.title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-fg-muted text-pretty">{p.tagline}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          {p.github ? (
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <GithubIcon className="size-4" /> View code on GitHub
              <span className="sr-only">(opens in new tab)</span>
            </a>
          ) : (
            <span className="inline-flex items-center rounded-lg border border-dashed border-line-strong px-4 py-2.5 font-mono text-xs text-fg-dim">
              {p.status === "ongoing" ? "Code not public yet (ongoing research)" : "No public repository"}
            </span>
          )}
          {p.demos?.length ? (
            <a href="#demos" className="btn btn-secondary">
              Watch the demonstrations
            </a>
          ) : null}
        </div>
      </header>

      {/* Cover */}
      <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-black">
          <ProjectVisual project={p} priority sizes="(min-width: 1200px) 1150px, 100vw" />
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto mt-14 grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16">
        <div className="min-w-0 space-y-16">
          {p.pipeline ? (
            <section aria-label="Progress">
              <p className="font-mono text-xs tracking-widest text-fg-dim uppercase">Progress</p>
              <div className="mt-4">
                <Pipeline stages={p.pipeline} />
              </div>
            </section>
          ) : null}

          <Block id="problem" title="Problem">
            <p className="max-w-3xl text-[17px] leading-relaxed text-fg">{p.problem}</p>
          </Block>

          <Block id="approach" title="Approach">
            <div className="max-w-3xl space-y-4 text-[16px] leading-relaxed text-fg-muted">
              {p.approach.map((d) => (
                <p key={d.slice(0, 40)}>{d}</p>
              ))}
            </div>
            {p.sections?.map((sec) => (
              <div key={sec.title} className="mt-8 max-w-3xl">
                <h3 className="text-base font-medium">{sec.title}</h3>
                <ul className="mt-3 space-y-2">
                  {sec.items.map((it) => (
                    <li key={it} className="relative pl-5 text-[15px] leading-relaxed text-fg-muted">
                      <span aria-hidden className="absolute top-[0.75em] left-0 h-px w-2.5 bg-accent" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Block>

          <Block id="architecture" title="Architecture & workflow">
            <ArchitectureFlow steps={p.architecture} />
          </Block>

          {p.demos?.length ? (
            <Block id="demos" title="Demonstrations">
              <div className="space-y-12">
                {p.demos.map((b) => (
                  <DemoBlockView key={b.title} block={b} />
                ))}
              </div>
            </Block>
          ) : null}

          {hasResults ? (
            <Block id="results" title="Results">
              {p.results?.length ? (
                <dl className="grid gap-3 sm:grid-cols-3">
                  {p.results.map((r) => (
                    <div key={r.label} className="rounded-xl border border-line p-5">
                      <dt className="text-sm text-fg-muted">{r.label}</dt>
                      <dd className="mt-1 font-serif text-4xl text-accent">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {p.resultsTable ? (
                <div className={`overflow-x-auto rounded-xl border border-line ${p.results?.length ? "mt-6" : ""}`}>
                  <table className="w-full min-w-[460px] text-left text-sm">
                    <caption className="caption-bottom px-4 py-3 text-left font-mono text-[11px] text-fg-dim">{p.resultsTable.caption}</caption>
                    <thead className="border-b border-line bg-ink-2 font-mono text-[11px] tracking-wider text-fg-dim uppercase">
                      <tr>
                        {p.resultsTable.head.map((h) => (
                          <th key={h} scope="col" className="px-4 py-3 font-normal">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line font-mono text-fg-muted">
                      {p.resultsTable.rows.map((row) => (
                        <tr key={row[0]}>
                          {row.map((c, i) => (
                            <td key={i} className={`px-4 py-3 ${i === row.length - 1 ? "text-accent" : ""}`}>
                              {c}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </Block>
          ) : null}

          <Block id="contribution" title="My contribution">
            <ul className="max-w-3xl space-y-3">
              {p.contribution.map((c) => (
                <li key={c} className="relative pl-5 text-[16px] leading-relaxed text-fg-muted">
                  <span aria-hidden className="absolute top-[0.75em] left-0 h-px w-2.5 bg-accent" />
                  {c}
                </li>
              ))}
            </ul>
            {p.direction ? (
              <div className="mt-8 max-w-3xl rounded-xl border border-accent/25 bg-accent/[0.05] p-6">
                <p className="font-mono text-xs tracking-widest text-accent uppercase">Current research direction</p>
                <p className="mt-3 text-[16px] leading-relaxed text-fg">{p.direction}</p>
              </div>
            ) : null}
          </Block>

          {gallery.length ? (
            <Block id="gallery" title="Gallery">
              <div className="grid gap-4 sm:grid-cols-2">
                {gallery.map((img) => (
                  <figure key={img.src} className="overflow-hidden rounded-xl border border-line bg-ink-2">
                    <a href={img.src} target="_blank" rel="noopener noreferrer" className="relative block aspect-video" aria-label={`Open full-size image: ${img.alt}`}>
                      <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 440px, 100vw" className={img.fit === "contain" ? "object-contain p-4" : "object-cover"} />
                    </a>
                    <figcaption className="border-t border-line px-4 py-2.5 text-xs text-fg-muted">{img.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </Block>
          ) : null}
        </div>

        {/* Sidebar */}
        <aside className="min-w-0 space-y-8 lg:sticky lg:top-24 lg:self-start">
          <nav aria-label="On this page" className="hidden lg:block">
            <p className="font-mono text-xs tracking-widest text-fg-dim uppercase">On this page</p>
            <ul className="mt-3 space-y-1 border-l border-line">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="-ml-px block border-l border-transparent py-1 pl-4 text-sm text-fg-muted transition-colors hover:border-accent hover:text-fg">
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-mono text-xs tracking-widest text-fg-dim uppercase">Key points</p>
            <ul className="mt-3 space-y-3">
              {p.highlights.map((h) => (
                <li key={h} className="relative pl-4 text-sm text-fg-muted">
                  <span aria-hidden className="absolute top-[0.65em] left-0 h-px w-2 bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest text-fg-dim uppercase">Stack</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Next */}
      <div className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <Link
          href={`/projects/${next.slug}/`}
          className="group flex items-center justify-between gap-6 rounded-2xl border border-line p-6 transition-colors hover:border-line-strong sm:p-7"
        >
          <span className="min-w-0">
            <span className="block font-mono text-[11px] tracking-widest text-fg-dim uppercase">Next project</span>
            <span className="mt-2 block font-serif text-2xl sm:text-3xl">{next.shortTitle ?? next.title}</span>
          </span>
          <ArrowRight className="size-6 shrink-0 text-accent transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
