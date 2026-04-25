import { cn } from "../../lib/utils/cn";

export function TraitBar({ label, value, light = false }: { label: string; value: number; light?: boolean }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className={light ? "text-stone-700" : "text-stone-300"}>{label}</span>
        <span className={light ? "font-semibold text-amber-700" : "font-semibold text-amber-100"}>{value}</span>
      </div>
      <div className={cn("mt-2 h-2 overflow-hidden rounded-full", light ? "bg-stone-950/10" : "bg-white/10")}>
        <div className={cn("h-full rounded-full transition-all duration-500 ease-out", light ? "bg-amber-600" : "bg-amber-200")} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
    </div>
  );
}
