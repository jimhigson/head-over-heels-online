import { expect, test } from "vitest";

import { campaignOf, newRoom, runCheck, setSubRoomCell } from "../testUtils";
import { type VerificationRoomId } from "../verificationTypes";
import { verticalLinkCollisionVerifier } from "./verticalLinkCollisionVerifier";

const dividedRoom = (id: string): ReturnType<typeof newRoom> =>
  newRoom(id, {
    gridPositions: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  });

test("flags two sub-rooms that link above to the same place", () => {
  const roomA = dividedRoom("roomA");
  setSubRoomCell(roomA, "0", {
    above: { room: "roomC" as VerificationRoomId },
  });
  setSubRoomCell(roomA, "1", {
    above: { room: "roomC" as VerificationRoomId },
  });

  const [issue] = runCheck(
    verticalLinkCollisionVerifier,
    campaignOf({ roomA }),
  );

  expect({ severity: issue.severity, roomId: issue.roomId }).toEqual({
    severity: "error",
    roomId: "roomA",
  });
});

test("accepts sub-rooms with distinct vertical targets", () => {
  const roomA = dividedRoom("roomA");
  setSubRoomCell(roomA, "0", {
    above: { room: "roomB" as VerificationRoomId },
  });
  setSubRoomCell(roomA, "1", {
    above: { room: "roomC" as VerificationRoomId },
  });

  expect(
    runCheck(verticalLinkCollisionVerifier, campaignOf({ roomA })),
  ).toEqual([]);
});
