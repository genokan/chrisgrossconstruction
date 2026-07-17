import Image from "next/image";
import Link from "next/link";
import CallButton from "@/components/CallButton";
import { site } from "@/lib/site";
import { projects, services, customization, valueProps } from "@/lib/data";

const featured = projects.slice(1, 7);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[72vh] min-h-[540px] w-full">
        <Image
          src="/photos/holton-vet-clinic.webp"
          alt="Banner Creek Animal Hospital — a commercial post-frame veterinary clinic built by Chris Gross Construction"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-5">
            <div className="max-w-2xl">
              <p className="eyebrow">Post-Frame Builders · Holton, Kansas</p>
              <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                Custom barndominiums, shops &amp; post-frame buildings.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
                Family-owned and built in Holton — serving northeast Kansas.
                Designed your way, built to last.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CallButton />
                <Link
                  href="/work/"
                  className="inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-3 font-display font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
                >
                  See Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value strip */}
      <section className="border-b border-line bg-surface-2">
        <div className="mx-auto grid max-w-6xl gap-px overflow-hidden px-5 py-2 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((v) => (
            <div key={v.title} className="px-2 py-6 sm:px-4">
              <div className="mb-2 h-0.5 w-8 bg-accent" />
              <h3 className="font-display text-base font-semibold uppercase tracking-wide text-steel-900">
                {v.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-steel-600">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured work */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Our Work</p>
            <h2 className="mt-2 text-3xl md:text-4xl">Post-frame builds across northeast Kansas</h2>
          </div>
          <Link
            href="/work/"
            className="font-display text-sm font-semibold uppercase tracking-wide text-accent hover:text-accent-600"
          >
            See all our work →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href="/work/"
              className="group block overflow-hidden rounded-lg border border-line bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
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
                <h3 className="font-display text-lg font-semibold text-steel-900">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* What we build */}
      <section className="bg-surface-2 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <p className="eyebrow">What We Build</p>
            <h2 className="mt-2 text-3xl md:text-4xl">One local team, every kind of post-frame build</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div key={s.title} className="overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image src={s.image} alt={s.title} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
                </div>
                <div className="px-4 py-5">
                  <h3 className="font-display text-lg font-semibold text-steel-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-600">{s.blurb}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/services/" className="font-display text-sm font-semibold uppercase tracking-wide text-accent hover:text-accent-600">
              More on what we build →
            </Link>
          </div>
        </div>
      </section>

      {/* Customization — built your way */}
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2">
          <div className="relative order-last aspect-[4/3] overflow-hidden rounded-lg lg:order-first">
            <Image src="/photos/p10.jpg" alt="Modern custom barndominium with two-story glass gable" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow">Built Your Way</p>
            <h2 className="mt-3 text-3xl text-white md:text-4xl">No two builds are the same</h2>
            <p className="mt-4 max-w-md leading-relaxed text-white/75">
              From the floor plan to the final trim color, every build is designed
              around you. Tell us how you&apos;ll use it and we&apos;ll make it fit —
              nothing off a catalog.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {customization.map((c) => (
                <li key={c} className="flex items-center gap-3 text-white/90">
                  <span className="text-accent" aria-hidden="true">✓</span>
                  <span className="text-sm">{c}</span>
                </li>
              ))}
            </ul>
            <CallButton className="mt-9">Start Your Custom Build</CallButton>
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="bg-surface-2">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center">
          <p className="eyebrow">Where We Build</p>
          <h2 className="mt-2 text-3xl md:text-4xl">Proudly serving northeast Kansas</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-steel-600">
            {site.areaBlurb} From your acreage to Main Street, we build across the region.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {site.serviceArea.map((town) => (
              <span key={town} className="rounded-full border border-line bg-white px-4 py-1.5 font-display text-sm font-medium text-steel-700">
                {town}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center">
          <h2 className="text-3xl text-white md:text-4xl">Ready to build? Let&apos;s talk.</h2>
          <p className="mt-3 text-lg text-white/90">
            Free quotes — just give Chris a call.
          </p>
          <CallButton variant="light" className="mt-7">
            Call {site.phoneDisplay}
          </CallButton>
        </div>
      </section>
    </>
  );
}
