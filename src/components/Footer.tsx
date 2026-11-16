import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { site } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-serif text-xl">{site.name}</p>
          <p className="mt-1 font-mono text-xs text-fg-dim">
            {site.role} · Robotics · Computer Vision · © {new Date().getFullYear()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a href={site.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid size-10 place-items-center rounded-lg text-fg-muted hover:text-fg">
            <GithubIcon className="size-[18px]" />
          </a>
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid size-10 place-items-center rounded-lg text-fg-muted hover:text-fg">
            <LinkedinIcon className="size-[18px]" />
          </a>
          <Link href="/#top" className="ml-2 inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs text-fg-muted hover:text-fg">
            <ArrowUp className="size-3.5" aria-hidden /> Top
          </Link>
        </div>
      </div>
    </footer>
  );
}
