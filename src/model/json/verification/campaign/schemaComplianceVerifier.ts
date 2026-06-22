import Ajv, { type ErrorObject } from "ajv";
import { produce } from "immer";

import roomSchema from "../../../../_generated/room.schema.json";
import { entries } from "../../../../utils/entries";
import { setAtPath } from "../../../../utils/getAtPath";
import { type CampaignVerifier, notAutoFixable } from "../CampaignVerification";
import {
  type VerificationRoomId,
  type VerificationRoomJson,
} from "../verificationTypes";

type SchemaNonCompliant = {
  roomId: VerificationRoomId;
  /** RFC 6901 JSON Pointer to the value Ajv rejected (empty string for the room root) */
  instancePath: string;
  /**
   * for a fixable error, the value `fix` writes at `instancePath` - the first of
   * the schema's allowed values. `undefined` when the issue can't be auto-fixed
   */
  enumValue?: unknown;
};

type SchemaNode = { [key: string]: unknown };

const schemaDefinitions = (
  roomSchema as { definitions: Record<string, SchemaNode> }
).definitions;

/**
 * compiling the generated room schema is the costly part, so do it once at module
 * scope - the orchestrator's `createSelector` then only re-runs validation when
 * the campaign actually changes. Mirrors `useUpdateStoreWhenJsonEdited`.
 * `allErrors` so we report every way a room is wrong, not just the first.
 */
const ajvValidate = new Ajv({ allErrors: true }).compile<VerificationRoomJson>(
  roomSchema,
);

/** follow `$ref`s until a concrete schema node is reached */
const deref = (node: SchemaNode): SchemaNode => {
  let current = node;
  while (typeof current.$ref === "string") {
    current =
      schemaDefinitions[current.$ref.slice(current.$ref.lastIndexOf("/") + 1)];
  }
  return current;
};

const isObjectData = (data: unknown): data is Record<string, unknown> =>
  typeof data === "object" && data !== null && !Array.isArray(data);

/**
 * true when every `const`-pinned property of `branch` (eg an item's `type` or a
 * monster's `which`) equals the data's value - ie the discriminators say this is
 * the branch the author intended. Branches with no `const` never match, so an
 * unkeyed `anyOf` is left alone
 */
const branchMatches = (branch: SchemaNode, data: unknown): boolean => {
  if (!isObjectData(data)) {
    return false;
  }
  const properties = deref(branch).properties as
    | Record<string, SchemaNode>
    | undefined;
  if (properties === undefined) {
    return false;
  }
  let sawConst = false;
  for (const [key, property] of entries(properties)) {
    const constValue = deref(property).const;
    if (constValue === undefined) {
      continue;
    }
    sawConst = true;
    if (data[key] !== constValue) {
      return false;
    }
  }
  return sawConst;
};

/**
 * resolve the schema's `anyOf` unions down to the single branch the data's
 * discriminator `const`s select, recursing into properties and the items map. The
 * result validates against exactly the branch the author meant, so Ajv reports its
 * real failures (including a missing `required` property) rather than the union of
 * every sibling branch's complaints.
 */
const narrowToData = (node: SchemaNode, data: unknown): SchemaNode => {
  const resolved = deref(node);

  const anyOf = resolved.anyOf as SchemaNode[] | undefined;
  if (anyOf !== undefined) {
    const branch = anyOf.find((candidate) => branchMatches(candidate, data));
    return branch === undefined ? resolved : narrowToData(branch, data);
  }

  if (!isObjectData(data)) {
    return resolved;
  }

  const properties =
    (resolved.properties as Record<string, SchemaNode> | undefined) ?? {};
  const additional = resolved.additionalProperties;
  const additionalSchema = isObjectData(additional) ? additional : undefined;
  if (resolved.properties === undefined && additionalSchema === undefined) {
    return resolved;
  }

  const narrowedProperties: Record<string, SchemaNode> = {};
  // narrow every schema'd property the data actually carries (the items map's
  // entries arrive via `additionalProperties`)...
  for (const [key, value] of entries(data)) {
    if (key in properties) {
      narrowedProperties[key] = narrowToData(properties[key], value);
    } else if (additionalSchema !== undefined) {
      narrowedProperties[key] = narrowToData(additionalSchema, value);
    }
  }
  // ...and keep the rest, so a missing `required` property's constraint still fires
  for (const [key, property] of entries(properties)) {
    if (!(key in narrowedProperties)) {
      narrowedProperties[key] = property;
    }
  }

  return {
    ...resolved,
    properties: narrowedProperties,
    // each data entry now has its own branch, so the items map becomes a closed set
    ...(additionalSchema === undefined ? {} : { additionalProperties: false }),
  };
};

const pathSegments = (pointer: string): string[] =>
  pointer === "" ?
    []
  : pointer
      .slice(1)
      .split("/")
      .map((token) => token.replace(/~1/g, "/").replace(/~0/g, "~"));

