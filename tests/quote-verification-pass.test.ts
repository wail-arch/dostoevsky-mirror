import { describe, expect, it } from "vitest";
import { readJson } from "./helpers.js";

type VerificationDecision = {
  characterId: string;
  selected: {
    candidateId: string;
    promotedQuoteId: string;
    status: string;
    location: string;
    sourceFile: string;
    verificationNote: string;
  };
  reviewedShortlist: {
    promoted: string[];
    maybeLater: string[];
    needsDeeperReview: string[];
    rejected: string[];
  };
};

type VerificationPass = {
  passId: string;
  status: string;
  decisions: VerificationDecision[];
};

describe("quote verification pass 1", () => {
  const verificationPass = readJson<VerificationPass>("data/review/quote-verification-pass-1.json");
  const characters = readJson<Array<{ id: string; tier: number }>>("data/curated/characters.json");
  const quotes = readJson<Array<{ id: string; quoteType: string; verified: boolean }>>("data/curated/quotes.json");
  const coreCharacterIds = characters.filter((character) => character.tier === 1).map((character) => character.id);

  it("records one promoted decision for each V1 result-worthy character", () => {
    expect(verificationPass.status).toBe("complete");
    expect(verificationPass.decisions).toHaveLength(coreCharacterIds.length);

    for (const characterId of coreCharacterIds) {
      const decision = verificationPass.decisions.find((entry) => entry.characterId === characterId);
      expect(decision).toBeDefined();
      expect(decision?.selected.status).toBe("promoted");
      expect(decision?.selected.promotedQuoteId).toBeTruthy();
      expect(decision?.selected.verificationNote).toContain("Exact");
    }
  });

  it("has a matching verified real quote for every promoted decision", () => {
    const promotedQuoteIds = verificationPass.decisions.map((decision) => decision.selected.promotedQuoteId);
    const realQuotes = quotes.filter((quote) => quote.quoteType !== "interpretive-echo");

    expect(realQuotes).toHaveLength(12);
    expect(new Set(promotedQuoteIds).size).toBe(promotedQuoteIds.length);

    for (const quoteId of promotedQuoteIds) {
      const quote = realQuotes.find((entry) => entry.id === quoteId);
      expect(quote).toBeDefined();
      expect(quote?.verified).toBe(true);
    }
  });

  it("keeps reviewed shortlist decisions in editorial statuses", () => {
    const allowedStatuses = ["promoted", "maybeLater", "needsDeeperReview", "rejected"];
    for (const decision of verificationPass.decisions) {
      for (const status of Object.keys(decision.reviewedShortlist)) {
        expect(allowedStatuses).toContain(status);
      }
    }
  });
});
