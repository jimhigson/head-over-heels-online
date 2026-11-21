#!/usr/bin/env node
/**
 * Replaces every occurrence of one type (as written in source) with another in
 * the given files, adding the import for the replacement. Edits files in place.
 *
 * node replaceType.ts --root <dir> --match "Record<string, unknown>" \
 *   --with UnknownRecord --import-from type-fest src/a.ts src/b.tsx
 *
 * options:
 *   --root <dir>         project root, supplies `typescript` (default: cwd)
 *   --match <type>       the type to replace; whitespace is ignored
 *   --with <type>        the replacement text
 *   --import-from <mod>  module to import the replacement from (omit for no import)
 *   --import-name <name> name to import (default: the --with text)
 *   --only <n>           replace only the nth match (0-based) in each file
 *   files                paths relative to --root
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { parseArgs } from "node:util";

import { loadTypescript } from "./loadPrograms.ts";
import { replaceTypeInText } from "./replaceTypeInText.ts";

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    root: { type: "string" },
    match: { type: "string" },
    with: { type: "string" },
    "import-from": { type: "string" },
    "import-name": { type: "string" },
    only: { type: "string" },
  },
});

const { match: matchText, with: withText } = values;
if (matchText === undefined || withText === undefined) {
  throw new Error("--match and --with are required");
}

const rootDir = resolve(values.root ?? process.cwd());
const ts = loadTypescript(rootDir);

let total = 0;
for (const file of positionals) {
  const filePath = join(rootDir, file);
  const { text, replacedCount } = replaceTypeInText(
    ts,
    filePath,
    readFileSync(filePath, "utf8"),
    {
      matchText,
      withText,
      importFrom: values["import-from"],
      importName: values["import-name"],
      onlyHitIndex: values.only === undefined ? undefined : Number(values.only),
    },
  );
  if (replacedCount > 0) {
    writeFileSync(filePath, text);
  }
  total += replacedCount;
  console.log(`${replacedCount}\t${file}`);
}
console.log(`total\t${total}`);