/** the enum a property at this instance path is constrained to, if any */
const enumAt = (
  schemaRoot: SchemaNode,
  segments: string[],
): undefined | unknown[] => {
  let node = deref(schemaRoot);
  for (const segment of segments) {
    const properties = node.properties as
      | Record<string, SchemaNode>
      | undefined;
    if (properties === undefined || !(segment in properties)) {
      return undefined;
    }
    node = deref(properties[segment]);
  }
  return Array.isArray(node.enum) ? node.enum : undefined;
};

/**
 * preferred fill values for well-known properties, used instead of the first
 * allowed value when the preference is itself one of the allowed values. Keyed by
 * property name, so eg a monster's `startDirection` faces the player rather than
 * landing on whichever direction the enum happens to list first
 */
const preferredEnumDefaults: Record<string, unknown> = {
  startDirection: "towards",
  activated: "on",
};

/** the value to fill an enum property with: its well-known default if allowed, else the first */
const pickEnumValue = (
  propertyName: string,
  allowedValues: undefined | unknown[],
): unknown => {
  if (allowedValues === undefined) {
    return undefined;
  }
  const preferred = preferredEnumDefaults[propertyName];
  return allowedValues.includes(preferred) ? preferred : allowedValues[0];
};

type ErrorFix = {
  /** JSON Pointer to the value to change (for a missing property, the property itself) */
  path: string;
  /** the value `fix` should write, or `undefined` when there's no safe substitution */
  enumValue: unknown;
  /** how the message describes the problem */
  verb: "Disallowed value" | "Missing value";
};

/**
 * work out the fix (if any) for one error against the narrowed schema: a wrong
 * `enum` value, or a missing `required` property whose schema is itself an enum,
 * both become the first allowed value
 */
const errorFix = (error: ErrorObject, narrowed: SchemaNode): ErrorFix => {
  if (error.keyword === "enum") {
    const { allowedValues } = error.params as { allowedValues?: unknown[] };
    const segments = pathSegments(error.instancePath);
    return {
      path: error.instancePath,
      enumValue: pickEnumValue(segments.at(-1) ?? "", allowedValues),
      verb: "Disallowed value",
    };
  }
  if (error.keyword === "required") {
    const { missingProperty } = error.params as { missingProperty: string };
    const allowed = enumAt(narrowed, [
      ...pathSegments(error.instancePath),
      missingProperty,
    ]);
    return {
      path:
        allowed === undefined ?
          error.instancePath
        : `${error.instancePath}/${missingProperty}`,
      enumValue: pickEnumValue(missingProperty, allowed),
      verb: "Missing value",
    };
  }
  return {
    path: error.instancePath,
    enumValue: undefined,
    verb: "Disallowed value",
  };
};

/** the failing JSON Pointer with a wrapping arrow between segments, so long paths can be read */
const displayPath = (pointer: string): string =>
  pointer.replace(/^\//, "").replaceAll("/", " ➡ ");

/**
 * a room that doesn't match the generated room JSON schema - the same validation
 * the JSON editor applies. Resolves the schema's `anyOf` unions down to the branch
 * the data's `type`/`which` discriminators select, then yields one issue per real
 * failure: a wrong or missing enum value is auto-fixable (substitute the first
 * allowed value), the rest need hand-editing. In practice this only fires for JSON
 * saved by an older build.
 */
export const schemaComplianceVerifier: CampaignVerifier<SchemaNonCompliant> = {
  name: "Room JSON schema",
  *check(campaign) {
    for (const [roomId, room] of entries(campaign.rooms)) {
      if (ajvValidate(room)) {
        continue;
      }
      const narrowed = narrowToData(
        { $ref: "#/definitions/RoomJsonSchema" },
        room,
      );
      const validateNarrowed = new Ajv({
        allErrors: true,
        strict: false,
      }).compile({ ...narrowed, definitions: schemaDefinitions });
      validateNarrowed(room);

      const seen = new Set<string>();
      for (const error of validateNarrowed.errors ?? []) {
        const { path, enumValue, verb } = errorFix(error, narrowed);
        const dedupeKey = `${error.keyword}:${path}`;
        if (seen.has(dedupeKey)) {
          continue;
        }
        seen.add(dedupeKey);

        const where = displayPath(path);
        const fixable = enumValue !== undefined;
        const at = where === "" ? "" : ` at: ${where}`;
        yield {
          severity: "error",
          roomId,
          msg:
            fixable ?
              `${verb} at: ${where}`
            : `JSON schema violated${at} (${error.keyword})`,
          fixable,
          fixText: fixable ? `Set to ‘${enumValue}’` : `Needs hand-editing`,
          issueData: { roomId, instancePath: path, enumValue },
          verifier: schemaComplianceVerifier,
        };
      }
    }
  },
  fix(campaign, { roomId, instancePath, enumValue }) {
    if (enumValue === undefined) {
      return notAutoFixable();
    }
    return produce(campaign, (draft) => {
      // Ajv hands us a runtime JSON Pointer, so the room is widened here to keep
      // inference off the giant RoomJson type - the schema is what actually
      // constrains the value being written
      setAtPath(
        draft.rooms[roomId] as Record<string, unknown>,
        instancePath.slice(1),
        enumValue,
        "/",
      );
    });
  },
};
