import { defaultRoomHeightBlocks } from "../../../defaultRoomHeightBlocks";
import { getJsonItemTimes } from "../../../times";
import { isRoomStructureItemType } from "../../isRoomStructureItemType";
import { type JsonItemUnion } from "../../JsonItem";

/**
 * whether an item must have floor under it: anything in the room, but not the
 * room's own structure (its floors, walls and doors), nor anything at or above
 * the room's height, which is above the room rather than in it (eg framing
 * its top)
 */
export const needsFloorUnder = (
  room: { height?: number },
  item: JsonItemUnion,
): boolean =>
  !isRoomStructureItemType(item.type) &&
  item.position.z < (room.height ?? defaultRoomHeightBlocks);

/**
 * whether a one-block footprint at the given corner is over the floor at all.
 * Taking it as a whole block lets an item part-way into a doorway (where the
 * floor reaches a little further) still count as over the floor.
 */
const isBlockOverFloor = (
  floorSquares: ReadonlySet<string>,
  x: number,
  y: number,
): boolean => {
  for (let squareX = Math.floor(x); squareX < Math.ceil(x + 1); squareX++) {
    for (let squareY = Math.floor(y); squareY < Math.ceil(y + 1); squareY++) {
      if (floorSquares.has(`${squareX},${squareY}`)) {
        return true;
      }
    }
  }
  return false;
};

/**
 * whether an item is over the floor - any part of it, or for an item with
 * `times`, any part of every one of its copies. Otherwise it is out in space,
 * off the room's edge.
 */
export const isItemOverFloor = (
  /**
   * the room's floor squares, as given by `floorSquares`
   */
  floorSquares: ReadonlySet<string>,
  item: JsonItemUnion,
): boolean => {
  const times = getJsonItemTimes(item);
  const { x, y } = item.position;
  for (let copyX = 0; copyX < times.x; copyX++) {
    for (let copyY = 0; copyY < times.y; copyY++) {
      if (!isBlockOverFloor(floorSquares, x + copyX, y + copyY)) {
        return false;
      }
    }
  }
  return true;
};
