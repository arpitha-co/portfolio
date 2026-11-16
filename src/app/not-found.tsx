import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[70vh] max-w-xl place-items-center px-4 pt-24 text-center">
      <div>
        <p className="font-mono text-xs tracking-widest text-accent uppercase">404 · target not detected</p>
        <h1 className="mt-4 font-serif text-5xl">This page wandered off.</h1>
        <p className="mt-4 text-fg-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Link href="/" className="mt-8 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-medium text-ink">
          Back to home
        </Link>
      </div>
    </section>
  );
}
