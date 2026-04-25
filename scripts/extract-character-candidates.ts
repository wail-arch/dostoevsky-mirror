import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { charactersSchema } from "../src/schemas/character.schema.js";
import { readJsonFile, resolveProjectPath, writeJsonFile } from "../src/utils/fs.js";
import { slugify } from "../src/utils/slug.js";
import { getContext } from "../src/utils/text.js";

type CharacterCandidate = {
  name: string;
  normalizedName: string;
  count: number;
  sourceFiles: string[];
  sampleContexts: string[];
};

type AliasCandidate = {
  normalizedName: string;
  names: string[];
  sourceFiles: string[];
};

const normalizedDir = resolveProjectPath("data", "normalized");
const files = await readdir(normalizedDir).catch(() => []);
const textFiles = files.filter((file) => file.endsWith(".txt"));
const curatedCharacters = charactersSchema.parse(
  await readJsonFile<unknown>(resolveProjectPath("data", "curated", "characters.json"))
);

const candidates = new Map<string, CharacterCandidate>();
const properNamePattern = /\b[A-Z][a-z]+(?:[ \t]+[A-Z][a-z]+){1,2}\b/g;
const stopWords = new Set([
  "A",
  "Again",
  "Although",
  "An",
  "And",
  "As",
  "At",
  "Both",
  "Brother",
  "But",
  "By",
  "Chapter",
  "Dear",
  "English",
  "Even",
  "For",
  "From",
  "Here",
  "If",
  "In",
  "Into",
  "Is",
  "It",
  "Love",
  "Meanwhile",
  "Neither",
  "Now",
  "Of",
  "On",
  "Or",
  "Part",
  "Book",
  "Project",
  "Russian",
  "Seeing",
  "So",
  "Suddenly",
  "Supposing",
  "That",
  "The",
  "Then",
  "There",
  "These",
  "They",
  "This",
  "Those",
  "Though",
  "To",
  "Volume",
  "When",
  "While",
  "With"
]);

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function addCandidate(name: string, file: string, text: string, start: number) {
  const cleanName = name.replace(/\s+/g, " ").trim();
  if (cleanName.length < 3) {
    return;
  }

  const parts = cleanName.split(" ");
  if (parts.some((part) => stopWords.has(part))) {
    return;
  }

  const normalizedName = slugify(cleanName);
  const existing = candidates.get(normalizedName);
  const context = getContext(text, start, start + cleanName.length);

  if (!existing) {
    candidates.set(normalizedName, {
      name: cleanName,
      normalizedName,
      count: 1,
      sourceFiles: [file],
      sampleContexts: [context]
    });
    return;
  }

  existing.count += 1;
  if (!existing.sourceFiles.includes(file)) {
    existing.sourceFiles.push(file);
  }
  if (existing.sampleContexts.length < 3 && context) {
    existing.sampleContexts.push(context);
  }
}

const curatedAliases = [
  ...new Set(
    curatedCharacters.flatMap((character) => [character.canonicalName, ...character.aliases]).filter((alias) => alias.length >= 3)
  )
];

for (const file of textFiles) {
  const text = await readFile(path.join(normalizedDir, file), "utf8");

  for (const alias of curatedAliases) {
    const aliasPattern = new RegExp(`\\b${escapeRegExp(alias)}\\b`, "g");
    for (const match of text.matchAll(aliasPattern)) {
      addCandidate(alias, file, text, match.index ?? 0);
    }
  }

  for (const match of text.matchAll(properNamePattern)) {
    addCandidate(match[0], file, text, match.index ?? 0);
  }
}

const sortedCandidates = [...candidates.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

const aliasCandidates: AliasCandidate[] = Object.values(
  sortedCandidates.reduce<Record<string, AliasCandidate>>((groups, candidate) => {
    const parts = candidate.name.split(/\s+/);
    const key = slugify(parts[parts.length - 1] ?? candidate.name);
    groups[key] ??= { normalizedName: key, names: [], sourceFiles: [] };
    groups[key].names.push(candidate.name);
    for (const file of candidate.sourceFiles) {
      if (!groups[key].sourceFiles.includes(file)) {
        groups[key].sourceFiles.push(file);
      }
    }
    return groups;
  }, {})
).filter((group) => group.names.length > 1);

await writeJsonFile(resolveProjectPath("data", "candidates", "character-candidates.json"), sortedCandidates);
await writeJsonFile(resolveProjectPath("data", "candidates", "alias-candidates.json"), aliasCandidates);

console.log(`Extracted ${sortedCandidates.length} character candidates and ${aliasCandidates.length} alias candidate groups.`);
