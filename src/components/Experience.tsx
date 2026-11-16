import { ArrowUpRight, MapPin } from "lucide-react";
import { experience } from "@/content/experience";
import { Section, StatusBadge, Tag } from "./ui";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      eyebrow="Experience"
      title={
        <>
          Research in robot learning, <span className="italic text-fg-muted">grounded in production engineering.</span>
        </>
      }
    >
      <ol className="space-y-6">
        {experience.map((job, i) => (
          <li key={job.id}>
            <Reveal
              delay={i * 0.05}
              className={`grid gap-8 rounded-2xl border p-7 sm:p-9 lg:grid-cols-[240px_1fr] ${
                job.status === "ongoing" ? "border-accent/25 bg-gradient-to-br from-accent/[0.06] to-transparent" : "border-line bg-ink-2/40"
              }`}
            >
              <div>
                <p className="font-mono text-xs text-fg-dim">{job.period}</p>
                <div className="mt-3">
                  <StatusBadge status={job.status} />
                </div>
                <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-fg-dim">
                  <MapPin className="size-3.5" aria-hidden />
                  {job.location}
                </p>
                {job.metrics ? (
                  <dl className="mt-6 space-y-4">
                    {job.metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="sr-only">{m.label}</dt>
                        <dd>
                          <span className="font-serif text-4xl text-accent">{m.value}</span>
                          <span className="mt-1 block text-xs text-fg-muted">{m.label}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </div>

              <div>
                <h3 className="text-xl font-medium text-balance">{job.role}</h3>
                <p className="mt-1 text-fg-muted">
                  {job.orgUrl ? (
                    <a
                      href={job.orgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 underline-offset-4 hover:text-fg hover:underline"
                    >
                      {job.org}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  ) : (
                    job.org
                  )}
                </p>
                <p className="mt-4 text-fg text-pretty">{job.summary}</p>
                <ul className="mt-5 space-y-3">
                  {job.bullets.map((b) => (
                    <li key={b} className="relative pl-5 text-[15px] leading-relaxed text-fg-muted">
                      <span aria-hidden className="absolute left-0 top-[0.7em] h-px w-2.5 bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {job.tech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
