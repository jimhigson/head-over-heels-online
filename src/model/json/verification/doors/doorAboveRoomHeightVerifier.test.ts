import { expect, test } from "vitest";

import { addDoor, campaignOf, newRoom, runCheck } from "../testUtils";
import { type VerificationRoomId } from "../verificationTypes";
import { doorAboveRoomHeightVerifier } from "./doorAboveRoomHeightVerifier";

test("flags a door at or above the default room height", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  const doorId = addDoor(
    roomA,
    "left",
    { toRoom: "roomB" as VerificationRoomId },
    { x: 0, y: 3, z: 10 },
  );

  const [issue] = runCheck(
    doorAboveRoomHeightVerifier,
    campaignOf({ roomA, roomB }),
  );

  expect({ severity: issue.severity, itemId: issue.itemId }).toEqual({
    severity: "error",
    itemId: doorId,
  });
});

test("the fix raises the room height so the door fits, clearing the issue", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(
    roomA,
    "left",
    { toRoom: "roomB" as VerificationRoomId },
    { x: 0, y: 3, z: 10 },
  );
  const campaign = campaignOf({ roomA, roomB });

  const [issue] = runCheck(doorAboveRoomHeightVerifier, campaign);
  expect(issue.fixable).toBe(true);

  const fixed = issue.verifier.fix(campaign, issue.issueData);
  expect(fixed.rooms.roomA.height).toBe(11);
  expect(runCheck(doorAboveRoomHeightVerifier, fixed)).toEqual([]);
});

test("accepts a door below the room height", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomA, "left", { toRoom: "roomB" as VerificationRoomId });

  expect(
    runCheck(doorAboveRoomHeightVerifier, campaignOf({ roomA, roomB })),
  ).toEqual([]);
});
