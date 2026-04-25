import { getTopTraits } from "../../lib/result/getResults";
import type { AnswerMap } from "../../lib/quiz/types";
import { Card } from "../ui/Card";
import { TraitBar } from "../result/TraitBar";

export function CurrentSignalsPanel({ answers }: { answers: AnswerMap }) {
  const traits = getTopTraits(answers).slice(0, 5);

  return (
    <Card className="hidden p-5 lg:block">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-100/70">Current signals</p>
      <div className="mt-5 space-y-4">
        {traits.map((trait) => (
          <TraitBar key={trait.key} label={trait.label} value={trait.value} />
        ))}
      </div>
    </Card>
  );
}

