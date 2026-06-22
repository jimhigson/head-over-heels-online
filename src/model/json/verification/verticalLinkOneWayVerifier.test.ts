import { expect, test } from "vitest";

import { campaignOf, newRoom, runCheck, setWholeRoomCell } from "./testUtils";
import { type VerificationRoomId } from "./verificationTypes";
import { verticalLinkOneWayVerifier } from "./verticalLinkOneWayVerifier";

test("flags a below link whose target doesn't link back up", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  setWholeRoomCell(roomA, { below: { room: "roomB" as VerificationRoomId } });

  const [issue] = runCheck(
    verticalLinkOneWayVerifier,
    campaignOf({ roomA, roomB }),
  );

  expect({ severity: issue.severity, roomId: issue.roomId }).toEqual({
    severity: "error",
    roomId: "roomA",
  });
});

test("flags a link to a room not in the campaign", () => {
  const roomA = newRoom("roomA");
  setWholeRoomCell(roomA, { above: { room: "ghost" as VerificationRoomId } });

  const [issue] = runCheck(verticalLinkOneWayVerifier, campaignOf({ roomA }));

  expect(issue.msg).toContain("isn't a room in this campaign");
});

test("accepts a pair of rooms that link to each other", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  setWholeRoomCell(roomA, { below: { room: "roomB" as VerificationRoomId } });
  setWholeRoomCell(roomB, { above: { room: "roomA" as VerificationRoomId } });

  expect(
    runCheck(verticalLinkOneWayVerifier, campaignOf({ roomA, roomB })),
  ).toEqual([]);
});
