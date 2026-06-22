import { expect, test } from "vitest";

import { addItem, campaignOf, newRoom, runCheck } from "../testUtils";
import {
  type VerificationJsonItemUnion,
  type VerificationRoomJson,
} from "../verificationTypes";
import { schemaComplianceVerifier } from "./schemaComplianceVerifier";

const campaignWithItem = (item: VerificationJsonItemUnion) => {
  const roomA = newRoom("roomA");
  addItem(roomA, "m", item);
  return campaignOf({ roomA });
};

/** a config object with one key removed, for building one-property-missing items */
const without = (
  config: Record<string, unknown>,
  key: string,
): Record<string, unknown> => {
  const copy = { ...config };
  delete copy[key];
  return copy;
};

const computerBotConfig = {
  which: "computerBot",
  activated: "off",
  movement: "patrol-randomly-xy4-and-reverse",
  startDirection: "away",
};

const sceneryPlayerConfig = {
  which: "head",
  startDirection: "away",
};

type MissingEnumIssueOptions = {
  msg: string;
  instancePath: string;
  enumValue: number | string;
};

/** the single fixable issue expected when a required enum property is missing */
const missingEnumIssue = ({
  msg,
  instancePath,
  enumValue,
}: MissingEnumIssueOptions) => ({
  severity: "error",
  roomId: "roomA",
  msg,
  fixable: true,
  fixText: `Set to ‘${enumValue}’`,
  issueData: { roomId: "roomA", instancePath, enumValue },
  verifier: schemaComplianceVerifier,
});

test("flags a room that doesn't match the schema", () => {
  const roomA = newRoom("roomA");
  // a real room always has a planet; removing it breaks schema compliance
  delete (roomA as Partial<VerificationRoomJson>).planet;

  const [issue] = runCheck(schemaComplianceVerifier, campaignOf({ roomA }));

  expect({ severity: issue.severity, roomId: issue.roomId }).toEqual({
    severity: "error",
    roomId: "roomA",
  });
});

test("accepts a well-formed room", () => {
  const roomA = newRoom("roomA");

  expect(runCheck(schemaComplianceVerifier, campaignOf({ roomA }))).toEqual([]);
});

test("marks an enum mismatch as fixable", () => {
  const roomA = newRoom("roomA");
  // planet is an enum, so an unknown value is recoverable to the first allowed one
  (roomA as { planet: string }).planet = "notARealPlanet";

  const [issue] = runCheck(schemaComplianceVerifier, campaignOf({ roomA }));

  expect(issue.fixable).toBe(true);
});

test("the enum fix produces a schema-compliant room", () => {
  const roomA = newRoom("roomA");
  (roomA as { planet: string }).planet = "notARealPlanet";
  const campaign = campaignOf({ roomA });
  const [issue] = runCheck(schemaComplianceVerifier, campaign);

  const fixed = issue.verifier.fix(campaign, issue.issueData);

  expect(runCheck(schemaComplianceVerifier, fixed)).toEqual([]);
});

test("describes a root-level violation without a path", () => {
  const roomA = newRoom("roomA");
  // a missing top-level id is a pure root `required` error - unlike planet, it
  // doesn't cascade into the value-constraint errors that would be reported first
  delete (roomA as Partial<VerificationRoomJson>).id;

  const issues = runCheck(schemaComplianceVerifier, campaignOf({ roomA }));

  expect(issues).toEqual([
    {
      severity: "error",
      roomId: "roomA",
      msg: "JSON schema violated (required)",
      fixable: false,
      fixText: "Needs hand-editing",
      issueData: { roomId: "roomA", instancePath: "", enumValue: undefined },
      verifier: schemaComplianceVerifier,
    },
  ]);
});

test("describes a fixable enum mismatch with its path and replacement", () => {
  const roomA = newRoom("roomA");
  (roomA as { planet: string }).planet = "notARealPlanet";

  const issues = runCheck(schemaComplianceVerifier, campaignOf({ roomA }));

  expect(issues).toEqual([
    {
      severity: "error",
      roomId: "roomA",
      msg: "Disallowed value at: planet",
      fixable: true,
      fixText: "Set to ‘blacktooth’",
      issueData: {
        roomId: "roomA",
        instancePath: "/planet",
        enumValue: "blacktooth",
      },
      verifier: schemaComplianceVerifier,
    },
  ]);
});

test("a computerBot missing its movement is fixable to the first allowed movement", () => {
  const campaign = campaignWithItem({
    type: "monster",
    config: without(computerBotConfig, "movement"),
    position: { x: 6, y: 7, z: 2 },
  } as VerificationJsonItemUnion);

  const issues = runCheck(schemaComplianceVerifier, campaign);

  expect(issues).toEqual([
    missingEnumIssue({
      msg: "Missing value at: items ➡ m ➡ config ➡ movement",
      instancePath: "/items/m/config/movement",
      enumValue: "patrol-randomly-xy4-and-reverse",
    }),
  ]);
});

