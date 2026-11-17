"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/content/site";

const sectionIds = nav.map((n) => n.href.split("#")[1]);

/** Highlights the section currently in view (home page only). */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        // The first section (in page order) that occupies the reading band wins.
        const current = sectionIds.find((id) => (visible.get(id) ?? 0) > 0) ?? null;
        setActive(current);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.01] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);
  return enabled ? active : null;
}

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(onHome);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape, and when the viewport grows past mobile.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const isActive = (href: string) => onHome && active === href.split("#")[1];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-line bg-ink/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <span
            aria-hidden
            className="grid size-8 shrink-0 place-items-center rounded-md border border-line-strong font-mono text-xs text-accent transition-colors group-hover:border-accent"
          >
            AT
          </span>
          <span className="truncate text-sm font-medium tracking-tight">{site.name}</span>
        </Link>

        <ul className="hidden items-center gap-0.5 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "location" : undefined}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive(item.href) ? "text-fg" : "text-fg-muted hover:text-fg"
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-3 -bottom-px h-px bg-accent transition-opacity duration-300 ${isActive(item.href) ? "opacity-100" : "opacity-0"}`}
                />
              </Link>
            </li>
          ))}
          <li className="ml-3">
            <a href={site.cv.href} download={site.cv.fileName} className="btn btn-secondary btn-sm">
              <Download className="size-3.5" aria-hidden />
              CV
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="grid size-10 shrink-0 place-items-center rounded-md text-fg-muted hover:text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <ul className="mx-auto max-w-6xl px-4 py-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "location" : undefined}
                    className={`block rounded-md px-2 py-3 text-base ${isActive(item.href) ? "text-accent" : "text-fg-muted hover:text-fg"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.cv.href}
                  download={site.cv.fileName}
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center gap-2 rounded-md px-2 py-3 text-accent"
                >
                  <Download className="size-4" aria-hidden /> Download CV
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
