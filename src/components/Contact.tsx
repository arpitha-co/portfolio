import { Mail, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { GithubIcon, LinkedinIcon, Section } from "./ui";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const channels = [
    { icon: <Mail className="size-4" aria-hidden />, label: "Email", value: site.email, href: `mailto:${site.email}` },
    {
      icon: <LinkedinIcon className="size-4" />,
      label: "LinkedIn",
      value: "arpitha-thimmegowda",
      href: site.social.linkedin,
      external: true,
    },
    {
      icon: <GithubIcon className="size-4" />,
      label: "GitHub",
      value: site.social.githubUser,
      href: site.social.github,
      external: true,
    },
    { icon: <MapPin className="size-4" aria-hidden />, label: "Location", value: site.location },
  ];

  return (
    <Section
      id="contact"
      index="09"
      eyebrow="Contact"
      title={
        <>
          Let&apos;s build something <span className="italic text-accent">meaningful.</span>
        </>
      }
      intro="Interested in collaborating, discussing AI research, or building something meaningful? I'd love to connect."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <Reveal>
          <ul className="divide-y divide-line rounded-2xl border border-line">
            {channels.map((c) => (
              <li key={c.label}>
                {c.href ? (
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center gap-4 px-6 py-5 transition-colors hover:bg-ink-2"
                  >
                    <span className="grid size-9 place-items-center rounded-lg border border-line text-accent">{c.icon}</span>
                    <span>
                      <span className="block font-mono text-[11px] tracking-widest text-fg-dim uppercase">{c.label}</span>
                      <span className="block text-fg break-all">{c.value}</span>
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 px-6 py-5">
                    <span className="grid size-9 place-items-center rounded-lg border border-line text-accent">{c.icon}</span>
                    <span>
                      <span className="block font-mono text-[11px] tracking-widest text-fg-dim uppercase">{c.label}</span>
                      <span className="block text-fg">{c.value}</span>
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
