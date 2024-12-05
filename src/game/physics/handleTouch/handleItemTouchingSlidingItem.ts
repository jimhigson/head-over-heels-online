import { mtv } from "../slidingCollision";
import type { ItemInPlay, AnyItemInPlay } from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import {
  dotProductXyz,
  originXyz,
  scaleXyz,
  unitVector,
  xyzEqual,
} from "@/utils/vectors/vectors";
import { walkSpeedPixPerMs } from "../mechanicsConstants";
import { isSolid, type SlidingItemTypes } from "../itemPredicates";
import type { GameState } from "@/game/gameState/GameState";

export const handleItemTouchingSlidingItem = <RoomId extends string>(
  slidingItem: ItemInPlay<SlidingItemTypes, PlanetName, RoomId>,
  /** the item that touched this sliding item */
  touchingItem: AnyItemInPlay<RoomId>,
  gameState: GameState<RoomId>,
) => {
  if (!isSolid(touchingItem, gameState.progression)) return;

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

  const unitM = unitVector(m);

  const slidingVel = scaleXyz(unitM, -walkSpeedPixPerMs.ball);

  slidingItem.state.vels.sliding = slidingVel;
};

export const handleSlidingItemTouchingAnyItem = <RoomId extends string>(
  slidingItem: ItemInPlay<SlidingItemTypes, PlanetName, RoomId>,
  /** the item that touched this sliding item */
  touchingItem: AnyItemInPlay<RoomId>,
  gameState: GameState<RoomId>,
) => {
  if (!isSolid(touchingItem, gameState.progression)) return;

  const slidingVel = slidingItem.state.vels.sliding;

  if (xyzEqual(slidingVel, originXyz)) return;

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

  const d = dotProductXyz(m, slidingItem.state.vels.sliding);

  if (d > 0) slidingItem.state.vels.sliding = originXyz;
};
