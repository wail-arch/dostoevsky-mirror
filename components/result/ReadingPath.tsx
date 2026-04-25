import type { ResultModel } from "../../lib/result/types";
import { Card } from "../ui/Card";

export function ReadingPath({ result }: { result: ResultModel }) {
  const items = result.primary.archetype.readingPath.slice(0, 3);

  return (
    <section>
      <h2 className="font-literary text-3xl font-black text-stone-50">Reading path</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item, index) => (
          <Card key={item} className="flex items-center gap-4 p-4">
            <span className="font-literary text-3xl text-amber-100/80">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-stone-200">{item}</span>
          </Card>
        ))}
      </div>
      <p className="mt-4 text-sm text-stone-500">{result.primary.archetype.readingPrompt}</p>
    </section>
  );
}

