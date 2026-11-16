import Link from "next/link";
import { ArrowUpRight, GitFork, Star } from "lucide-react";
import { getRepos } from "@/lib/github";
import { site } from "@/content/site";
import { GithubIcon, Section, Tag } from "./ui";
import { Reveal } from "./Reveal";
import { ContributionChart } from "./ContributionChart";

const langColor: Record<string, string> = {
  Python: "#3572A5",
  "Jupyter Notebook": "#DA5B0B",
  Java: "#b07219",
  TypeScript: "#3178c6",
  "C++": "#f34b7d",
};

export async function GitHubSection() {
  const { repos } = await getRepos();
  const fmt = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" });

  return (
    <Section
      id="github"
      index="06"
      eyebrow="Open source"
      title={
        <>
          On GitHub, <span className="italic text-fg-muted">where the code lives.</span>
        </>
      }
      intro="Selected public repositories in robotics, reinforcement learning and computer vision."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {repos.map((r, i) => (
          <Reveal key={r.name} delay={(i % 2) * 0.05}>
            <article className="group relative flex h-full flex-col rounded-xl border border-line bg-ink-2/40 p-6 transition-colors hover:border-line-strong">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-fg-dim">
                    {site.social.githubUser}/<span className="text-fg-muted">{r.name}</span>
                  </p>
                  <h3 className="mt-1.5 font-medium">
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
                      {r.title}
                      <span className="sr-only"> (opens GitHub in new tab)</span>
                    </a>
                  </h3>
                </div>
                <ArrowUpRight
                  className="size-4 shrink-0 text-fg-dim transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden
                />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{r.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {r.topics.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 font-mono text-[11px] text-fg-dim">
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden className="size-2.5 rounded-full" style={{ background: langColor[r.language] ?? "#888" }} />
                  {r.language}
                </span>
                {r.stars > 0 ? (
                  <span className="inline-flex items-center gap-1">
                    <Star className="size-3" aria-hidden /> {r.stars}
                  </span>
                ) : null}
                {r.forks > 0 ? (
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="size-3" aria-hidden /> {r.forks}
                  </span>
                ) : null}
                {r.updated ? <span>updated {fmt.format(new Date(r.updated))}</span> : null}
                {r.projectSlug ? (
                  <Link
                    href={`/projects/${r.projectSlug}/`}
                    className="relative z-10 ml-auto text-accent hover:underline underline-offset-4"
                  >
                    case study →
                  </Link>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <ContributionChart user={site.social.githubUser} />
      </Reveal>

      <div className="mt-8">
        <a
          href={site.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-4 py-2.5 text-sm transition-colors hover:border-fg"
        >
          <GithubIcon className="size-4" /> View full profile
          <ArrowUpRight className="size-3.5" aria-hidden />
        </a>
      </div>
    </Section>
  );
}
