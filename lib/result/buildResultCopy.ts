import type { ResultModel } from "./types";

export function buildResultCopy(result: ResultModel) {
  const exitName = result.exit?.canonicalName ?? "Unclear";

  return [
    `My Dostoevskian type: ${result.primary.character.canonicalName}.`,
    `Primary: ${result.primary.character.canonicalName}.`,
    `Shadow: ${result.shadow.character.canonicalName}.`,
    `Exit: ${exitName}.`,
    `Core danger: ${result.primary.archetype.shadowPattern}`
  ].join("\n");
}
