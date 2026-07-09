import type { Metadata } from "next";
import Image from "next/image";
import CallButton from "@/components/CallButton";
import { services, customization } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "What We Build",
  description:
    "Custom barndominiums, shops, garages, farm buildings, and commercial post-frame construction across northeast Kansas. Fully customizable — call for a free quote.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line bg-surface-2">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="eyebrow">What We Build</p>
          <h1 className="mt-2 text-4xl md:text-5xl">Post-frame, done right</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-steel-600">
            Post-frame construction is the smart, durable, cost-effective way to
            build — from a dream barndominium to a working machine shed. One local
            team handles your project from the first conversation to the final
            walkthrough.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-14">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="grid items-center gap-8 lg:grid-cols-2"
            >
              <div
                className={`relative aspect-[16/10] overflow-hidden rounded-lg shadow-sm ${
                  i % 2 === 1 ? "lg:order-last" : ""
                }`}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl">{s.title}</h2>
                <p className="mt-3 leading-relaxed text-steel-600">{s.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customization */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center">
          <p className="eyebrow">Built Your Way</p>
          <h2 className="mt-2 text-3xl text-white md:text-4xl">
            Every build is fully custom
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/75">
            Nothing here comes off a catalog. Tell us how you&apos;ll use your
            building and we&apos;ll design it to fit — inside and out.
          </p>
          <ul className="mx-auto mt-8 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
            {customization.map((c) => (
              <li key={c} className="flex items-center gap-3">
                <span className="text-accent" aria-hidden="true">✓</span>
                <span className="text-sm text-white/90">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-accent">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center">
          <h2 className="text-3xl text-white md:text-4xl">Let&apos;s build yours.</h2>
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
