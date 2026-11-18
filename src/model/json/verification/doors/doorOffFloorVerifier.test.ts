import { expect, test } from "vitest";

import { addDoor, campaignOf, newRoom, runCheck } from "../testUtils";
import { type VerificationRoomId } from "../verificationTypes";
import { doorOffFloorVerifier } from "./doorOffFloorVerifier";

test("flags a door hanging half off the end of the floor", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  // the floor is 8 long in y, so a door at y=7 covers y=7 and y=8:
  const doorId = addDoor(
    roomA,
    "right",
    { toRoom: "roomB" as VerificationRoomId },
    { x: 0, y: 7, z: 0 },
  );

  const [issue] = runCheck(doorOffFloorVerifier, campaignOf({ roomA, roomB }));

  expect({ severity: issue.severity, itemId: issue.itemId }).toEqual({
    severity: "error",
    itemId: doorId,
  });
});

test("flags a door on a wall line away from the floor's edge", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  const doorId = addDoor(
    roomA,
    "left",
    { toRoom: "roomB" as VerificationRoomId },
    { x: 10, y: 3, z: 0 },
  );

  const [issue] = runCheck(doorOffFloorVerifier, campaignOf({ roomA, roomB }));

  expect(issue.itemId).toEqual(doorId);
});

test.for([
  { direction: "towards", position: { x: 3, y: 0, z: 0 } },
  { direction: "away", position: { x: 3, y: 8, z: 0 } },
  { direction: "right", position: { x: 0, y: 3, z: 0 } },
  { direction: "left", position: { x: 8, y: 6, z: 0 } },
] as const)(
  "accepts a $direction door beside the floor",
  ({ direction, position }) => {
    const roomA = newRoom("roomA");
    const roomB = newRoom("roomB");
    addDoor(
      roomA,
      direction,
      { toRoom: "roomB" as VerificationRoomId },
      position,
    );

    expect(
      runCheck(doorOffFloorVerifier, campaignOf({ roomA, roomB })),
    ).toEqual([]);
  },
);
