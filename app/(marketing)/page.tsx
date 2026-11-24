import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { HomeHero } from "@/components/marketing/home-hero";
import { PrinciplesGrid } from "@/components/marketing/principles-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <Section tone="canvas" aria-labelledby="principles-heading">
        <Container>
          <SectionHeading
            id="principles-heading"
            eyebrow="Who we are"
            title="Strategic clarity in an evolving market"
            titleClassName="max-w-2xl"
            description="AxiomBridge is an independent management consulting firm providing boardroom advisory, rigorous operational diagnostics and transformational growth frameworks designed for West African market realities."
            action={{ label: "Learn about our firm", href: "/about" }}
          />
          <PrinciplesGrid className="mt-10 lg:mt-12" />
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
