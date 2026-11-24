import { industries } from "@/content/company";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { cn } from "@/lib/utils";

type IndustryGridProps = {
  className?: string;
};

function IndustryGrid({ className }: IndustryGridProps) {
  return (
    <div
      className={cn(
        "grid gap-gutter md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {industries.map((industry) => (
        <Card
          key={industry.slug}
          as="article"
          interactive
          className="flex flex-col gap-5 p-6 md:p-8"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="font-sans text-label-sm uppercase text-gold-dark">
              {industry.category}
            </span>
            <IconTile icon={industry.icon} size="sm" />
          </div>

          <div>
            <h3 className="font-display text-headline-sm font-medium text-navy">
              {industry.title}
            </h3>
            <p className="mt-3 text-body-sm text-slate">{industry.summary}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}

export { IndustryGrid };
