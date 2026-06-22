import { expect, test } from "vitest";

import { campaignOf, newRoom, runCheck, setSubRoomCell } from "../testUtils";
import { subRoomFloorCoverageVerifier } from "./subRoomFloorCoverageVerifier";

const dividedRoom = (id: string): ReturnType<typeof newRoom> =>
  newRoom(id, {
    gridPositions: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  });

test("flags floor squares left outside every sub-room, once per room", () => {
  const roomA = dividedRoom("roomA");
  // shrink the first cell so squares x=4..7 fall outside both cells
  setSubRoomCell(roomA, "0", {
    physicalPosition: { from: { x: 0, y: 0 }, to: { x: 4, y: 8 } },
  });

  const [issue, ...rest] = runCheck(
    subRoomFloorCoverageVerifier,
    campaignOf({ roomA }),
  );

  expect({
    severity: issue.severity,
    roomId: issue.roomId,
    extra: rest.length,
  }).toEqual({ severity: "warning", roomId: "roomA", extra: 0 });
});

test("accepts a divided room whose cells cover the whole floor", () => {
  const roomA = dividedRoom("roomA");

  expect(runCheck(subRoomFloorCoverageVerifier, campaignOf({ roomA }))).toEqual(
    [],
  );
});

test("ignores undivided rooms", () => {
  const roomA = newRoom("roomA");

  expect(runCheck(subRoomFloorCoverageVerifier, campaignOf({ roomA }))).toEqual(
    [],
  );
});
