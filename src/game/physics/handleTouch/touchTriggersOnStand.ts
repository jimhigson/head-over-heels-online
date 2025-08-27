import type { ItemTouchEvent } from "./ItemTouchEvent";

import { spatiallyCheckStandingOn } from "../../collision/checkStandingOn";
import { isFreeItem } from "../itemPredicates";

/**
 * check that we're standing on something - for blocks that disappear on stand,
 * platforms that start moving on stand etc
 */
export const touchTriggersOnStand = <
  RoomId extends string,
  RoomItemId extends string,
>(
  e: ItemTouchEvent<RoomId, RoomItemId>,
): boolean =>
  isFreeItem(e.movingItem) &&
  spatiallyCheckStandingOn(
    e.movingItem,
    e.touchedItem,
    Math.abs(e.movementVector.z),
  );
