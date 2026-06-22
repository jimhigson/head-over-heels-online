import { expect, test } from "vitest";

import { campaignOf, newRoom, runCheck, setWholeRoomCell } from "./testUtils";
import { type VerificationRoomId } from "./verificationTypes";
import { verticalLinkBadSubRoomVerifier } from "./verticalLinkBadSubRoomVerifier";

test("flags a link naming a sub-room that the target doesn't have", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  setWholeRoomCell(roomA, {
    below: { room: "roomB" as VerificationRoomId, subRoom: "ghost" },
  });

  const [issue] = runCheck(
    verticalLinkBadSubRoomVerifier,
    campaignOf({ roomA, roomB }),
  );

  expect({ severity: issue.severity, roomId: issue.roomId }).toEqual({
    severity: "error",
    roomId: "roomA",
  });
});

test("accepts a link naming a real sub-room of the target", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB", {
    gridPositions: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  });
  setWholeRoomCell(roomA, {
    below: { room: "roomB" as VerificationRoomId, subRoom: "0" },
  });

  expect(
    runCheck(verticalLinkBadSubRoomVerifier, campaignOf({ roomA, roomB })),
  ).toEqual([]);
});
