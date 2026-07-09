"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FacebookIcon } from "@/components/ContactIcons";
import { site } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const facebook = site.socialProfiles[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-line bg-white/95 backdrop-blur"
          : "border-transparent bg-white"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-18">
        <Link href="/" className="flex flex-col leading-none" aria-label={site.name}>
          <span className="font-display text-lg font-bold uppercase tracking-tight text-ink md:text-xl">
            Chris Gross
          </span>
          <span className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-accent">
            Construction
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-sm font-semibold uppercase tracking-wide text-steel-700 transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={facebook.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Chris Gross Construction on Facebook"
            title="Follow on Facebook"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-steel-700 transition-colors hover:border-accent hover:bg-accent hover:text-white"
          >
            <FacebookIcon className="h-5 w-5" />
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-600"
          >
            {site.phoneDisplay}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href={facebook.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Chris Gross Construction on Facebook"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-steel-700 transition-colors hover:bg-surface-2 hover:text-accent"
          >
            <FacebookIcon className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-steel-700"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-white md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 font-display text-base font-semibold uppercase tracking-wide text-steel-700"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={facebook.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-md border border-line px-4 py-3 font-display font-semibold uppercase tracking-wide text-steel-700"
            >
              <FacebookIcon className="h-5 w-5 text-accent" />
              Follow on Facebook
            </a>
            <a
              href={site.phoneHref}
              className="mt-3 mb-2 inline-flex items-center justify-center rounded-md bg-accent px-4 py-3 font-display font-semibold uppercase tracking-wide text-white"
            >
              Call {site.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
