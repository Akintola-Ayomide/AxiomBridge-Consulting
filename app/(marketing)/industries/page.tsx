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
    "Sector expertise across financial services, technology and telecoms, manufacturing, healthcare, consumer goods, logistics and energy in West Africa.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industry practices"
        title="Deep sector specialisation"
        description="Navigating regulatory landscapes, macroeconomic shifts and structural transitions across West Africa's primary growth engines."
      />

      <Section tone="canvas" aria-labelledby="industries-heading">
        <Container>
          <SectionHeading
            id="industries-heading"
            eyebrow="Sectors"
            title="Where we work"
            description="Sector fluency is not a backdrop to our advice. It is the basis for it."
            action={{ label: "Talk to an advisor", href: "/contact" }}
          />
          <IndustryGrid className="mt-10 lg:mt-12" />
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
