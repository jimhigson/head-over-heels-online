import { expect, test } from "vitest";

import {
  addDoor,
  addPlayer,
  campaignOf,
  newRoom,
  runCheck,
} from "../testUtils";
import type { VerificationRoomId } from "../verificationTypes";
import { unreachableRoomVerifier } from "./unreachableRoomVerifier";

test("flags a room not connected to the start room", () => {
  const roomA = newRoom();
  const roomB = newRoom();
  const roomC = newRoom();
  addPlayer(roomA, "head");
  addDoor(roomA, "left", { toRoom: "roomB" as VerificationRoomId });

  const [issue] = runCheck(
    unreachableRoomVerifier,
    campaignOf({ roomA, roomB, roomC }),
  );

  expect({ severity: issue.severity, roomId: issue.roomId }).toEqual({
    severity: "warning",
    roomId: "roomC",
  });
});

test("accepts a campaign where every room is reachable", () => {
  const roomA = newRoom();
  const roomB = newRoom();
  addPlayer(roomA, "head");
  addDoor(roomA, "left", { toRoom: "roomB" as VerificationRoomId });

  expect(
    runCheck(unreachableRoomVerifier, campaignOf({ roomA, roomB })),
  ).toEqual([]);
});

test("stays silent when there's no start room at all", () => {
  const roomA = newRoom();
  const roomB = newRoom();

  expect(
    runCheck(unreachableRoomVerifier, campaignOf({ roomA, roomB })),
  ).toEqual([]);
});
