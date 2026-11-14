import { expect, test } from "vitest";

import {
  type EditorJsonItem,
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "./editorTypes";
import {
  isPlacedItemRotatable,
  isRotatable,
  rotatePlacedItemInPlace,
} from "./itemRotation";

const at0 = { x: 0, y: 0, z: 0 };

const rotatableItems: ReadonlyArray<[string, EditorJsonItemUnion]> = [
  [
    "mirror",
    { type: "mirror", config: { orientation: "awayLeft" }, position: at0 },
  ],
  [
    "lamp",
    {
      type: "lamp",
      config: { direction: "towards", activated: true },
      position: at0,
    },
  ],
  [
    "monster",
    {
      type: "monster",
      config: {
        which: "cyberman",
        activated: "on",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
      },
      position: at0,
    },
  ],
  [
    "movingPlatform",
    {
      type: "movingPlatform",
      config: {
        movement: "back-forth",
        activated: "on",
        startDirection: "away",
      },
      position: at0,
    },
  ],
  [
    "sceneryPlayer",
    {
      type: "sceneryPlayer",
      config: { which: "head", startDirection: "awayRight" },
      position: at0,
    },
  ],
  // single-block-in-plane conveyors/barriers rotate; a tall (z) extent is fine:
  [
    "conveyor",
    { type: "conveyor", config: { direction: "left" }, position: at0 },
  ],
  ["barrier", { type: "barrier", config: { axis: "x" }, position: at0 }],
  [
    "wall",
    {
      type: "wall",
      config: { direction: "away", tiles: ["plain", "plain"] },
      position: at0,
    },
  ],
  [
    "tall barrier",
    { type: "barrier", config: { axis: "x", times: { z: 3 } }, position: at0 },
  ],
];

const notRotatableItems: ReadonlyArray<[string, EditorJsonItemUnion]> = [
  ["block", { type: "block", config: { style: "artificial" }, position: at0 }],
  // multi-block-in-plane barriers/conveyors can't rotate without changing their footprint:
  [
    "multi-block conveyor",
    {
      type: "conveyor",
      config: { direction: "left", times: { x: 3 } },
      position: at0,
    },
  ],
  [
    "wide barrier",
    { type: "barrier", config: { axis: "x", times: { x: 2 } }, position: at0 },
  ],
];

test.for(rotatableItems)("isRotatable is true for %s", ([, item]) => {
  expect(isRotatable(item)).toBe(true);
});

test.for(notRotatableItems)("isRotatable is false for %s", ([, item]) => {
  expect(isRotatable(item)).toBe(false);
});

const roomWithWall = (wall: EditorJsonItem<"wall">): EditorRoomJson => ({
  id: "room" as EditorRoomId,
  planet: "blacktooth",
  color: { hue: "cyan", shade: "basic" },
  items: {
    ["f" as EditorRoomItemId]: {
      type: "floor",
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 8 },
      },
      position: at0,
    },
    ["w" as EditorRoomItemId]: wall,
  },
});

test("a wall standing on the floor turns a quarter about its middle", () => {
  const wall: EditorJsonItem<"wall"> = {
    type: "wall",
    config: { direction: "away", tiles: ["plain", "plain", "plain"] },
    position: { x: 2, y: 4, z: 0 },
  };
  rotatePlacedItemInPlace(wall, "clockwise");

  expect(wall).toEqual<EditorJsonItem<"wall">>({
    type: "wall",
    // the run along x from 2 to 5 becomes a run along y from 3 to 6, both
    // through (3, 4):
    config: { direction: "right", tiles: ["plain", "plain", "plain"] },
    position: { x: 3, y: 3, z: 0 },
  });
});

test("turning a wall back puts it back", () => {
  const original: EditorJsonItem<"wall"> = {
    type: "wall",
    config: { direction: "away", tiles: ["plain", "plain", "plain"] },
    position: { x: 2, y: 4, z: 0 },
  };
  const wall = structuredClone(original);
  rotatePlacedItemInPlace(wall, "clockwise");
  rotatePlacedItemInPlace(wall, "anticlockwise");

  expect(wall).toEqual(original);
});

test("a wall standing on the floor can be rotated in the room", () => {
  const wall: EditorJsonItem<"wall"> = {
    type: "wall",
    config: { direction: "away", tiles: ["plain", "plain", "plain"] },
    position: { x: 2, y: 4, z: 0 },
  };

  expect(isPlacedItemRotatable(roomWithWall(wall), wall)).toBe(true);
});

test("a wall on the room's edge can't be rotated in the room", () => {
  const wall: EditorJsonItem<"wall"> = {
    type: "wall",
    config: { direction: "away", tiles: Array(8).fill("plain") },
    position: { x: 0, y: 8, z: 0 },
  };

  expect(isPlacedItemRotatable(roomWithWall(wall), wall)).toBe(false);
});

test("a wall on the floor that would turn off its edge can't be rotated in the room", () => {
  const wall: EditorJsonItem<"wall"> = {
    type: "wall",
    config: { direction: "away", tiles: Array(6).fill("plain") },
    position: { x: 0, y: 2, z: 0 },
  };

  expect(isPlacedItemRotatable(roomWithWall(wall), wall)).toBe(false);
});
