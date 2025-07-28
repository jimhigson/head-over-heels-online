import { consolidateItemsMap } from "../consolidateItems/consolidateItems";
import type { JsonItem } from "../model/json/JsonItem";
import type { RoomJsonItems } from "../model/RoomJson";
import { iterateRoomJsonItems, type RoomJson } from "../model/RoomJson";
import type { Wall } from "../sprites/planets";
import { wallTiles, type SceneryName } from "../sprites/planets";
import { keyItems } from "../utils/keyItems";
import type { Xy } from "../utils/vectors/vectors";
import {
  tangentAxis,
  perpendicularAxisXy,
  type DirectionXy4,
} from "../utils/vectors/vectors";

const rotatingScenery = <S extends SceneryName>(
  sceneryName: S,
  n: number,
): Wall<S> => {
  const walls = wallTiles[sceneryName];
  return walls[n % walls.length];
};

/** create a new copy of a room, with walls added on all perimeters where there are not doors */
export const addPerimeterWallsToRoom = <
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName,
>(
  roomJson: RoomJson<RoomId, RoomItemId, ScN>,
): RoomJson<RoomId, RoomItemId, ScN> => {
  const wallBlocks: JsonItem<"wall", RoomId, RoomItemId>[] = [];

  const isDoorAt = (coord: Xy, direction: DirectionXy4) => {
    const axis = tangentAxis(direction);
    const crossAxis = perpendicularAxisXy(axis);
    return iterateRoomJsonItems(roomJson).some(
      (item) =>
        item.type === "door" &&
        item.config.direction === direction &&
        (item.position[crossAxis] === coord[crossAxis] ||
          item.position[crossAxis] + 1 === coord[crossAxis]) &&
        item.position[axis] === coord[axis],
    );
  };

  // going to assume there is only one floor in the room:
  const floor = iterateRoomJsonItems(roomJson).find((i) => i.type === "floor");
  if (floor === undefined) {
    throw new Error("No floor found in room to add perimeter walls to");
  }
  const floorSize = floor.config.times;

  // side towards/away
  for (let x = 0; x < floorSize.x; x++) {
    for (const y of [0, floorSize.y]) {
      const direction = y === 0 ? "towards" : "away";

      // adds lots of single-block walls (but multi-block runs of fewer walls)
      // - to be consolidated below
      if (!isDoorAt({ x, y }, direction)) {
        wallBlocks.push({
          type: "wall",
          config: {
            direction,
            tiles: y === 0 ? [] : [rotatingScenery(roomJson.planet, x)],
          },
          position: { x, y, z: 0 },
        });
      }
    }
  }
  // side left/right
  for (let y = 0; y < floorSize.y; y++) {
    for (const x of [0, floorSize.x]) {
      const direction = x === 0 ? "right" : "left";

      if (!isDoorAt({ x, y }, direction)) {
        wallBlocks.push({
          type: "wall",
          config: {
            direction,
            tiles: x === 0 ? [] : [rotatingScenery(roomJson.planet, y)],
          },
          position: { x, y, z: 0 },
        });
      }
    }
  }

  const wallRuns = consolidateItemsMap(keyItems(wallBlocks)) as RoomJsonItems<
    RoomItemId,
    RoomId
  >;

  const roomJsonClone = structuredClone(roomJson);

  roomJsonClone.items = {
    ...roomJsonClone.items,
    ...wallRuns,
  };

  return roomJsonClone;
};
