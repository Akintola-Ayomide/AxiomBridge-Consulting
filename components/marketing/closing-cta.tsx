import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

function ClosingCta() {
  return (
    <Section
      tone="navy"
      aria-labelledby="closing-cta-heading"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
      />

      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow tone="light">Partner with AxiomBridge</Eyebrow>
          <h2
            id="closing-cta-heading"
            className="mt-4 font-display text-display-sm font-semibold text-ivory md:text-display-lg"
          >
            {"Let's Build What's Next."}
          </h2>
          <p className="mt-5 max-w-xl text-body-lg text-on-navy-muted">
            Clarify your priorities, strengthen execution and build practical
            capacity for growth.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="inverse" size="lg">
              <Link href="/contact">Start a conversation</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">Explore our services</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export { ClosingCta };
