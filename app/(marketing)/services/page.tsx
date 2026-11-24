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
    "Strategy, operations, financial advisory, digital transformation and corporate growth support for organisations in Nigeria and West Africa.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our expertise"
        title="Practical capabilities for complex decisions"
        description="Five connected practice areas help leadership teams define strategy, improve operations and manage change with confidence."
      />

      <Section tone="canvas">
        <Container>
          <SectionHeading
            eyebrow="Practice areas"
            title="Five connected disciplines"
            description="Each engagement draws on the full breadth of the firm, combining market context with disciplined execution."
            action={{ label: "Discuss an engagement", href: "/contact" }}
          />
          <PracticeGrid className="mt-10 lg:mt-12" />
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
