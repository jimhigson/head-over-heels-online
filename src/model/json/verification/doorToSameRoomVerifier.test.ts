import { expect, test } from "vitest";

import { doorToSameRoomVerifier } from "./doorToSameRoomVerifier";
import { addDoor, campaignOf, newRoom, runCheck } from "./testUtils";
import { type VerificationRoomId } from "./verificationTypes";

test("flags a door pointing at its own room", () => {
  const roomA = newRoom("roomA");
  const doorId = addDoor(roomA, "left", {
    toRoom: "roomA" as VerificationRoomId,
  });

  const issues = runCheck(doorToSameRoomVerifier, campaignOf({ roomA }));

  expect(issues.map((issue) => issue.itemId)).toEqual([doorId]);
});

test("accepts a door pointing at another room", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomA, "left", { toRoom: "roomB" as VerificationRoomId });

  expect(
    runCheck(doorToSameRoomVerifier, campaignOf({ roomA, roomB })),
  ).toEqual([]);
});
