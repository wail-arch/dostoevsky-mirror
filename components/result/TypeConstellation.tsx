import type { ResultModel } from "../../lib/result/types";
import { cn } from "../../lib/utils/cn";
import { Card } from "../ui/Card";

function TypeCard({ label, name, percent, light }: { label: string; name: string; percent?: number; light: boolean }) {
  return (
    <Card className={cn("p-5", light && "border-stone-950/10 bg-white/55 shadow-stone-400/20")}>
      <p className={cn("text-xs font-semibold uppercase tracking-[0.22em]", light ? "text-amber-700" : "text-amber-100/70")}>{label}</p>
      <h3 className={cn("font-literary mt-3 text-2xl font-black", light ? "text-stone-950" : "text-stone-50")}>{name}</h3>
      {typeof percent === "number" ? <p className={cn("mt-2 text-sm", light ? "text-stone-600" : "text-stone-400")}>{percent}% match</p> : null}
    </Card>
  );
}

export function TypeConstellation({ result, light }: { result: ResultModel; light: boolean }) {
  return (
    <section>
      <div className="grid gap-4 md:grid-cols-3">
        <TypeCard light={light} label="Primary" name={result.primary.character.canonicalName} percent={result.primary.matchPercent} />
        <TypeCard light={light} label="Shadow" name={result.shadow.character.canonicalName} percent={result.shadow.matchPercent} />
        <TypeCard light={light} label="Exit" name={result.exit?.canonicalName ?? "Unclear"} />
      </div>
      <p className={cn("mt-5 text-sm leading-7", light ? "text-stone-700" : "text-stone-400")}>
        Primary is your dominant drama under pressure. Shadow is the form your strengths take when distorted. Exit is
        not your opposite; it is the direction of possible integration.
      </p>
      <p className={cn("mt-3 text-sm", light ? "text-stone-600" : "text-stone-500")}>Secondary influence: {result.secondary.character.canonicalName}</p>
    </section>
  );
}
