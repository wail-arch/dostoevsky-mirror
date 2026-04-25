import { dimensions, type DimensionKey } from "../../content/dimensions";
import type { TraitScores } from "../quiz/types";

export type DimensionVector = Partial<Record<DimensionKey, number>>;

export function cosineSimilarity(left: TraitScores, right: DimensionVector) {
  let dotProduct = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;

  for (const dimension of dimensions) {
    const leftValue = left[dimension] ?? 0;
    const rightValue = right[dimension] ?? 0;

    dotProduct += leftValue * rightValue;
    leftMagnitude += leftValue * leftValue;
    rightMagnitude += rightValue * rightValue;
  }

  if (leftMagnitude === 0 || rightMagnitude === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(leftMagnitude) * Math.sqrt(rightMagnitude));
}
