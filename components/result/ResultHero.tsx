import { getWorkById } from "../../lib/content";
import { getCharacterImage } from "../../lib/result/characterImages";
import type { ResultModel } from "../../lib/result/types";
import { Badge } from "../ui/Badge";
import { QuotePanel } from "./QuotePanel";
import { ResultImage } from "./ResultImage";

export function ResultHero({ result, light }: { result: ResultModel; light: boolean }) {
  const work = getWorkById(result.primary.character.workIds[0] ?? "");
  const image = getCharacterImage(result.primary.character.id);

  return (
    <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.52fr)] xl:items-stretch">
      <div className="min-w-0 max-w-4xl">
        <p className={light ? "text-stone-700" : "text-stone-300"}>Your type</p>
        <p className={light ? "mt-2 text-sm text-stone-600" : "mt-2 text-sm text-stone-400"}>{work?.title ?? "Dostoevsky Mirror"}</p>
        <h1 className={light ? "font-literary mt-5 max-w-[14ch] break-normal text-5xl font-black leading-none text-stone-950 [overflow-wrap:normal] sm:text-7xl" : "font-literary mt-5 max-w-[14ch] break-normal text-5xl font-black leading-none text-stone-50 [overflow-wrap:normal] sm:text-7xl"}>
          {result.primary.character.canonicalName}
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Badge className={light ? "border-stone-900/20 bg-stone-950/10 text-stone-900" : undefined}>{result.primary.archetype.badge}</Badge>
          <span className={light ? "text-sm font-semibold text-stone-700" : "text-sm font-semibold text-amber-100"}>{result.primary.matchPercent}% match</span>
        </div>
        <p className={light ? "mt-8 max-w-3xl text-lg leading-8 text-stone-800" : "mt-8 max-w-3xl text-lg leading-8 text-stone-200"}>
          {result.primary.archetype.resultPassage}
        </p>
        <div className="mt-8 max-w-3xl">
          <QuotePanel light={light} quote={result.quote} />
        </div>
      </div>
      <ResultImage image={image} light={light} />
    </section>
  );
}
