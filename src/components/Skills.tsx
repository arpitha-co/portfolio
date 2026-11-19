import { Bot, Brain, Code2, Eye, Server, Wrench } from "lucide-react";
import { skills } from "@/content/skills";
import { Section } from "./ui";
import { Reveal } from "./Reveal";

const icons = { bot: Bot, brain: Brain, code: Code2, eye: Eye, server: Server, wrench: Wrench };

export function Skills() {
  return (
    <Section
      id="skills"
      index="04"
      eyebrow="Toolbox"
      title={
        <>
          Technical skills, <span className="italic text-fg-muted">grouped by what they&apos;re for.</span>
        </>
      }
      intro="Tools I've used in research, university projects and production work. No percentages, just what I've actually worked with."
    >
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => {
          const Icon = icons[group.icon];
          return (
            <Reveal key={group.title} delay={i * 0.04} className="bg-ink p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg border border-line text-accent">
                  <Icon className="size-4" aria-hidden />
                </span>
                <h3 className="font-medium">{group.title}</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-md border border-line bg-ink-2 px-2.5 py-1 text-[13px] text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
