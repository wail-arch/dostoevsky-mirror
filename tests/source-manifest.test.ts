import { describe, expect, it } from "vitest";
import { sourceManifestEntrySchema, sourceManifestSchema } from "../src/schemas/source.schema.js";
import { readJson } from "./helpers.js";

describe("source manifest", () => {
  const manifest = sourceManifestSchema.parse(readJson("data/sources/manifest.json"));

  it("has required source fields", () => {
    for (const source of manifest) {
      expect(source.id).toBeTruthy();
      expect(source.title).toBeTruthy();
      expect(source.author).toBeTruthy();
      expect(source.rawFile).toBeTruthy();
      expect(source.rawFile.endsWith(".txt")).toBe(true);
    }
  });

  it("uses allowed source providers", () => {
    const allowed = new Set(["project-gutenberg", "standard-ebooks", "wikisource", "manual"]);
    expect(manifest.every((source) => allowed.has(source.sourceProvider))).toBe(true);
  });

  it("allows empty sourceUrl values for future manual placeholders", () => {
    const placeholder = sourceManifestEntrySchema.parse({
      id: "manual-placeholder",
      title: "Manual Placeholder",
      author: "Fyodor Dostoevsky",
      year: 1864,
      sourceProvider: "manual",
      sourceUrl: "",
      translator: "",
      language: "en",
      licenseNote: "",
      rawFile: "manual-placeholder.txt"
    });

    expect(placeholder.sourceUrl.trim().length).toBe(0);
  });
});
