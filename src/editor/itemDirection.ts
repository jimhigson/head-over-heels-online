import {
  directionsXy4,
  directionsXy8,
  type DirectionXy8,
} from "../utils/vectors/vectors";
import { type EditorJsonItemUnion } from "./editorTypes";

export type ItemDirection = {
  /** which config field stores this item's facing */
  field: "direction" | "startDirection";
  /** the directions this item can face (4-way, or 8-way for sceneryPlayers) */
  supported: readonly DirectionXy8[];
  /** the direction the item currently faces */
  current: DirectionXy8;
};

/**
 * describe how an item stores a settable facing direction - the monster's
 * `startDirection`, the lamp's beam `direction` - or undefined for item types
 * with no editable direction.
 */
export const directionForItem = (
  item: EditorJsonItemUnion,
): ItemDirection | undefined => {
  if ("startDirection" in item.config) {
    return {
      field: "startDirection",
      supported: item.type === "sceneryPlayer" ? directionsXy8 : directionsXy4,
      current: item.config.startDirection,
    };
  }
  if (item.type === "lamp") {
    return {
      field: "direction",
      supported: directionsXy4,
      current: item.config.direction,
    };
  }
  return undefined;
};

/**
 * set an item's facing direction, writing whichever config field it uses.
 * No-op for item types with no editable direction. The menu only offers
 * directions valid for the item, so writing past the per-item direction type
 * is safe.
 */
export const setItemDirectionInPlace = (
  item: EditorJsonItemUnion,
  direction: DirectionXy8,
): void => {
  const itemDirection = directionForItem(item);
  if (itemDirection === undefined) {
    return;
  }
  (item.config as Record<"direction" | "startDirection", DirectionXy8>)[
    itemDirection.field
  ] = direction;
};
