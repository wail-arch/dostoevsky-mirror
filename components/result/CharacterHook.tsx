import type { ResultModel } from "../../lib/result/types";
import { cn } from "../../lib/utils/cn";
import { Card } from "../ui/Card";
import { LocalIcon } from "../ui/LocalIcon";

export function CharacterHook({ result, light }: { result: ResultModel; light: boolean }) {
  return (
    <Card className={cn("p-6", light && "border-stone-950/10 bg-white/55 shadow-stone-400/20")}>
      <div className="flex items-center gap-3">
        <LocalIcon className={light ? "text-amber-700" : "text-amber-100"} name="book" />
        <p className={cn("text-xs font-semibold uppercase tracking-[0.22em]", light ? "text-amber-700" : "text-amber-100/70")}>From the book</p>
      </div>
      <p className={cn("mt-5 text-base leading-8", light ? "text-stone-800" : "text-stone-200")}>{result.primary.archetype.characterHook}</p>
    </Card>
  );
}
