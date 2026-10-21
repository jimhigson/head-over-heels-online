import { expect, test } from "vitest";

import {
  type FloorType,
  nowhereRoomId,
} from "../../../../../../model/json/ItemConfigMap";
import { roomGridPositions } from "../../../../../../model/map/roomGridPositions";
import { type RoomJson, type SubRooms } from "../../../../../../model/RoomJson";
import { type Xy } from "../../../../../../utils/vectors/vectors";
import { type MapCellOutline, mapCellOutline } from "./mapCellOutline";

type TestRoomJson = RoomJson<string, string>;

const floor = (position: Xy, times: Xy, floorType: FloorType = "standable") =>
  floorType === "standable" ?
    {
      type: "floor" as const,
      position: { ...position, z: 0 },
      config: { floorType, scenery: "blacktooth" as const, times },
    }
  : {
      type: "floor" as const,
      position: { ...position, z: 0 },
      config: { floorType, times },
    };

const cell = (gridPosition: Xy, above: boolean) => ({
  gridPosition,
  physicalPosition: {
    from: { x: gridPosition.x * 8, y: gridPosition.y * 8 },
    to: { x: (gridPosition.x + 1) * 8, y: (gridPosition.y + 1) * 8 },
  },
  ...(above && { above: { room: "roomAbove" } }),
});

const room = (
  items: TestRoomJson["items"],
  subRooms?: SubRooms<string>,
): TestRoomJson => ({
  id: "room",
  planet: "blacktooth",
  color: { hue: "cyan", shade: "basic" },
  items,
  ...(subRooms && { meta: { subRooms } }),
});

/**
 * the outline of every cell of the room, by sub-room id
 */
const outlines = (roomJson: TestRoomJson) =>
  Object.fromEntries(
    roomGridPositions({
      campaign: { rooms: { room: roomJson } },
      roomId: "room",
      skipMissingRooms: true,
    })
      .nodes.filter(({ roomId }) => roomId === "room")
      .map((node) => [node.subRoomId, mapCellOutline(roomJson, node)]),
  );

const lowSolidCell: MapCellOutline = {
  floor: "solid",
  deadlyFloor: false,
  high: false,
  awayWall: "none",
  leftWall: "none",
  backCornerPost: false,
  leftWallFrontPost: false,
  awayWallRightPost: false,
  frontPost: false,
};

const highWalledCell: MapCellOutline = {
  ...lowSolidCell,
  high: true,
  awayWall: "wall",
  leftWall: "wall",
  backCornerPost: true,
  leftWallFrontPost: true,
  awayWallRightPost: true,
  frontPost: true,
};

test("a room with nothing above is drawn flat, without walls", () => {
  expect(outlines(room({ f: floor({ x: 0, y: 0 }, { x: 8, y: 8 }) }))).toEqual({
    "*": lowSolidCell,
  });
});

test("a room with a room above is drawn tall, with its back walls and edges", () => {
  expect(
    outlines(
      room(
        { f: floor({ x: 0, y: 0 }, { x: 8, y: 8 }) },
        { "*": { above: { room: "roomAbove" } } },
      ),
    ),
  ).toEqual({ "*": highWalledCell });
});

test("a tall room's wall with a door in it is drawn with the doorway", () => {
  expect(
    outlines(
      room(
        {
          f: floor({ x: 0, y: 0 }, { x: 8, y: 8 }),
          d: {
            type: "door",
            position: { x: 3, y: 8, z: 0 },
            config: { direction: "away", toRoom: nowhereRoomId },
          },
        },
        { "*": { above: { room: "roomAbove" } } },
      ),
    ),
  ).toEqual({ "*": { ...highWalledCell, awayWall: "doorway" } });
});

test("a tall divided room has no walls or edges between its own cells", () => {
  expect(
    outlines(
      room(
        { f: floor({ x: 0, y: 0 }, { x: 16, y: 16 }) },
        {
          front: cell({ x: 0, y: 0 }, true),
          left: cell({ x: 1, y: 0 }, true),
          away: cell({ x: 0, y: 1 }, true),
          back: cell({ x: 1, y: 1 }, true),
        },
      ),
    ),
  ).toEqual({
    // open onto the room both ways at the back, walled at the front:
    front: {
      ...highWalledCell,
      awayWall: "none",
      leftWall: "none",
      backCornerPost: false,
      leftWallFrontPost: false,
      awayWallRightPost: false,
    },
    left: {
      ...highWalledCell,
      awayWall: "none",
      awayWallRightPost: false,
    },
    away: {
      ...highWalledCell,
      leftWall: "none",
      leftWallFrontPost: false,
    },
    // open onto the room both ways at the front:
    back: { ...highWalledCell, frontPost: false },
  });
});

test("only the cells of a divided room with a room above are drawn tall", () => {
  const cellOutlines = outlines(
    room(
      { f: floor({ x: 0, y: 0 }, { x: 8, y: 16 }) },
      { near: cell({ x: 0, y: 0 }, true), far: cell({ x: 0, y: 1 }, false) },
    ),
  );

  expect({
    near: cellOutlines.near?.high,
    far: cellOutlines.far,
  }).toEqual({ near: true, far: lowSolidCell });
});

test("each cell of a divided room is drawn with the floors that lie in it", () => {
  const cellOutlines = outlines(
    room(
      {
        f: floor({ x: 0, y: 0 }, { x: 8, y: 8 }),
        hole: floor({ x: 0, y: 8 }, { x: 8, y: 8 }, "none"),
        deadly: floor({ x: 0, y: 16 }, { x: 8, y: 8 }, "deadly"),
      },
      {
        solid: cell({ x: 0, y: 0 }, false),
        hole: cell({ x: 0, y: 1 }, false),
        deadly: cell({ x: 0, y: 2 }, false),
      },
    ),
  );

  expect(
    Object.fromEntries(
      Object.entries(cellOutlines).map(([id, { floor, deadlyFloor }]) => [
        id,
        { floor, deadlyFloor },
      ]),
    ),
  ).toEqual({
    solid: { floor: "solid", deadlyFloor: false },
    hole: { floor: "hole", deadlyFloor: false },
    deadly: { floor: "solid", deadlyFloor: true },
  });
});

test("a cell with only part of its floor a hole is drawn with a solid floor", () => {
  expect(
    outlines(
      room({
        f: floor({ x: 0, y: 0 }, { x: 8, y: 3 }),
        hole: floor({ x: 0, y: 3 }, { x: 8, y: 2 }, "none"),
        f2: floor({ x: 0, y: 5 }, { x: 8, y: 3 }),
      }),
    )["*"]?.floor,
  ).toBe("solid");
});
