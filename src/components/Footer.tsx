import Link from "next/link";
import { ArrowUp, Download, Mail } from "lucide-react";
import { nav, site } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-serif text-2xl">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-fg-muted">
            AI Engineer working on robot learning and computer vision. Currently writing my Master&apos;s thesis on
            Vision-Language-Action models at Fraunhofer IMS.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="font-mono text-[11px] tracking-widest text-fg-dim uppercase">Sections</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-fg-muted hover:text-fg">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono text-[11px] tracking-widest text-fg-dim uppercase">Get in touch</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-fg-muted hover:text-fg">
                <Mail className="size-4" aria-hidden /> {site.email}
              </a>
            </li>
            <li>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-fg-muted hover:text-fg">
                <LinkedinIcon className="size-4" /> LinkedIn<span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
            <li>
              <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-fg-muted hover:text-fg">
                <GithubIcon className="size-4" /> GitHub<span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
            <li>
              <a href={site.cv.href} download={site.cv.fileName} className="inline-flex items-center gap-2 text-fg-muted hover:text-fg">
                <Download className="size-4" aria-hidden /> Download CV
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-xs text-fg-dim sm:px-6">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <Link href="/#top" className="inline-flex items-center gap-1.5 hover:text-fg">
            <ArrowUp className="size-3.5" aria-hidden /> Back to top
          </Link>
        </div>
      </div>
    </footer>
  );
}
