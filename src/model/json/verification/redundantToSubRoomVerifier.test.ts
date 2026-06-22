import { expect, test } from "vitest";

import { redundantToSubRoomVerifier } from "./redundantToSubRoomVerifier";
import { addDoor, campaignOf, newRoom, runCheck } from "./testUtils";
import { type VerificationRoomId } from "./verificationTypes";

test("flags a toSubRoom pointing at an undivided room", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  const doorId = addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toSubRoom: "x",
  });

  const [issue] = runCheck(
    redundantToSubRoomVerifier,
    campaignOf({ roomA, roomB }),
  );

  expect({ itemId: issue.itemId, fixable: issue.fixable }).toEqual({
    itemId: doorId,
    fixable: true,
  });
});

test("the fix removes the redundant toSubRoom, clearing the issue", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toSubRoom: "x",
  });
  const campaign = campaignOf({ roomA, roomB });

  const [issue] = runCheck(redundantToSubRoomVerifier, campaign);
  const fixed = issue.verifier.fix(campaign, issue.issueData);

  expect(runCheck(redundantToSubRoomVerifier, fixed)).toEqual([]);
});

test("accepts a door without a toSubRoom", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomA, "left", { toRoom: "roomB" as VerificationRoomId });

  expect(
    runCheck(redundantToSubRoomVerifier, campaignOf({ roomA, roomB })),
  ).toEqual([]);
});
