import { getWorkById } from "../../lib/content";
import { isRealQuote, quotePanelLabel } from "../../lib/result/quoteSelection";
import type { Quote } from "../../lib/content";
import { Card } from "../ui/Card";

export function QuotePanel({ quote }: { quote: Quote | null }) {
  const work = quote ? getWorkById(quote.workId) : null;

  return (
    <Card className="p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-100/70">{quotePanelLabel(quote)}</p>
      <blockquote className="font-literary mt-5 text-2xl leading-snug text-stone-50">
        {quote?.text ?? "The mirror is silent here."}
      </blockquote>
      {quote ? (
        <div className="mt-5 space-y-2 text-sm leading-7 text-stone-400">
          <p>{quote.commentary}</p>
          {quote && isRealQuote(quote) ? (
            <p className="text-stone-500">
              From {work?.title ?? "the source text"} · {quote.location} · {quote.translator}
            </p>
          ) : (
            <p className="text-stone-500">This is an original interpretive line, not a Dostoevsky quote.</p>
          )}
        </div>
      ) : null}
    </Card>
  );
}
