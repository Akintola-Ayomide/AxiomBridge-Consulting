import { practiceAreas } from "@/content/company";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { cn } from "@/lib/utils";

const spans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

type PracticeGridProps = {
  className?: string;
};

function PracticeGrid({ className }: PracticeGridProps) {
  return (
    <div className={cn("grid gap-gutter lg:grid-cols-12", className)}>
      {practiceAreas.map((practice, index) => (
        <Card
          key={practice.slug}
          as="article"
          id={practice.slug}
          interactive
          className={cn(
            "flex scroll-mt-28 flex-col justify-between p-6 md:p-8",
            spans[index] ?? "lg:col-span-4",
          )}
        >
          <div>
            <div className="mb-6 flex items-center justify-between gap-4">
              <span className="font-sans text-label-sm uppercase text-gold-dark">
                Practice {practice.number}
              </span>
              <IconTile icon={practice.icon} size="sm" />
            </div>

            <h3 className="font-display text-headline-sm font-medium text-navy">
              {practice.title}
            </h3>
            <p className="mt-3 text-body-md text-slate">{practice.summary}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
            {practice.capabilities.map((capability) => (
              <Badge key={capability}>{capability}</Badge>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

export { PracticeGrid };
