import { dimensions } from "../../content/dimensions";
import { archetypes, characters, quotes } from "../content";
import { dimensionLabels } from "../quiz/labels";
import type { AnswerMap } from "../quiz/types";
import { scoreAnswers } from "../scoring/scoreAnswers";
import { cosineSimilarity } from "../scoring/similarity";
import { getExitType } from "./getExitType";
import { getPrimaryType } from "./getPrimaryType";
import { getShadowType } from "./getShadowType";
import { selectQuoteForCharacter } from "./quoteSelection";
import type { RankedArchetype, ResultModel } from "./types";

export function rankArchetypes(answers: AnswerMap): RankedArchetype[] {
  const scores = scoreAnswers(answers);

  return archetypes
    .map((archetype) => {
      const character = characters.find((candidate) => candidate.id === archetype.characterId);
      if (!character) {
        return null;
      }

      const score = cosineSimilarity(scores, archetype.dimensions);

      return {
        archetype,
        character,
        score,
        matchPercent: Math.round(score * 100)
      };
    })
    .filter((candidate): candidate is RankedArchetype => candidate !== null)
    .sort((left, right) => right.score - left.score);
}

export function getTopTraits(answers: AnswerMap) {
  const scores = scoreAnswers(answers);

  return dimensions
    .map((dimension) => ({
      key: dimension,
      label: dimensionLabels[dimension],
      value: scores[dimension]
    }))
    .sort((left, right) => right.value - left.value)
    .slice(0, 6);
}

export function getResults(answers: AnswerMap): ResultModel {
  const ranked = rankArchetypes(answers);
  const primary = getPrimaryType(ranked);
  const secondary = ranked[1] ?? primary;
  const shadow = getShadowType(ranked);

  if (!primary || !secondary || !shadow) {
    throw new Error("Cannot compute result without ranked archetypes.");
  }

  return {
    primary,
    secondary,
    shadow,
    exit: getExitType(primary.archetype, characters),
    topTraits: getTopTraits(answers),
    quote: selectQuoteForCharacter(primary.character.id, quotes)
  };
}
