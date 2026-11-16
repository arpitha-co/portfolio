import {
  ArrowLeftRight,
  Factory,
  Hand,
  Layers,
  Route,
  ScanEye,
  Sparkles,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { research } from "@/content/interests";
import { getProject } from "@/content/projects";
import { Section } from "./ui";
import { Reveal } from "./Reveal";
import { Pipeline } from "./Pipeline";

/** Register any Lucide icon you reference from content/interests.ts here. */
const icons: Record<string, LucideIcon> = { ArrowLeftRight, Factory, Hand, Layers, Route, ScanEye, Users, Workflow };

export function Research() {
  const thesis = getProject("vla-robotic-manipulation");
  return (
    <Section
      id="research"
      index="05"
      eyebrow="Research & interests"
      title={
        <>
          What I&apos;m exploring <span className="italic text-fg-muted">right now.</span>
        </>
      }
      intro="The questions I keep coming back to, in my thesis and outside it."
    >
      {thesis?.pipeline ? (
        <Reveal className="mb-10 rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/[0.07] to-transparent p-7 sm:p-9">
          <p className="font-mono text-[11px] tracking-widest text-accent uppercase">Current thesis · progress</p>
          <p className="mt-3 max-w-3xl font-serif text-2xl leading-snug text-balance sm:text-3xl">
            Can pretrained VLA models learn reliable pick-and-place on a Franka Panda from a small set of
            planner-generated demonstrations? So far: <span className="text-accent">0% zero-shot → 70% after fine-tuning.</span>
          </p>
          <div className="mt-6">
            <Pipeline stages={thesis.pipeline} />
          </div>
        </Reveal>
      ) : null}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {research.map((r, i) => {
          const Icon = icons[r.icon] ?? Sparkles;
          return (
            <li key={r.title}>
              <Reveal delay={(i % 4) * 0.05} className="group h-full rounded-xl border border-line bg-ink-2/40 p-6 transition-colors hover:border-accent/40">
                <Icon className="size-5 text-accent transition-transform group-hover:-translate-y-0.5" aria-hidden />
                <h3 className="mt-5 font-medium leading-snug">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{r.blurb}</p>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
