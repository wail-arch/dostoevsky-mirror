import type { ResultModel } from "../../lib/result/types";
import { Card } from "../ui/Card";

function TypeCard({ label, name, percent }: { label: string; name: string; percent?: number }) {
  return (
    <Card className="p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-100/70">{label}</p>
      <h3 className="font-literary mt-3 text-2xl font-black text-stone-50">{name}</h3>
      {typeof percent === "number" ? <p className="mt-2 text-sm text-stone-400">{percent}% match</p> : null}
    </Card>
  );
}

export function TypeConstellation({ result }: { result: ResultModel }) {
  return (
    <section>
      <div className="grid gap-4 md:grid-cols-3">
        <TypeCard label="Primary" name={result.primary.character.canonicalName} percent={result.primary.matchPercent} />
        <TypeCard label="Shadow" name={result.shadow.character.canonicalName} percent={result.shadow.matchPercent} />
        <TypeCard label="Exit" name={result.exit?.canonicalName ?? "Unclear"} />
      </div>
      <p className="mt-5 text-sm leading-7 text-stone-400">
        Primary is your dominant drama under pressure. Shadow is the form your strengths take when distorted. Exit is
        not your opposite; it is the direction of possible integration.
      </p>
      <p className="mt-3 text-sm text-stone-500">Secondary influence: {result.secondary.character.canonicalName}</p>
    </section>
  );
}

