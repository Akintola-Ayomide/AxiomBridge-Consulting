import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type StatusAlertProps = {
  tone: "success" | "error";
  title: string;
  children?: ReactNode;
  className?: string;
};

function StatusAlert({ tone, title, children, className }: StatusAlertProps) {
  const isSuccess = tone === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;

  return (
    <div
      role={isSuccess ? "status" : "alert"}
      className={cn(
        "flex gap-3 rounded-sm border p-4",
        isSuccess
          ? "border-gold/40 bg-gold/10 text-navy"
          : "border-red-600/30 bg-red-50 text-red-900",
        className,
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "mt-0.5 size-5 shrink-0",
          isSuccess ? "text-gold-dark" : "text-red-700",
        )}
      />
      <div>
        <p className="font-sans text-title-md font-semibold">{title}</p>
        {children ? <div className="mt-1 text-body-sm">{children}</div> : null}
      </div>
    </div>
  );
}

export { StatusAlert };
