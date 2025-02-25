import { consolidateItems } from "../campaignXml2Json/consolidateItems/consolidateItems";
import type { JsonItem } from "../model/json/JsonItem";
import type { RoomJson } from "../model/RoomJson";
import type { Wall } from "../sprites/planets";
import { scenery, type SceneryName } from "../sprites/planets";
import { keyItems } from "../utils/keyItems";
import type { Xy } from "../utils/vectors/vectors";
import {
  directionAxis,
  perpendicularAxisXy,
  type DirectionXy4,
} from "../utils/vectors/vectors";

const rotatingScenery = <S extends SceneryName>(
  sceneryName: S,
  n: number,
): Wall<S> => {
  const { walls } = scenery[sceneryName];
  return walls[n % walls.length];
};

/** create a new copy of a room, with walls added on all perimeters where there are not doors */
export const addPerimeterWallsToRoom = <
  S extends SceneryName,
  R extends string,
>(
  roomJson: RoomJson<S, R>,
): RoomJson<S, R> => {
  const wallBlocks: JsonItem<"wall", S, R>[] = [];

  const isDoorAt = (coord: Xy, direction: DirectionXy4) => {
    const axis = directionAxis(direction);
    const crossAxis = perpendicularAxisXy(axis);
    return Object.values(roomJson.items).some(
      (item) =>
        item.type === "door" &&
        item.config.direction === direction &&
        (item.position[crossAxis] === coord[crossAxis] ||
          item.position[crossAxis] + 1 === coord[crossAxis]) &&
        item.position[axis] === coord[axis],
    );
  };

  // side towards/away
  for (let x = 0; x < roomJson.size.x; x++) {
    for (const y of [0, roomJson.size.y]) {
      const direction = y === 0 ? "towards" : "away";

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
  for (let y = 0; y < roomJson.size.y; y++) {
    for (const x of [0, roomJson.size.x]) {
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

  const wallRuns = [...consolidateItems(wallBlocks)] as JsonItem<
    "wall",
    S,
    R
  >[];

  const roomJsonClone = structuredClone(roomJson);

  roomJsonClone.items = {
    ...roomJsonClone.items,
    ...keyItems(wallRuns),
  };

  return roomJsonClone;
};
