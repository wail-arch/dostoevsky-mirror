import { sourceManifestSchema } from "../src/schemas/source.schema.js";
import { ensureDir, readJsonFile, resolveProjectPath, writeTextFile } from "../src/utils/fs.js";

const manifestPath = resolveProjectPath("data", "sources", "manifest.json");
const rawDir = resolveProjectPath("data", "raw");

const manifest = sourceManifestSchema.parse(await readJsonFile<unknown>(manifestPath));
await ensureDir(rawDir);

let fetched = 0;
let skipped = 0;
let failed = 0;

for (const source of manifest) {
  if (!source.sourceUrl.trim()) {
    skipped += 1;
    console.warn(`Skipping ${source.id}: sourceUrl is empty.`);
    continue;
  }

  try {
    const response = await fetch(source.sourceUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    await writeTextFile(resolveProjectPath("data", "raw", source.rawFile), text);
    fetched += 1;
    console.log(`Fetched ${source.id} -> data/raw/${source.rawFile}`);
  } catch (error) {
    failed += 1;
    console.error(`Failed to fetch ${source.id} from ${source.sourceUrl}:`, error);
  }
}

console.log(`Fetch complete: ${fetched} fetched, ${skipped} skipped, ${failed} failed.`);

if (failed > 0) {
  process.exitCode = 1;
}
