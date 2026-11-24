"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationItem } from "@/content/navigation";
import { isActivePath } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type DesktopNavProps = {
  items: NavigationItem[];
};

function DesktopNav({ items }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-7 xl:gap-9">
        {items.map((item) => {
          const active = isActivePath(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-block border-b-2 py-2 font-sans text-body-md transition-colors",
                  active
                    ? "border-gold font-medium text-navy"
                    : "border-transparent text-slate hover:border-line-strong hover:text-navy",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { DesktopNav };
