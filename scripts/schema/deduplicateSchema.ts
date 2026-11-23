#!/usr/bin/env -S node --import ./buildTools/registerNodeImportHooks.ts

import { readFileSync, writeFileSync } from "fs";
import { createHash } from "node:crypto";
import type { JsonArray, JsonObject, JsonValue } from "type-fest";

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
/**
 * where in the schema a node was found, used to give an extracted definition a
 * descriptive name
 */
type OccurrenceContext = {
  /**
   * the property names from the root down to the node
   */
  propertyNames: string[];
  /**
   * the `type` const of the nearest enclosing schema that has one, eg an item's type
   */
  enclosingType: string | undefined;
};

type NodePosition = "patternProperties" | "properties" | "schema";

const counts = new Map<
  string,
  { count: number; node: JsonObject; contexts: OccurrenceContext[] }
>();

const constOfProperty = (
  node: JsonObject,
  propertyName: string,
): string | undefined => {
  const { properties } = node;
  if (!isJsonObject(properties)) {
    return undefined;
  }
  const propertySchema = properties[propertyName];
  return (
      isJsonObject(propertySchema) && typeof propertySchema.const === "string"
    ) ?
      propertySchema.const
    : undefined;
};

const enclosingTypeOf = (node: JsonObject): string | undefined =>
  constOfProperty(node, "type");

/**
 * what a node is a variant of, if it is one - eg the item type of an item's
 * schema, or the item type a switch modification is for
 */
const ownVariantOf = (node: JsonObject): string | undefined =>
  constOfProperty(node, "type") ?? constOfProperty(node, "expectType");

function countNodes(
  node: JsonValue,
  position: NodePosition,
  context: OccurrenceContext,
): void {
  if (Array.isArray(node)) {
    for (const child of node as JsonArray) {
      countNodes(child, "schema", context);
    }
    return;
  }
  if (!isJsonObject(node)) {
    return;
  }
  if (isPureRef(node)) {
    return;
  }

  const canonical = canonicalize(node);
  if (position === "schema" && canonical.length >= minSerializedLength) {
    const existing = counts.get(canonical);
    if (existing) {
      existing.count++;
      existing.contexts.push(context);
    } else {
      counts.set(canonical, { count: 1, node, contexts: [context] });
    }
  }

  const contextInsideNode =
    position === "schema" ?
      {
        ...context,
        enclosingType: enclosingTypeOf(node) ?? context.enclosingType,
      }
    : context;
  for (const [key, value] of Object.entries(node)) {
    countNodes(
      value,
      key === "properties" || key === "patternProperties" ? key : "schema",
      position === "properties" ?
        {
          ...contextInsideNode,
          propertyNames: [...contextInsideNode.propertyNames, key],
        }
      : contextInsideNode,
    );
  }
}

countNodes(schema, "schema", { propertyNames: [], enclosingType: undefined });

// A node with only flat primitive properties and no nested objects is barely
// smaller than its $ref replacement — not worth extracting.
const hasMeaningfulDepth = (node: JsonObject): boolean =>
  Object.values(node).some((v) => isJsonObject(v) || Array.isArray(v));

const mostFrequent = (values: string[]): string | undefined => {
  const tally = new Map<string, number>();
  for (const value of values) {
    tally.set(value, tally.getOrInsert(value, 0) + 1);
  }
  let maybeMostFrequent: string | undefined;
  let highestCount = 0;
  for (const [value, valueCount] of tally) {
    if (valueCount > highestCount) {
      maybeMostFrequent = value;
      highestCount = valueCount;
    }
  }
  return maybeMostFrequent;
};

const nameFromContexts = (
  contexts: OccurrenceContext[],
  node: JsonObject,
): string => {
  const maybeLeadName = mostFrequent(
    contexts.flatMap(({ propertyNames }) => propertyNames.slice(-1)),
  );
  if (maybeLeadName === undefined) {
    return "shared";
  }
  const [firstLeadContext, ...otherLeadContexts] = contexts.filter(
    ({ propertyNames }) => propertyNames.at(-1) === maybeLeadName,
  );
  // only name the enclosing type if every use is inside the same one:
  const enclosingType =
    (
      otherLeadContexts.every(
        (leadContext) =>
          leadContext.enclosingType === firstLeadContext.enclosingType,
      )
    ) ?
      firstLeadContext.enclosingType
    : undefined;
  return [enclosingType, maybeLeadName, ownVariantOf(node)]
    .filter((namePart) => namePart !== undefined)
    .map((namePart) => namePart.replace(/[^A-Za-z0-9]/g, ""))
    .join("_");
};

const takenDefinitionNames = new Set<string>();

const definitionHashLength = 6;

// the hash of the subtree's content keeps a name the same while other
// definitions come and go
const uniqueDefinitionName = (
  contexts: OccurrenceContext[],
  node: JsonObject,
  canonical: string,
): string => {
  const prefix = nameFromContexts(contexts, node);
  const hash = createHash("sha256")
    .update(canonical)
    .digest("hex")
    .slice(0, definitionHashLength);
  const name = `${prefix}_${hash}`;
  if (takenDefinitionNames.has(name)) {
    throw new Error(
      `two different shared subtrees would both be named ${name} - lengthen definitionHashLength`,
    );
  }
  takenDefinitionNames.add(name);
  return name;
};

// Build extraction map: canonical → def name
const extractionMap = new Map<string, string>();

counts
  .entries()
  .filter(
    ([, { count, node }]) => count >= minCount && hasMeaningfulDepth(node),
  )
  .forEach(([canonical, { contexts, node }]) => {
    extractionMap.set(
      canonical,
      uniqueDefinitionName(contexts, node, canonical),
    );
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
  if (!isJsonObject(node)) {
    return node;
  }
  if (isPureRef(node)) {
    return node;
  }

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
// in name order, so that adding a definition adds one entry rather than moving others
for (const [defName, node] of defNodes
  .entries()
  .toArray()
  .toSorted(([nameA], [nameB]) => (nameA < nameB ? -1 : 1))) {
  definitions[defName] = replaceNodeChildren(node);
}
newSchema.definitions = definitions;

writeFileSync(outputFile, JSON.stringify(newSchema, null, 2));
console.error(
  `deduplicateSchema: extracted ${extractionMap.size} shared definitions`,
);
