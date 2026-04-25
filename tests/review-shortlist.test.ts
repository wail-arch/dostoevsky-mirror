import { describe, expect, it } from "vitest";
import { readJson } from "./helpers.js";

type QuoteShortlistEntry = {
  candidateId: string;
  workId: string;
  characterId: string;
  quoteTypeGuess: string;
  text: string;
  location: string;
  sourceFile: string;
  verified: boolean;
  status: string;
  curationNote: string;
};

describe("quote review shortlist", () => {
  const shortlist = readJson<QuoteShortlistEntry[]>("data/review/quote-shortlist-v1.json");
  const characters = readJson<Array<{ id: string; tier: number }>>("data/curated/characters.json");
  const coreCharacterIds = characters.filter((character) => character.tier === 1).map((character) => character.id);

  it("keeps all shortlisted quote candidates unverified and non-production", () => {
    expect(shortlist.length).toBeGreaterThan(0);
    expect(shortlist.every((entry) => entry.verified === false)).toBe(true);
    expect(shortlist.every((entry) => entry.status === "needs-verification")).toBe(true);
  });

  it("covers every V1 result-worthy character", () => {
    for (const characterId of coreCharacterIds) {
      expect(shortlist.some((entry) => entry.characterId === characterId)).toBe(true);
    }
  });

  it("has the required editorial review fields", () => {
    for (const entry of shortlist) {
      expect(entry.candidateId).toBeTruthy();
      expect(entry.workId).toBeTruthy();
      expect(entry.characterId).toBeTruthy();
      expect(["spoken-by", "about", "narrator"]).toContain(entry.quoteTypeGuess);
      expect(entry.text).toBeTruthy();
      expect(entry.location).toBeTruthy();
      expect(entry.sourceFile).toBeTruthy();
      expect(entry.curationNote).toContain("Verify");
    }
  });
});
