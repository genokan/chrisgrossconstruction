import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-steel-400">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-xl font-bold uppercase tracking-tight text-white">
            Chris Gross
          </div>
          <div className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Construction
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Family-owned post-frame builder in Holton, Kansas. Barndominiums,
            shops, and farm buildings across northeast Kansas.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            Get in Touch
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={site.phoneHref} className="text-white transition-colors hover:text-accent">
                {site.phoneDisplay}
              </a>
            </li>
            <li>{site.address.full}</li>
            <li>{site.hours}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            Service Area
          </h4>
          <p className="mt-4 text-sm leading-relaxed">
            {site.serviceArea.slice(0, 8).join(" · ")}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>Building Your Dreams — one build at a time.</span>
        </div>
      </div>
    </footer>
  );
}
