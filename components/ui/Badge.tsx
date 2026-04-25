import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils/cn";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-amber-100/20 bg-amber-100/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100",
        className
      )}
      {...props}
    />
  );
}

