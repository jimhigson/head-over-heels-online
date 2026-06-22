import {
  type DirectionXy4,
  perpendicularAxisXy,
  tangentAxis,
  type Xy,
} from "../../../../utils/vectors/vectors";
import { type RoomJson, roomJsonItemsIterable } from "../../../RoomJson";
import { wallTimes } from "../../../times";
import { type VerificationRoomId } from "../verificationTypes";

/** the campaign rooms carry plain-`string` item ids, so stay generic over them */
type RoomWithItems<RoomItemId extends string> = Pick<
  RoomJson<VerificationRoomId, RoomItemId>,
  "items"
>;

const doorWidth = 2;

/** the set of "x,y" floor squares in a room (expanding floor `times`) */
export const floorSquares = <RoomItemId extends string>(
  room: RoomWithItems<RoomItemId>,
): Set<string> => {
  const squares = new Set<string>();
  for (const item of roomJsonItemsIterable(room)) {
    if (item.type !== "floor") {
      continue;
    }
    const timesX = item.config.times?.x ?? 1;
    const timesY = item.config.times?.y ?? 1;
    for (let dx = 0; dx < timesX; dx++) {
      for (let dy = 0; dy < timesY; dy++) {
        squares.add(`${item.position.x + dx},${item.position.y + dy}`);
      }
    }
  }
  return squares;
};

type PerimeterCover = {
  direction: DirectionXy4;
  position: Xy;
  /** how many squares the wall/door spans along its own axis */
  length: number;
};

const wallAndDoorCovers = <RoomItemId extends string>(
  room: RoomWithItems<RoomItemId>,
): PerimeterCover[] => {
  const covers: PerimeterCover[] = [];
  for (const item of roomJsonItemsIterable(room)) {
    if (item.type !== "wall" && item.type !== "door") {
      continue;
    }
    const { direction } = item.config;
    const alongAxis = perpendicularAxisXy(tangentAxis(direction));
    const length =
      item.type === "door" ?
        doorWidth
      : (wallTimes(item.config)[alongAxis] ?? 1);
    covers.push({ direction, position: item.position, length });
  }
  return covers;
};

const isCovered = (
  covers: PerimeterCover[],
  direction: DirectionXy4,
  coord: Xy,
): boolean => {
  const dirAxis = tangentAxis(direction);
  const alongAxis = perpendicularAxisXy(dirAxis);
  return covers.some((cover) => {
    if (
      cover.direction !== direction ||
      cover.position[dirAxis] !== coord[dirAxis]
    ) {
      return false;
    }
    const start = cover.position[alongAxis];
    return coord[alongAxis] >= start && coord[alongAxis] < start + cover.length;
  });
};

export type PerimeterEdge = { x: number; y: number; direction: DirectionXy4 };

/**
 * every floor-square edge that borders empty space without a wall or door
 * covering it - ie the gaps in the room's perimeter
 */
export const uncoveredPerimeterEdges = <RoomItemId extends string>(
  room: RoomWithItems<RoomItemId>,
): PerimeterEdge[] => {
  const floors = floorSquares(room);
  const covers = wallAndDoorCovers(room);
  const uncovered: PerimeterEdge[] = [];

  for (const key of floors) {
    const [x, y] = key.split(",").map(Number);

    const edges = [
      { direction: "towards", nx: x, ny: y - 1 },
      { direction: "away", nx: x, ny: y + 1 },
      { direction: "right", nx: x - 1, ny: y },
      { direction: "left", nx: x + 1, ny: y },
    ] as const;

    for (const { direction, nx, ny } of edges) {
      if (floors.has(`${nx},${ny}`)) {
        continue;
      }
      const wallCoord: Xy =
        direction === "towards" ? { x, y }
        : direction === "away" ? { x, y: y + 1 }
        : direction === "right" ? { x, y }
        : { x: x + 1, y };

      if (!isCovered(covers, direction, wallCoord)) {
        uncovered.push({ x, y, direction });
      }
    }
  }
  return uncovered;
};
