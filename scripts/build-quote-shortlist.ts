import { charactersSchema } from "../src/schemas/character.schema.js";
import { readJsonFile, resolveProjectPath, writeJsonFile } from "../src/utils/fs.js";

type QuoteCandidate = {
  id: string;
  workId?: string;
  nearbyCharacterIds: string[];
  text: string;
  location?: string;
  sourceFile: string;
  verified: false;
};

type QuoteShortlistEntry = {
  candidateId: string;
  workId: string;
  characterId: string;
  quoteTypeGuess: "spoken-by" | "about" | "narrator";
  text: string;
  location: string;
  sourceFile: string;
  verified: false;
  status: "needs-verification";
  curationNote: string;
};

const maxEntriesPerCharacter = 8;
const characters = charactersSchema.parse(
  await readJsonFile<unknown>(resolveProjectPath("data", "curated", "characters.json"))
);
const candidates = await readJsonFile<QuoteCandidate[]>(
  resolveProjectPath("data", "candidates", "quote-candidates.json")
);
const coreCharacters = characters.filter((character) => character.tier === 1);
const shortlist: QuoteShortlistEntry[] = [];

function guessQuoteType(candidate: QuoteCandidate): QuoteShortlistEntry["quoteTypeGuess"] {
  if (candidate.workId === "notes-from-underground") {
    return "narrator";
  }

  if (/["'“”‘’—–]|--/.test(candidate.text)) {
    return "spoken-by";
  }

  return "about";
}

for (const character of coreCharacters) {
  const entries = candidates
    .filter((candidate) => candidate.workId && candidate.nearbyCharacterIds.includes(character.id))
    .filter((candidate) => candidate.text.length >= 80)
    .sort((a, b) => {
      const aSpecificity = a.nearbyCharacterIds.length;
      const bSpecificity = b.nearbyCharacterIds.length;
      return aSpecificity - bSpecificity || a.text.length - b.text.length;
    })
    .slice(0, maxEntriesPerCharacter);

  for (const candidate of entries) {
    shortlist.push({
      candidateId: candidate.id,
      workId: candidate.workId ?? character.workIds[0],
      characterId: character.id,
      quoteTypeGuess: guessQuoteType(candidate),
      text: candidate.text,
      location: candidate.location ?? "unknown location",
      sourceFile: candidate.sourceFile,
      verified: false,
      status: "needs-verification",
      curationNote: `Selected for ${character.canonicalName} during curation pass 1. Verify exact source text, location, speaker, and interpretive fit before any promotion.`
    });
  }
}

await writeJsonFile(resolveProjectPath("data", "review", "quote-shortlist-v1.json"), shortlist);

const coverage = Object.fromEntries(
  coreCharacters.map((character) => [
    character.id,
    shortlist.filter((entry) => entry.characterId === character.id).length
  ])
);

console.log(`Built ${shortlist.length} quote shortlist entries.`);
console.log(JSON.stringify(coverage, null, 2));
