import { expect, test } from "vitest";

import {
  candidatePartnerDoors,
  doorLinkNeedsToDoor,
} from "./candidatePartnerDoors";
import { addDoor, campaignOf, newRoom } from "./verification/testUtils";
import { type VerificationRoomId } from "./verification/verificationTypes";

const roomB = "b" as VerificationRoomId;
const roomA = "a" as VerificationRoomId;

test("no door comes back, so a toDoor is not needed", () => {
  const a = newRoom("a");
  const b = newRoom("b");
  addDoor(a, "left", { toRoom: roomB });

  const { rooms } = campaignOf({ a, b });

  expect(doorLinkNeedsToDoor(rooms, roomA, roomB, "left")).toBe(false);
});

test("exactly one door comes back, so a toDoor is redundant (not needed)", () => {
  const a = newRoom("a");
  const b = newRoom("b");
  addDoor(a, "left", { toRoom: roomB });
  addDoor(b, "right", { toRoom: roomA });

  const { rooms } = campaignOf({ a, b });

  expect(candidatePartnerDoors(rooms, roomA, roomB, "left")).toHaveLength(1);
  expect(doorLinkNeedsToDoor(rooms, roomA, roomB, "left")).toBe(false);
});

test("more than one door comes back, so a toDoor is needed to disambiguate", () => {
  const a = newRoom("a");
  const b = newRoom("b");
  addDoor(a, "left", { toRoom: roomB });
  addDoor(b, "right", { toRoom: roomA });
  addDoor(b, "right", { toRoom: roomA });

  const { rooms } = campaignOf({ a, b });

  expect(candidatePartnerDoors(rooms, roomA, roomB, "left")).toHaveLength(2);
  expect(doorLinkNeedsToDoor(rooms, roomA, roomB, "left")).toBe(true);
});

test("a door in the wrong direction is not a candidate partner", () => {
  const a = newRoom("a");
  const b = newRoom("b");
  addDoor(a, "left", { toRoom: roomB });
  // a door back to a, but on a perpendicular wall - not an opposite-direction match
  addDoor(b, "towards", { toRoom: roomA });

  const { rooms } = campaignOf({ a, b });

  expect(candidatePartnerDoors(rooms, roomA, roomB, "left")).toHaveLength(0);
});
