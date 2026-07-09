import type { Metadata } from "next";
import CallButton from "@/components/CallButton";
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
      <section className="border-b border-line bg-surface-2">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="eyebrow">Our Work</p>
          <h1 className="mt-2 text-4xl md:text-5xl">Builds we&apos;re proud of</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-steel-600">
            A look at recent post-frame projects around northeast Kansas — from
            custom barndominiums to working shops and machine sheds. Tap any photo
            to take a closer look.
          </p>
        </div>
      </section>

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
