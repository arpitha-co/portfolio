import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Pipeline } from "@/components/Pipeline";
import { GithubIcon, StatusBadge, Tag } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.shortTitle ?? p.title,
    description: p.description,
    alternates: { canonical: `/projects/${p.slug}/` },
    openGraph: { title: p.title, description: p.description, images: p.images[0] ? [p.images[0].src] : undefined },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="pt-28 pb-24 sm:pt-36">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link href="/#projects" className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg">
          <ArrowLeft className="size-4" aria-hidden /> All projects
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <StatusBadge status={p.status} />
          <span className="font-mono text-xs text-fg-dim">{p.context}</span>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-fg-dim">
            <Calendar className="size-3.5" aria-hidden /> {p.period}
          </span>
        </div>

        <h1 className="mt-5 font-serif text-4xl leading-[1.05] text-balance sm:text-6xl">{p.title}</h1>
        <p className="mt-5 text-xl text-fg-muted text-pretty">{p.tagline}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {p.github ? (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-ink"
            >
              <GithubIcon className="size-4" /> View on GitHub
            </a>
          ) : (
            <span className="inline-flex items-center rounded-lg border border-dashed border-line-strong px-4 py-2.5 font-mono text-xs text-fg-dim">
              {p.status === "ongoing" ? "Repository not public yet (ongoing research)" : "No public repository"}
            </span>
          )}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-5xl px-4 sm:px-6">
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-ink-2">
          <ProjectVisual project={p} priority sizes="(min-width: 1024px) 1000px, 100vw" />
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_220px]">
        <div>
          {p.pipeline ? (
            <section aria-labelledby="progress" className="mb-10">
              <h2 id="progress" className="font-mono text-xs tracking-widest text-fg-dim uppercase">
                Progress
              </h2>
              <div className="mt-4">
                <Pipeline stages={p.pipeline} />
              </div>
            </section>
          ) : null}

          <section aria-labelledby="overview">
            <h2 id="overview" className="font-mono text-xs tracking-widest text-fg-dim uppercase">
              Overview
            </h2>
            <div className="mt-4 space-y-5 text-[17px] leading-relaxed text-fg-muted">
              {p.details.map((d) => (
                <p key={d.slice(0, 32)}>{d}</p>
              ))}
            </div>
          </section>

          {p.sections?.map((sec) => (
            <section key={sec.title} aria-label={sec.title} className="mt-12">
              <h2 className="font-mono text-xs tracking-widest text-fg-dim uppercase">{sec.title}</h2>
              <ul className="mt-4 space-y-3">
                {sec.items.map((it) => (
                  <li key={it} className="relative pl-5 text-[16px] leading-relaxed text-fg-muted">
                    <span aria-hidden className="absolute left-0 top-[0.75em] h-px w-2.5 bg-accent" />
                    {it}
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {p.direction ? (
            <section aria-labelledby="direction" className="mt-12 rounded-xl border border-accent/25 bg-accent/[0.05] p-6">
              <h2 id="direction" className="font-mono text-xs tracking-widest text-accent uppercase">
                Current research direction
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-fg">{p.direction}</p>
            </section>
          ) : null}

          {p.results?.length ? (
            <section aria-labelledby="results" className="mt-12">
              <h2 id="results" className="font-mono text-xs tracking-widest text-fg-dim uppercase">
                Results
              </h2>
              <dl className="mt-5 grid gap-4 sm:grid-cols-3">
                {p.results.map((r) => (
                  <div key={r.label} className="rounded-xl border border-line p-5">
                    <dt className="text-sm text-fg-muted">{r.label}</dt>
                    <dd className="mt-1 font-serif text-4xl text-accent">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          {p.resultsTable ? (
            <section aria-labelledby="results-table" className="mt-12">
              <h2 id="results-table" className="font-mono text-xs tracking-widest text-fg-dim uppercase">
                Results
              </h2>
              <div className="mt-5 overflow-x-auto rounded-xl border border-line">
                <table className="w-full min-w-[440px] text-left text-sm">
                  <caption className="caption-bottom px-4 py-3 text-left font-mono text-[11px] text-fg-dim">
                    {p.resultsTable.caption}
                  </caption>
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
            </section>
          ) : null}

          {p.images.length > 1 ? (
            <section aria-labelledby="gallery" className="mt-12">
              <h2 id="gallery" className="font-mono text-xs tracking-widest text-fg-dim uppercase">
                Gallery
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {p.images.slice(1).map((img) => (
                  <figure key={img.src} className="overflow-hidden rounded-xl border border-line bg-ink-2">
                    <div className="relative aspect-video">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 640px) 440px, 100vw"
                        className={img.fit === "contain" ? "object-contain p-4" : "object-cover"}
                      />
                    </div>
                    <figcaption className="border-t border-line px-4 py-2.5 text-xs text-fg-dim">{img.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div>
            <h2 className="font-mono text-xs tracking-widest text-fg-dim uppercase">Key points</h2>
            <ul className="mt-4 space-y-3">
              {p.highlights.map((h) => (
                <li key={h} className="relative pl-4 text-sm text-fg-muted">
                  <span aria-hidden className="absolute left-0 top-[0.65em] h-px w-2 bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-mono text-xs tracking-widest text-fg-dim uppercase">Stack</h2>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="mx-auto mt-20 max-w-4xl px-4 sm:px-6">
        <Link
          href={`/projects/${next.slug}/`}
          className="group flex items-center justify-between gap-6 rounded-2xl border border-line p-7 transition-colors hover:border-line-strong"
        >
          <span>
            <span className="block font-mono text-[11px] tracking-widest text-fg-dim uppercase">Next project</span>
            <span className="mt-2 block font-serif text-2xl sm:text-3xl">{next.shortTitle ?? next.title}</span>
          </span>
          <ArrowRight className="size-6 shrink-0 text-accent transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
