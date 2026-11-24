import Link from "next/link";
import { primaryNavigation } from "@/content/navigation";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-background/90 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link href="/" className="rounded-sm">
          <Logo />
        </Link>

        <DesktopNav items={primaryNavigation} />

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link href={siteConfig.cta.href}>{siteConfig.cta.label}</Link>
          </Button>
          <MobileNav items={primaryNavigation} />
        </div>
      </Container>
    </header>
  );
}

export { SiteHeader };
