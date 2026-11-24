import { principles } from "@/content/company";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { cn } from "@/lib/utils";

type PrinciplesGridProps = {
  className?: string;
};

function PrinciplesGrid({ className }: PrinciplesGridProps) {
  return (
    <div className={cn("grid gap-gutter md:grid-cols-3", className)}>
      {principles.map((principle) => (
        <Card
          key={principle.title}
          as="article"
          interactive
          className="flex flex-col gap-5 p-6 md:p-8"
        >
          <IconTile icon={principle.icon} />
          <div>
            <h3 className="font-display text-headline-sm font-medium text-navy">
              {principle.title}
            </h3>
            <p className="mt-3 text-body-sm text-slate">
              {principle.description}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}

export { PrinciplesGrid };
