import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { ensureDir, resolveProjectPath, writeTextFile } from "../src/utils/fs.js";
import { normalizeText } from "../src/utils/text.js";

const rawDir = resolveProjectPath("data", "raw");
const normalizedDir = resolveProjectPath("data", "normalized");

await ensureDir(rawDir);
await ensureDir(normalizedDir);

const rawFiles = (await readdir(rawDir)).filter((file) => file.endsWith(".txt"));

if (rawFiles.length === 0) {
  console.warn("No raw text files found in data/raw. Nothing to normalize.");
  process.exit(0);
}

for (const file of rawFiles) {
  const rawPath = path.join(rawDir, file);
  const rawText = await readFile(rawPath, "utf8");
  const normalized = normalizeText(rawText);
  await writeTextFile(path.join(normalizedDir, file), `${normalized}\n`);
  console.log(`Normalized ${file}`);
}
