import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-xs border px-2.5 py-1 font-sans text-label-sm uppercase",
  {
    variants: {
      tone: {
        neutral: "border-line-strong bg-surface-muted text-slate",
        gold: "border-gold/35 bg-gold/10 text-gold-dark",
        navy: "border-navy/15 bg-navy/5 text-navy",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

export type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

function Badge({ className, tone, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ tone, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
