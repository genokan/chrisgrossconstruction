import type { Metadata } from "next";
import CallButton from "@/components/CallButton";
import PageHeader from "@/components/PageHeader";
import WorkGallery from "@/components/WorkGallery";
import { projects } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "A gallery of custom barndominiums, shops, garages, and farm buildings built by Chris Gross Construction across northeast Kansas.",
  alternates: { canonical: "/work/" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader eyebrow="Our Work" title="Builds we&apos;re proud of">
        A look at recent post-frame projects around northeast Kansas — from
        custom barndominiums to working shops and machine sheds. Tap any photo
        to take a closer look.
      </PageHeader>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <WorkGallery projects={projects} />
      </section>

      <section className="bg-accent">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center">
          <h2 className="text-3xl text-white md:text-4xl">See something you like?</h2>
          <p className="mt-3 text-lg text-white/90">
            Call for a free quote and we&apos;ll build yours next.
          </p>
          <CallButton variant="light" className="mt-7">
            Call {site.phoneDisplay}
          </CallButton>
        </div>
      </section>
    </>
  );
}
