import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { legalPolicies } from "@/content/legal";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/marketing/page-header";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site";

// Legal routes resolve their content from `params`, so they are allowed to
// block briefly instead of participating in instant-shell validation.
export const instant = false;

type LegalPolicyPageProps = {
  params: Promise<{ policy: string }>;
};

function getPolicy(slug: string) {
  return legalPolicies.find((policy) => policy.slug === slug);
}

export function generateStaticParams() {
  return legalPolicies.map((policy) => ({ policy: policy.slug }));
}

export async function generateMetadata({
  params,
}: LegalPolicyPageProps): Promise<Metadata> {
  const { policy: slug } = await params;
  const policy = getPolicy(slug);

  if (!policy) {
    return {};
  }

  return {
    title: policy.title,
    description: policy.description,
    robots: { index: false, follow: true },
  };
}

export default async function LegalPolicyPage({
  params,
}: LegalPolicyPageProps) {
  const { policy: slug } = await params;
  const policy = getPolicy(slug);

  if (!policy) {
    notFound();
  }

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={policy.title}
        description={policy.description}
      />

      <Section tone="canvas">
        <Container size="prose">
          <Badge tone="gold">In preparation</Badge>

          <div className="mt-6 space-y-5 text-body-lg text-slate">
            <p>
              The full text of this policy is being prepared for publication.
              The final version will set out the applicable terms and
              commitments in detail.
            </p>
            <p>
              For questions about this policy, or about how AxiomBridge handles
              information, please contact{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-medium text-gold-dark underline decoration-gold/50 underline-offset-4 transition-colors hover:text-navy"
              >
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </div>

          <div className="mt-10 border-t border-line pt-6">
            <p className="font-sans text-label-md uppercase text-slate">
              Related policies
            </p>
            <ul className="mt-4 space-y-2">
              {legalPolicies
                .filter((item) => item.slug !== policy.slug)
                .map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={item.href}
                      className="font-sans text-body-md text-navy underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold-dark"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
