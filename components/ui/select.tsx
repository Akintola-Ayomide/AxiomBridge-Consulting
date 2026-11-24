import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Select = React.forwardRef<HTMLSelectElement, React.ComponentProps<"select">>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "flex h-11 w-full appearance-none rounded-sm border border-line-strong bg-surface-elevated pr-10 pl-3 font-sans text-body-md text-charcoal outline-none transition-colors focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/25 aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-600/20 disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate"
      />
    </div>
  ),
);
Select.displayName = "Select";

export { Select };
