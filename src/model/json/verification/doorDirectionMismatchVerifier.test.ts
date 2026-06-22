import { expect, test } from "vitest";

import { doorDirectionMismatchVerifier } from "./doorDirectionMismatchVerifier";
import { addDoor, campaignOf, newRoom, runCheck } from "./testUtils";
import { type VerificationRoomId } from "./verificationTypes";

test("flags a return door facing the wrong way", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomA, "left", { toRoom: "roomB" as VerificationRoomId });
  // the return door should face "right", not "left"
  addDoor(roomB, "left", { toRoom: "roomA" as VerificationRoomId });

  const issues = runCheck(
    doorDirectionMismatchVerifier,
    campaignOf({ roomA, roomB }),
  );

  expect(issues.length).toBeGreaterThan(0);
});

test("accepts a correctly-facing return door", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomA, "left", { toRoom: "roomB" as VerificationRoomId });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });

  expect(
    runCheck(doorDirectionMismatchVerifier, campaignOf({ roomA, roomB })),
  ).toEqual([]);
});
