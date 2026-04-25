import type { RankedArchetype } from "./types";

export function getShadowType(ranked: RankedArchetype[]) {
  return ranked[2] ?? ranked[1] ?? ranked[0] ?? null;
}
