#!/usr/bin/env node
/**
 * Like replaceType.ts, but applies the replacement one match at a time and
 * keeps a match only if every typecheck command still succeeds; a match that
 * breaks the build is put back. Use it where a bulk replacement breaks some
 * call sites and not others. Edits files in place.
 *
 * node tryHits.ts --root <dir> --match "Record<string, unknown>" \
 *   --with UnknownRecord --import-from type-fest \
 *   --typecheck "pnpm exec tsc --noEmit -p tsconfig.json" src/a.ts src/b.ts
 *
 * options: those of replaceType.ts (except --only), plus
 *   --typecheck <cmd>    shell command run in --root, must exit 0; repeat to
 *                        check several projects (every one is run per match)
 */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { parseArgs } from "node:util";

import { loadTypescript } from "./loadPrograms.ts";
import { findTypeHits, replaceTypeInText } from "./replaceTypeInText.ts";

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    root: { type: "string" },
    match: { type: "string" },
    with: { type: "string" },
    "import-from": { type: "string" },
    "import-name": { type: "string" },
    typecheck: { type: "string", multiple: true },
  },
});

const { match: matchText, with: withText, typecheck: commands } = values;
if (
  matchText === undefined ||
  withText === undefined ||
  commands === undefined
) {
  throw new Error("--match, --with and at least one --typecheck are required");
}

const rootDir = resolve(values.root ?? process.cwd());
const ts = loadTypescript(rootDir);

const typechecks = () =>
  commands.every((command) => {
    try {
      execSync(command, { cwd: rootDir, stdio: "pipe" });
      return true;
    } catch {
      return false;
    }
  });

for (const file of positionals) {
  const filePath = join(rootDir, file);
  let rejectedCount = 0;

  for (;;) {
    const before = readFileSync(filePath, "utf8");
    const hitCount = findTypeHits(ts, filePath, before, matchText).length;
    if (rejectedCount >= hitCount) {
      break;
    }

    const { text: after } = replaceTypeInText(ts, filePath, before, {
      matchText,
      withText,
      importFrom: values["import-from"],
      importName: values["import-name"],
      onlyHitIndex: rejectedCount,
    });
    writeFileSync(filePath, after);

    // a replacement that leaves the match count unchanged would never finish
    const progressed =
      findTypeHits(ts, filePath, after, matchText).length < hitCount;
    if (progressed && typechecks()) {
      console.log(`KEPT\t${file}\tmatch ${rejectedCount}`);
    } else {
      writeFileSync(filePath, before);
      console.log(`REJECT\t${file}\tmatch ${rejectedCount}`);
      rejectedCount++;
    }
  }
}
