import { dimensions, type DimensionKey } from "../../content/dimensions";
import { questions } from "../quiz/questions";
import type { AnswerMap, TraitScores } from "../quiz/types";

export function emptyTraitScores(): TraitScores {
  return Object.fromEntries(dimensions.map((dimension) => [dimension, 0])) as TraitScores;
}

export function scoreAnswers(answers: AnswerMap): TraitScores {
  const rawScores = emptyTraitScores();

  for (const question of questions) {
    const selectedOptionId = answers[question.id];
    const selectedOption = question.options.find((option) => option.id === selectedOptionId);

    if (!selectedOption) {
      continue;
    }

    for (const [dimension, value] of Object.entries(selectedOption.weights) as Array<[DimensionKey, number]>) {
      rawScores[dimension] += value;
    }
  }

  const maxScore = Math.max(...Object.values(rawScores));
  if (maxScore <= 0) {
    return rawScores;
  }

  return Object.fromEntries(
    dimensions.map((dimension) => [dimension, Math.round((rawScores[dimension] / maxScore) * 100)])
  ) as TraitScores;
}
