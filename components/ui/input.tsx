import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-sm border border-line-strong bg-surface-elevated px-3 font-sans text-body-md text-charcoal outline-none transition-colors placeholder:text-slate/70 focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/25 aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-600/20 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
