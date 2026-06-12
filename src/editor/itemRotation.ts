import { flippedMirrorOrientation } from "../model/MirrorOrientation";
import { getJsonItemTimes } from "../model/times";
import {
  rotateDirectionXy4,
  rotateDirectionXy8,
} from "../utils/vectors/vectors";
import { type EditorJsonItemUnion } from "./editorTypes";
import { directionForItem, setItemDirectionInPlace } from "./itemDirection";

export type RotationSense = "anticlockwise" | "clockwise";

/**
 * whether the editor can rotate this item - a mirror (flips orientation) or any
 * item with a settable facing direction (lamp, monster, movingPlatform,
 * sceneryPlayer). Matches what the direction/orientation context menus cover.
 */
export const isRotatable = (item: EditorJsonItemUnion): boolean => {
  if (item.type === "mirror") {
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
  if (item.type === "conveyor") {
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
