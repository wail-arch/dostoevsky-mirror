import type { ResultModel } from "../../lib/result/types";
import { cn } from "../../lib/utils/cn";
import { Card } from "../ui/Card";

export function ReadingPath({ result, light }: { result: ResultModel; light: boolean }) {
  const items = result.primary.archetype.readingPath.slice(0, 3);

  return (
    <section>
      <h2 className={cn("font-literary text-3xl font-black", light ? "text-stone-950" : "text-stone-50")}>Reading path</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item, index) => (
          <Card key={item} className={cn("flex items-center gap-4 p-4", light && "border-stone-950/10 bg-white/60 shadow-stone-400/20")}>
            <span className={cn("font-literary text-3xl", light ? "text-amber-700" : "text-amber-100/80")}>{String(index + 1).padStart(2, "0")}</span>
            <span className={light ? "text-stone-800" : "text-stone-200"}>{item}</span>
          </Card>
        ))}
      </div>
      <p className={cn("mt-4 text-sm", light ? "text-stone-700" : "text-stone-500")}>{result.primary.archetype.readingPrompt}</p>
    </section>
  );
}
