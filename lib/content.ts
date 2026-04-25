import { archetypes, type Archetype } from "../content/archetypes";
import { characters, type Character } from "../content/characters";
import { quotes, type Quote } from "../content/quotes";
import { works, type Work } from "../content/works";

export { archetypes, characters, quotes, works };
export type { Archetype, Character, Quote, Work };

export function getCharacterById(id: string): Character | null {
  return characters.find((character) => character.id === id) ?? null;
}

export function getWorkById(id: string): Work | null {
  return works.find((work) => work.id === id) ?? null;
}

export function getArchetypeByCharacterId(characterId: string): Archetype | null {
  return archetypes.find((archetype) => archetype.characterId === characterId) ?? null;
}

export function getQuotesForCharacter(characterId: string) {
  return quotes.filter((quote) => quote.characterId === characterId);
}
