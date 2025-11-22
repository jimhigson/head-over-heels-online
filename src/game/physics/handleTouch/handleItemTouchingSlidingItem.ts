import type { ItemInPlayType } from "../../../model/ItemInPlay";
import type { ItemTouchEventByItemType } from "./ItemTouchEvent";

import { epsilon } from "../../../utils/epsilon";
import {
  dotProductXyz,
  lengthXySquared,
  originXyz,
  scaleXyzInPlace,
  unitVectorInPlace,
  xyzEqual,
} from "../../../utils/vectors/vectors";
import { visualiseVectorForLogs } from "../../../utils/vectors/visualiseVectorForLogs";
import { isSolid, type SlidingItemTypes } from "../itemPredicates";
import { moveSpeedPixPerMs } from "../mechanicsConstants";
import { mtv, mtvAlongVector } from "../mtv";

const log = import.meta.env.VITE_LOG_MOVE_ITEM;

export const handleItemTouchingSlidingItem = <
  RoomId extends string,
  RoomItemId extends string,
>(
  opts: ItemTouchEventByItemType<
    RoomId,
    RoomItemId,
    ItemInPlayType,
    SlidingItemTypes
  >,
) => {
  const {
    movingItem: touchingItem,
    touchedItem: slidingItem,
    movementVector,
  } = opts;

  if (!isSolid(touchingItem)) return;

  if (log)
    console.group(
      `💥🛝 handleItemTouchingSlidingItem: solid item ${touchingItem.id} touching sliding item ${slidingItem.id}`,
      opts,
    );

  const {
    state: { position: slidingItemPosition },
    aabb: slidingItemAabb,
  } = slidingItem;

  // the overlap mtv is the simple mtv required to get the pusher and pushee
  // to no longer overlap. Usually, but not always, this would be in the direction
  // of travel, but because of chain reactions it is possible for them to be orthogonal
  const mtvOverlap = mtv(
    touchingItem.state.position,
    touchingItem.aabb,
    slidingItemPosition,
    slidingItemAabb,
  );

  const slidingVector = mtvAlongVector(
    touchingItem.state.position,
    touchingItem.aabb,
    slidingItemPosition,
    slidingItemAabb,
    movementVector,
  );
  slidingVector.z = 0; // we don't slide in z

  const mtvAvMagnitudeSquared = lengthXySquared(slidingVector);
  if (mtvAvMagnitudeSquared < epsilon) {
    // no mtv when mtv constrained to direction of movement; probably
    // means items are not overlapping already
    // - exit early to avoid divByZero
    return;
  }

  const backingOffProjectedOnMovementVectorMagnitude: number =
    dotProductXyz(mtvOverlap, slidingVector) / mtvAvMagnitudeSquared;

  if (log)
    console.log(
      "\nmtvOverlap:",
      ...visualiseVectorForLogs(mtvOverlap),
      "\nmtvAv:",
      ...visualiseVectorForLogs(slidingVector),
      "\nconstrained along movementVector:",
      ...visualiseVectorForLogs(movementVector),
      "giving projection of",
      backingOffProjectedOnMovementVectorMagnitude,
    );

  if (backingOffProjectedOnMovementVectorMagnitude < 0.44) {
    // do no sliding
    if (log) console.groupEnd();
    return;
  }

  // adjust the sliding vector to be the magnitude of move speed of a ball:
  // (all sliding items move at same speed)
  unitVectorInPlace(slidingVector);
  scaleXyzInPlace(slidingVector, -moveSpeedPixPerMs.ball);

  if (log)
    console.log(
      `giving ${slidingItem.id} state.vels.sliding`,
      ...visualiseVectorForLogs(slidingVector),
    );

  slidingItem.state.vels.sliding = slidingVector;

  if (log) console.groupEnd();
};

export const handleSlidingItemTouchingAnyItem = <
  RoomId extends string,
  RoomItemId extends string,
>(
  opts: ItemTouchEventByItemType<
    RoomId,
    RoomItemId,
    SlidingItemTypes,
    ItemInPlayType
  >,
) => {
  const {
    movingItem: slidingItem,
    /** the item that touched this sliding item */
    touchedItem,
  } = opts;

  if (!isSolid(touchedItem)) return;

  const slidingVel = slidingItem.state.vels.sliding;

  if (xyzEqual(slidingVel, originXyz)) return;

  if (log)
    console.group(
      `💥🛝 handleSlidingItemTouchingAnyItem: sliding item ${slidingItem.id} touching solid item ${touchedItem.id} while sliding`,
      opts,
    );

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

  // dot product > 0 means collision has a component in the direction
  // this item was sliding in
  const d = dotProductXyz(m, slidingItem.state.vels.sliding);

  if (d > 0) {
    // stop sliding
    slidingItem.state.vels.sliding = originXyz;
    if (log)
      console.log(`non-zero dot product, stopping ${slidingItem.id} sliding`);
  } else {
    if (log)
      console.log(`dot product <= 0, not stopping ${slidingItem.id} sliding`);
  }
  if (log) console.groupEnd();
};
