import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { validateDataSet, publishableQuotes } from "../src/utils/validation.js";
import { loadFixtureData, projectRoot } from "./helpers.js";

describe("quote validation", () => {
  it("allows interpretive echoes without translator metadata", () => {
    const data = validateDataSet(loadFixtureData());
    const echoes = data.quotes.filter((quote) => quote.quoteType === "interpretive-echo");

    expect(echoes.length).toBeGreaterThan(0);
    expect(echoes.every((quote) => !quote.translator)).toBe(true);
  });

  it("rejects invalid quote types", () => {
    const data = loadFixtureData();
    data.quotes[0] = { ...data.quotes[0], quoteType: "fake-real-quote" as "spoken-by" };

    expect(() => validateDataSet(data)).toThrow();
  });

  it("requires source metadata for real quotes", () => {
    const data = loadFixtureData();
    data.quotes.push({
      id: "invalid-real-quote",
      workId: "crime-and-punishment",
      characterId: "raskolnikov",
      quoteType: "spoken-by",
      text: "Unverified placeholder.",
      verified: false
    });

    expect(() => validateDataSet(data)).toThrow(/sourceProvider/);
  });

  it("requires location for real quotes", () => {
    const data = loadFixtureData();
    data.quotes.push({
      id: "real-quote-missing-location",
      workId: "crime-and-punishment",
      characterId: "raskolnikov",
      quoteType: "spoken-by",
      text: "Unverified placeholder.",
      sourceProvider: "manual",
      licenseNote: "test",
      verified: false
    });

    expect(() => validateDataSet(data)).toThrow(/location/);
  });

  it("requires translator or license note for real quotes", () => {
    const data = loadFixtureData();
    data.quotes.push({
      id: "real-quote-missing-license",
      workId: "crime-and-punishment",
      characterId: "raskolnikov",
      quoteType: "spoken-by",
      text: "Unverified placeholder.",
      sourceProvider: "manual",
      location: "test location",
      verified: false
    });

    expect(() => validateDataSet(data)).toThrow(/translator or licenseNote/);
  });

  it("excludes unverified real quotes from publishable quotes", () => {
    const data = loadFixtureData();
    data.quotes.push({
      id: "unverified-real-quote",
      workId: "crime-and-punishment",
      characterId: "raskolnikov",
      quoteType: "spoken-by",
      text: "Unverified placeholder.",
      sourceProvider: "manual",
      licenseNote: "test",
      location: "test location",
      verified: false
    });

    const validData = validateDataSet(data);
    expect(publishableQuotes(validData.quotes).map((quote) => quote.id)).not.toContain("unverified-real-quote");
  });

  it("requires promoted real quotes to be verified and fully sourced", () => {
    const data = validateDataSet(loadFixtureData());
    const realQuotes = data.quotes.filter((quote) => quote.quoteType !== "interpretive-echo");

    expect(realQuotes.length).toBeGreaterThan(0);
    expect(realQuotes.every((quote) => quote.verified === true)).toBe(true);
    expect(realQuotes.every((quote) => quote.sourceProvider === "project-gutenberg")).toBe(true);
    expect(realQuotes.every((quote) => Boolean(quote.location))).toBe(true);
    expect(realQuotes.every((quote) => Boolean(quote.translator || quote.licenseNote))).toBe(true);
  });

  it("keeps promoted real quote text exactly present in the normalized source", () => {
    const data = validateDataSet(loadFixtureData());
    const sourceByWorkId = new Map(data.sources.map((source) => [source.id, source]));
    const realQuotes = data.quotes.filter((quote) => quote.quoteType !== "interpretive-echo");

    for (const quote of realQuotes) {
      const source = sourceByWorkId.get(quote.workId);
      expect(source, `Missing source for ${quote.id}`).toBeDefined();

      const normalizedText = readFileSync(path.join(projectRoot, "data", "normalized", source!.rawFile), "utf8");
      expect(normalizedText.includes(quote.text), `${quote.id} text not found in ${source!.rawFile}`).toBe(true);
    }
  });
});
