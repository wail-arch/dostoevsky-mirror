export function TraitBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="text-stone-300">{label}</span>
        <span className="font-semibold text-amber-100">{value}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-amber-200 transition-all duration-500 ease-out" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
    </div>
  );
}

