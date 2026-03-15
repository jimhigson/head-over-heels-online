#!/usr/bin/env -S pnpm tsx

import type { JsonArray, JsonObject, JsonValue } from "type-fest";

import { readFileSync, writeFileSync } from "fs";

const [, , inputFile, outputFile] = process.argv;

if (!inputFile || !outputFile) {
  console.error("Usage: deduplicateSchema.ts <input-file> <output-file>");
  process.exit(1);
}

const minCount = 3;
const minSerializedLength = 50;

// Canonical JSON with sorted keys at every level, for stable comparison
const canonicalize = (value: JsonValue): string =>
  JSON.stringify(value, (_, v: JsonValue) =>
    v && typeof v === "object" && !Array.isArray(v) ?
      Object.fromEntries(
        Object.entries(v as JsonObject).sort(([a], [b]) => (a < b ? -1 : 1)),
      )
    : v,
  );

const isJsonObject = (v: JsonValue): v is JsonObject =>
  typeof v === "object" && v !== null && !Array.isArray(v);

// A pure $ref node is one whose sole purpose is to reference another definition.
// Objects that happen to have a "$ref" key alongside other keys (e.g. the root
// schema which has "$ref", "$schema", and "definitions") are not pure refs.
const isPureRef = (node: JsonObject): boolean =>
  "$ref" in node && Object.keys(node).length === 1;

const schema = JSON.parse(readFileSync(inputFile, "utf8")) as JsonObject;

// Keys whose values are property-name→schema maps rather than schemas
// themselves. A $ref cannot validly replace these map objects.
const propertyMapKeys = new Set(["properties", "patternProperties"]);

// First pass: count how many times each canonical object subtree appears.
// Only count nodes that are in schema positions — the values of
// `properties`/`patternProperties` are maps, not schemas, and must not be
// replaced with $ref.
const counts = new Map<string, { count: number; node: JsonObject }>();

function countNodes(node: JsonValue, isSchemaPos = true): void {
  if (Array.isArray(node)) {
    for (const child of node as JsonArray) countNodes(child, true);
    return;
  }
  if (!isJsonObject(node)) return;
  if (isPureRef(node)) return;

  const canonical = canonicalize(node);
  if (isSchemaPos && canonical.length >= minSerializedLength) {
    const existing = counts.get(canonical);
    if (existing) {
      existing.count++;
    } else {
      counts.set(canonical, { count: 1, node });
    }
  }
  for (const [key, value] of Object.entries(node)) {
    countNodes(value, !propertyMapKeys.has(key));
  }
}

countNodes(schema);

// A node with only flat primitive properties and no nested objects is barely
// smaller than its $ref replacement — not worth extracting.
const hasMeaningfulDepth = (node: JsonObject): boolean =>
  Object.values(node).some((v) => isJsonObject(v) || Array.isArray(v));

// Build extraction map: canonical → def name, largest subtrees first.
const extractionMap = new Map<string, string>();

[...counts.entries()]
  .filter(
    ([, { count, node }]) => count >= minCount && hasMeaningfulDepth(node),
  )
  .sort(([a], [b]) => b.length - a.length)
  .forEach(([canonical], i) => {
    extractionMap.set(canonical, `r${i + 1}`);
  });

if (extractionMap.size === 0) {
  writeFileSync(outputFile, JSON.stringify(schema, null, 2));
  process.exit(0);
}

// Stash original nodes before replacement, so definitions contain the real
// subtrees rather than self-referential $refs
const defNodes = new Map<string, JsonObject>();
for (const [canonical, defName] of extractionMap) {
  defNodes.set(defName, counts.get(canonical)!.node);
}

// Second pass: replace top-down. When a node matches an extracted def,
// replace it with a $ref and stop recursing (children are inside the def).
// isSchemaPos mirrors the same logic as countNodes — only replace in positions
// where $ref is a valid schema.
function replaceNodes(node: JsonValue, isSchemaPos = true): JsonValue {
  if (Array.isArray(node)) {
    return (node as JsonArray).map((v) => replaceNodes(v, true));
  }
  if (!isJsonObject(node)) return node;
  if (isPureRef(node)) return node;

  const canonical = canonicalize(node);
  if (isSchemaPos && extractionMap.has(canonical)) {
    return { $ref: `#/definitions/${extractionMap.get(canonical)}` };
  }

  const result: JsonObject = {};
  for (const [key, value] of Object.entries(node)) {
    result[key] = replaceNodes(value, !propertyMapKeys.has(key));
  }
  return result;
}

// Replace within a def node's children but not the root itself, to avoid a
// def whose root immediately resolves to its own $ref
function replaceNodeChildren(node: JsonObject): JsonObject {
  const result: JsonObject = {};
  for (const [key, value] of Object.entries(node)) {
    result[key] = replaceNodes(value, !propertyMapKeys.has(key));
  }
  return result;
}

const newSchema = replaceNodes(schema) as JsonObject;

// Append the extracted definitions. Run replaceNodes on their children so
// that nested shared subtrees (e.g. a position node inside an emitter def)
// are also compacted rather than stored inline.
const definitions = (newSchema.definitions ?? {}) as JsonObject;
for (const [defName, node] of defNodes) {
  definitions[defName] = replaceNodeChildren(node);
}
newSchema.definitions = definitions;

writeFileSync(outputFile, JSON.stringify(newSchema, null, 2));
console.error(
  `deduplicateSchema: extracted ${extractionMap.size} shared definitions`,
);
