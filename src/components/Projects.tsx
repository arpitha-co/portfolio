import { featuredProjects } from "@/content/projects";
import { Section } from "./ui";
import { Reveal } from "./Reveal";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const [lead, ...rest] = featuredProjects;
  return (
    <Section
      id="projects"
      index="03"
      eyebrow="Featured work"
      title={
        <>
          Things I&apos;ve built, <span className="italic text-fg-muted">from pixels to robot motion.</span>
        </>
      }
      intro="Each project closes some part of the loop between perception, decision-making and action. Open one for the full write-up."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {lead ? (
          <Reveal className="lg:col-span-2">
            <ProjectCard project={lead} large />
          </Reveal>
        ) : null}
        {rest.map((p, i) => {
          // An odd card out at the end takes the full row instead of sitting alone.
          const wide = rest.length % 2 === 1 && i === rest.length - 1;
          return (
            <Reveal key={p.slug} delay={(i % 2) * 0.06} className={wide ? "lg:col-span-2" : undefined}>
              <ProjectCard project={p} large={wide} />
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
