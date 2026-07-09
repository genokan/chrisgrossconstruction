import type { Metadata } from "next";
import CallButton from "@/components/CallButton";
import { FacebookIcon, MailIcon, PhoneIcon } from "@/components/ContactIcons";
import PageHeader from "@/components/PageHeader";
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
        <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr_1fr]">
          <ContactAction
            href={site.phoneHref}
            label="Call"
            value={site.phoneDisplay}
            detail="Free quotes start here"
            icon={<PhoneIcon />}
            featured
          />
          <ContactAction
            href={site.emailHref}
            label="Email"
            value="Email Us"
            detail={site.emailDisplay}
            icon={<MailIcon />}
          />
          <ContactAction
            href={facebook.href}
            label="Follow"
            value="Facebook"
            detail="Recent builds and updates"
            icon={<FacebookIcon />}
            external
          />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
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
                  Email
                </dt>
                <dd className="mt-1">
                  <a href={site.emailHref} className="break-all text-xl text-steel-900 hover:text-accent">
                    {site.emailDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-display text-xs font-semibold uppercase tracking-wide text-accent">
                  Social
                </dt>
                <dd className="mt-1">
                  <a
                    href={facebook.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xl text-steel-900 hover:text-accent"
                  >
                    <FacebookIcon className="h-5 w-5" />
                    Follow on Facebook
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

function ContactAction({
  href,
  label,
  value,
  detail,
  icon,
  featured = false,
  external = false,
}: {
  href: string;
  label: string;
  value: string;
  detail?: string;
  icon: React.ReactNode;
  featured?: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`flex min-h-32 min-w-0 items-center gap-4 rounded-lg border px-5 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
        featured
          ? "border-accent bg-accent text-white hover:bg-accent-600"
          : "border-line bg-white text-steel-900 hover:border-accent"
      }`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
          featured ? "bg-white/15" : "bg-accent/10 text-accent"
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span
          className={`block font-display text-xs font-semibold uppercase tracking-wide ${
            featured ? "text-white/75" : "text-accent"
          }`}
        >
          {label}
        </span>
        <span className="mt-1 block text-lg font-semibold leading-snug">{value}</span>
        {detail && (
          <span
            className={`mt-1 block text-sm leading-snug ${
              featured ? "text-white/80" : "break-words text-steel-600"
            }`}
          >
            {detail}
          </span>
        )}
      </span>
    </a>
  );
}
