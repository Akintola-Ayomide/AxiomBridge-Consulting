import * as React from "react";
import { cn } from "@/lib/utils";

type EyebrowTone = "gold" | "light" | "muted";

const tones: Record<EyebrowTone, string> = {
  gold: "text-gold-dark",
  light: "text-gold",
  muted: "text-slate",
};

export type EyebrowProps = React.ComponentProps<"span"> & {
  tone?: EyebrowTone;
  withDot?: boolean;
};

function Eyebrow({
  children,
  className,
  tone = "gold",
  withDot = false,
  ...props
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-sans text-label-sm uppercase",
        tones[tone],
        className,
      )}
      {...props}
    >
      {withDot ? (
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      ) : null}
      {children}
    </span>
  );
}

export { Eyebrow };
