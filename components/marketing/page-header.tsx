import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <Section tone="muted" spacing="compact">
      <Container>
        <Eyebrow withDot>{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-display-sm font-semibold text-navy md:text-display-md">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-body-lg text-slate">
            {description}
          </p>
        ) : null}
        {actions ? <div className="mt-8">{actions}</div> : null}
      </Container>
    </Section>
  );
}

export { PageHeader };
