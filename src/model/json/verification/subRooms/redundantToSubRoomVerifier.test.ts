import { expect, test } from "vitest";

import { addDoor, campaignOf, newRoom, runCheck } from "../testUtils";
import { type VerificationRoomId } from "../verificationTypes";
import { redundantToSubRoomVerifier } from "./redundantToSubRoomVerifier";

const roomBWithReturnDoorInSubRoom1 = () => {
  const roomB = newRoom("roomB", {
    gridPositions: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  });
  addDoor(
    roomB,
    "towards",
    { toRoom: "roomA" as VerificationRoomId },
    {
      x: 11,
      y: 0,
      z: 0,
    },
  );
  return roomB;
};

test("flags a toSubRoom pointing at an undivided room", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  const doorId = addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toSubRoom: "x",
  });

  const [issue] = runCheck(
    redundantToSubRoomVerifier,
    campaignOf({ roomA, roomB }),
  );

  expect({ itemId: issue.itemId, fixable: issue.fixable }).toEqual({
    itemId: doorId,
    fixable: true,
  });
});

test("the fix removes the redundant toSubRoom, clearing the issue", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toSubRoom: "x",
  });
  const campaign = campaignOf({ roomA, roomB });

  const [issue] = runCheck(redundantToSubRoomVerifier, campaign);
  const fixed = issue.verifier.fix(campaign, issue.issueData);

  expect(runCheck(redundantToSubRoomVerifier, fixed)).toEqual([]);
});

test("accepts a door without a toSubRoom", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomA, "left", { toRoom: "roomB" as VerificationRoomId });

  expect(
    runCheck(redundantToSubRoomVerifier, campaignOf({ roomA, roomB })),
  ).toEqual([]);
});

test("flags a toSubRoom naming the sub-room its partner door is in", () => {
  const roomA = newRoom("roomA");
  const doorId = addDoor(
    roomA,
    "away",
    { toRoom: "roomB" as VerificationRoomId, toSubRoom: "1" },
    { x: 3, y: 8, z: 0 },
  );

  const [issue] = runCheck(
    redundantToSubRoomVerifier,
    campaignOf({ roomA, roomB: roomBWithReturnDoorInSubRoom1() }),
  );

  expect({
    itemId: issue.itemId,
    severity: issue.severity,
    fixable: issue.fixable,
  }).toEqual({ itemId: doorId, severity: "warning", fixable: true });
});

test("the fix removes the inferable toSubRoom, clearing the issue", () => {
  const roomA = newRoom("roomA");
  addDoor(
    roomA,
    "away",
    { toRoom: "roomB" as VerificationRoomId, toSubRoom: "1" },
    { x: 3, y: 8, z: 0 },
  );
  const campaign = campaignOf({
    roomA,
    roomB: roomBWithReturnDoorInSubRoom1(),
  });

  const [issue] = runCheck(redundantToSubRoomVerifier, campaign);
  const fixed = issue.verifier.fix(campaign, issue.issueData);

  expect(runCheck(redundantToSubRoomVerifier, fixed)).toEqual([]);
});

test("accepts a toSubRoom that disagrees with its partner door", () => {
  const roomA = newRoom("roomA");
  addDoor(
    roomA,
    "away",
    { toRoom: "roomB" as VerificationRoomId, toSubRoom: "0" },
    { x: 3, y: 8, z: 0 },
  );

  expect(
    runCheck(
      redundantToSubRoomVerifier,
      campaignOf({ roomA, roomB: roomBWithReturnDoorInSubRoom1() }),
    ),
  ).toEqual([]);
});

test("accepts a toSubRoom when there is no partner door", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB", {
    gridPositions: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  });
  addDoor(
    roomA,
    "away",
    { toRoom: "roomB" as VerificationRoomId, toSubRoom: "1" },
    { x: 3, y: 8, z: 0 },
  );

  expect(
    runCheck(redundantToSubRoomVerifier, campaignOf({ roomA, roomB })),
  ).toEqual([]);
});
