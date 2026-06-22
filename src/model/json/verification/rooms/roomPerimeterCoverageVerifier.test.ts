import { expect, test } from "vitest";

import { iterateRoomJsonItemsWithIds } from "../../../RoomJson";
import { campaignOf, newRoom, runCheck } from "../testUtils";
import { roomPerimeterCoverageVerifier } from "./roomPerimeterCoverageVerifier";

test("flags a room with a hole in its perimeter", () => {
  const roomA = newRoom("roomA");
  // remove one perimeter wall, leaving an open edge
  const [[wallId]] = iterateRoomJsonItemsWithIds(roomA.items, "wall").toArray();
  delete roomA.items[wallId];

  const [issue] = runCheck(
    roomPerimeterCoverageVerifier,
    campaignOf({ roomA }),
  );

  expect({ severity: issue.severity, roomId: issue.roomId }).toEqual({
    severity: "warning",
    roomId: "roomA",
  });
});

test("accepts a room with a complete perimeter", () => {
  const roomA = newRoom("roomA");

  expect(
    runCheck(roomPerimeterCoverageVerifier, campaignOf({ roomA })),
  ).toEqual([]);
});
