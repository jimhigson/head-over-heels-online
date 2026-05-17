import { describe, expect, test } from "vitest";

import { roomJsonItemsIterable } from "../../../../model/RoomJson";
import {
  type DirectionXy4,
  type Xy,
  type Xyz,
} from "../../../../utils/vectors/vectors";
import { makeRoomJsonWithDoors } from "./makeRoomJsonWithDoors";

const origin: Xyz = { x: 0, y: 0, z: 0 };

const roomSizes: Xy[] = [
  { x: 8, y: 8 },
  { x: 2, y: 8 },
  { x: 8, y: 2 },
];

const doorCombinations: DirectionXy4[][] = [
  ["right"],
  ["towards"],
  ["left"],
  ["away"],
  ["right", "towards"],
  ["right", "away"],
  ["right", "left"],
  ["towards", "away"],
  ["towards", "left"],
  ["away", "left"],
];

const countWallsByDirection = (
  roomJson: ReturnType<typeof makeRoomJsonWithDoors>,
) => {
  const counts: Record<DirectionXy4, number> = {
    right: 0,
    towards: 0,
    left: 0,
    away: 0,
  };
  for (const item of roomJsonItemsIterable(roomJson)) {
    if (item.type === "wall") {
      counts[item.config.direction]++;
    }
  }
  return counts;
};

describe.for(roomSizes)("makeRoomJsonWithDoors size %j", (size) => {
  describe.for(doorCombinations)("doors: %j", (directions) => {
    test("wall counts per direction", () => {
      const roomJson = makeRoomJsonWithDoors(origin, size, directions, 0);
      const wallCounts = countWallsByDirection(roomJson);

      for (const dir of ["right", "towards", "left", "away"] as const) {
        const hasDoorOnThisSide = directions.includes(dir);
        const wallLength = dir === "right" || dir === "left" ? size.y : size.x;

        if (hasDoorOnThisSide && wallLength === 2) {
          expect(wallCounts[dir]).toBe(0);
        } else if (hasDoorOnThisSide) {
          expect(wallCounts[dir]).toBe(2);
        } else {
          expect(wallCounts[dir]).toBe(1);
        }
      }
    });
  });
});
