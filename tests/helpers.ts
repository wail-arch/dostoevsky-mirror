import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CuratedDataSet } from "../src/utils/validation.js";

const testDir = path.dirname(fileURLToPath(import.meta.url));
export const projectRoot = path.resolve(testDir, "..");

export function readJson<T>(relativePath: string): T {
  return JSON.parse(readFileSync(path.join(projectRoot, relativePath), "utf8")) as T;
}

export function loadFixtureData(): CuratedDataSet {
  return {
    sources: readJson("data/sources/manifest.json"),
    works: readJson("data/curated/works.json"),
    characters: readJson("data/curated/characters.json"),
    archetypes: readJson("data/curated/archetypes.json"),
    quotes: readJson("data/curated/quotes.json")
  };
}

export function parseGeneratedArray<T>(relativePath: string, exportName: string): T[] {
  const text = readFileSync(path.join(projectRoot, relativePath), "utf8");
  const marker = `export const ${exportName} = `;
  const start = text.indexOf(marker);
  if (start === -1) {
    throw new Error(`Missing export ${exportName} in ${relativePath}`);
  }
  const valueStart = start + marker.length;
  const valueEnd = text.indexOf(" as const;", valueStart);
  if (valueEnd === -1) {
    throw new Error(`Missing as const terminator in ${relativePath}`);
  }
  return JSON.parse(text.slice(valueStart, valueEnd)) as T[];
}
