"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/content/site";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-line bg-ink/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-md border border-line-strong font-mono text-xs text-accent transition-colors group-hover:border-accent"
          >
            AT
          </span>
          <span className="text-sm font-medium tracking-tight">{site.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="ml-2">
            <a
              href={site.cv.href}
              download={site.cv.fileName}
              className="inline-flex items-center gap-1.5 rounded-md border border-line-strong px-3 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              <Download className="size-3.5" aria-hidden />
              CV
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-md text-fg-muted hover:text-fg md:hidden"
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
                  className="block rounded-md px-2 py-3 text-base text-fg-muted hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.cv.href}
                download={site.cv.fileName}
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
