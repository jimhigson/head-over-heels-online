import { collision1to1 } from "@/game/collision/aabbCollision";
import type { UnknownItemInPlay } from "@/model/ItemInPlay";
import type { FreeItem } from "../physics/itemPredicates";
import type { PlanetName } from "@/sprites/planets";
import { addXyz } from "@/utils/vectors/vectors";
import { isSolid } from "../physics/itemPredicates";

const standingTolerance = 0.001;

export const checkStandingOn = <RoomId extends string>(
  item: FreeItem<PlanetName, RoomId>,
  itemMaybeBeingStoodOn: UnknownItemInPlay<RoomId>,
  progression: number,
): boolean => {
  if (!isSolid(itemMaybeBeingStoodOn, progression)) {
    return false;
  }

  const {
    state: {
      position,
      vels: {
        gravity: { z: gravityVelZ },
      },
    },
    aabb,
    id,
  } = item;

  if (gravityVelZ > 0) {
    // we're jumping and can't be standing on anything while travelling upwards
    return false;
  }

  const positionJustBelowItem = addXyz(position, { z: -standingTolerance });

  return collision1to1(
    {
      state: { position: positionJustBelowItem },
      aabb,
      id,
    },
    itemMaybeBeingStoodOn,
  );
};
