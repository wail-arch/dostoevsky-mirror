import { z } from "zod";

export const archetypeSchema = z.object({
  id: z.string().trim().min(1),
  characterId: z.string().trim().min(1),
  dimensions: z.record(z.number().min(0).max(100)),
  badge: z.string().trim().min(1),
  resultSummary: z.string().trim().min(1),
  resultPassage: z.string().trim().min(1),
  characterHook: z.string().trim().min(1),
  pressurePattern: z.string().trim().min(1),
  shadowPattern: z.string().trim().min(1),
  exitDirection: z.string().trim().min(1),
  exitCandidates: z.array(z.string().trim().min(1)),
  readingPath: z.array(z.string().trim().min(1)).min(1),
  readingPrompt: z.string().trim().min(1)
});

export const archetypesSchema = z.array(archetypeSchema);

export type Archetype = z.infer<typeof archetypeSchema>;
