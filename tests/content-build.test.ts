import { existsSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { buildContent } from "../src/utils/content-build.js";
import { parseGeneratedArray, projectRoot } from "./helpers.js";

describe("content build", () => {
  it("exports production content and keeps unverified real quotes out", async () => {
    await buildContent();

    expect(existsSync(path.join(projectRoot, "content", "works.ts"))).toBe(true);
    expect(existsSync(path.join(projectRoot, "content", "characters.ts"))).toBe(true);
    expect(existsSync(path.join(projectRoot, "content", "archetypes.ts"))).toBe(true);
    expect(existsSync(path.join(projectRoot, "content", "quotes.ts"))).toBe(true);

    expect(parseGeneratedArray("content/works.ts", "works").length).toBeGreaterThan(0);
    expect(parseGeneratedArray("content/characters.ts", "characters").length).toBeGreaterThan(0);
    const archetypes = parseGeneratedArray<{
      resultSummary: string;
      pressurePattern: string;
      shadowPattern: string;
      exitDirection: string;
      readingPrompt: string;
    }>("content/archetypes.ts", "archetypes");
    expect(archetypes.length).toBeGreaterThan(0);
    for (const archetype of archetypes) {
      expect(archetype.resultSummary).toBeTruthy();
      expect(archetype.pressurePattern).toBeTruthy();
      expect(archetype.shadowPattern).toBeTruthy();
      expect(archetype.exitDirection).toBeTruthy();
      expect(archetype.readingPrompt).toBeTruthy();
    }

    const quotes = parseGeneratedArray<{ quoteType: string; verified: boolean }>("content/quotes.ts", "quotes");
    expect(quotes).toHaveLength(25);
    expect(quotes.filter((quote) => quote.quoteType === "interpretive-echo")).toHaveLength(13);
    expect(quotes.filter((quote) => quote.quoteType !== "interpretive-echo")).toHaveLength(12);
    expect(quotes.some((quote) => quote.quoteType === "interpretive-echo")).toBe(true);
    expect(quotes.some((quote) => quote.quoteType !== "interpretive-echo" && quote.verified === false)).toBe(false);
  });

  it("generated content files are valid TypeScript", () => {
    const contentFiles = ["dimensions.ts", "works.ts", "characters.ts", "archetypes.ts", "quotes.ts"].map((file) =>
      path.join(projectRoot, "content", file)
    );
    const program = ts.createProgram(contentFiles, {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.NodeNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      strict: true,
      noEmit: true,
      skipLibCheck: true
    });
    const diagnostics = ts.getPreEmitDiagnostics(program);
    expect(diagnostics.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"))).toEqual([]);
  });
});
