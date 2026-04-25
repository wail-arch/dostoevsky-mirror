import { describe, expect, it } from "vitest";
import { dimensionKeys } from "../src/schemas/dimension.schema.js";
import { validateDataSet } from "../src/utils/validation.js";
import { loadFixtureData } from "./helpers.js";

describe("archetype validation", () => {
  it("accepts curated archetypes with valid references and dimension scores", () => {
    const data = validateDataSet(loadFixtureData());
    const characterIds = new Set(data.characters.map((character) => character.id));
    const dimensionSet = new Set<string>(dimensionKeys);

    for (const archetype of data.archetypes) {
      expect(characterIds.has(archetype.characterId)).toBe(true);
      expect(archetype.resultSummary).toBeTruthy();
      expect(archetype.resultPassage).toBeTruthy();
      expect(archetype.pressurePattern).toBeTruthy();
      expect(archetype.shadowPattern).toBeTruthy();
      expect(archetype.exitDirection).toBeTruthy();
      expect(archetype.readingPath.length).toBeGreaterThan(0);
      expect(archetype.readingPrompt).toBeTruthy();
      expect(archetype.exitCandidates.every((candidate) => characterIds.has(candidate))).toBe(true);

      for (const [key, score] of Object.entries(archetype.dimensions)) {
        expect(dimensionSet.has(key)).toBe(true);
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(100);
      }
    }
  });

  it("rejects missing character references", () => {
    const data = loadFixtureData();
    data.archetypes[0] = { ...data.archetypes[0], characterId: "missing-character" };

    expect(() => validateDataSet(data)).toThrow(/missing character/);
  });

  it("rejects unknown dimension keys", () => {
    const data = loadFixtureData();
    data.archetypes[0] = {
      ...data.archetypes[0],
      dimensions: { ...data.archetypes[0].dimensions, unknownDimension: 10 }
    };

    expect(() => validateDataSet(data)).toThrow(/unknown dimension/);
  });

  it("rejects dimension scores outside 0 to 100", () => {
    const data = loadFixtureData();
    data.archetypes[0] = {
      ...data.archetypes[0],
      dimensions: { ...data.archetypes[0].dimensions, guilt: 101 }
    };

    expect(() => validateDataSet(data)).toThrow();
  });

  it("rejects missing exit candidates", () => {
    const data = loadFixtureData();
    data.archetypes[0] = { ...data.archetypes[0], exitCandidates: ["missing-character"] };

    expect(() => validateDataSet(data)).toThrow(/missing exit candidate/);
  });

  it("rejects missing front-ready result fields", () => {
    const data = loadFixtureData();
    const { resultSummary: _resultSummary, ...incompleteArchetype } = data.archetypes[0];
    data.archetypes[0] = incompleteArchetype as typeof data.archetypes[number];

    expect(() => validateDataSet(data)).toThrow();
  });
});
