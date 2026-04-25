import { describe, expect, it } from "vitest";
import { archetypes } from "../content/archetypes";
import { dimensions, type DimensionKey } from "../content/dimensions";
import { questions } from "../lib/quiz/questions";
import type { AnswerMap } from "../lib/quiz/types";
import { buildResultCopy } from "../lib/result/buildResultCopy";
import { getResults } from "../lib/result/getResults";
import { isRealQuote, selectQuoteForCharacter } from "../lib/result/quoteSelection";
import { scoreAnswers } from "../lib/scoring/scoreAnswers";
import { cosineSimilarity } from "../lib/scoring/similarity";
import { quotes } from "../content/quotes";

const dimensionSet = new Set<string>(dimensions);

function answerWith(optionId: string): AnswerMap {
  return Object.fromEntries(questions.map((question) => [question.id, optionId]));
}

describe("Phase 2 quiz and scoring", () => {
  it("defines exactly 20 questions with 4 answer options each", () => {
    expect(questions).toHaveLength(20);

    for (const question of questions) {
      expect(question.options).toHaveLength(4);
    }
  });

  it("uses only valid dimension keys in answer weights", () => {
    for (const question of questions) {
      for (const option of question.options) {
        for (const key of Object.keys(option.weights)) {
          expect(dimensionSet.has(key), `${question.id}/${option.id} uses invalid dimension ${key}`).toBe(true);
        }
      }
    }
  });

  it("scoreAnswers returns normalized 0-100 trait values", () => {
    const scores = scoreAnswers(answerWith("a"));

    for (const dimension of dimensions) {
      expect(scores[dimension]).toBeGreaterThanOrEqual(0);
      expect(scores[dimension]).toBeLessThanOrEqual(100);
    }

    expect(Math.max(...Object.values(scores))).toBe(100);
  });

  it("cosine similarity ranks a matching archetype vector above a distant vector", () => {
    const ivan = archetypes.find((archetype) => archetype.characterId === "ivan-karamazov");
    const sonya = archetypes.find((archetype) => archetype.characterId === "sonya-marmeladova");
    expect(ivan).toBeTruthy();
    expect(sonya).toBeTruthy();

    const ivanVector = ivan?.dimensions as Record<DimensionKey, number>;
    const ivanSimilarity = cosineSimilarity(ivanVector, ivan?.dimensions ?? {});
    const sonyaSimilarity = cosineSimilarity(ivanVector, sonya?.dimensions ?? {});

    expect(ivanSimilarity).toBeGreaterThan(sonyaSimilarity);
  });

  it("getResults returns primary, secondary, shadow, exit, and top traits", () => {
    const result = getResults(answerWith("a"));

    expect(result.primary).toBeTruthy();
    expect(result.secondary).toBeTruthy();
    expect(result.shadow).toBeTruthy();
    expect(result.exit).toBeTruthy();
    expect(result.topTraits).toHaveLength(6);
  });

  it("buildResultCopy produces copyable primary, shadow, and exit text", () => {
    const result = getResults(answerWith("a"));
    const copy = buildResultCopy(result);

    expect(copy).toContain("Primary:");
    expect(copy).toContain("Shadow:");
    expect(copy).toContain("Exit:");
  });

  it("quote selection does not treat interpretive echoes as real quotes", () => {
    const echoOnly = quotes.filter((quote) => quote.characterId === "ivan-karamazov" && quote.quoteType === "interpretive-echo");
    expect(echoOnly.length).toBeGreaterThan(0);
    expect(echoOnly.every((quote) => isRealQuote(quote) === false)).toBe(true);

    const selected = selectQuoteForCharacter("ivan-karamazov", quotes);
    expect(selected).toBeTruthy();
    expect(selected ? isRealQuote(selected) : false).toBe(true);
  });
});
