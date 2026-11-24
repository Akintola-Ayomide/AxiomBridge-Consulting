import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { ContactDetails } from "@/components/marketing/contact-details";
import { PageHeader } from "@/components/marketing/page-header";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send an enquiry to AxiomBridge Consulting in Victoria Island, Lagos, about a strategic advisory, operational or growth mandate.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start a conversation with our senior advisors."
        description="Tell us about the mandate, the decision in front of you and the timing that matters. We will direct your enquiry to the right senior advisor."
      />

      <Section tone="canvas">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Enquiries"
                title="Send us an enquiry"
                description="Complete the form and our senior advisors will review your message. Fields marked with an asterisk are required."
              />
              <EnquiryForm className="mt-8" />
            </div>

            <div className="flex flex-col gap-6 lg:col-span-5">
              <ContactDetails />

              <Card tone="navy" className="p-6 md:p-8">
                <Eyebrow tone="light">Direct lines</Eyebrow>
                <h2 className="mt-3 font-display text-headline-md font-medium text-ivory">
                  A discreet, senior conversation.
                </h2>
                <p className="mt-4 text-body-md text-on-navy-muted">
                  Prefer email or telephone? Reach our team directly using the
                  details below.
                </p>

                <div className="mt-8 space-y-5">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-start gap-3 text-body-md text-ivory transition-colors hover:text-gold"
                  >
                    <Mail
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-gold"
                    />
                    <span>{siteConfig.contact.email}</span>
                  </a>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                    className="flex items-start gap-3 text-body-md text-ivory transition-colors hover:text-gold"
                  >
                    <Phone
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-gold"
                    />
                    <span>{siteConfig.contact.phone}</span>
                  </a>
                  <div className="flex items-start gap-3 text-body-md text-on-navy-muted">
                    <Clock
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-gold"
                    />
                    <span>{siteConfig.contact.hours}</span>
                  </div>
                </div>

                <div className="mt-8 border-t border-ivory/10 pt-6">
                  <Link
                    href="/services"
                    className="font-sans text-label-md uppercase text-gold transition-colors hover:text-ivory"
                  >
                    Explore our practice areas
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}
