import { expect, test } from "vitest";

import { doorRoomMissingVerifier } from "./doorRoomMissingVerifier";
import { addDoor, campaignOf, newRoom, runCheck } from "./testUtils";
import { type VerificationRoomId } from "./verificationTypes";

test("flags a door whose toRoom isn't a room in the campaign", () => {
  const roomA = newRoom("roomA");
  const doorId = addDoor(roomA, "left", {
    toRoom: "ghost" as VerificationRoomId,
  });

  const issues = runCheck(doorRoomMissingVerifier, campaignOf({ roomA }));

  expect(issues.map((issue) => issue.itemId)).toEqual([doorId]);
});

test("accepts a door to a real room", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomA, "left", { toRoom: "roomB" as VerificationRoomId });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });

  expect(
    runCheck(doorRoomMissingVerifier, campaignOf({ roomA, roomB })),
  ).toEqual([]);
});
