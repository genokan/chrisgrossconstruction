import type { Metadata } from "next";
import CallButton from "@/components/CallButton";
import { FacebookIcon, MailIcon, PhoneIcon } from "@/components/ContactIcons";
import PageHeader from "@/components/PageHeader";
import QuoteRequestForm from "@/components/QuoteRequestForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call or email Chris Gross Construction in Holton, KS for a free quote on your barndominium, shop, or post-frame building. Serving northeast Kansas.",
  alternates: { canonical: "/contact/" },
};

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  site.address.full
)}&output=embed`;

export default function ContactPage() {
  const facebook = site.socialProfiles[0];

  return (
    <>
      <PageHeader eyebrow="Contact" title="Call us for a free quote">
        The fastest way to get started is a quick phone call. Tell us what
        you&apos;re thinking about building and we&apos;ll talk you through options
        and pricing with no obligation.
      </PageHeader>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.8fr]">
          <div>
            <h2 className="text-2xl md:text-3xl">Request a quote</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-steel-600">
              Send a few details about what you&apos;re planning and we&apos;ll follow up.
              No pressure, no obligation.
            </p>
            <div className="mt-8">
              <QuoteRequestForm />
            </div>
          </div>

          <aside className="space-y-8">
            <div className="border-l-4 border-accent bg-surface-2 px-6 py-6">
              <h2 className="font-display text-xl font-semibold text-steel-900">
                Prefer to talk?
              </h2>
              <div className="mt-5 grid gap-3">
                <ContactLink href={site.phoneHref} label={site.phoneDisplay} icon={<PhoneIcon />} />
                <ContactLink href={site.emailHref} label="Email Us" icon={<MailIcon />} />
                <ContactLink
                  href={facebook.href}
                  label="Follow on Facebook"
                  icon={<FacebookIcon />}
                  external
                />
              </div>
            </div>

            <dl className="space-y-5">
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

            <div className="overflow-hidden rounded-lg border border-line">
              <iframe
                title={`Map to ${site.name}`}
                src={mapSrc}
                className="h-80 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-accent">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center">
          <h2 className="text-3xl text-white md:text-4xl">Let&apos;s get building.</h2>
          <p className="mt-3 text-lg text-white/90">Give us a call today.</p>
          <CallButton variant="light" className="mt-7">
            Call {site.phoneDisplay}
          </CallButton>
        </div>
      </section>
    </>
  );
}

function ContactLink({
  href,
  label,
  icon,
  external = false,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-3 rounded-md border border-line bg-white px-4 py-3 font-display font-semibold uppercase tracking-wide text-steel-900 transition-colors hover:border-accent hover:text-accent"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
        {icon}
      </span>
      <span>{label}</span>
    </a>
  );
}
