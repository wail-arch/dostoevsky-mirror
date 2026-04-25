import type { ResultModel } from "../../lib/result/types";
import { Card } from "../ui/Card";
import { LocalIcon } from "../ui/LocalIcon";

export function CharacterHook({ result }: { result: ResultModel }) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3">
        <LocalIcon className="text-amber-100" name="book" />
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-100/70">From the book</p>
      </div>
      <p className="mt-5 text-base leading-8 text-stone-200">{result.primary.archetype.characterHook}</p>
    </Card>
  );
}
