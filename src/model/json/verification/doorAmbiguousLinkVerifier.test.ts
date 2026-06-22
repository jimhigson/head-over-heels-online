import { expect, test } from "vitest";

import { doorAmbiguousLinkVerifier } from "./doorAmbiguousLinkVerifier";
import { addDoor, campaignOf, newRoom, runCheck } from "./testUtils";
import { type VerificationRoomId } from "./verificationTypes";

test("flags a no-toDoor door with two matching doors back", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  const doorId = addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
  });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });

  const issues = runCheck(
    doorAmbiguousLinkVerifier,
    campaignOf({ roomA, roomB }),
  );

  expect(issues.map((issue) => issue.itemId)).toEqual([doorId]);
});

test("accepts when a toDoor disambiguates", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });
  const back = addDoor(roomB, "right", {
    toRoom: "roomA" as VerificationRoomId,
  });
  addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: back,
  });

  expect(
    runCheck(doorAmbiguousLinkVerifier, campaignOf({ roomA, roomB })),
  ).toEqual([]);
});
