import { type UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import {
  roomItemsIterable,
  roomSpatialIndexKey,
  type RoomState,
} from "../../model/RoomState";
import { boxAt, type Xyz } from "../../utils/vectors/vectors";
import {
  collisionItemWithIndex,
  hasCollisionItemWithIndex,
} from "../collision/aabbCollision";
import { updateItemPosition } from "../gameState/mutators/updateItemBox";
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

  const { box: position } = item.state;
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
) => {
  for (const item of roomItemsIterable(room.items)) {
    if (!isFreeItem(item)) {
      continue;
    }
    const snappedPosition = snapFreeItemToPixelGrid(item, room.roomTime);
    if (snappedPosition === undefined) {
      continue;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    logSnapping &&
      console.log("snapping", item.id, item.state.box, "->", snappedPosition);

    const { id } = item;

    const collisionPredicate = (
      i: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    ): boolean => i.id !== id && isSolid(i, item);
    const snappedCollideable = {
      id,
      state: { box: boxAt(snappedPosition, item.state.box) },
    };
    const collidesAfterSnapping = hasCollisionItemWithIndex(
      snappedCollideable,
      room[roomSpatialIndexKey],
      collisionPredicate,
    );
    if (collidesAfterSnapping) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      logSnapping &&
        console.log(
          "not snapping because of collision:",
          item.id,
          "would collide with",
          collisionItemWithIndex(
            snappedCollideable,
            room[roomSpatialIndexKey],
            collisionPredicate,
          )
            .map((i) => i.id)
            .toArray(),
        );
      continue;
    }

    // stamps the item as moved via the position-update funnel:
    updateItemPosition(room, item, snappedPosition);
  }
};
