import { expect, test } from "vitest";

import { nonContiguousMirrorVerifier } from "./nonContiguousMirrorVerifier";
import { campaignOf, newRoom, runCheck, setWholeRoomCell } from "./testUtils";
import { type VerificationRoomId } from "./verificationTypes";

test("flags a relationship pointing at a room not in the campaign", () => {
  const roomA = newRoom("roomA");
  setWholeRoomCell(roomA, {
    nonContiguousRelationship: {
      with: { room: "ghost" as VerificationRoomId },
      gridOffset: { x: 1, y: 0, z: 0 },
    },
  });

  const [issue] = runCheck(nonContiguousMirrorVerifier, campaignOf({ roomA }));

  expect({ severity: issue.severity, roomId: issue.roomId }).toEqual({
    severity: "warning",
    roomId: "roomA",
  });
});

test("flags a relationship the partner doesn't mirror back", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  setWholeRoomCell(roomA, {
    nonContiguousRelationship: {
      with: { room: "roomB" as VerificationRoomId },
      gridOffset: { x: 1, y: 0, z: 0 },
    },
  });

  const [issue] = runCheck(
    nonContiguousMirrorVerifier,
    campaignOf({ roomA, roomB }),
  );

  expect(issue.msg).toContain("isn't mirrored back");
});

test("accepts a pair of rooms with mirrored relationships", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  setWholeRoomCell(roomA, {
    nonContiguousRelationship: {
      with: { room: "roomB" as VerificationRoomId },
      gridOffset: { x: 1, y: 0, z: 0 },
    },
  });
  setWholeRoomCell(roomB, {
    nonContiguousRelationship: {
      with: { room: "roomA" as VerificationRoomId },
      gridOffset: { x: -1, y: 0, z: 0 },
    },
  });

  expect(
    runCheck(nonContiguousMirrorVerifier, campaignOf({ roomA, roomB })),
  ).toEqual([]);
});
