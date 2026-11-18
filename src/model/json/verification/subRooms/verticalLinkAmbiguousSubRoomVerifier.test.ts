import { expect, test } from "vitest";

import {
  campaignOf,
  newRoom,
  runCheck,
  setSubRoomCell,
  setWholeRoomCell,
} from "../testUtils";
import { type VerificationRoomId } from "../verificationTypes";
import { verticalLinkAmbiguousSubRoomVerifier } from "./verticalLinkAmbiguousSubRoomVerifier";

test("flags a link naming no sub-room of a room with two sub-rooms linking back", () => {
  const roomAbove = newRoom("roomAbove");
  const roomBelow = newRoom("roomBelow", {
    gridPositions: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  });
  setWholeRoomCell(roomAbove, {
    below: { room: "roomBelow" as VerificationRoomId },
  });
  setSubRoomCell(roomBelow, "0", {
    above: { room: "roomAbove" as VerificationRoomId },
  });
  setSubRoomCell(roomBelow, "1", {
    above: { room: "roomAbove" as VerificationRoomId },
  });

  const issues = runCheck(
    verticalLinkAmbiguousSubRoomVerifier,
    campaignOf({ roomAbove, roomBelow }),
  );

  expect(issues.map(({ severity, roomId }) => ({ severity, roomId }))).toEqual([
    { severity: "error", roomId: "roomAbove" },
  ]);
});

test("accepts links naming the sub-room they lead to", () => {
  const roomAbove = newRoom("roomAbove", {
    gridPositions: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  });
  const roomBelow = newRoom("roomBelow", {
    gridPositions: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  });
  for (const cellId of ["0", "1"]) {
    setSubRoomCell(roomAbove, cellId, {
      below: { room: "roomBelow" as VerificationRoomId, subRoom: cellId },
    });
    setSubRoomCell(roomBelow, cellId, {
      above: { room: "roomAbove" as VerificationRoomId, subRoom: cellId },
    });
  }

  expect(
    runCheck(
      verticalLinkAmbiguousSubRoomVerifier,
      campaignOf({ roomAbove, roomBelow }),
    ),
  ).toEqual([]);
});

test("accepts a link naming no sub-room of a room with one sub-room linking back", () => {
  const roomAbove = newRoom("roomAbove");
  const roomBelow = newRoom("roomBelow");
  setWholeRoomCell(roomAbove, {
    below: { room: "roomBelow" as VerificationRoomId },
  });
  setWholeRoomCell(roomBelow, {
    above: { room: "roomAbove" as VerificationRoomId },
  });

  expect(
    runCheck(
      verticalLinkAmbiguousSubRoomVerifier,
      campaignOf({ roomAbove, roomBelow }),
    ),
  ).toEqual([]);
});
