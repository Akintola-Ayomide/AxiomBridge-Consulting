import type { ReactNode } from "react";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

type HeadingSize = "display" | "lg" | "md";
type HeadingTag = "h1" | "h2" | "h3";

const sizeClasses: Record<HeadingSize, string> = {
  display: "text-display-sm md:text-display-lg",
  lg: "text-headline-md md:text-headline-lg",
  md: "text-headline-sm md:text-headline-md",
};

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: {
    label: string;
    href: string;
  };
  align?: "left" | "center";
  size?: HeadingSize;
  tone?: "dark" | "light";
  as?: HeadingTag;
  className?: string;
  titleClassName?: string;
};

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  action,
  align = "left",
  size = "lg",
  tone = "dark",
  as: Heading = "h2",
  className,
  titleClassName,
}: SectionHeadingProps) {
  const isLight = tone === "light";

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center"
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <Eyebrow tone={isLight ? "light" : "gold"} className="mb-3">
            {eyebrow}
          </Eyebrow>
        ) : null}
        <Heading
          id={id}
          className={cn(
            "font-display font-semibold",
            sizeClasses[size],
            isLight ? "text-ivory" : "text-navy",
            titleClassName,
          )}
        >
          {title}
        </Heading>
        {description ? (
          <p
            className={cn(
              "mt-4 text-body-lg",
              isLight ? "text-on-navy-muted" : "text-slate",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>

      {action ? (
        <div className={cn("shrink-0", align === "left" && "md:pb-1")}>
          <ArrowLink href={action.href} tone={isLight ? "light" : "dark"}>
            {action.label}
          </ArrowLink>
        </div>
      ) : null}
    </div>
  );
}

export { SectionHeading };
