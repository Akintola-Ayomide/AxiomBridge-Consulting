import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "default" | "prose" | "wide";

const sizes: Record<ContainerSize, string> = {
  default: "max-w-7xl",
  prose: "max-w-[47.5rem]",
  wide: "max-w-[90rem]",
};

export type ContainerProps = React.ComponentProps<"div"> & {
  size?: ContainerSize;
};

function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-margin md:px-margin-tablet lg:px-margin-desktop",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export { Container };
