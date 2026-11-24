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
    "Learn how AxiomBridge works with leadership teams in Nigeria and West Africa to make sound decisions, improve execution and build durable capacity for growth.",
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
                Independent advice, grounded in the region.
              </h2>
            </div>

            <div className="space-y-5 text-body-lg text-slate lg:col-span-8">
              <p>
                AxiomBridge works with leadership teams on the decisions that
                shape performance: where to compete, how to operate and how to
                respond to change. Our advice draws on market context and
                operational evidence, not generic playbooks.
              </p>
              <p>
                We stay involved until recommendations are translated into
                priorities, owners and practical next steps. Our work spans
                financial services, industry, consumer markets, technology,
                healthcare and energy.
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
            description="Three commitments shape how we advise, recommend and support implementation."
            action={{ label: "Explore our services", href: "/services" }}
          />
          <PrinciplesGrid className="mt-10 lg:mt-12" />
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
