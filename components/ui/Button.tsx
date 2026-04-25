import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "bg-amber-100 text-stone-950 hover:bg-amber-200 shadow-2xl shadow-amber-950/20",
  secondary: "border border-amber-100/25 bg-white/[0.04] text-amber-100 hover:bg-white/[0.08]",
  ghost: "text-stone-300 hover:bg-white/[0.06] hover:text-stone-50"
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-45",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

