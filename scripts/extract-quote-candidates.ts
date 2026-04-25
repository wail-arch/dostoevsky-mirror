import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { charactersSchema } from "../src/schemas/character.schema.js";
import { readJsonFile, resolveProjectPath, writeJsonFile } from "../src/utils/fs.js";
import { getContext } from "../src/utils/text.js";

type QuoteCandidate = {
  id: string;
  workId?: string;
  nearbyCharacterIds: string[];
  text: string;
  location?: string;
  sourceFile: string;
  verified: false;
};

const normalizedDir = resolveProjectPath("data", "normalized");
const characters = charactersSchema.parse(
  await readJsonFile<unknown>(resolveProjectPath("data", "curated", "characters.json"))
);
const files = await readdir(normalizedDir).catch(() => []);
const textFiles = files.filter((file) => file.endsWith(".txt"));
const candidates: QuoteCandidate[] = [];
const dialogueMarkerPattern = /["'“”‘’—–]|--/;
const firstPersonNarrationPattern = /\b(I|me|my|mine|myself)\b/i;

function textWindowAroundAlias(paragraph: string, aliases: string[]) {
  const hitIndex = aliases
    .map((alias) => paragraph.indexOf(alias))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];

  if (paragraph.length <= 900 || hitIndex === undefined) {
    return paragraph;
  }

  return getContext(paragraph, hitIndex, hitIndex + 1, 450);
}

for (const file of textFiles) {
  const text = await readFile(path.join(normalizedDir, file), "utf8");
  const sourceWorkId = file.replace(/\.txt$/, "");
  const paragraphs = text.split(/\n{2,}/);

  for (let index = 0; index < paragraphs.length; index += 1) {
    const paragraph = paragraphs[index]?.trim();
    if (!paragraph || paragraph.length < 40) {
      continue;
    }

    const matchingCharacters = characters
      .filter((character) => character.workIds.includes(sourceWorkId))
      .filter((character) => character.aliases.some((alias) => paragraph.includes(alias)));

    const nearbyCharacterIds = matchingCharacters.map((character) => character.id);

    if (
      sourceWorkId === "notes-from-underground" &&
      nearbyCharacterIds.length === 0 &&
      firstPersonNarrationPattern.test(paragraph)
    ) {
      nearbyCharacterIds.push("underground-man");
    }

    if (nearbyCharacterIds.length === 0) {
      continue;
    }

    const hasDialogueMarker =
      dialogueMarkerPattern.test(paragraph) ||
      (sourceWorkId === "notes-from-underground" && firstPersonNarrationPattern.test(paragraph));
    if (!hasDialogueMarker) {
      continue;
    }

    const aliases = matchingCharacters.flatMap((character) => character.aliases);
    const text = textWindowAroundAlias(paragraph, aliases);

    candidates.push({
      id: `${sourceWorkId}-quote-candidate-${index + 1}`,
      workId: sourceWorkId,
      nearbyCharacterIds,
      text: getContext(text, 0, text.length, 0),
      location: `paragraph ${index + 1}`,
      sourceFile: file,
      verified: false
    });
  }
}

await writeJsonFile(resolveProjectPath("data", "candidates", "quote-candidates.json"), candidates);
console.log(`Extracted ${candidates.length} unverified quote candidates.`);
