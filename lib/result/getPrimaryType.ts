import type { RankedArchetype } from "./types";

export function getPrimaryType(ranked: RankedArchetype[]) {
  return ranked[0] ?? null;
}
