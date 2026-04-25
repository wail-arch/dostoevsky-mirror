import { describe, expect, it } from "vitest";
import { loadFixtureData } from "./helpers.js";
import { validateDataSet } from "../src/utils/validation.js";

describe("V1 content completeness", () => {
  const data = validateDataSet(loadFixtureData());
  const v1Characters = data.characters.filter((character) => character.tier === 1);
  const frontReadyFields = [
    "resultSummary",
    "pressurePattern",
    "shadowPattern",
    "exitDirection",
    "characterHook",
    "readingPrompt"
  ] as const;
  const forbiddenDraftMarkers = [/TODO/i, /placeholder/i];

  it("keeps exactly twelve V1 result-worthy characters", () => {
    expect(v1Characters).toHaveLength(12);
  });

  it("gives every V1 result-worthy character an archetype, verified real quote, and interpretive echo", () => {
    for (const character of v1Characters) {
      const archetypes = data.archetypes.filter((archetype) => archetype.characterId === character.id);
      const verifiedRealQuotes = data.quotes.filter(
        (quote) => quote.characterId === character.id && quote.quoteType !== "interpretive-echo" && quote.verified
      );
      const interpretiveEchoes = data.quotes.filter(
        (quote) => quote.characterId === character.id && quote.quoteType === "interpretive-echo"
      );

      expect(archetypes.length, `${character.id} needs at least one archetype`).toBeGreaterThanOrEqual(1);
      expect(verifiedRealQuotes.length, `${character.id} needs at least one verified real quote`).toBeGreaterThanOrEqual(1);
      expect(interpretiveEchoes.length, `${character.id} needs at least one interpretive echo`).toBeGreaterThanOrEqual(1);
    }
  });

  it("marks interpretive echoes as original writing, not Dostoevsky quotes", () => {
    const echoes = data.quotes.filter((quote) => quote.quoteType === "interpretive-echo");

    expect(echoes).toHaveLength(13);
    for (const echo of echoes) {
      expect(echo.verified).toBe(true);
      expect(echo.commentary).toContain("Original");
      expect(echo.commentary).toContain("Not a Dostoevsky quote");
    }
  });

  it("keeps V1 archetypes front-ready and concise", () => {
    const badges = new Set<string>();
    const resultSummaries = new Set<string>();

    for (const character of v1Characters) {
      const archetype = data.archetypes.find((candidate) => candidate.characterId === character.id);

      expect(archetype, `${character.id} needs one archetype`).toBeTruthy();
      if (!archetype) {
        continue;
      }

      expect(badges.has(archetype.badge), `${character.id} needs a unique badge`).toBe(false);
      badges.add(archetype.badge);
      expect(resultSummaries.has(archetype.resultSummary), `${character.id} needs a unique resultSummary`).toBe(false);
      resultSummaries.add(archetype.resultSummary);

      for (const field of frontReadyFields) {
        expect(archetype[field].trim(), `${character.id} needs ${field}`).not.toBe("");
        for (const marker of forbiddenDraftMarkers) {
          expect(archetype[field], `${character.id} ${field} should not contain draft markers`).not.toMatch(marker);
        }
      }

      expect(archetype.resultSummary.length, `${character.id} resultSummary should stay short`).toBeLessThanOrEqual(120);
      expect(archetype.characterHook.length, `${character.id} characterHook should give enough literary context`).toBeGreaterThanOrEqual(260);
      expect(archetype.characterHook.length, `${character.id} characterHook should stay readable`).toBeLessThanOrEqual(720);
      expect(archetype.exitCandidates.length, `${character.id} needs at least one exit candidate`).toBeGreaterThanOrEqual(1);
    }
  });

  it("keeps unverified real quotes out of publishable V1 content", () => {
    const unverifiedRealQuotes = data.quotes.filter(
      (quote) => quote.quoteType !== "interpretive-echo" && quote.verified !== true
    );

    expect(unverifiedRealQuotes).toEqual([]);
  });
});
