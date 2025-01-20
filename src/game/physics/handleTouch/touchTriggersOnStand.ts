import { spatiallyCheckStandingOn } from "../../collision/checkStandingOn";
import { isFreeItem } from "../itemPredicates";
import type { ItemTouchEvent } from "./ItemTouchEvent";

/** blocks that disappear on stand, platforms that start moving on stand etc */
export const touchTriggersOnStand = <RoomId extends string>(
  e: ItemTouchEvent<RoomId>,
): boolean =>
  isFreeItem(e.movingItem) &&
  spatiallyCheckStandingOn(
    e.movingItem,
    e.touchedItem,
    Math.abs(e.movementVector.z),
  );
