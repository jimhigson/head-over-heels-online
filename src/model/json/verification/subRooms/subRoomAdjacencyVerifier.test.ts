import { expect, test } from "vitest";

import { campaignOf, newRoom, runCheck, setSubRoomCell } from "../testUtils";
import { subRoomAdjacencyVerifier } from "./subRoomAdjacencyVerifier";

const dividedRoom = (id: string): ReturnType<typeof newRoom> =>
  newRoom(id, {
    gridPositions: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  });

test("flags cells that are grid-adjacent but physically apart", () => {
  const roomA = dividedRoom("roomA");
  // move cell 1 away physically while it stays grid-adjacent to cell 0
  setSubRoomCell(roomA, "1", {
    physicalPosition: { from: { x: 20, y: 0 }, to: { x: 28, y: 8 } },
  });

  const [issue] = runCheck(subRoomAdjacencyVerifier, campaignOf({ roomA }));

  expect({ severity: issue.severity, roomId: issue.roomId }).toEqual({
    severity: "warning",
    roomId: "roomA",
  });
});

test("accepts a normally-divided room", () => {
  const roomA = dividedRoom("roomA");

  expect(runCheck(subRoomAdjacencyVerifier, campaignOf({ roomA }))).toEqual([]);
});
