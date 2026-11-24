import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-sans text-label-md uppercase transition-[background-color,border-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "border-b-2 border-transparent bg-navy text-ivory shadow-card hover:border-gold hover:bg-navy-light",
        secondary:
          "border border-line-strong bg-surface-elevated text-charcoal hover:border-navy hover:bg-surface",
        inverse:
          "border-b-2 border-transparent bg-ivory text-navy shadow-card hover:border-gold hover:bg-white",
        outline:
          "border border-ivory/30 bg-transparent text-ivory hover:border-ivory/60 hover:bg-ivory/10",
        ghost:
          "border border-transparent text-navy hover:bg-surface-muted",
      },
      size: {
        sm: "h-9 px-4 text-label-sm",
        md: "h-11 px-6",
        lg: "h-12 px-7",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
