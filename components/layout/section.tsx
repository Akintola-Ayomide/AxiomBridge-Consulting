import * as React from "react";
import { cn } from "@/lib/utils";

type SectionTone = "canvas" | "surface" | "muted" | "white" | "navy";
type SectionSpacing = "default" | "compact" | "none";

const tones: Record<SectionTone, string> = {
  canvas: "bg-background text-foreground",
  surface: "bg-surface text-foreground",
  muted: "bg-surface-muted text-foreground",
  white: "bg-surface-elevated text-foreground",
  navy: "bg-navy text-ivory",
};

const spacings: Record<SectionSpacing, string> = {
  default: "py-section md:py-section-md lg:py-section-lg",
  compact: "py-12 md:py-16 lg:py-20",
  none: "",
};

export type SectionProps = React.ComponentProps<"section"> & {
  tone?: SectionTone;
  spacing?: SectionSpacing;
};

function Section({
  className,
  tone = "canvas",
  spacing = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(tones[tone], spacings[spacing], className)}
      {...props}
    />
  );
}

export { Section };