test("a computerBot missing its startDirection is fixable to the first allowed direction", () => {
  const campaign = campaignWithItem({
    type: "monster",
    config: without(computerBotConfig, "startDirection"),
    position: { x: 6, y: 7, z: 2 },
  } as VerificationJsonItemUnion);

  const issues = runCheck(schemaComplianceVerifier, campaign);

  expect(issues).toEqual([
    missingEnumIssue({
      msg: "Missing value at: items ➡ m ➡ config ➡ startDirection",
      instancePath: "/items/m/config/startDirection",
      enumValue: "towards",
    }),
  ]);
});

test("a computerBot missing its activated flag is fixable to the first allowed value", () => {
  const campaign = campaignWithItem({
    type: "monster",
    config: without(computerBotConfig, "activated"),
    position: { x: 6, y: 7, z: 2 },
  } as VerificationJsonItemUnion);

  const issues = runCheck(schemaComplianceVerifier, campaign);

  expect(issues).toEqual([
    missingEnumIssue({
      msg: "Missing value at: items ➡ m ➡ config ➡ activated",
      instancePath: "/items/m/config/activated",
      enumValue: "on",
    }),
  ]);
});

test("a sceneryPlayer missing its which is fixable to the first allowed character", () => {
  const campaign = campaignWithItem({
    type: "sceneryPlayer",
    config: without(sceneryPlayerConfig, "which"),
    position: { x: 6, y: 7, z: 2 },
  } as VerificationJsonItemUnion);

  const issues = runCheck(schemaComplianceVerifier, campaign);

  expect(issues).toEqual([
    missingEnumIssue({
      msg: "Missing value at: items ➡ m ➡ config ➡ which",
      instancePath: "/items/m/config/which",
      enumValue: "head",
    }),
  ]);
});

test("a sceneryPlayer missing its startDirection is fixable to the first allowed direction", () => {
  const campaign = campaignWithItem({
    type: "sceneryPlayer",
    config: without(sceneryPlayerConfig, "startDirection"),
    position: { x: 6, y: 7, z: 2 },
  } as VerificationJsonItemUnion);

  const issues = runCheck(schemaComplianceVerifier, campaign);

  expect(issues).toEqual([
    missingEnumIssue({
      msg: "Missing value at: items ➡ m ➡ config ➡ startDirection",
      instancePath: "/items/m/config/startDirection",
      enumValue: "towards",
    }),
  ]);
});

// a crown pickup is selected by its `gives` const, then its planet enum filled
test("a crown pickup missing its planet is fixable to the first allowed planet", () => {
  const campaign = campaignWithItem({
    type: "pickup",
    config: without({ gives: "crown", planet: "blacktooth" }, "planet"),
    position: { x: 1, y: 1, z: 0 },
  } as VerificationJsonItemUnion);

  const issues = runCheck(schemaComplianceVerifier, campaign);

  expect(issues).toEqual([
    missingEnumIssue({
      msg: "Missing value at: items ➡ m ➡ config ➡ planet",
      instancePath: "/items/m/config/planet",
      enumValue: "blacktooth",
    }),
  ]);
});

// a numeric enum fills with its first allowed number, not a string
test("a slidingDeadly missing its startingPhase is fixable to the first allowed value", () => {
  const campaign = campaignWithItem({
    type: "slidingDeadly",
    config: without({ style: "spikyBall", startingPhase: 1 }, "startingPhase"),
    position: { x: 1, y: 1, z: 0 },
  } as VerificationJsonItemUnion);

  const issues = runCheck(schemaComplianceVerifier, campaign);

  expect(issues).toEqual([
    missingEnumIssue({
      msg: "Missing value at: items ➡ m ➡ config ➡ startingPhase",
      instancePath: "/items/m/config/startingPhase",
      enumValue: 1,
    }),
  ]);
});

// a missing required property that isn't an enum has no safe fill, so it isn't fixable
test("a missing non-enum required property can't be auto-fixed", () => {
  const campaign = campaignWithItem({
    type: "lift",
    config: without({ top: 5, bottom: 5 }, "top"),
    position: { x: 1, y: 1, z: 0 },
  } as VerificationJsonItemUnion);

  const issues = runCheck(schemaComplianceVerifier, campaign);

  expect(issues).toEqual([
    {
      severity: "error",
      roomId: "roomA",
      msg: "JSON schema violated at: items ➡ m ➡ config (required)",
      fixable: false,
      fixText: "Needs hand-editing",
      issueData: {
        roomId: "roomA",
        instancePath: "/items/m/config",
        enumValue: undefined,
      },
      verifier: schemaComplianceVerifier,
    },
  ]);
});

// a scroll pickup is narrowed by both its `gives` and `source` consts
test("a scroll pickup is narrowed by two discriminators and reports only the real failure", () => {
  const campaign = campaignWithItem({
    type: "pickup",
    config: without(
      { gives: "scroll", source: "inline", markdown: "hi" },
      "markdown",
    ),
    position: { x: 1, y: 1, z: 0 },
  } as VerificationJsonItemUnion);

  const issues = runCheck(schemaComplianceVerifier, campaign);

  expect(issues).toEqual([
    {
      severity: "error",
      roomId: "roomA",
      msg: "JSON schema violated at: items ➡ m ➡ config (required)",
      fixable: false,
      fixText: "Needs hand-editing",
      issueData: {
        roomId: "roomA",
        instancePath: "/items/m/config",
        enumValue: undefined,
      },
      verifier: schemaComplianceVerifier,
    },
  ]);
});
