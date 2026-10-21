import { expect, test } from "vitest";

import { subRoomById, type SubRooms } from "../../../RoomJson";
import { type CampaignVerifier } from "../CampaignVerification";
import { dividedCells } from "../helpers/subRoomGeometry";
import { subRoomAdjacencyVerifier } from "../subRooms/subRoomAdjacencyVerifier";
import { subRoomInvertedExtentVerifier } from "../subRooms/subRoomInvertedExtentVerifier";
import {
  addDoor,
  campaignOf,
  newRoom,
  runCheck,
  setSubRoomCell,
  setWholeRoomCell,
} from "../testUtils";
import { type VerificationRoomId } from "../verificationTypes";
import { mapGeometryVerifier } from "./mapGeometryVerifier";
import { subRoomsFitFloorVerifier } from "./subRoomsFitFloorVerifier";

/** run the check, then apply the fix for every issue it found */
const fixAll = (campaign: ReturnType<typeof campaignOf>) =>
  runCheck(subRoomsFitFloorVerifier, campaign).reduce(
    (fixed, { issueData }) => subRoomsFitFloorVerifier.fix(fixed, issueData),
    campaign,
  );

test.for([
  { x: 13, y: 8 },
  { x: 8, y: 13 },
  { x: 14, y: 8 },
])("flags an undivided $x×$y room", (size) => {
  const roomA = newRoom("roomA", { size });

  expect(
    runCheck(subRoomsFitFloorVerifier, campaignOf({ roomA })).map(
      ({ roomId, fixable }) => ({ roomId, fixable }),
    ),
  ).toEqual([{ roomId: "roomA", fixable: true }]);
});

test("accepts a 12×12 room as one map cell", () => {
  const roomA = newRoom("roomA", { size: { x: 12, y: 12 } });

  expect(runCheck(subRoomsFitFloorVerifier, campaignOf({ roomA }))).toEqual([]);
});

test("flags an oversized room with only a whole-room sub-room", () => {
  const roomA = newRoom("roomA", { size: { x: 14, y: 8 } });
  setWholeRoomCell(roomA, { above: { room: "roomB" } });

  expect(
    runCheck(subRoomsFitFloorVerifier, campaignOf({ roomA })),
  ).toHaveLength(1);
});

test("ignores an oversized room that is already divided", () => {
  const roomA = newRoom("roomA", {
    gridPositions: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  });

  expect(runCheck(subRoomsFitFloorVerifier, campaignOf({ roomA }))).toEqual([]);
});

test("fix divides a 14×8 room into two side-by-side sub-rooms", () => {
  const roomA = newRoom("roomA", { size: { x: 14, y: 8 } });

  expect<SubRooms<VerificationRoomId> | undefined>(
    fixAll(campaignOf({ roomA })).rooms.roomA.meta?.subRooms,
  ).toEqual<SubRooms<VerificationRoomId>>({
    "0": {
      gridPosition: { x: 0, y: 0 },
      physicalPosition: { from: { x: 0, y: 0 }, to: { x: 7, y: 8 } },
    },
    "1": {
      gridPosition: { x: 1, y: 0 },
      physicalPosition: { from: { x: 7, y: 0 }, to: { x: 14, y: 8 } },
    },
  });
});

test("fix splits an uneven span into near-equal sub-rooms", () => {
  const roomA = newRoom("roomA", { size: { x: 8, y: 25 } });

  expect(
    dividedCells(fixAll(campaignOf({ roomA })).rooms.roomA)
      .map(
        ({
          cell: {
            physicalPosition: { from, to },
          },
        }) => [from.y, to.y],
      )
      .toArray(),
  ).toEqual([
    [0, 8],
    [8, 17],
    [17, 25],
  ]);
});

test("fix moves whole-room links onto the first sub-room", () => {
  const roomA = newRoom("roomA", { size: { x: 14, y: 8 } });
  setWholeRoomCell(roomA, { above: { room: "roomB" } });

  expect(
    subRoomById(fixAll(campaignOf({ roomA })).rooms.roomA, "0"),
  ).toMatchObject({ above: { room: "roomB" } });
});

test("fix leaves nothing for the check to flag", () => {
  const roomA = newRoom("roomA", { size: { x: 14, y: 25 } });

  expect(
    runCheck(subRoomsFitFloorVerifier, fixAll(campaignOf({ roomA }))),
  ).toEqual([]);
});

