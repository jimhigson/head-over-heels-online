import { expect, test } from "vitest";

import { addItem, campaignOf, newRoom, runCheck } from "../testUtils";
import { type VerificationRoomId } from "../verificationTypes";
import { teleporterLandingUnresolvableVerifier } from "./teleporterLandingUnresolvableVerifier";

const teleporter = (
  toRoom: string,
  position = { x: 1, y: 1, z: 0 },
  toItemId?: string,
) => ({
  type: "teleporter" as const,
  config: {
    toRoom: toRoom as VerificationRoomId,
    ...(toItemId !== undefined ? { toItemId } : {}),
  },
  position,
});

test("flags a teleporter to a room with no teleporter to land on", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addItem(roomA, "tp", teleporter("roomB"));

  const [issue] = runCheck(
    teleporterLandingUnresolvableVerifier,
    campaignOf({ roomA, roomB }),
  );

  expect(issue.itemId).toBe("tp");
});

test("flags a teleporter to a room with several teleporters", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addItem(roomA, "tp", teleporter("roomB"));
  addItem(roomB, "one", teleporter("roomA"));
  addItem(roomB, "two", teleporter("roomA", { x: 3, y: 3, z: 0 }));

  expect(
    runCheck(
      teleporterLandingUnresolvableVerifier,
      campaignOf({ roomA, roomB }),
    ).length,
  ).toBeGreaterThan(0);
});

test("accepts a teleporter naming which of several teleporters to land on", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addItem(roomA, "tp", teleporter("roomB", undefined, "one"));
  addItem(roomB, "one", teleporter("roomA"));
  addItem(roomB, "two", teleporter("roomA", { x: 3, y: 3, z: 0 }, "tp"));

  expect(
    runCheck(
      teleporterLandingUnresolvableVerifier,
      campaignOf({ roomA, roomB }),
    ),
  ).toEqual([]);
});

test("leaves a missing toItemId to its own verifier", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addItem(roomA, "tp", teleporter("roomB", undefined, "ghost"));

  expect(
    runCheck(
      teleporterLandingUnresolvableVerifier,
      campaignOf({ roomA, roomB }),
    ),
  ).toEqual([]);
});

test("a same-room teleporter lands on the room's other teleporter", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "tp", teleporter("roomA"));
  addItem(roomA, "other", teleporter("roomA", { x: 3, y: 3, z: 0 }));

  expect(
    runCheck(teleporterLandingUnresolvableVerifier, campaignOf({ roomA })),
  ).toEqual([]);
});
