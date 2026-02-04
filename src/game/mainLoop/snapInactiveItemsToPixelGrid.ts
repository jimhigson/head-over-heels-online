import type { Xyz } from "../../utils/vectors/vectors";
import type { MovedItems } from "./progressGameState";

import {
  iterateRoomItems,
  roomSpatialIndexKey,
  type RoomState,
} from "../../model/RoomState";
import { collisionItemWithIndex } from "../collision/aabbCollision";
import { updateItemPosition } from "../gameState/mutators/updateItemPosition";
import { type FreeItem, isFreeItem, isSolid } from "../physics/itemPredicates";

const logSnapping = 0;

/** returns the snapped position, or undefined if no snapping is needed */
export const snapFreeItemToPixelGrid = <
  RoomId extends string,
  RoomItemId extends string,
>(
  item: FreeItem<RoomId, RoomItemId>,
  roomTime: number,
): undefined | Xyz => {
  const { actedOnAt } = item.state;
  const wasActedOnThisTick = roomTime === actedOnAt.roomTime;

  // items are never snapped in Z alone - either XYZ or XY only.
  // so if XY was acted on this tick, don't snap anything
  if (wasActedOnThisTick && actedOnAt.actedInXY) {
    return undefined;
  }

  const { position } = item.state;
  const xyIsFractional =
    !Number.isInteger(position.x) || !Number.isInteger(position.y);
  const alsoSnapZ = !wasActedOnThisTick || !actedOnAt.actedInZ;
  const zIsFractional = alsoSnapZ && !Number.isInteger(position.z);

  if (!xyIsFractional && !zIsFractional) {
    return undefined;
  }

  return {
    x: Math.round(position.x),
    y: Math.round(position.y),
    z: alsoSnapZ ? Math.round(position.z) : position.z,
  };
};

/**
 * snap all items that haven't been acted on the pixel grid - sub-pixel
 * locations are only allowed while items are moving. This operates
 * per-axis: items can be snapped in XY while still moving in Z, but
 * never in Z alone (to prevent visual jitter from isolated Z snapping).
 */
export const snapInactiveItemsToPixelGrid = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
  /**
   * the items we already know moved - any that this function snaps
   * will also be added to the set
   */
  movedItems: MovedItems<RoomId, RoomItemId>,
) => {
  for (const item of iterateRoomItems(room.items)) {
    if (!isFreeItem(item)) {
      continue;
    }
    const snappedPosition = snapFreeItemToPixelGrid(item, room.roomTime);
    if (snappedPosition === undefined) {
      continue;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    logSnapping &&
      console.log(
        "snapping",
        item.id,
        item.state.position,
        "->",
        snappedPosition,
      );

    const { id } = item;

    const collisionsAfterSnapping = collisionItemWithIndex(
      { id, aabb: item.aabb, state: { position: snappedPosition } },
      room[roomSpatialIndexKey],
      (i) => i.id !== id && isSolid(i, item),
    ).toArray();
    //if (!isEmpty(collisionsAfterSnapping)) {
    if (collisionsAfterSnapping.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      logSnapping &&
        console.log(
          "not snapping because of collision:",
          item.id,
          "would collide with",
          collisionsAfterSnapping.map((c) => c.id),
        );
      continue;
    }

    updateItemPosition(room, item, snappedPosition);
    movedItems.add(item);
  }
};
