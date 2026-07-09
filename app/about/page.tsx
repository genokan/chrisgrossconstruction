import type { Metadata } from "next";
import CallButton from "@/components/CallButton";
import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Chris Gross Construction, a locally owned post-frame builder based north of Holton, Kansas with more than 25 years serving northeast Kansas.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="Built on local trust">
        Chris Gross Construction is a locally owned business based north of
        Holton, Kansas. Started by Chris Gross more than 25 years ago, we serve
        families, farms, and local businesses throughout northeast Kansas.
      </PageHeader>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl md:text-3xl">Rooted north of Holton</h2>
              <div className="mt-4 space-y-5 leading-relaxed text-steel-600">
                <p>
                  Our office is on Memory Lane north of Holton, and our work has
                  always been centered around northeast Kansas. We know the area,
                  the people, the weather, and the kind of practical buildings
                  that have to hold up here.
                </p>
                <p>
                  Over the years, Chris Gross Construction has built its
                  reputation through straightforward conversations, dependable
                  work, and buildings planned around each customer&apos;s needs.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl">Designed around the customer</h2>
              <div className="mt-4 space-y-5 leading-relaxed text-steel-600">
                <p>
                  We do not treat a building like a one-size-fits-all package.
                  Every project starts with how it will be used, then we plan the
                  size, layout, openings, storage, finish, and details around the
                  customer&apos;s specifications.
                </p>
                <p>
                  We also build in accordance with local building code
                  requirements, so the finished project is not just useful on day
                  one, but ready for long-term service.
                </p>
              </div>
            </section>
          </div>

          <aside className="border-l-4 border-accent bg-surface-2 px-6 py-6">
            <h2 className="font-display text-xl font-semibold text-steel-900">
              Local Credentials
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-steel-700">
              <li>{site.yearsInBusiness} serving northeast Kansas</li>
              <li>BBB accredited with an A+ rating</li>
              <li>Member of the Holton/Jackson County Chamber of Commerce</li>
              <li>Buildings designed to customer specifications</li>
              <li>Located at {site.address.full}</li>
            </ul>
            <div className="mt-6 flex flex-col items-start gap-2 text-sm">
              {site.trustProfiles.map((profile) => (
                <a
                  key={profile.href}
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-semibold uppercase tracking-wide text-accent hover:text-accent-600"
                >
                  {profile.label}
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-accent">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl text-white md:text-4xl">
              Ready to talk through your build?
            </h2>
            <p className="mt-2 text-white/90">
              Call us for a free quote on your custom post-frame project.
            </p>
          </div>
          <CallButton variant="light">Call {site.phoneDisplay}</CallButton>
        </div>
      </section>
    </>
  );
}