/**
 * a 14×8 room joined by two doors on its far side to a 14×12 room - the second
 * room's 12 depth fits one map row, so both doors meet it on the same row
 */
const twoWideRoomsJoinedByTwoDoors = () => {
  const roomA = newRoom("roomA", { size: { x: 14, y: 8 } });
  const roomB = newRoom("roomB", { size: { x: 14, y: 12 } });
  const nearDoorB = addDoor(
    roomB,
    "right",
    { toRoom: "roomA" },
    { x: 0, y: 1, z: 0 },
  );
  const farDoorB = addDoor(
    roomB,
    "right",
    { toRoom: "roomA" },
    { x: 0, y: 8, z: 0 },
  );
  const nearDoorA = addDoor(
    roomA,
    "left",
    { toRoom: "roomB", toDoor: nearDoorB },
    { x: 14, y: 0, z: 0 },
  );
  const farDoorA = addDoor(
    roomA,
    "left",
    { toRoom: "roomB", toDoor: farDoorB },
    { x: 14, y: 6, z: 0 },
  );
  for (const [doorB, doorA] of [
    [nearDoorB, nearDoorA],
    [farDoorB, farDoorA],
  ]) {
    const partnerDoor = roomB.items[doorB];
    if (partnerDoor.type === "door") {
      partnerDoor.config.toDoor = doorA;
    }
  }
  return campaignOf({ roomA, roomB });
};

test.for<[string, CampaignVerifier<unknown>]>([
  ["sub-room adjacency", subRoomAdjacencyVerifier],
  ["sub-room inverted extent", subRoomInvertedExtentVerifier],
  ["map geometry", mapGeometryVerifier],
])("fixed rooms pass the %s verifier", ([, verifier]) => {
  expect(runCheck(verifier, fixAll(twoWideRoomsJoinedByTwoDoors()))).toEqual(
    [],
  );
});

test("flags floor squares left outside every sub-room, once per room", () => {
  const roomA = newRoom("roomA", {
    gridPositions: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  });
  // shrink the first cell so squares x=4..7 fall outside both cells
  setSubRoomCell(roomA, "0", {
    physicalPosition: { from: { x: 0, y: 0 }, to: { x: 4, y: 8 } },
  });

  expect(
    runCheck(subRoomsFitFloorVerifier, campaignOf({ roomA })).map(
      ({ severity, roomId, fixable }) => ({ severity, roomId, fixable }),
    ),
  ).toEqual([{ severity: "warning", roomId: "roomA", fixable: true }]);
});

test("fix divides the floor afresh between sub-rooms that form a grid, keeping their links", () => {
  const roomA = newRoom("roomA", {
    gridPositions: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  });
  setSubRoomCell(roomA, "0", {
    physicalPosition: { from: { x: 0, y: 0 }, to: { x: 4, y: 8 } },
    above: { room: "roomB" as VerificationRoomId },
  });

  expect(subRoomById(fixAll(campaignOf({ roomA })).rooms.roomA, "0")).toEqual({
    gridPosition: { x: 0, y: 0 },
    physicalPosition: { from: { x: 0, y: 0 }, to: { x: 8, y: 8 } },
    above: { room: "roomB" },
  });
});

test("fix leaves no floor outside the sub-rooms", () => {
  const roomA = newRoom("roomA", {
    gridPositions: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  });
  setSubRoomCell(roomA, "0", {
    physicalPosition: { from: { x: 0, y: 0 }, to: { x: 4, y: 8 } },
  });

  expect(
    runCheck(subRoomsFitFloorVerifier, fixAll(campaignOf({ roomA }))),
  ).toEqual([]);
});

test("can't fix floor outside sub-rooms that aren't a grid of the size the floor needs", () => {
  const roomA = newRoom("roomA", {
    gridPositions: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ],
  });
  setSubRoomCell(roomA, "0", {
    physicalPosition: { from: { x: 0, y: 0 }, to: { x: 4, y: 8 } },
  });

  expect(
    runCheck(subRoomsFitFloorVerifier, campaignOf({ roomA })).map(
      ({ fixable }) => fixable,
    ),
  ).toEqual([false]);
});

test("accepts a divided room whose sub-rooms cover the whole floor", () => {
  const roomA = newRoom("roomA", {
    gridPositions: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  });

  expect(runCheck(subRoomsFitFloorVerifier, campaignOf({ roomA }))).toEqual([]);
});
