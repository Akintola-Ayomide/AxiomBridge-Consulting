import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  id: string;
  label: string;
  children: ReactNode;
  description?: ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
};

function FormField({
  id,
  label,
  children,
  description,
  error,
  required = false,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="font-sans text-label-md font-semibold text-navy"
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-gold-dark">
            *
          </span>
        ) : null}
      </label>

      {description ? (
        <p id={`${id}-description`} className="text-body-sm text-slate">
          {description}
        </p>
      ) : null}

      {children}

      {error ? (
        <p id={`${id}-error`} role="alert" className="text-body-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export { FormField };
