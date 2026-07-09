import type { Metadata } from "next";
import CallButton from "@/components/CallButton";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call Chris Gross Construction in Holton, KS for a free quote on your barndominium, shop, or post-frame building. Serving northeast Kansas.",
  alternates: { canonical: "/contact/" },
};

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  site.address.full
)}&output=embed`;

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-line bg-surface-2">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-2 text-4xl md:text-5xl">Call for a free quote</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-steel-600">
            The fastest way to get started is a quick phone call. Tell Chris what
            you&apos;re thinking about building and he&apos;ll talk you through
            options and pricing — no obligation.
          </p>
          <CallButton className="mt-7">Call {site.phoneDisplay}</CallButton>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl md:text-3xl">Get in touch</h2>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="font-display text-xs font-semibold uppercase tracking-wide text-accent">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a href={site.phoneHref} className="text-xl text-steel-900 hover:text-accent">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-display text-xs font-semibold uppercase tracking-wide text-accent">
                  Address
                </dt>
                <dd className="mt-1 text-steel-700">{site.address.full}</dd>
              </div>
              <div>
                <dt className="font-display text-xs font-semibold uppercase tracking-wide text-accent">
                  Hours
                </dt>
                <dd className="mt-1 text-steel-700">{site.hours}</dd>
              </div>
              <div>
                <dt className="font-display text-xs font-semibold uppercase tracking-wide text-accent">
                  Service Area
                </dt>
                <dd className="mt-1 leading-relaxed text-steel-700">
                  {site.serviceArea.join(" · ")}
                </dd>
              </div>
            </dl>
          </div>

          <div className="overflow-hidden rounded-lg border border-line">
            <iframe
              title={`Map to ${site.name}`}
              src={mapSrc}
              className="h-80 w-full lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 bg-surface-2">
        <div className="mx-auto max-w-4xl px-5 py-16">
          <p className="eyebrow">About</p>
          <h2 className="mt-2 text-3xl md:text-4xl">A local builder you can trust</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-steel-600">
            <p>
              Chris Gross Construction is a family-owned post-frame builder based
              in Holton, Kansas — about 30 minutes north of Topeka. We build
              custom barndominiums, shops, garages, and farm buildings for folks
              all across northeast Kansas.
            </p>
            <p>
              We&apos;ve built our reputation the old-fashioned way: showing up on
              time, doing honest work, and standing behind it. Every building gets
              the same attention to detail and the same straight answers — whether
              it&apos;s a simple machine shed or a full custom home.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-accent">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center">
          <h2 className="text-3xl text-white md:text-4xl">Let&apos;s get building.</h2>
          <p className="mt-3 text-lg text-white/90">Give Chris a call today.</p>
          <CallButton variant="light" className="mt-7">
            Call {site.phoneDisplay}
          </CallButton>
        </div>
      </section>
    </>
  );
}
