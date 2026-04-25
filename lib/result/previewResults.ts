import { archetypes, characters, quotes } from "../content";
import { dimensionLabels } from "../quiz/labels";
import { getExitType } from "./getExitType";
import { selectQuoteForCharacter } from "./quoteSelection";
import type { RankedArchetype, ResultModel } from "./types";

export const previewCharacterIds: string[] = archetypes.map((archetype) => archetype.characterId);
export type PreviewCharacterId = (typeof previewCharacterIds)[number];

export function isPreviewCharacterId(characterId: string | undefined): characterId is PreviewCharacterId {
  return typeof characterId === "string" && previewCharacterIds.includes(characterId as PreviewCharacterId);
}

function rankedForCharacter(characterId: string, index: number, matchPercent: number): RankedArchetype {
  const archetype = archetypes.find((candidate) => candidate.characterId === characterId);
  const character = characters.find((candidate) => candidate.id === characterId);

  if (!archetype || !character) {
    throw new Error(`Cannot build preview result for missing character: ${characterId}`);
  }

  return {
    archetype,
    character,
    score: matchPercent / 100 - index * 0.001,
    matchPercent
  };
}

export function buildPreviewResult(characterId: string): ResultModel {
  const selectedIndex = previewCharacterIds.indexOf(characterId);
  const primaryId = selectedIndex >= 0 ? characterId : previewCharacterIds[0];
  const primaryIndex = previewCharacterIds.indexOf(primaryId);
  const secondaryId = previewCharacterIds[(primaryIndex + 1) % previewCharacterIds.length] ?? previewCharacterIds[0];
  const shadowId = previewCharacterIds[(primaryIndex + 2) % previewCharacterIds.length] ?? previewCharacterIds[0];
  const primary = rankedForCharacter(primaryId, 0, 98);

  return {
    primary,
    secondary: rankedForCharacter(secondaryId, 1, 91),
    shadow: rankedForCharacter(shadowId, 2, 86),
    exit: getExitType(primary.archetype, characters),
    topTraits: Object.entries(primary.archetype.dimensions)
      .map(([key, value]) => ({
        key: key as keyof typeof primary.archetype.dimensions,
        label: dimensionLabels[key as keyof typeof dimensionLabels],
        value
      }))
      .sort((left, right) => right.value - left.value)
      .slice(0, 6),
    quote: selectQuoteForCharacter(primary.character.id, quotes)
  };
}
