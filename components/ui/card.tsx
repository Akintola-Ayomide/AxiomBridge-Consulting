import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-sm border", {
  variants: {
    tone: {
      default: "border-line bg-surface-elevated text-foreground shadow-card",
      muted: "border-line bg-surface text-foreground",
      navy: "border-navy/40 bg-navy text-ivory shadow-drawer",
    },
    interactive: {
      true: "transition-[border-color,box-shadow] duration-300 hover:border-gold/60 hover:shadow-drawer",
      false: "",
    },
  },
  defaultVariants: {
    tone: "default",
    interactive: false,
  },
});

export type CardProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof cardVariants> & {
    as?: "div" | "article" | "section" | "li";
  };

function Card({
  as: Comp = "div",
  className,
  tone,
  interactive,
  ...props
}: CardProps) {
  return (
    <Comp
      className={cn(cardVariants({ tone, interactive, className }))}
      {...props}
    />
  );
}

export { Card, cardVariants };
