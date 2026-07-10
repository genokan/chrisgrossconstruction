"use client";

import Script from "next/script";
import { type FormEvent, useState } from "react";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const projectTypes = [
  "Barndominium or home",
  "Shop or garage",
  "Farm or ag building",
  "Commercial building",
  "Storage or horse barn",
  "Not sure yet",
];

const contactMethods = ["Phone", "Text", "Email"];

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
        ? ((await response.json()) as { error?: string })
        : {};

      if (!response.ok) {
        throw new Error(result.error || "Unable to send your request. Please call us instead.");
      }

      form.reset();
      window.turnstile?.reset();
      setStatus("success");
      setMessage("Thanks. We received your request and will follow up soon.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send your request.");
    }
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

        <div className="grid gap-5 sm:grid-cols-2">
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
              Preferred contact method
            </span>
            <select
              name="preferredContact"
              required
              className="h-12 rounded-md border border-line bg-white px-3 text-steel-900 outline-none transition-colors focus:border-accent"
              defaultValue=""
            >
              <option value="" disabled>
                Select one
              </option>
              {contactMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </label>
        </div>

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

        {message && (
          <p
            className={`text-sm font-medium ${
              status === "success" ? "text-steel-700" : "text-red-700"
            }`}
            role="status"
          >
            {message}
          </p>
        )}
      </form>
    </>
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
