import { GraduationCap, Briefcase, FlaskConical } from "lucide-react";
import { journey } from "@/content/experience";
import { site } from "@/content/site";
import { Section } from "./ui";
import { Reveal } from "./Reveal";

const kindIcon = { education: GraduationCap, work: Briefcase, research: FlaskConical };

export function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title={
        <>
          From building machines <span className="italic text-fg-muted">to teaching them.</span>
        </>
      }
    >
      <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal className="space-y-5 text-[17px] leading-relaxed text-fg-muted">
          <p>
            I started in <span className="text-fg">Mechatronics Engineering</span>, where I learned how mechanics,
            electronics and control come together in a real machine. My first taste of machine learning came during an
            internship, using sensor data for prediction and anomaly detection.
          </p>
          <p>
            I then spent two years as a <span className="text-fg">System Engineer at Infosys</span>, building and
            testing production Java services: OCR-based document processing and banking APIs. It taught me what
            software has to survive outside a notebook: real users, edge cases, and tests that keep coverage above 90%.
          </p>
          <p>
            Today I&apos;m doing my <span className="text-fg">M.Sc. in AI for Industrial Applications</span> in Germany
            and writing my thesis at <span className="text-fg">Fraunhofer IMS</span>, adapting Vision-Language-Action
            models so a Franka Panda can pick and place objects from language instructions. What I care about most is
            combining research models with sound engineering, so that they hold up on real hardware and not only in a
            demo.
          </p>

          <div className="!mt-10 rounded-xl border border-line bg-ink-2 p-6">
            <p className="font-mono text-[11px] tracking-widest text-accent uppercase">Off the clock</p>
            <p className="mt-3 text-fg">
              When I&apos;m not at a robot, I&apos;m usually knitting, baking something new, planning the next trip, or
              practising my German. I like making things, whether that&apos;s with code, yarn or flour.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {site.languages.map((l) => (
                <span key={l.name} className="rounded-full border border-line px-3 py-1 text-xs text-fg-muted">
                  {l.name} <span className="text-fg-dim">· {l.level}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="font-mono text-xs tracking-widest text-fg-dim uppercase">Journey</h3>
          <ol className="relative mt-6 border-l border-line pl-8">
            {journey.map((item) => {
              const Icon = kindIcon[item.kind];
              return (
                <li key={item.title} className="relative pb-10 last:pb-0">
                  <span
                    className={`absolute -left-[45px] grid size-7 place-items-center rounded-full border bg-ink ${
                      item.current ? "border-accent text-accent" : "border-line-strong text-fg-muted"
                    }`}
                  >
                    <Icon className="size-3.5" aria-hidden />
                  </span>
                  <p className="font-mono text-xs text-fg-dim">
                    {item.period}
                    {item.current ? <span className="ml-2 text-accent">● now</span> : null}
                  </p>
                  <p className="mt-1.5 font-medium">{item.title}</p>
                  <p className="text-sm text-fg-muted">
                    {item.org} · {item.place}
                  </p>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}
