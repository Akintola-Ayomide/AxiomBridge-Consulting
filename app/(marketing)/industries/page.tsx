import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { IndustryGrid } from "@/components/marketing/industry-grid";
import { PageHeader } from "@/components/marketing/page-header";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Sector experience across financial services, technology and telecoms, manufacturing, healthcare, consumer goods, logistics and energy in West Africa.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industry practices"
        title="Sector context that informs better decisions"
        description="We work across the sectors that shape regional economies, bringing relevant operating context to every mandate."
      />

      <Section tone="canvas" aria-labelledby="industries-heading">
        <Container>
          <SectionHeading
            id="industries-heading"
            eyebrow="Sectors"
            title="Where we work"
            description="Understanding how each sector operates is the starting point for relevant, practical advice."
            action={{ label: "Talk to an advisor", href: "/contact" }}
          />
          <IndustryGrid className="mt-10 lg:mt-12" />
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
