import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "action" | "sovereign";
  tone?: "dark" | "light";
  className?: string;
};

const variants = {
  action: "text-title-md normal-case",
  sovereign: "text-label-md uppercase",
};

const tones = {
  dark: "text-gold-dark hover:text-navy",
  light: "text-gold hover:text-ivory",
};

function ArrowLink({
  href,
  children,
  variant = "action",
  tone = "dark",
  className,
}: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-sans font-semibold transition-colors",
        variants[variant],
        tones[tone],
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-200 group-hover:translate-x-1"
      />
    </Link>
  );
}

export { ArrowLink };
