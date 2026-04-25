import { z } from "zod";

export const workSchema = z.object({
  id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  originalTitle: z.string().optional(),
  author: z.string().trim().min(1),
  year: z.number().int(),
  type: z.enum(["novel", "novella", "short-story", "notes", "other"]),
  sourceIds: z.array(z.string().trim().min(1)).min(1)
});

export const worksSchema = z.array(workSchema);

export type Work = z.infer<typeof workSchema>;
