import { consolidateItemsMap } from "../consolidateItems/consolidateItems";
import type { JsonItem } from "../model/json/JsonItem";
import type { RoomJson, RoomJsonItems } from "../model/RoomJson";
import { roomJsonFloorsExtent } from "../model/roomJsonFloorsExtent";
import { roomJsonItemsIterable } from "../model/RoomJsonItemIterators";
import { type SceneryName, type Wall, wallTiles } from "../sprites/planets";
import { keyItems } from "../utils/keyItems";
import {
  type DirectionXy4,
  perpendicularAxisXy,
  tangentAxis,
  type Xy,
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
    return roomJsonItemsIterable(roomJson).some(
      (item) =>
        item.type === "door" &&
        item.config.direction === direction &&
        (item.position[crossAxis] === coord[crossAxis] ||
          item.position[crossAxis] + 1 === coord[crossAxis]) &&
        item.position[axis] === coord[axis],
    );
  };

  // the walls go around all the floors together:
  const floorsExtent = roomJsonFloorsExtent(roomJson);
  if (floorsExtent === undefined) {
    throw new Error("No floor found in room to add perimeter walls to");
  }
  const {
    from: { x: fromX, y: fromY },
    to: { x: toX, y: toY },
  } = floorsExtent;

  // side towards/away
  for (let x = fromX; x < toX; x++) {
    for (const y of [fromY, toY]) {
      const direction = y === fromY ? "towards" : "away";

      // adds lots of single-block walls (but multi-block runs of fewer walls)
      // - to be consolidated below
      if (!isDoorAt({ x, y }, direction)) {
        wallBlocks.push({
          type: "wall",
          config: {
            direction,
            // every wall (including invisible near walls) needs a tile per block,
            // so its length - and therefore its collision - is correct:
            tiles: [rotatingScenery(roomJson.planet, x)],
          },
          position: { x, y, z: 0 },
        });
      }
    }
  }
  // side left/right
  for (let y = fromY; y < toY; y++) {
    for (const x of [fromX, toX]) {
      const direction = x === fromX ? "right" : "left";

      if (!isDoorAt({ x, y }, direction)) {
        wallBlocks.push({
          type: "wall",
          config: {
            direction,
            tiles: [rotatingScenery(roomJson.planet, y)],
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
