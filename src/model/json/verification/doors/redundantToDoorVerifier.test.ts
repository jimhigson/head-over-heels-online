import { expect, test } from "vitest";

import { addDoor, campaignOf, newRoom, runCheck } from "../testUtils";
import type { VerificationRoomId } from "../verificationTypes";
import { redundantToDoorVerifier } from "./redundantToDoorVerifier";

test("flags a toDoor the link would resolve to anyway", () => {
  const roomA = newRoom();
  const roomB = newRoom();
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

  expect({ itemIds: issue.itemIds, fixable: issue.fixable }).toEqual({
    itemIds: [doorId],
    fixable: true,
  });
});

test("the fix removes the redundant toDoor, clearing the issue", () => {
  const roomA = newRoom();
  const roomB = newRoom();
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
  const roomA = newRoom();
  const roomB = newRoom();
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
