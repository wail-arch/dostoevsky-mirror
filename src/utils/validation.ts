import { archetypesSchema, type Archetype } from "../schemas/archetype.schema.js";
import { charactersSchema, type Character } from "../schemas/character.schema.js";
import { dimensionKeys } from "../schemas/dimension.schema.js";
import { quotesSchema, realQuoteTypes, type Quote } from "../schemas/quote.schema.js";
import { sourceManifestSchema, type SourceManifestEntry } from "../schemas/source.schema.js";
import { worksSchema, type Work } from "../schemas/work.schema.js";
import { readJsonFile, resolveProjectPath } from "./fs.js";

export type CuratedDataSet = {
  sources: SourceManifestEntry[];
  works: Work[];
  characters: Character[];
  archetypes: Archetype[];
  quotes: Quote[];
};

export function assertUniqueIds(items: Array<{ id: string }>, label: string) {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.id)) {
      throw new Error(`Duplicate ${label} id: ${item.id}`);
    }
    seen.add(item.id);
  }
}

export function isRealQuote(quote: Quote) {
  return (realQuoteTypes as readonly string[]).includes(quote.quoteType);
}

export function publishableQuotes(quotes: Quote[]) {
  return quotes.filter((quote) => quote.quoteType === "interpretive-echo" || quote.verified);
}

export function validateDataSet(input: CuratedDataSet): CuratedDataSet {
  const sources = sourceManifestSchema.parse(input.sources);
  const works = worksSchema.parse(input.works);
  const characters = charactersSchema.parse(input.characters);
  const archetypes = archetypesSchema.parse(input.archetypes);
  const quotes = quotesSchema.parse(input.quotes);

  assertUniqueIds(sources, "source");
  assertUniqueIds(works, "work");
  assertUniqueIds(characters, "character");
  assertUniqueIds(archetypes, "archetype");
  assertUniqueIds(quotes, "quote");

  const sourceIds = new Set(sources.map((source) => source.id));
  const workIds = new Set(works.map((work) => work.id));
  const characterIds = new Set(characters.map((character) => character.id));
  const dimensionSet = new Set<string>(dimensionKeys);

  for (const work of works) {
    for (const sourceId of work.sourceIds) {
      if (!sourceIds.has(sourceId)) {
        throw new Error(`Work ${work.id} references missing source ${sourceId}`);
      }
    }
  }

  for (const character of characters) {
    for (const workId of character.workIds) {
      if (!workIds.has(workId)) {
        throw new Error(`Character ${character.id} references missing work ${workId}`);
      }
    }
  }

  for (const archetype of archetypes) {
    if (!characterIds.has(archetype.characterId)) {
      throw new Error(`Archetype ${archetype.id} references missing character ${archetype.characterId}`);
    }

    for (const key of Object.keys(archetype.dimensions)) {
      if (!dimensionSet.has(key)) {
        throw new Error(`Archetype ${archetype.id} uses unknown dimension ${key}`);
      }
    }

    for (const exitCandidate of archetype.exitCandidates) {
      if (!characterIds.has(exitCandidate)) {
        throw new Error(`Archetype ${archetype.id} references missing exit candidate ${exitCandidate}`);
      }
    }
  }

  for (const quote of quotes) {
    if (!workIds.has(quote.workId)) {
      throw new Error(`Quote ${quote.id} references missing work ${quote.workId}`);
    }

    if (!characterIds.has(quote.characterId)) {
      throw new Error(`Quote ${quote.id} references missing character ${quote.characterId}`);
    }

    if (quote.speakerId && !characterIds.has(quote.speakerId)) {
      throw new Error(`Quote ${quote.id} references missing speaker ${quote.speakerId}`);
    }

    if (isRealQuote(quote)) {
      if (!quote.sourceProvider) {
        throw new Error(`Real quote ${quote.id} is missing sourceProvider`);
      }
      if (!quote.location) {
        throw new Error(`Real quote ${quote.id} is missing location`);
      }
      if (!quote.translator && !quote.licenseNote) {
        throw new Error(`Real quote ${quote.id} is missing translator or licenseNote`);
      }
    }
  }

  return { sources, works, characters, archetypes, quotes };
}

export async function loadCuratedDataSet(): Promise<CuratedDataSet> {
  const sources = await readJsonFile<unknown>(resolveProjectPath("data", "sources", "manifest.json"));
  const works = await readJsonFile<unknown>(resolveProjectPath("data", "curated", "works.json"));
  const characters = await readJsonFile<unknown>(resolveProjectPath("data", "curated", "characters.json"));
  const archetypes = await readJsonFile<unknown>(resolveProjectPath("data", "curated", "archetypes.json"));
  const quotes = await readJsonFile<unknown>(resolveProjectPath("data", "curated", "quotes.json"));

  return validateDataSet({
    sources: sourceManifestSchema.parse(sources),
    works: worksSchema.parse(works),
    characters: charactersSchema.parse(characters),
    archetypes: archetypesSchema.parse(archetypes),
    quotes: quotesSchema.parse(quotes)
  });
}
