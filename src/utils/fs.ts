import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export const projectRoot = process.cwd();

export function resolveProjectPath(...segments: string[]) {
  return path.join(projectRoot, ...segments);
}

export async function ensureDir(dirPath: string) {
  await mkdir(dirPath, { recursive: true });
}

export async function readJsonFile<T>(filePath: string): Promise<T> {
  const text = await readFile(filePath, "utf8");
  return JSON.parse(text) as T;
}

export async function writeJsonFile(filePath: string, value: unknown) {
  await ensureDir(path.dirname(filePath));
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export async function writeTextFile(filePath: string, value: string) {
  await ensureDir(path.dirname(filePath));
  await writeFile(filePath, value, "utf8");
}
