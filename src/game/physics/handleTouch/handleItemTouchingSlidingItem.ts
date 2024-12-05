import { mtv } from "../slidingCollision";
import type { ItemInPlay, AnyItemInPlay } from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import { originXyz, scaleXyz, unitVector } from "@/utils/vectors/vectors";
import { walkSpeedPixPerMs } from "../mechanicsConstants";

export const handleItemTouchingSlidingItem = <RoomId extends string>(
  slidingItem: ItemInPlay<"ball", PlanetName, RoomId>,
  /** the item that touched this sliding item */
  touchingItem: AnyItemInPlay<RoomId>,
) => {
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

  const rollingVel = scaleXyz(unitM, -walkSpeedPixPerMs.ball);

  slidingItem.state.vels.rolling = rollingVel;
};

export const handleSlidingItemTouchingAnyItem = <RoomId extends string>(
  slidingItem: ItemInPlay<"ball", PlanetName, RoomId>,
) => {
  slidingItem.state.vels.rolling = originXyz;
};
