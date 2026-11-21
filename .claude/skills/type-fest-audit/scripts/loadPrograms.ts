import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { type Program, type SourceFile, type default as ts } from "typescript";

import { type ScanOptions } from "./scanArgs.ts";

export type TypeScript = typeof ts;

/**
 * loads the project's own `typescript`, so the scan sees types the way its
 * compiler does
 */
export const loadTypescript = (rootDir: string): TypeScript =>
  createRequire(join(rootDir, "package.json"))("typescript");

export const loadPrograms = (
  ts: TypeScript,
  { tsconfigPaths }: ScanOptions,
): Program[] =>
  tsconfigPaths.map((tsconfigPath) => {
    const { config, error } = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
    if (error !== undefined) {
      throw new Error(`cannot read ${tsconfigPath}`, { cause: error });
    }
    const parsed = ts.parseJsonConfigFileContent(
      config,
      ts.sys,
      dirname(tsconfigPath),
    );
    return ts.createProgram(parsed.fileNames, {
      ...parsed.options,
      noEmit: true,
    });
  });

/**
 * the program's own source files: no declaration files, nothing excluded
 */
export const projectSourceFiles = (
  program: Program,
  { excludeSubstrings }: ScanOptions,
): SourceFile[] =>
  program
    .getSourceFiles()
    .filter(
      (sourceFile) =>
        !sourceFile.isDeclarationFile &&
        !excludeSubstrings.some((excluded) =>
          sourceFile.fileName.includes(excluded),
        ),
    );
