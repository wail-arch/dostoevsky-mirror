import { z } from "zod";

export const characterRoleSchema = z.enum([
  "primary-archetype",
  "shadow-archetype",
  "exit-archetype",
  "secondary",
  "counterforce",
  "reference-only"
]);

export const characterSchema = z.object({
  id: z.string().trim().min(1),
  canonicalName: z.string().trim().min(1),
  aliases: z.array(z.string().trim().min(1)).min(1),
  workIds: z.array(z.string().trim().min(1)).min(1),
  tier: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  roles: z.array(characterRoleSchema).min(1),
  coreContradiction: z.string().trim().min(1),
  gift: z.string().trim().min(1),
  danger: z.string().trim().min(1),
  notToRomanticize: z.string().trim().min(1).optional()
});

export const charactersSchema = z.array(characterSchema);

export type Character = z.infer<typeof characterSchema>;
export type CharacterRole = z.infer<typeof characterRoleSchema>;
