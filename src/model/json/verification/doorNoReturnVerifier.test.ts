import { expect, test } from "vitest";

import { doorNoReturnVerifier } from "./doorNoReturnVerifier";
import { addDoor, campaignOf, newRoom, runCheck } from "./testUtils";
import { type VerificationRoomId } from "./verificationTypes";

test("flags a door whose destination has no door back", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  const doorId = addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
  });

  const issues = runCheck(doorNoReturnVerifier, campaignOf({ roomA, roomB }));

  expect(issues.map((issue) => issue.itemId)).toEqual([doorId]);
});

test("accepts a door that has a return door", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomA, "left", { toRoom: "roomB" as VerificationRoomId });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });

  expect(runCheck(doorNoReturnVerifier, campaignOf({ roomA, roomB }))).toEqual(
    [],
  );
});
