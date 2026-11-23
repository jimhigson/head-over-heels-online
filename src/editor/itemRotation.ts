import { getConsolidatableVector } from "../consolidateItems/ConsolidatableJsonItem";
import { floorSquares } from "../model/json/verification/helpers/roomPerimeter";
import { flippedMirrorOrientation } from "../model/MirrorOrientation";
import { getJsonItemTimes, optimiseTimesXyz } from "../model/times";
import { unitVectors } from "../utils/vectors/unitVectors";
import {
  addXyz,
  alongAxisOfDirectionXy,
  originXyz,
  perpendicularAxisXy,
  rotateDirectionXy4,
  rotateDirectionXy8,
  subXyz,
  type Xy,
  type Xyz,
} from "../utils/vectors/vectors";
import type {
  EditorJsonItem,
  EditorJsonItemUnion,
  EditorJsonItemWithTimes,
  EditorRoomJson,
} from "./editorTypes";
import { directionForItem, setItemDirectionInPlace } from "./itemDirection";
import type { ItemToolItems } from "./RoomEditingArea/interactivity/Tool";

export type RotationSense = "anticlockwise" | "clockwise";

/**
 * turn an item's facing (direction, axis or orientation) a quarter-turn, in
 * place. No-op for items with no facing
 */
const rotateFacingInPlace = (
  item: EditorJsonItemUnion,
  sense: RotationSense,
): void => {
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
  // only directions on the floor's plane turn with the item:
  if (itemDirection?.type !== "facingOnXyPlane") {
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

const hasTimes = (item: EditorJsonItemUnion): item is EditorJsonItemWithTimes =>
  "times" in item.config;

const hasFacing = (item: EditorJsonItemUnion): boolean =>
  item.type === "mirror" ||
  item.type === "barrier" ||
  item.type === "conveyor" ||
  directionForItem(item)?.type === "facingOnXyPlane";

/**
 * whether the item covers more than one block in x or y - so a quarter-turn
 * swaps its x and y extents
 */
const isMultiBlockInXy = (item: EditorJsonItemUnion): boolean => {
  const { x, y } = getJsonItemTimes(item);
  return x !== 1 || y !== 1;
};

/**
 * the axes an item can take times along once turned a quarter: a barrier's
 * and a conveyor's follow their facing so swap x and y, every other item's
 * stay as they are
 */
const consolidatableAxesAfterQuarterTurn = (item: EditorJsonItemUnion): Xyz => {
  const consolidatableAxes = getConsolidatableVector(item);
  return item.type === "barrier" || item.type === "conveyor" ?
      {
        ...consolidatableAxes,
        x: consolidatableAxes.y,
        y: consolidatableAxes.x,
      }
    : consolidatableAxes;
};

/**
 * whether, once turned a quarter, the item can take its x and y times swapped
 * - eg a block can along both axes, a conveyor run along the axis its turned
 * direction runs on
 */
const timesFitAfterQuarterTurn = (item: EditorJsonItemUnion): boolean => {
  if (!isMultiBlockInXy(item)) {
    return true;
  }
  const { x: timesX, y: timesY } = getJsonItemTimes(item);
  const turnedAxes = consolidatableAxesAfterQuarterTurn(item);
  // after the swap, the item's x extent is its y extent now, and vice versa:
  return (
    (timesY === 1 || turnedAxes.x !== 0) && (timesX === 1 || turnedAxes.y !== 0)
  );
};

/**
 * whether the editor can rotate this item: a wall, or an item with a facing
 * (mirror, barrier, conveyor, lamp, monster...) or spread over more than one
 * block in x or y - whose times can be swapped once it is turned. Not a floor,
 * which is the room's structure
 */
export const isRotatable = (item: EditorJsonItemUnion): boolean => {
  if (item.type === "wall") {
    return true;
  }
  if (item.type === "floor") {
    return false;
  }
  return (
    (hasFacing(item) || isMultiBlockInXy(item)) &&
    timesFitAfterQuarterTurn(item)
  );
};

/**
 * rotate one item a quarter-turn, mutating it in place: its facing turns, and
 * its x and y times swap. Shared by the room-selection reducer and the
 * item-tool reducer. No-op for items that can't rotate
 */
export const rotateItemInPlace = (
  item: EditorJsonItemUnion,
  sense: RotationSense,
): void => {
  if (!isRotatable(item)) {
    return;
  }
  rotateFacingInPlace(item, sense);
  if (hasTimes(item) && item.config.times !== undefined) {
    const { x, y, z } = getJsonItemTimes(item);
    const swappedTimes = optimiseTimesXyz({ x: y, y: x, z });
    if (swappedTimes === undefined) {
      delete item.config.times;
    } else {
      item.config.times = swappedTimes;
    }
  }
};

/**
 * turn an xy vector a quarter-turn, the way a facing turns
 */
const rotateXyQuarterTurn = ({ x, y }: Xy, sense: RotationSense): Xy => {
  const turnedXAxis = unitVectors[rotateDirectionXy4("left", sense)];
  const turnedYAxis = unitVectors[rotateDirectionXy4("away", sense)];
  return {
    x: x * turnedXAxis.x + y * turnedYAxis.x,
    y: x * turnedXAxis.y + y * turnedYAxis.y,
  };
};

/**
 * whether the item tool's items can be rotated: a single item can if it is
 * rotatable, and several can if each either turns or has nothing to turn (one
 * block, no facing) - they all move round together
 */
export const areToolItemsRotatable = (toolItems: ItemToolItems): boolean => {
  const [firstItem] = toolItems;
  // ItemToolItem has the type, config and position that make up a json item:
  if (toolItems.length === 1) {
    return isRotatable(firstItem as EditorJsonItemUnion);
  }
  return toolItems.every((toolItem) => {
    const item = toolItem as EditorJsonItemUnion;
    return isRotatable(item) || (!hasFacing(item) && !isMultiBlockInXy(item));
  });
};

/**
 * turn the item tool's items a quarter-turn as a whole, in place: each item
 * turns as `rotateItemInPlace` does and swings round to where it goes in the
 * turned set. The first item stays where it was, so a single item still goes
 * where the tool puts down
 */
export const rotateToolItemsInPlace = (
  toolItems: ItemToolItems,
  sense: RotationSense,
): void => {
  const [firstItem] = toolItems;
  const firstItemHadNoPosition = firstItem.position === undefined;
  const firstItemPositionBefore = { ...(firstItem.position ?? originXyz) };

  for (const toolItem of toolItems) {
    const item = toolItem as EditorJsonItemUnion;
    const { x: timesX, y: timesY } = getJsonItemTimes(item);
    const { position = originXyz } = toolItem;
    const nearCorner = rotateXyQuarterTurn(position, sense);
    const farCorner = rotateXyQuarterTurn(
      { x: position.x + timesX, y: position.y + timesY },
      sense,
    );
    // the turned item's footprint starts at the lowest of its corners:
    toolItem.position = {
      ...position,
      x: Math.min(nearCorner.x, farCorner.x),
      y: Math.min(nearCorner.y, farCorner.y),
    };
    rotateItemInPlace(item, sense);
  }

  const shift = subXyz(
    firstItemPositionBefore,
    firstItem.position ?? originXyz,
  );
  for (const toolItem of toolItems) {
    toolItem.position = addXyz(toolItem.position ?? originXyz, shift);
  }
  if (firstItemHadNoPosition) {
    // still at the origin, where an item with no position goes:
    delete firstItem.position;
  }
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
 * where an item's footprint starts after a quarter-turn about its middle: its
 * x and y extents swap, centred on the same point (truncating the same both
 * ways, so turning back puts it back)
 */
const footprintPositionAfterQuarterTurn = (item: EditorJsonItemUnion): Xyz => {
  const { position } = item;
  const { x: timesX, y: timesY } = getJsonItemTimes(item);
  return {
    ...position,
    x: position.x + Math.trunc((timesX - timesY) / 2),
    y: position.y + Math.trunc((timesY - timesX) / 2),
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
  if (!isRotatable(item)) {
    return;
  }
  item.position =
    item.type === "wall" ?
      wallPositionAfterQuarterTurn(item)
    : footprintPositionAfterQuarterTurn(item);
  rotateItemInPlace(item, sense);
};
