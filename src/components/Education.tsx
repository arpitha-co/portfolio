import Link from "next/link";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { education } from "@/content/education";
import { Section, Tag } from "./ui";
import { Reveal } from "./Reveal";

export function Education() {
  return (
    <Section
      id="education"
      index="08"
      eyebrow="Education"
      title={
        <>
          Mechatronics foundations, <span className="italic text-fg-muted">AI specialisation.</span>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {education.map((e, i) => (
          <Reveal key={e.degree} delay={i * 0.06}>
            <article className="h-full rounded-2xl border border-line bg-ink-2/40 p-7 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="grid size-10 place-items-center rounded-lg border border-line text-accent">
                  <GraduationCap className="size-5" aria-hidden />
                </span>
                <span className="font-mono text-xs text-fg-dim">
                  {e.period}
                  {e.current ? <span className="ml-2 text-accent">● now</span> : null}
                </span>
              </div>
              <p className="mt-6 font-mono text-xs tracking-widest text-fg-dim uppercase">{e.degree}</p>
              <h3 className="mt-2 font-serif text-3xl leading-tight text-balance">{e.field}</h3>
              <p className="mt-3 text-fg-muted">
                <a
                  href={e.schoolUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline-offset-4 hover:text-fg hover:underline"
                >
                  {e.school}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
                <span className="block text-sm text-fg-dim">{e.place}</span>
              </p>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {e.focus.map((f) => (
                  <Tag key={f}>{f}</Tag>
                ))}
              </div>

              {e.projects.length ? (
                <div className="mt-7 border-t border-line pt-5">
                  <p className="font-mono text-[11px] tracking-widest text-fg-dim uppercase">Academic projects</p>
                  <ul className="mt-3 space-y-2">
                    {e.projects.map((p) => (
                      <li key={p.title} className="text-sm">
                        {p.slug ? (
                          <Link href={`/projects/${p.slug}/`} className="text-fg-muted hover:text-accent">
                            → {p.title}
                          </Link>
                        ) : (
                          <span className="text-fg-muted">→ {p.title}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
