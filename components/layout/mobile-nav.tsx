"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Menu, Phone } from "lucide-react";
import type { NavigationItem } from "@/content/navigation";
import { isActivePath } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type MobileNavProps = {
  items: NavigationItem[];
};

function MobileNav({ items }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open navigation menu"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "lg:hidden",
          )}
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[min(22rem,calc(100vw-2rem))] p-0"
      >
        <SheetTitle className="sr-only">Site navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Primary navigation links and contact details for AxiomBridge
          Consulting.
        </SheetDescription>

        <div className="flex h-full flex-col">
          <div className="flex h-20 shrink-0 items-center border-b border-line pr-14 pl-6">
            <Logo size="sm" />
          </div>

          <nav
            aria-label="Mobile primary"
            className="flex-1 overflow-y-auto px-4 py-6"
          >
            <ul className="space-y-1">
              {items.map((item) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <li key={item.href}>
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block border-l-2 px-4 py-3 font-sans text-body-md transition-colors",
                          active
                            ? "border-gold bg-surface-muted font-medium text-navy"
                            : "border-transparent text-slate hover:bg-surface hover:text-navy",
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="shrink-0 border-t border-line px-6 py-6">
            <SheetClose asChild>
              <Link
                href={siteConfig.cta.href}
                className={cn(buttonVariants({ size: "md" }), "w-full")}
              >
                {siteConfig.cta.label}
              </Link>
            </SheetClose>

            <div className="mt-5 space-y-2.5">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 text-body-sm text-slate transition-colors hover:text-navy"
              >
                <Mail aria-hidden="true" className="size-4 text-gold-dark" />
                {siteConfig.contact.email}
              </a>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-body-sm text-slate transition-colors hover:text-navy"
              >
                <Phone aria-hidden="true" className="size-4 text-gold-dark" />
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { MobileNav };
