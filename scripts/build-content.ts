import { buildContent } from "../src/utils/content-build.js";

const result = await buildContent();
console.log("Content build complete.");
console.log(`Exported ${result.workCount} works, ${result.characterCount} characters, ${result.archetypeCount} archetypes, ${result.quoteCount} quotes.`);
