import { expect, test } from "vitest";

import { keys } from "../../../../utils/entries";
import { roomJsonItemsIterable } from "../../../RoomJsonItemIterators";
import { nowhereRoomId } from "../../ItemConfigMap";
import { addDoor, campaignOf, newRoom, runCheck } from "../testUtils";
import {
  type VerificationCampaign,
  type VerificationRoomId,
} from "../verificationTypes";
import { doorNoReturnVerifier } from "./doorNoReturnVerifier";
import { doorRoomMissingVerifier } from "./doorRoomMissingVerifier";

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

/** roomA, with a door on its away wall leading to `toRoom`, which isn't a room */
const campaignWithDoorTo = (toRoom: string) => {
  const roomA = newRoom("roomA");
  const doorId = addDoor(
    roomA,
    "away",
    { toRoom: toRoom as VerificationRoomId },
    { x: 3, y: 8, z: 0 },
  );
  return { campaign: campaignOf({ roomA }), doorId };
};

const fixed = (campaign: VerificationCampaign) => {
  const [issue] = runCheck(doorRoomMissingVerifier, campaign);
  return issue.verifier.fix(campaign, issue.issueData);
};

test("a door to nowhere is fixable", () => {
  const { campaign } = campaignWithDoorTo(nowhereRoomId);

  expect(
    runCheck(doorRoomMissingVerifier, campaign).map(({ fixable }) => fixable),
  ).toEqual([true]);
});

test("the fix gives a door to nowhere a new room of its own", () => {
  const { campaign, doorId } = campaignWithDoorTo(nowhereRoomId);

  expect(fixed(campaign).rooms.roomA.items[doorId].config).toEqual({
    direction: "away",
    toRoom: "room_0",
  });
});

test("the fix creates a missing named room", () => {
  const { campaign } = campaignWithDoorTo("ghost");

  expect(keys(fixed(campaign).rooms)).toEqual(["roomA", "ghost"]);
});

test("the fix gives the new room a door back, on the facing wall", () => {
  const { campaign } = campaignWithDoorTo(nowhereRoomId);

  expect(
    roomJsonItemsIterable(fixed(campaign).rooms.room_0, "door").toArray(),
  ).toEqual([
    {
      type: "door",
      position: { x: 3, y: 0, z: 0 },
      config: { toRoom: "roomA", direction: "towards" },
    },
  ]);
});

test("after the fix, no door issues remain", () => {
  const { campaign } = campaignWithDoorTo(nowhereRoomId);
  const fixedCampaign = fixed(campaign);

  expect(
    [doorRoomMissingVerifier, doorNoReturnVerifier].flatMap((verifier) =>
      runCheck(verifier, fixedCampaign),
    ),
  ).toEqual([]);
});

test("a door further along the wall than the new room is wide gets its door back moved onto the wall", () => {
  const roomA = newRoom("roomA", { size: { x: 16, y: 8 } });
  addDoor(roomA, "away", { toRoom: nowhereRoomId }, { x: 12, y: 8, z: 0 });
  const campaign = campaignOf({ roomA });
  const [issue] = runCheck(doorRoomMissingVerifier, campaign);

  expect(
    roomJsonItemsIterable(
      issue.verifier.fix(campaign, issue.issueData).rooms.room_0,
      "door",
    )
      .map(({ position }) => position)
      .toArray(),
  ).toEqual([{ x: 6, y: 0, z: 0 }]);
});
