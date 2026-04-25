import { Card } from "../ui/Card";
import { TraitBar } from "../result/TraitBar";

export function SampleResultCard() {
  return (
    <Card className="relative p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-100/70">Sample result</p>
      <h2 className="font-literary mt-4 text-3xl font-black text-stone-50">Ivan with an Underground shadow</h2>
      <p className="mt-4 text-sm leading-7 text-stone-300">
        You do not reject meaning because you are shallow. You reject easy meaning because innocent suffering makes the
        world morally unbearable.
      </p>
      <div className="mt-6 space-y-4">
        <TraitBar label="Metaphysical revolt" value={91} />
        <TraitBar label="Hyperconsciousness" value={84} />
        <TraitBar label="Faith in meaning" value={19} />
      </div>
    </Card>
  );
}

