import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { PageHeader } from "@/components/marketing/page-header";
import { PracticeGrid } from "@/components/marketing/practice-grid";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Strategy, operational excellence, financial advisory, digital transformation and corporate growth advisory for West African organisations.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our expertise"
        title="Capabilities built for market leadership"
        description="Five integrated practice areas designed to help leadership teams make better decisions, strengthen performance and scale with confidence."
      />

      <Section tone="canvas">
        <Container>
          <SectionHeading
            eyebrow="Practice areas"
            title="Five disciplines. One integrated mandate."
            description="Each engagement draws on the full breadth of the firm, combining market intelligence with disciplined execution."
            action={{ label: "Discuss an engagement", href: "/contact" }}
          />
          <PracticeGrid className="mt-10 lg:mt-12" />
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
