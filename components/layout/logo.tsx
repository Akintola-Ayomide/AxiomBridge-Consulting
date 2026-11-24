import { cn } from "@/lib/utils";

type LogoProps = {
  tone?: "dark" | "light";
  size?: "sm" | "md";
  className?: string;
};

const markSizes = {
  sm: "size-9",
  md: "size-10",
};

const wordmarkSizes = {
  sm: "text-title-md",
  md: "text-title-lg",
};

function Logo({ tone = "dark", size = "md", className }: LogoProps) {
  const isLight = tone === "light";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 40 40"
        fill="none"
        className={cn(
          "shrink-0",
          markSizes[size],
          isLight ? "text-ivory" : "text-navy",
        )}
      >
        <path
          d="M7 33V16L20 5l13 11v17"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M13.5 33V19.5L20 14l6.5 5.5V33"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.55"
        />
        <path d="M7 25h26" className="stroke-gold" strokeWidth="1.5" />
      </svg>

      <span className="flex flex-col">
        <span
          className={cn(
            "font-display leading-none tracking-tight",
            wordmarkSizes[size],
            isLight ? "text-ivory" : "text-navy",
          )}
        >
          AxiomBridge
        </span>
        <span
          className={cn(
            "mt-1.5 font-sans text-label-sm tracking-[0.22em] uppercase",
            isLight ? "text-on-navy-muted" : "text-slate",
          )}
        >
          Consulting
        </span>
      </span>
    </span>
  );
}

export { Logo };
