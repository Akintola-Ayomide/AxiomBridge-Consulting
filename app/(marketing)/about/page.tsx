import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { PageHeader } from "@/components/marketing/page-header";
import { PrinciplesGrid } from "@/components/marketing/principles-grid";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "AxiomBridge is an independent management consulting firm providing boardroom advisory, operational diagnostics and transformational growth frameworks across West Africa.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Who we are"
        title="Strategic clarity in an evolving market"
        description={siteConfig.description}
      />

      <Section tone="canvas">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-gutter-desktop">
            <div className="lg:col-span-4">
              <Eyebrow>Our mandate</Eyebrow>
              <h2 className="mt-3 max-w-sm font-display text-headline-md font-medium text-navy">
                Independent advice, built for the region.
              </h2>
            </div>

            <div className="space-y-5 text-body-lg text-slate lg:col-span-8">
              <p>
                AxiomBridge provides boardroom advisory, rigorous operational
                diagnostics and transformational growth frameworks designed for
                West African market realities.
              </p>
              <p>
                Our work is grounded in evidence, delivered with execution
                rigour and designed to create value that outlasts the
                engagement. We work alongside leadership teams across financial
                services, industry, consumer markets, technology, healthcare and
                energy.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="muted" aria-labelledby="principles-heading">
        <Container>
          <SectionHeading
            id="principles-heading"
            eyebrow="Our principles"
            title="How we work"
            description="Three commitments shape every diagnostic, recommendation and implementation mandate."
            action={{ label: "Explore our services", href: "/services" }}
          />
          <PrinciplesGrid className="mt-10 lg:mt-12" />
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
