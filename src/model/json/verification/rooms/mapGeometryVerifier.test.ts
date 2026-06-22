import { expect, test } from "vitest";

import { campaignOf, newRoom, runCheck, setWholeRoomCell } from "../testUtils";
import { type VerificationRoomId } from "../verificationTypes";
import { mapGeometryVerifier } from "./mapGeometryVerifier";

const ncrTo = (
  room: string,
  gridOffset: { x: number; y: number; z: number },
) => ({
  nonContiguousRelationship: {
    with: { room: room as VerificationRoomId },
    gridOffset,
  },
});

test("flags two cells placed at the same grid position", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  // a zero offset stacks roomB exactly on top of roomA
  setWholeRoomCell(roomA, ncrTo("roomB", { x: 0, y: 0, z: 0 }));

  const [issue] = runCheck(mapGeometryVerifier, campaignOf({ roomA, roomB }));

  expect({ severity: issue.severity, msg: issue.msg }).toEqual({
    severity: "error",
    msg: "‘roomA’ and ‘roomB’ occupy the same position on the map grid",
  });
});

test("flags a relationship that contradicts the grid layout", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  // roomB sits one step right of roomA, but links back as if one step away
  setWholeRoomCell(roomA, ncrTo("roomB", { x: 1, y: 0, z: 0 }));
  setWholeRoomCell(roomB, ncrTo("roomA", { x: 0, y: 1, z: 0 }));

  const issues = runCheck(mapGeometryVerifier, campaignOf({ roomA, roomB }));

  expect(issues.some((issue) => issue.severity === "error")).toBe(true);
});

test("accepts a consistently-mirrored layout", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  setWholeRoomCell(roomA, ncrTo("roomB", { x: 1, y: 0, z: 0 }));
  setWholeRoomCell(roomB, ncrTo("roomA", { x: -1, y: 0, z: 0 }));

  expect(runCheck(mapGeometryVerifier, campaignOf({ roomA, roomB }))).toEqual(
    [],
  );
});
