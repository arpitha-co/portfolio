import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[70vh] max-w-xl place-items-center px-4 pt-24 text-center">
      <div>
        <p className="font-mono text-xs tracking-widest text-accent uppercase">404 · target not detected</p>
        <h1 className="mt-4 font-serif text-5xl">This page wandered off.</h1>
        <p className="mt-4 text-fg-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Link href="/" className="btn btn-primary mt-8">
          Back to home
        </Link>
      </div>
    </section>
  );
}
