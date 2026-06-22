import Ajv, { type ErrorObject } from "ajv";

import roomSchema from "../../../_generated/room.schema.json";
import { entries } from "../../../utils/entries";
import { type CampaignVerifier, notAutoFixable } from "./CampaignVerification";
import {
  type VerificationRoomId,
  type VerificationRoomJson,
} from "./verificationTypes";

type SchemaNonCompliant = {
  roomId: VerificationRoomId;
  /** every Ajv error for the room, formatted readably (deduped) */
  errors: string[];
};

/**
 * compiling the generated room schema is the costly part, so do it once at module
 * scope - the orchestrator's `createSelector` then only re-runs validation when
 * the campaign actually changes. Mirrors `useUpdateStoreWhenJsonEdited`.
 * `allErrors` so we report every way a room is wrong, not just the first.
 */
const ajvValidate = new Ajv({ allErrors: true }).compile<VerificationRoomJson>(
  roomSchema,
);

/** one Ajv error as `<path> <message> (<param>: <value>, …)` */
const formatAjvError = (error: ErrorObject): string => {
  const where = error.instancePath === "" ? "" : `${error.instancePath} `;
  const paramEntries = Object.entries(error.params);
  const params =
    paramEntries.length === 0 ?
      ""
    : ` (${paramEntries
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join(", ")})`;
  return `${where}${error.message ?? "is invalid"}${params}`;
};

/**
 * the value-level constraints worth surfacing in the message - an item is an
 * `anyOf` of every item type, so with `allErrors` Ajv reports a "type must equal
 * X" failure against every branch; those (and the `anyOf`/`required` wrappers) are
 * noise. The actual problem is almost always a value constraint like `multipleOf`.
 */
const actionableKeywords = new Set<string>([
  "enum",
  "format",
  "maximum",
  "maxItems",
  "maxLength",
  "minimum",
  "minItems",
  "minLength",
  "multipleOf",
  "pattern",
]);

/**
 * G3: a room that doesn't match the generated room JSON schema - the same
 * validation the JSON editor applies. One issue per non-compliant room, carrying
 * the full list of Ajv errors so the exact mismatch is visible. In practice this
 * only fires for JSON saved by an older build that can't be migrated automatically.
 */
export const schemaComplianceVerifier: CampaignVerifier<SchemaNonCompliant> = {
  name: "Room fails JSON schema",
  *check(campaign) {
    for (const [roomId, room] of entries(campaign.rooms)) {
      if (ajvValidate(room)) {
        continue;
      }
      const rawErrors = ajvValidate.errors ?? [];
      // the full, deduped list goes in the issue data
      const errors = [...new Set(rawErrors.map(formatAjvError))];
      // the message shows just the actionable value-constraint failures (or, if
      // there are none, the whole list)
      const actionable = [
        ...new Set(
          rawErrors
            .filter((error) => actionableKeywords.has(error.keyword))
            .map(formatAjvError),
        ),
      ];
      const shown = actionable.length > 0 ? actionable : errors;
      yield {
        severity: "error",
        roomId,
        msg: `‘${roomId}’ doesn't match the room JSON schema: ${shown.join("; ")}`,
        fixable: false,
        fixText: `Fix ‘${roomId}’ so it matches the room JSON schema`,
        issueData: { roomId, errors },
        verifier: schemaComplianceVerifier,
      };
    }
  },
  fix() {
    return notAutoFixable();
  },
};
