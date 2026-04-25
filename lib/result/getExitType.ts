import type { Archetype, Character } from "../content";

export function getExitType(primaryArchetype: Archetype, characters: readonly Character[]) {
  for (const candidateId of primaryArchetype.exitCandidates) {
    const character = characters.find((candidate) => candidate.id === candidateId);
    if (character) {
      return character;
    }
  }

  return null;
}
