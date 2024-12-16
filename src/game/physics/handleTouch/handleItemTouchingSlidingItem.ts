import { mtv } from "../slidingCollision";
import type { ItemInPlayType } from "@/model/ItemInPlay";
import {
  dotProductXyz,
  originXyz,
  scaleXyz,
  unitVector,
  xyzEqual,
} from "@/utils/vectors/vectors";
import { moveSpeedPixPerMs } from "../mechanicsConstants";
import { isSolid, type SlidingItemTypes } from "../itemPredicates";
import type { ItemTouchEvent } from "./ItemTouchEvent";

export const handleItemTouchingSlidingItem = <RoomId extends string>({
  movingItem: touchingItem,
  touchedItem: slidingItem,
}: ItemTouchEvent<RoomId, ItemInPlayType, SlidingItemTypes>) => {
  if (!isSolid(touchingItem)) return;

  const {
    state: { position: slidingItemPosition },
    aabb: slidingItemAabb,
  } = slidingItem;

  const m = mtv(
    touchingItem.state.position,
    touchingItem.aabb,
    slidingItemPosition,
    slidingItemAabb,
  );

  if (m.x === 0 && m.y === 0) return;

  const unitM = unitVector(m);

  const slidingVel = scaleXyz(unitM, -moveSpeedPixPerMs.ball);

  slidingItem.state.vels.sliding = slidingVel;

  return false;
};

export const handleSlidingItemTouchingAnyItem = <RoomId extends string>({
  movingItem: slidingItem,
  /** the item that touched this sliding item */
  touchedItem,
}: ItemTouchEvent<RoomId, SlidingItemTypes, ItemInPlayType>) => {
  if (!isSolid(touchedItem)) return;

  const slidingVel = slidingItem.state.vels.sliding;

  if (xyzEqual(slidingVel, originXyz)) return;

  const {
    state: { position: slidingItemPosition },
    aabb: slidingItemAabb,
  } = slidingItem;

  const m = mtv(
    touchedItem.state.position,
    touchedItem.aabb,
    slidingItemPosition,
    slidingItemAabb,
  );

  const d = dotProductXyz(m, slidingItem.state.vels.sliding);

  // stop sliding
  if (d > 0) slidingItem.state.vels.sliding = originXyz;

  return false;
};
