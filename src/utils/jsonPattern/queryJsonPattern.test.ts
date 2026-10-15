import { expect, test } from "vitest";

import { queryJsonPattern } from "./queryJsonPattern";

const items = {
  door1: {
    type: "door",
    position: { x: 0, y: 3, z: 0 },
    config: { toRoom: "room_2" },
  },
  door2: {
    type: "door",
    position: { x: 7, y: 3, z: 0 },
    config: { toRoom: "room_3" },
  },
  skiHead1: {
    type: "monster",
    position: { x: 2, y: 2, z: 1 },
    config: { which: "skiHead" },
  },
  wall: {
    type: "wall",
    position: { x: 0, y: 0, z: 0 },
    config: { tiles: ["a", "b"] },
  },
};

test.for<[string, Record<string, unknown>]>([
  ["door1", { door1: items.door1 }],
  ["door*", { door1: items.door1, door2: items.door2 }],
  ["[type=monster]", { skiHead1: items.skiHead1 }],
  ["[config.which=skiHead]", { skiHead1: items.skiHead1 }],
  [
    "[type=door].config.toRoom",
    { "door1.config.toRoom": "room_2", "door2.config.toRoom": "room_3" },
  ],
  [
    "*.position.z",
    {
      "door1.position.z": 0,
      "door2.position.z": 0,
      "skiHead1.position.z": 1,
      "wall.position.z": 0,
    },
  ],
  ["[position.z=1]", { skiHead1: items.skiHead1 }],
  ["wall.config.tiles.1", { "wall.config.tiles.1": "b" }],
  ["nothing", {}],
])("%s", ([pattern, expected]) => {
  expect(queryJsonPattern(items, pattern)).toEqual(expected);
});
