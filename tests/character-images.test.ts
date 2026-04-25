import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { characterImages } from "../lib/result/characterImages";

const characterImageRoot = path.join(process.cwd(), "public", "images", "characters");

describe("character result images", () => {
  it("maps all 12 V1 character images to existing public files", () => {
    expect(Object.keys(characterImages)).toHaveLength(12);

    for (const image of Object.values(characterImages)) {
      expect(image.src.startsWith("/images/characters/")).toBe(true);
      expect(image.alt.trim().length).toBeGreaterThan(0);
      expect(["portrait", "symbolic"]).toContain(image.kind);

      const localPath = path.join(process.cwd(), "public", image.src);
      expect(existsSync(localPath)).toBe(true);
    }
  });

  it("keeps loose root files out of the character image folder", () => {
    const looseImages = readdirSync(characterImageRoot).filter((entry) => /\.(jpe?g|png|webp)$/i.test(entry));

    expect(looseImages).toEqual([]);
  });
});
