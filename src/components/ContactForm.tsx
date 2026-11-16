"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send, AlertCircle } from "lucide-react";
import { site } from "@/content/site";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; via: "form" | "mail" } | { kind: "error"; msg: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * If `site.formEndpoint` (e.g. Formspree) is configured, posts the message there.
 * Otherwise it opens the visitor's mail app with everything pre-filled, so the
 * form always works, even on a purely static host.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // Honeypot: bots fill hidden fields
    if (data.company) return;

    const errs: Record<string, string> = {};
    if (!data.name?.trim()) errs.name = "Please enter your name.";
    if (!EMAIL_RE.test(data.email ?? "")) errs.email = "Please enter a valid email address.";
    if (!data.subject?.trim()) errs.subject = "Please add a subject.";
    if ((data.message ?? "").trim().length < 10) errs.message = "Please write a message (at least 10 characters).";
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }

    if (!site.formEndpoint) {
      const body = `${data.message}\n\n— ${data.name} (${data.email})`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ kind: "sent", via: "mail" });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, subject: data.subject, message: data.message }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      form.reset();
      setStatus({ kind: "sent", via: "form" });
    } catch {
      setStatus({
        kind: "error",
        msg: `Sorry, the message couldn't be sent. Please email me directly at ${site.email}.`,
      });
    }
  }

  const field =
    "mt-2 w-full rounded-lg border bg-ink-2 px-4 py-3 text-[15px] text-fg placeholder:text-fg-dim transition-colors focus:border-accent focus:outline-none";
  const border = (k: string) => (errors[k] ? "border-red-400/70" : "border-line");

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-line bg-ink-2/30 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input id="name" name="name" autoComplete="name" className={`${field} ${border("name")}`} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" className={`${field} ${border("email")}`} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
        </Field>
      </div>
      <div className="mt-5">
        <Field id="subject" label="Subject" error={errors.subject}>
          <input id="subject" name="subject" className={`${field} ${border("subject")}`} aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-err" : undefined} />
        </Field>
      </div>
      <div className="mt-5">
        <Field id="message" label="Message" error={errors.message}>
          <textarea id="message" name="message" rows={5} className={`${field} ${border("message")} resize-y`} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />
        </Field>
      </div>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status.kind === "sending" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
          {status.kind === "sending" ? "Sending…" : "Send message"}
        </button>
        <p role="status" aria-live="polite" className="text-sm">
          {status.kind === "sent" ? (
            <span className="inline-flex items-center gap-1.5 text-ok">
              <CheckCircle2 className="size-4" aria-hidden />
              {status.via === "form" ? "Thanks! I'll get back to you soon." : "Your mail app should open with the message ready to send."}
            </span>
          ) : status.kind === "error" ? (
            <span className="inline-flex items-center gap-1.5 text-red-300">
              <AlertCircle className="size-4" aria-hidden />
              {status.msg}
            </span>
          ) : null}
        </p>
      </div>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="font-mono text-[11px] tracking-widest text-fg-muted uppercase">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
