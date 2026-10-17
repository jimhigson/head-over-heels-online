import { expect, test } from "vitest";

import { roomJsonItemsIterable } from "../../../RoomJsonItemIterators";
import { addDoor, campaignOf, newRoom, runCheck } from "../testUtils";
import { type VerificationRoomId } from "../verificationTypes";
import { doorNoReturnVerifier } from "./doorNoReturnVerifier";

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

test("the fix adds a door back on the facing wall, cut through it", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(
    roomA,
    "away",
    { toRoom: "roomB" as VerificationRoomId },
    { x: 3, y: 8, z: 0 },
  );
  const campaign = campaignOf({ roomA, roomB });
  const [issue] = runCheck(doorNoReturnVerifier, campaign);

  expect(
    roomJsonItemsIterable(
      issue.verifier.fix(campaign, issue.issueData).rooms.roomB,
      "door",
      "wall",
    )
      .map((item) =>
        item.type === "door" ?
          `door ${item.config.direction} at ${item.position.x},${item.position.y}`
        : `wall ${item.config.direction} at ${item.position.x},${item.position.y} ×${item.config.tiles.length}`,
      )
      .toArray()
      .sort(),
  ).toMatchInlineSnapshot(`
    [
      "door towards at 3,0",
      "wall away at 0,8 ×8",
      "wall left at 8,0 ×8",
      "wall right at 0,0 ×8",
      "wall towards at 0,0 ×3",
      "wall towards at 5,0 ×3",
    ]
  `);
});

test("after the fix, the door has a way back", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(
    roomA,
    "away",
    { toRoom: "roomB" as VerificationRoomId },
    { x: 3, y: 8, z: 0 },
  );
  const campaign = campaignOf({ roomA, roomB });
  const [issue] = runCheck(doorNoReturnVerifier, campaign);

  expect(
    runCheck(
      doorNoReturnVerifier,
      issue.verifier.fix(campaign, issue.issueData),
    ),
  ).toEqual([]);
});
