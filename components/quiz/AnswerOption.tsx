import { cn } from "../../lib/utils/cn";

type AnswerOptionProps = {
  letter: string;
  text: string;
  selected: boolean;
  onSelect: () => void;
};

export function AnswerOption({ letter, text, selected, onSelect }: AnswerOptionProps) {
  return (
    <button
      className={cn(
        "focus-ring flex min-h-16 w-full items-start gap-4 rounded-2xl border p-4 text-left transition duration-200 hover:-translate-y-0.5",
        selected
          ? "border-amber-200 bg-amber-100 text-stone-950 shadow-2xl shadow-amber-950/20"
          : "border-white/10 bg-white/[0.04] text-stone-200 hover:border-amber-100/40 hover:bg-white/[0.07]"
      )}
      onClick={onSelect}
      type="button"
    >
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black",
          selected ? "bg-stone-950 text-amber-100" : "bg-white/10 text-stone-300"
        )}
      >
        {letter}
      </span>
      <span className="pt-1 text-sm leading-6 sm:text-base">{text}</span>
    </button>
  );
}

