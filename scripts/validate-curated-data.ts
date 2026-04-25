import { loadCuratedDataSet } from "../src/utils/validation.js";

const data = await loadCuratedDataSet();

console.log("Curated data validation passed.");
console.log(`Sources: ${data.sources.length}`);
console.log(`Works: ${data.works.length}`);
console.log(`Characters: ${data.characters.length}`);
console.log(`Archetypes: ${data.archetypes.length}`);
console.log(`Quotes: ${data.quotes.length}`);
