#!/usr/bin/env -S pnpm tsx

import { Project } from "ts-morph";

function extractUnionType(fileName: string, unionName: string) {
  const project = new Project({
    tsConfigFilePath: "tsconfig.json", // Ensures project-wide resolution
  });
  project.addSourceFilesAtPaths(["**/*.ts", "!**/*.d.ts"]);
  project.resolveSourceFileDependencies();

  const file = project.getSourceFile(fileName);
  if (!file) {
    console.error(`File "${fileName}" not found.`);
    console.error("we have ", project.getSourceFiles());
    process.exit(1);
  }

  const alias = file.getTypeAlias(unionName);
  if (!alias) {
    console.error(`Type alias "${unionName}" not found in ${fileName}`);
    process.exit(1);
  }

  const type = alias.getType();
  if (!type.isUnion()) {
    console.error(`Type alias "${unionName}" is not a union type.`);
    process.exit(1);
  }

  return type
    .getUnionTypes()
    .map((t) => t.getLiteralValue())
    .filter((v) => v !== undefined)
    .sort();
}

const [file, unionName] = process.argv.slice(2);

if (!file || !unionName) {
  console.error("Usage: npx ts-node extract-union.ts <file> <unionName>");
  process.exit(1);
}

const union = extractUnionType(file, unionName);

console.log(`
import { ItemInPlay, ItemInPlayType } from "../../model/ItemInPlay";
import { SceneryName } from "../../sprites/planets";

/** this union is only here to check that it is equal to the 'live' one in the codebase */
type GeneratedTypeUnion = ${union.map((e) => `"${e}"`).join("|")};
type Check1<T extends GeneratedTypeUnion> = {anything: T};
type Check2<T extends ItemInPlayType> = {anything: T};
type Test1 = Check1<ItemInPlayType>;
type Test2 = Check2<GeneratedTypeUnion>;

export type ItemTypeUnion<
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
> = ${union
  .map(
    (t) =>
      `| (T extends "${t}" ? ItemInPlay<"${t}", RoomId, RoomItemId, RoomItemId, ScN> : never)`,
  )
  .join("\n")};`);
