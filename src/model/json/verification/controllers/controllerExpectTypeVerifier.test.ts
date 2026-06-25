import { expect, test } from "vitest";

import { addItem, campaignOf, newRoom, runCheck } from "../testUtils";
import { type VerificationRoomItemId } from "../verificationTypes";
import { controllerExpectTypeVerifier } from "./controllerExpectTypeVerifier";

const block = () => ({
  type: "block" as const,
  config: { style: "organic" as const },
  position: { x: 2, y: 2, z: 0 },
});

const monsterSwitch = (targets: string[]) => ({
  type: "switch" as const,
  config: {
    initialSetting: "left" as const,
    modifies: [
      {
        expectType: "monster" as const,
        targets: targets as VerificationRoomItemId[],
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

test("flags a modifier whose expectType doesn't match the target's type", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "blk", block());
  addItem(roomA, "sw", monsterSwitch(["blk"]));

  const [issue] = runCheck(controllerExpectTypeVerifier, campaignOf({ roomA }));

  expect({
    expectType: issue.issueData.expectType,
    actualType: issue.issueData.actualType,
  }).toEqual({ expectType: "monster", actualType: "block" });
});

test("accepts a modifier whose expectType matches", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "blk", block());
  addItem(roomA, "sw", blockSwitch(["blk"]));

  expect(runCheck(controllerExpectTypeVerifier, campaignOf({ roomA }))).toEqual(
    [],
  );
});
