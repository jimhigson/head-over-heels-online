import { expect, test } from "vitest";

import { addItem, campaignOf, newRoom, runCheck } from "../testUtils";
import { type VerificationRoomItemId } from "../verificationTypes";
import { controllerTargetsVerifier } from "./controllerTargetsVerifier";

const block = () => ({
  type: "block" as const,
  config: { style: "organic" as const },
  position: { x: 2, y: 2, z: 0 },
});

const monsterSwitch = (targets?: string[]) => ({
  type: "switch" as const,
  config: {
    initialSetting: "left" as const,
    modifies: [
      {
        expectType: "monster" as const,
        ...(targets === undefined ?
          {}
        : { targets: targets as VerificationRoomItemId[] }),
      },
    ],
  },
  position: { x: 1, y: 1, z: 0 },
});

const blockSwitch = (targets: string[]) => ({
  type: "switch" as const,
  config: {
    initialSetting: "left" as const,
    modifies: [
      {
        expectType: "block" as const,
        targets: targets as VerificationRoomItemId[],
        makesStable: true,
      },
    ],
  },
  position: { x: 1, y: 1, z: 0 },
});

const joystick = () => ({
  type: "joystick" as const,
  config: {},
  position: { x: 3, y: 3, z: 0 },
});

test("flags a switch targeting an item that isn't in the room", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "blk", block());
  addItem(roomA, "sw", blockSwitch(["blk", "ghost"]));

  const issueTypes = runCheck(
    controllerTargetsVerifier,
    campaignOf({ roomA }),
  ).map(({ issueData, fixable }) => ({ type: issueData.type, fixable }));

  expect(issueTypes).toEqual([{ type: "missingTarget", fixable: true }]);
});

test("the fix removes the missing target, clearing the issue", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "blk", block());
  addItem(roomA, "sw", blockSwitch(["blk", "ghost"]));
  const campaign = campaignOf({ roomA });

  const [issue] = runCheck(controllerTargetsVerifier, campaign);
  const fixed = issue.verifier.fix(campaign, issue.issueData);

  expect(runCheck(controllerTargetsVerifier, fixed)).toEqual([]);
});

test("flags a modifier whose expectType doesn't match the target's type", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "blk", block());
  addItem(roomA, "sw", monsterSwitch(["blk"]));

  const [issue] = runCheck(controllerTargetsVerifier, campaignOf({ roomA }));

  expect(issue.issueData).toMatchObject({
    type: "expectTypeMismatch",
    expectType: "monster",
    actualType: "block",
  });
});

test("accepts a switch whose targets all exist with the expected type", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "blk", block());
  addItem(roomA, "sw", blockSwitch(["blk"]));

  expect(runCheck(controllerTargetsVerifier, campaignOf({ roomA }))).toEqual(
    [],
  );
});

test("flags a switch with an empty target list as controlling nothing", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "sw", blockSwitch([]));

  const issueTypes = runCheck(
    controllerTargetsVerifier,
    campaignOf({ roomA }),
  ).map(({ issueData }) => issueData.type);

  expect(issueTypes).toEqual(["controlsNothing"]);
});

test("flags a switch whose only target is missing as also controlling nothing", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "sw", blockSwitch(["ghost"]));

  const issueTypes = runCheck(
    controllerTargetsVerifier,
    campaignOf({ roomA }),
  ).map(({ issueData }) => issueData.type);

  expect(issueTypes).toEqual(["missingTarget", "controlsNothing"]);
});

test("flags a switch with implicit targets when no item of its expectType is in the room", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "sw", monsterSwitch());

  const issueTypes = runCheck(
    controllerTargetsVerifier,
    campaignOf({ roomA }),
  ).map(({ issueData }) => issueData.type);

  expect(issueTypes).toEqual(["controlsNothing"]);
});

test("flags a joystick with implicit targets in a room with no charles", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "js", joystick());

  const issueTypes = runCheck(
    controllerTargetsVerifier,
    campaignOf({ roomA }),
  ).map(({ issueData }) => issueData.type);

  expect(issueTypes).toEqual(["controlsNothing"]);
});
