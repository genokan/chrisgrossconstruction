"use client";

import Script from "next/script";
import { type FormEvent, useState } from "react";
import { site } from "@/lib/site";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const projectTypes = [
  "Barndominium or home",
  "Shop or garage",
  "Farm or ag building",
  "Commercial building",
  "Storage or horse barn",
  "Not sure yet",
];

declare global {
  interface Window {
    turnstile?: {
      reset: () => void;
    };
  }
}

export default function QuoteRequestForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json")
        ? ((await response.json()) as { error?: string; reference?: string })
        : {};

      if (!response.ok) {
        throw new Error(result.error || "Unable to send your request. Please call us instead.");
      }

      form.reset();
      window.turnstile?.reset();
      setReference(result.reference || "");
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send your request.");
    }
  }

  if (status === "success") {
    return <SuccessPanel reference={reference} />;
  }

  return (
    <>
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      )}

      <form onSubmit={handleSubmit} className="grid gap-5">
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" name="name" autoComplete="name" required />
          <Field label="Phone" name="phone" type="tel" autoComplete="tel" required />
        </div>

        <Field label="Email" name="email" type="email" autoComplete="email" required />

        <label className="grid gap-2">
          <span className="font-display text-xs font-semibold uppercase tracking-wide text-accent">
            What are you looking to build?
          </span>
          <select
            name="projectType"
            required
            className="h-12 rounded-md border border-line bg-white px-3 text-steel-900 outline-none transition-colors focus:border-accent"
            defaultValue=""
          >
            <option value="" disabled>
              Select one
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="font-display text-xs font-semibold uppercase tracking-wide text-accent">
            Comments
          </span>
          <textarea
            name="comments"
            rows={6}
            placeholder="Tell us about size, use, location, timeline, or anything else that would help us understand the project."
            className="resize-y rounded-md border border-line bg-white px-3 py-3 text-steel-900 outline-none transition-colors focus:border-accent"
          />
        </label>

        {turnstileSiteKey && (
          <div
            className="cf-turnstile"
            data-sitekey={turnstileSiteKey}
            data-action="quote-request"
          />
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 py-3 font-display font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
        >
          {status === "submitting" ? "Sending..." : "Request a Quote"}
        </button>

        {status === "error" && message && (
          <p
            className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            role="status"
          >
            {message}
          </p>
        )}
      </form>
    </>
  );
}

function SuccessPanel({ reference }: { reference: string }) {
  return (
    <div
      role="status"
      className="rounded-lg border-2 border-accent bg-accent/5 px-6 py-7 sm:px-8"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
        <div>
          <h3 className="font-display text-xl font-semibold text-steel-900">
            Request received — thank you!
          </h3>
          <p className="mt-2 leading-relaxed text-steel-700">
            We&apos;ve got your details and will follow up soon.
            {reference && (
              <>
                {" "}
                Your quote reference is{" "}
                <strong className="whitespace-nowrap text-steel-900">{reference}</strong> — hang
                onto it for any follow-up.
              </>
            )}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-steel-600">
            Prefer to talk it through? Call{" "}
            <a href={site.phoneHref} className="font-semibold text-accent hover:text-accent-600">
              {site.phoneDisplay}
            </a>
            . {site.callNote}
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-display text-xs font-semibold uppercase tracking-wide text-accent">
        {label}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="h-12 rounded-md border border-line bg-white px-3 text-steel-900 outline-none transition-colors focus:border-accent"
      />
    </label>
  );
}
