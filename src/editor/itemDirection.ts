import {
  type LiftDirection,
  liftDirections,
} from "../model/json/ItemConfigMap";
import { getJsonItemTimes } from "../model/times";
import {
  directionsXy4,
  directionsXy8,
  type DirectionXy8,
  type DirectionXyz8,
  oppositeDirection,
  tangentAxis,
} from "../utils/vectors/vectors";
import type { EditorJsonItemUnion } from "./editorTypes";
import { swapItemTimesXyInPlace } from "./swapItemTimesXyInPlace";

export type ItemDirection =
  | {
      /**
       * a direction on the xy plane, which turns with the item
       */
      type: "facingOnXyPlane";
      /** which config field stores this item's facing */
      field: "direction" | "startDirection";
      /**
       * the directions this item can face (4-way, or 8-way for sceneryPlayers, or
       * for a conveyor longer than a block only its own and the opposite)
       */
      supported: readonly DirectionXy8[];
      /** the direction the item currently faces */
      current: DirectionXy8;
    }
  | {
      /**
       * up or down - a lift's start direction
       */
      type: "liftUpOrDown";
      field: "startDirection";
      supported: readonly LiftDirection[];
      current: LiftDirection;
    };

/**
 * describe how an item stores a settable direction - the monster's
 * `startDirection`, the lamp's beam `direction`, the conveyor's `direction`, the
 * lift's up or down `startDirection` - or undefined for item types with no
 * editable direction.
 */
export const directionForItem = (
  item: EditorJsonItemUnion,
): ItemDirection | undefined => {
  if (item.type === "lift") {
    return {
      type: "liftUpOrDown",
      field: "startDirection",
      supported: liftDirections,
      current: item.config.startDirection ?? "up",
    };
  }
  if ("startDirection" in item.config) {
    return {
      type: "facingOnXyPlane",
      field: "startDirection",
      supported: item.type === "sceneryPlayer" ? directionsXy8 : directionsXy4,
      current: item.config.startDirection,
    };
  }
  if (item.type === "lamp") {
    return {
      type: "facingOnXyPlane",
      field: "direction",
      supported: directionsXy4,
      current: item.config.direction,
    };
  }
  if (item.type === "conveyor") {
    const {
      config: { direction },
    } = item;
    const { x: timesX, y: timesY } = getJsonItemTimes(item);
    const reversedDirection = oppositeDirection(direction);
    return {
      type: "facingOnXyPlane",
      field: "direction",
      supported:
        timesX === 1 && timesY === 1 ?
          directionsXy4
          // a longer run can only reverse and stay in the same footprint:
        : directionsXy4.filter(
            (candidate) =>
              candidate === direction || candidate === reversedDirection,
          ),
      current: direction,
    };
  }
  return undefined;
};

/**
 * set an item's direction, writing whichever config field it uses.
 * No-op for item types with no editable direction. The menu only offers
 * directions valid for the item, so writing past the per-item direction type
 * is safe. A conveyor turned onto the other axis takes its times with it.
 */
export const setItemDirectionInPlace = (
  item: EditorJsonItemUnion,
  direction: DirectionXyz8,
): void => {
  const itemDirection = directionForItem(item);
  if (itemDirection === undefined) {
    return;
  }
  const maybeConveyorAxisBefore =
    item.type === "conveyor" ? tangentAxis(item.config.direction) : undefined;
  (item.config as Record<"direction" | "startDirection", DirectionXyz8>)[
    itemDirection.field
  ] = direction;
  if (
    item.type === "conveyor" &&
    tangentAxis(item.config.direction) !== maybeConveyorAxisBefore
  ) {
    swapItemTimesXyInPlace(item);
  }
};
