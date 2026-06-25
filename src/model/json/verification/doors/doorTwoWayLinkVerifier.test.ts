import { expect, test } from "vitest";

import { addDoor, campaignOf, newRoom, runCheck } from "../testUtils";
import { type VerificationRoomId } from "../verificationTypes";
import { doorTwoWayLinkVerifier } from "./doorTwoWayLinkVerifier";

test("flags a crossed two-way link", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  const p1 = addDoor(
    roomB,
    "right",
    { toRoom: "roomA" as VerificationRoomId },
    { x: 0, y: 1, z: 0 },
  );
  const d2 = addDoor(
    roomA,
    "left",
    { toRoom: "roomB" as VerificationRoomId },
    { x: 8, y: 5, z: 0 },
  );
  const d1 = addDoor(
    roomA,
    "left",
    { toRoom: "roomB" as VerificationRoomId, toDoor: p1 },
    { x: 8, y: 1, z: 0 },
  );
  // p1 names d2 instead of d1 - the pair is crossed
  const partner = roomB.items[p1];
  if (partner.type === "door") {
    partner.config.toDoor = d2;
  }

  const issues = runCheck(doorTwoWayLinkVerifier, campaignOf({ roomA, roomB }));

  expect(issues.map((issue) => issue.itemId)).toEqual([d1]);
});

test("accepts a properly mutual two-way link", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomA, "left", { toRoom: "roomB" as VerificationRoomId });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });

  expect(
    runCheck(doorTwoWayLinkVerifier, campaignOf({ roomA, roomB })),
  ).toEqual([]);
});
