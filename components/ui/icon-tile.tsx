import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconTileTone = "navy" | "muted" | "gold" | "inverse";
type IconTileSize = "sm" | "md" | "lg";

const tones: Record<IconTileTone, string> = {
  navy: "bg-navy text-gold",
  muted: "bg-surface-muted text-navy",
  gold: "bg-gold/15 text-gold-dark",
  inverse: "bg-ivory/10 text-gold",
};

const sizes: Record<IconTileSize, string> = {
  sm: "size-9",
  md: "size-12",
  lg: "size-14",
};

const iconSizes: Record<IconTileSize, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

type IconTileProps = {
  icon: LucideIcon;
  tone?: IconTileTone;
  size?: IconTileSize;
  className?: string;
};

function IconTile({
  icon: Icon,
  tone = "muted",
  size = "md",
  className,
}: IconTileProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-sm",
        tones[tone],
        sizes[size],
        className,
      )}
    >
      <Icon className={iconSizes[size]} strokeWidth={1.75} />
    </span>
  );
}

export { IconTile };
