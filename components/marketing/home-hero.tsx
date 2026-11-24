import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Landmark } from "lucide-react";
import { metrics } from "@/content/company";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { IconTile } from "@/components/ui/icon-tile";
import { Metric } from "@/components/ui/metric";

function HomeHero() {
  return (
    <Section tone="surface" spacing="default" className="overflow-hidden">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-gutter-desktop">
          <div className="lg:col-span-7">
            <Eyebrow withDot>Advisory Excellence in West Africa</Eyebrow>

            <h1 className="mt-6 max-w-3xl font-display text-display-sm font-semibold text-navy md:text-display-lg">
              Building Better Businesses Through Strategic Thinking.
            </h1>

            <p className="mt-6 max-w-xl text-body-lg text-slate">
              We help organisations navigate complexity, strengthen performance
              and unlock sustainable growth across Nigeria and West Africa.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/contact">
                  Request a consultation
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/services">Explore our expertise</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line bg-navy shadow-drawer">
              <Image
                src="/images/hero-boardroom.jpg"
                alt="Senior pan-African executives in a boardroom meeting overlooking Lagos."
                fill
                priority
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent"
              />
              <figcaption className="absolute right-4 bottom-4 left-4 flex items-center justify-between gap-4 rounded-sm bg-surface-elevated/95 p-4 shadow-card backdrop-blur-md">
                <div>
                  <span className="block font-sans text-label-sm uppercase text-gold-dark">
                    Sovereign &amp; Corporate Counsel
                  </span>
                  <span className="mt-1 block font-sans text-title-md text-navy">
                    Victoria Island, Lagos
                  </span>
                </div>
                <IconTile icon={Landmark} tone="navy" size="sm" />
              </figcaption>
            </figure>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 rounded-sm border border-line bg-surface-elevated p-6 shadow-card md:grid-cols-4 md:p-8">
          {metrics.map((metric) => (
            <Metric
              key={metric.label}
              value={metric.value}
              label={metric.label}
            />
          ))}
        </dl>
      </Container>
    </Section>
  );
}

export { HomeHero };
