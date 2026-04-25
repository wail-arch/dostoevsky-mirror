import type { Quote } from "../content";

export type RealQuote = Quote & {
  quoteType: string;
  location?: string;
  translator?: string;
};

export function isRealQuote(quote: Quote): quote is RealQuote {
  return quote.quoteType !== "interpretive-echo";
}

export function selectQuoteForCharacter(characterId: string, quotes: readonly Quote[]) {
  const characterQuotes = quotes.filter((quote) => quote.characterId === characterId);
  const verifiedRealQuote = characterQuotes.find((quote) => isRealQuote(quote) && quote.verified === true);

  if (verifiedRealQuote) {
    return verifiedRealQuote;
  }

  return characterQuotes.find((quote) => quote.quoteType === "interpretive-echo") ?? null;
}

export function quotePanelLabel(quote: Quote | null) {
  if (!quote) {
    return "Mirror sentence";
  }

  return isRealQuote(quote) ? "In his own words" : "Mirror sentence";
}
