import { z } from "zod";

export const sourceProviderSchema = z.enum([
  "project-gutenberg",
  "standard-ebooks",
  "wikisource",
  "manual"
]);

export const sourceManifestEntrySchema = z.object({
  id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  author: z.string().trim().min(1),
  year: z.number().int(),
  sourceProvider: sourceProviderSchema,
  sourceUrl: z.string(),
  translator: z.string(),
  language: z.enum(["en", "fr", "ru"]),
  licenseNote: z.string(),
  rawFile: z.string().trim().min(1).regex(/\.txt$/)
});

export const sourceManifestSchema = z.array(sourceManifestEntrySchema);

export type SourceManifestEntry = z.infer<typeof sourceManifestEntrySchema>;
export type SourceProvider = z.infer<typeof sourceProviderSchema>;
