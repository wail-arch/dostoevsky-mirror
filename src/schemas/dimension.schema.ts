import { z } from "zod";

export const dimensionKeys = [
  "hyperconsciousness",
  "compassion",
  "resentment",
  "moralPride",
  "guilt",
  "faith",
  "revolt",
  "passion",
  "detachment",
  "selfSabotage",
  "socialDefense",
  "innocence"
] as const;

export const dimensionKeySchema = z.enum(dimensionKeys);
export const dimensionScoreSchema = z.number().min(0).max(100);

export type DimensionKey = z.infer<typeof dimensionKeySchema>;
