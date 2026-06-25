import { expect, test } from "vitest";

import { campaignOf, newRoom, runCheck, setSubRoomCell } from "../testUtils";
import { subRoomInvertedExtentVerifier } from "./subRoomInvertedExtentVerifier";

const dividedRoom = (id: string): ReturnType<typeof newRoom> =>
  newRoom(id, {
    gridPositions: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  });

test("flags a sub-room whose extent is inverted", () => {
  const roomA = dividedRoom("roomA");
  setSubRoomCell(roomA, "0", {
    physicalPosition: { from: { x: 8, y: 0 }, to: { x: 0, y: 8 } },
  });

  const [issue] = runCheck(
    subRoomInvertedExtentVerifier,
    campaignOf({ roomA }),
  );

  expect({ severity: issue.severity, roomId: issue.roomId }).toEqual({
    severity: "error",
    roomId: "roomA",
  });
});

test("accepts a normally-divided room", () => {
  const roomA = dividedRoom("roomA");

  expect(
    runCheck(subRoomInvertedExtentVerifier, campaignOf({ roomA })),
  ).toEqual([]);
});
