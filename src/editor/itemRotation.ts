import { floorSquares } from "../model/json/verification/helpers/roomPerimeter";
import { flippedMirrorOrientation } from "../model/MirrorOrientation";
import { getJsonItemTimes } from "../model/times";
import { unitVectors } from "../utils/vectors/unitVectors";
import {
  alongAxisOfDirectionXy,
  perpendicularAxisXy,
  rotateDirectionXy4,
  rotateDirectionXy8,
  type Xyz,
} from "../utils/vectors/vectors";
import {
  type EditorJsonItem,
  type EditorJsonItemUnion,
  type EditorRoomJson,
} from "./editorTypes";
import { directionForItem, setItemDirectionInPlace } from "./itemDirection";

export type RotationSense = "anticlockwise" | "clockwise";

/**
 * whether the editor can rotate this item - a mirror (flips orientation) or any
 * item with a settable facing direction (lamp, monster, movingPlatform,
 * sceneryPlayer). Matches what the direction/orientation context menus cover.
 */
export const isRotatable = (item: EditorJsonItemUnion): boolean => {
  if (item.type === "mirror" || item.type === "wall") {
    return true;
  }
  if (item.type === "barrier" || item.type === "conveyor") {
    // these can only rotate while a single block in the xy plane - rotating a
    // multi-block run would change its footprint. z extent doesn't matter:
    const times = getJsonItemTimes(item);
    return times.x <= 1 && times.y <= 1;
  }
  return directionForItem(item) !== undefined;
};

/**
 * rotate one item's facing a quarter-turn, mutating its config in place. Shared
 * by the room-selection reducer and the item-tool reducer. No-op for items with
 * no rotatable facing.
 */
export const rotateItemInPlace = (
  item: EditorJsonItemUnion,
  sense: RotationSense,
): void => {
  if (!isRotatable(item)) {
    // includes multi-block-in-plane barriers/conveyors, which can't rotate:
    return;
  }
  if (item.type === "mirror") {
    // a mirror plane is 180°-symmetric, so a quarter-turn either way is a flip:
    item.config.orientation = flippedMirrorOrientation(item.config.orientation);
    return;
  }
  if (item.type === "barrier") {
    // a barrier runs along one horizontal axis; a quarter-turn swaps it to the
    // other - two states, like a mirror:
    item.config.axis = item.config.axis === "x" ? "y" : "x";
    return;
  }
  if (item.type === "conveyor" || item.type === "wall") {
    item.config.direction = rotateDirectionXy4(item.config.direction, sense);
    return;
  }
  const itemDirection = directionForItem(item);
  if (itemDirection === undefined) {
    return;
  }
  // turn by one step of the item's own granularity: scenery players face all
  // eight directions so turn 45° (one octant); 4-way items turn 90° (two):
  const octants = itemDirection.supported.length === 8 ? 1 : 2;
  setItemDirectionInPlace(
    item,
    rotateDirectionXy8(itemDirection.current, sense, octants),
  );
};

/**
 * where a wall's run starts after a quarter-turn about its middle: it swaps to
 * the other axis, centred on the same point (rounded the same way both ways,
 * so turning back puts it back)
 */
const wallPositionAfterQuarterTurn = ({
  position,
  config: { direction, tiles },
}: EditorJsonItem<"wall">): Xyz => {
  const alongAxis = alongAxisOfDirectionXy(unitVectors[direction]);
  const acrossAxis = perpendicularAxisXy(alongAxis);
  const halfLength = Math.floor(tiles.length / 2);
  return {
    ...position,
    [alongAxis]: position[alongAxis] + halfLength,
    [acrossAxis]: position[acrossAxis] - halfLength,
  };
};

/**
 * whether a wall stands on the room's floor along its whole length, with
 * floor on both sides of it - rather than on the room's edge
 */
const wallStandsOnFloor = (
  roomFloorSquares: ReadonlySet<string>,
  { position, config: { direction, tiles } }: EditorJsonItem<"wall">,
): boolean => {
  const alongAxis = alongAxisOfDirectionXy(unitVectors[direction]);
  return tiles.every((_tile, i) =>
    [-1, 0].every((side) =>
      roomFloorSquares.has(
        alongAxis === "x" ?
          `${position.x + i},${position.y + side}`
        : `${position.x + side},${position.y + i}`,
      ),
    ),
  );
};

/**
 * whether an item in a room can be rotated where it is: as `isRotatable`, but
 * walls only where they stand on the floor, before and after turning - a wall
 * on the room's edge is part of its perimeter
 */
export const isPlacedItemRotatable = (
  roomJson: EditorRoomJson,
  item: EditorJsonItemUnion,
): boolean => {
  if (!isRotatable(item)) {
    return false;
  }
  if (item.type !== "wall") {
    return true;
  }
  const roomFloorSquares = floorSquares(roomJson);
  return (
    wallStandsOnFloor(roomFloorSquares, item) &&
    wallStandsOnFloor(roomFloorSquares, {
      ...item,
      position: wallPositionAfterQuarterTurn(item),
      config: {
        ...item.config,
        direction: rotateDirectionXy4(item.config.direction, "clockwise"),
      },
    })
  );
};

/**
 * rotate an item in a room a quarter-turn: as `rotateItemInPlace`, and for a
 * wall also moves its run round its middle
 */
export const rotatePlacedItemInPlace = (
  item: EditorJsonItemUnion,
  sense: RotationSense,
): void => {
  if (item.type === "wall") {
    item.position = wallPositionAfterQuarterTurn(item);
  }
  rotateItemInPlace(item, sense);
};
