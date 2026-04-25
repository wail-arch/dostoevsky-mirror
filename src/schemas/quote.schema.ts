import { z } from "zod";

export const realQuoteTypes = ["spoken-by", "about", "narrator"] as const;

export const quoteTypeSchema = z.enum([
  "spoken-by",
  "about",
  "narrator",
  "interpretive-echo"
]);

export const quoteSchema = z.object({
  id: z.string().trim().min(1),
  workId: z.string().trim().min(1),
  characterId: z.string().trim().min(1),
  quoteType: quoteTypeSchema,
  speakerId: z.string().trim().min(1).nullable().optional(),
  text: z.string().trim().min(1),
  location: z.string().trim().min(1).optional(),
  sourceProvider: z.string().trim().min(1).optional(),
  translator: z.string().trim().min(1).optional(),
  licenseNote: z.string().trim().min(1).optional(),
  verified: z.boolean(),
  commentary: z.string().trim().min(1).optional()
});

export const quotesSchema = z.array(quoteSchema);

export type Quote = z.infer<typeof quoteSchema>;
export type QuoteType = z.infer<typeof quoteTypeSchema>;
