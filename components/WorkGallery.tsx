"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Project } from "@/lib/data";

export default function WorkGallery({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const show = useCallback(
    (dir: number) =>
      setActive((i) => {
        if (i === null) return i;
        return (i + dir + projects.length) % projects.length;
      }),
    [projects.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(1);
      if (e.key === "ArrowLeft") show(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, show]);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <button
            key={p.slug}
            onClick={() => setActive(i)}
            className="group block overflow-hidden rounded-lg border border-line bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded bg-ink/80 px-2 py-1 font-display text-[0.65rem] font-semibold uppercase tracking-wide text-white backdrop-blur">
                {p.category}
              </span>
            </div>
            <div className="px-4 py-4">
              <h3 className="font-display text-lg font-semibold text-steel-900">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-600">{p.blurb}</p>
            </div>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={projects[active].title}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); show(-1); }}
            aria-label="Previous"
            className="absolute left-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <figure
            className="max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-black">
              <Image
                src={projects[active].image}
                alt={projects[active].title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-3 text-white">
              <span className="font-display text-lg font-semibold">
                {projects[active].title}
              </span>
              <span className="font-display text-xs font-semibold uppercase tracking-wide text-accent">
                {projects[active].category}
              </span>
            </figcaption>
          </figure>

          <button
            onClick={(e) => { e.stopPropagation(); show(1); }}
            aria-label="Next"
            className="absolute right-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      )}
    </>
  );
}
