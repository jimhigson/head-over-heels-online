import { expect, test } from "vitest";

import { addItem, campaignOf, newRoom, runCheck } from "../testUtils";
import { type VerificationJsonItemUnion } from "../verificationTypes";
import { redundantTimesVerifier } from "./redundantTimesVerifier";

const blockWithTimes = (times?: {
  x: number;
  y: number;
  z: number;
}): VerificationJsonItemUnion => ({
  type: "block",
  position: { x: 2, y: 2, z: 0 },
  config: { style: "tower", ...(times !== undefined ? { times } : {}) },
});

test("flags an item whose times is all 1s", () => {
  const roomA = newRoom("roomA");
  const itemId = addItem(
    roomA,
    "block_test",
    blockWithTimes({ x: 1, y: 1, z: 1 }),
  );

  const [issue] = runCheck(redundantTimesVerifier, campaignOf({ roomA }));

  expect({ itemId: issue.itemId, fixable: issue.fixable }).toEqual({
    itemId,
    fixable: true,
  });
});

test("the fix removes the redundant times, clearing the issue", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "block_test", blockWithTimes({ x: 1, y: 1, z: 1 }));
  const campaign = campaignOf({ roomA });

  const [issue] = runCheck(redundantTimesVerifier, campaign);
  const fixed = issue.verifier.fix(campaign, issue.issueData);

  expect(runCheck(redundantTimesVerifier, fixed)).toEqual([]);
});

test("accepts an item whose times is meaningful", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "block_test", blockWithTimes({ x: 2, y: 1, z: 1 }));

  expect(runCheck(redundantTimesVerifier, campaignOf({ roomA }))).toEqual([]);
});

test("fixing an item that isn't redundant throws", () => {
  const roomA = newRoom("roomA");
  const itemId = addItem(roomA, "block_test", blockWithTimes());
  const campaign = campaignOf({ roomA });

  expect(() =>
    redundantTimesVerifier.fix(campaign, { roomId: roomA.id, itemId }),
  ).toThrow();
});
