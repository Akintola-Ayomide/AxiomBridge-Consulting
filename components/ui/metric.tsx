import { cn } from "@/lib/utils";

type MetricProps = {
  value: string;
  label: string;
  className?: string;
};

function Metric({ value, label, className }: MetricProps) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 border-l-2 border-gold pl-4",
        className,
      )}
    >
      <dt className="font-sans text-label-md text-slate">{label}</dt>
      <dd className="font-display text-headline-lg leading-none font-semibold text-navy">
        {value}
      </dd>
    </div>
  );
}

export { Metric };
