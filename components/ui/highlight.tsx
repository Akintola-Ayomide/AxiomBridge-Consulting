import { cn } from "@/lib/utils";

type HighlightProps = {
  value: string;
  label: string;
  className?: string;
};

function Highlight({ value, label, className }: HighlightProps) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 border-l-2 border-gold pl-4",
        className,
      )}
    >
      <dt className="font-sans text-label-md text-slate">{label}</dt>
      <dd className="font-display text-title-lg leading-snug font-semibold text-navy">
        {value}
      </dd>
    </div>
  );
}

export { Highlight };
