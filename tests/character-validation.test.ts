import { describe, expect, it } from "vitest";
import { validateDataSet } from "../src/utils/validation.js";
import { loadFixtureData } from "./helpers.js";

describe("character validation", () => {
  it("accepts the curated character seed data", () => {
    const data = validateDataSet(loadFixtureData());
    const workIds = new Set(data.works.map((work) => work.id));

    for (const character of data.characters) {
      expect(character.aliases.length).toBeGreaterThan(0);
      expect(character.roles.length).toBeGreaterThan(0);
      expect(character.tier).toBeGreaterThanOrEqual(1);
      expect(character.tier).toBeLessThanOrEqual(4);
      expect(character.workIds.every((workId) => workIds.has(workId))).toBe(true);

      if (character.roles.includes("primary-archetype")) {
        expect(character.coreContradiction).toBeTruthy();
        expect(character.gift).toBeTruthy();
        expect(character.danger).toBeTruthy();
      }
    }
  });

  it("rejects duplicate character IDs", () => {
    const data = loadFixtureData();
    data.characters.push({ ...data.characters[0] });

    expect(() => validateDataSet(data)).toThrow(/Duplicate character id/);
  });

  it("rejects missing work references", () => {
    const data = loadFixtureData();
    data.characters[0] = { ...data.characters[0], workIds: ["missing-work"] };

    expect(() => validateDataSet(data)).toThrow(/missing work/);
  });

  it("rejects invalid tiers", () => {
    const data = loadFixtureData();
    data.characters[0] = { ...data.characters[0], tier: 5 as 1 };

    expect(() => validateDataSet(data)).toThrow();
  });
});
