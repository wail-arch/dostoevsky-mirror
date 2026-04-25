import { getWorkById } from "../../lib/content";
import type { Quote } from "../../lib/content";
import { isRealQuote, quotePanelLabel } from "../../lib/result/quoteSelection";
import { cn } from "../../lib/utils/cn";
import { Card } from "../ui/Card";

export function QuotePanel({ quote, light }: { quote: Quote | null; light: boolean }) {
  const work = quote ? getWorkById(quote.workId) : null;

  return (
    <Card className={cn("p-6", light && "border-stone-950/10 bg-white/60 shadow-stone-400/20")}>
      <p className={cn("text-xs font-semibold uppercase tracking-[0.22em]", light ? "text-amber-700" : "text-amber-100/70")}>{quotePanelLabel(quote)}</p>
      <blockquote className={cn("font-literary mt-5 text-2xl leading-snug", light ? "text-stone-950" : "text-stone-50")}>
        {quote?.text ?? "The mirror is silent here."}
      </blockquote>
      {quote ? (
        <div className={cn("mt-5 space-y-2 text-sm leading-7", light ? "text-stone-700" : "text-stone-400")}>
          <p>{quote.commentary}</p>
          {quote && isRealQuote(quote) ? (
            <p className={light ? "text-stone-600" : "text-stone-500"}>
              From {work?.title ?? "the source text"} · {quote.location} · {quote.translator}
            </p>
          ) : (
            <p className={light ? "text-stone-600" : "text-stone-500"}>This is an original interpretive line, not a Dostoevsky quote.</p>
          )}
        </div>
      ) : null}
    </Card>
  );
}
