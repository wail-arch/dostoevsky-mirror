export function normalizeText(value: string) {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function getContext(text: string, start: number, end: number, radius = 120) {
  const contextStart = Math.max(0, start - radius);
  const contextEnd = Math.min(text.length, end + radius);
  return text.slice(contextStart, contextEnd).replace(/\s+/g, " ").trim();
}
