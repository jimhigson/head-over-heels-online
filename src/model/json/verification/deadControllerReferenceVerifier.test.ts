import { expect, test } from "vitest";

import { deadControllerReferenceVerifier } from "./deadControllerReferenceVerifier";
import { addItem, campaignOf, newRoom, runCheck } from "./testUtils";
import { type VerificationRoomItemId } from "./verificationTypes";

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

const block = () => ({
  type: "block" as const,
  config: { style: "organic" as const },
  position: { x: 2, y: 2, z: 0 },
});

test("flags a switch targeting an item that isn't in the room", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "sw", monsterSwitch(["ghost"]));
  const campaign = campaignOf({ roomA });

  const [issue] = runCheck(deadControllerReferenceVerifier, campaign);

  expect(issue.fixable).toBe(true);
});

test("the fix removes the dead reference, clearing the issue", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "sw", monsterSwitch(["ghost"]));
  const campaign = campaignOf({ roomA });

  const [issue] = runCheck(deadControllerReferenceVerifier, campaign);
  const fixed = issue.verifier.fix(campaign, issue.issueData);

  expect(runCheck(deadControllerReferenceVerifier, fixed)).toEqual([]);
});

test("accepts a switch whose targets all exist", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "blk", block());
  addItem(roomA, "sw", monsterSwitch(["blk"]));

  expect(
    runCheck(deadControllerReferenceVerifier, campaignOf({ roomA })),
  ).toEqual([]);
});
