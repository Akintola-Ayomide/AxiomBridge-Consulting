import Link from "next/link";
import { cacheLife } from "next/cache";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { practiceAreas } from "@/content/company";
import { primaryNavigation } from "@/content/navigation";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";

const linkClass =
  "font-sans text-body-sm text-on-navy-muted transition-colors hover:text-ivory";

async function getCopyrightYear() {
  "use cache";
  cacheLife("weeks");

  return new Date().getFullYear();
}

async function SiteFooter() {
  const year = await getCopyrightYear();
  const linkedin = siteConfig.social.linkedin;

  return (
    <footer className="relative bg-navy text-ivory">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
      />

      <Container className="pt-16 pb-8 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-gutter-desktop">
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Link href="/" className="w-fit rounded-sm">
              <Logo tone="light" />
            </Link>

            <p className="max-w-sm font-sans text-body-sm text-on-navy-muted">
              Strategic thinking. Practical solutions. Sustainable growth.
              Independent advice for organisations across West Africa.
            </p>

            {linkedin ? (
              <a
                href={linkedin.toString()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 font-sans text-label-md uppercase text-gold transition-colors hover:text-ivory"
              >
                LinkedIn
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
          </div>

          <nav aria-label="Footer navigation" className="lg:col-span-2">
            <h2 className="mb-4 font-sans text-label-md uppercase text-gold">
              Navigation
            </h2>
            <ul className="space-y-2.5">
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Practice areas" className="lg:col-span-3">
            <h2 className="mb-4 font-sans text-label-md uppercase text-gold">
              Practice Areas
            </h2>
            <ul className="space-y-2.5">
              {practiceAreas.map((practice) => (
                <li key={practice.slug}>
                  <Link
                    href={`/services#${practice.slug}`}
                    className={linkClass}
                  >
                    {practice.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="mb-4 font-sans text-label-md uppercase text-gold">
              Office &amp; Inquiries
            </h2>
            <address className="flex flex-col gap-3 not-italic">
              <span className="flex items-start gap-2.5">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-gold"
                />
                <span className={linkClass}>{siteConfig.contact.address}</span>
              </span>
              <span className="flex items-center gap-2.5">
                <Mail
                  aria-hidden="true"
                  className="size-4 shrink-0 text-gold"
                />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className={linkClass}
                >
                  {siteConfig.contact.email}
                </a>
              </span>
              <span className="flex items-center gap-2.5">
                <Phone
                  aria-hidden="true"
                  className="size-4 shrink-0 text-gold"
                />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className={linkClass}
                >
                  {siteConfig.contact.phone}
                </a>
              </span>
              <span className="flex items-start gap-2.5">
                <Clock
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-gold"
                />
                <span className="font-sans text-label-md text-on-navy-muted">
                  {siteConfig.contact.hours}
                </span>
              </span>
            </address>
          </div>
        </div>

        <div className="mt-14 border-t border-ivory/10 pt-6 text-right font-sans text-body-sm text-on-navy-muted">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export { SiteFooter };
