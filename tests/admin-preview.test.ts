import { describe, expect, it } from "vitest";
import { archetypes } from "../lib/content";
import { buildPreviewResult, previewCharacterIds } from "../lib/result/previewResults";

describe("admin result preview", () => {
  it("covers every V1 archetype character", () => {
    expect(previewCharacterIds).toHaveLength(12);
    expect(previewCharacterIds).toEqual(archetypes.map((archetype) => archetype.characterId));
  });

  it("builds a complete result model for each preview character", () => {
    for (const characterId of previewCharacterIds) {
      const result = buildPreviewResult(characterId);

      expect(result.primary.character.id).toBe(characterId);
      expect(result.secondary.character.id).not.toBe(characterId);
      expect(result.shadow.character.id).not.toBe(characterId);
      expect(result.exit).not.toBeNull();
      expect(result.topTraits).toHaveLength(6);
      expect(result.quote).not.toBeNull();
    }
  });
});
