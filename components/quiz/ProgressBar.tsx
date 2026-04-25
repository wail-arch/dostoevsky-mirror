export function ProgressBar({ current, total }: { current: number; total: number }) {
  const percent = Math.round((current / total) * 100);

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-stone-400">
        <span>
          Question {current} / {total}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
        <div className="h-full rounded-full bg-amber-200 transition-all duration-500 ease-out" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

