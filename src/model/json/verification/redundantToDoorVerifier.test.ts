import { expect, test } from "vitest";

import { redundantToDoorVerifier } from "./redundantToDoorVerifier";
import { addDoor, campaignOf, newRoom, runCheck } from "./testUtils";
import { type VerificationRoomId } from "./verificationTypes";

test("flags a toDoor the link would resolve to anyway", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  const back = addDoor(roomB, "right", {
    toRoom: "roomA" as VerificationRoomId,
  });
  const doorId = addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: back,
  });

  const [issue] = runCheck(
    redundantToDoorVerifier,
    campaignOf({ roomA, roomB }),
  );

  expect({ itemId: issue.itemId, fixable: issue.fixable }).toEqual({
    itemId: doorId,
    fixable: true,
  });
});

test("the fix removes the redundant toDoor, clearing the issue", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  const back = addDoor(roomB, "right", {
    toRoom: "roomA" as VerificationRoomId,
  });
  addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: back,
  });
  const campaign = campaignOf({ roomA, roomB });

  const [issue] = runCheck(redundantToDoorVerifier, campaign);
  const fixed = issue.verifier.fix(campaign, issue.issueData);

  expect(runCheck(redundantToDoorVerifier, fixed)).toEqual([]);
});

test("accepts a toDoor that is needed (two doors back)", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });
  const back2 = addDoor(roomB, "right", {
    toRoom: "roomA" as VerificationRoomId,
  });
  addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: back2,
  });

  expect(
    runCheck(redundantToDoorVerifier, campaignOf({ roomA, roomB })),
  ).toEqual([]);
});
