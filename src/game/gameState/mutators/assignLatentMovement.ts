import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type { LatentMovementFrame } from "../../../model/ItemStateMap";
import type { RoomState } from "../../../model/RoomState";
import type { Xyz } from "../../../utils/vectors/vectors";
import type { MovedItems } from "../../mainLoop/progressGameState";
import type { FreeItem } from "../../physics/itemPredicates";

import { iterateStoodOnByItems } from "../../../model/stoodOnItemsLookup";
import {
  originXy,
  scaleXyz,
  subXyz,
  xyEqual,
} from "../../../utils/vectors/vectors";
import { originalFramePeriod } from "../../render/animationTimings";

// since the original game pushes items every other frame, the practical latency
// for standing-on items is two frames (80ms)
const defaultLatency = 2 * originalFramePeriod;

export const assignLatentMovement = <
  RoomId extends string,
  RoomItemId extends string,
>(
  itemToMove: FreeItem<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  movementDelta: Xyz,
  deltaMS: number,
  latency = defaultLatency,
) => {
  const latentMovementFrame: LatentMovementFrame<RoomItemId> = {
    endAtRoomTime: room.roomTime + deltaMS + latency,
    startAtRoomTime: room.roomTime + latency,
    velocity: scaleXyz(movementDelta, 1 / deltaMS),
    // we know the itemToMove is standing on something, since that's how we found it, so the
    // non-null assertion (!) is safe here:
    fromStandingOn: itemToMove.state.standingOnItemId!,
  };

  itemToMove.state.latentMovement.push(latentMovementFrame);
};

const isStoodOnByAnything = (item: UnionOfAllItemInPlayTypes) => {
  for (const _ in item.state.stoodOnBy) {
    return true;
  }
  return false;
};

export const assignLatentMovementFromStandingOn = <
  RoomId extends string,
  RoomItemId extends string,
>(
  movedItems: MovedItems<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  startingPositions: Record<string, Xyz>,
  deltaMS: number,
) => {
  /**
   * standing on updated here for all - because, eg, if a lift moves down with a player on it,
   * if the check is done inside the lift's tick, the player is then not on the lift and has no
   * ability to walk (the walk mechanic will return a null result) while the lift descends
   */
  for (const moverItem of movedItems) {
    const previousPosition: undefined | Xyz = startingPositions[moverItem.id];

    if (previousPosition === undefined) {
      // item was introduced to the world during this tick, can't have latent movement:
      continue;
    }
    if (!isStoodOnByAnything(moverItem)) {
      // if nothing is stood on this item, no latent movement to assign:
      continue;
    }

    // work out how much we moved in this frame
    const latentMovement = subXyz(moverItem.state.position, previousPosition);

    // latent movement is only horizontal - anything else, collisions and gravity can handle
    latentMovement.z = 0;

    if (!xyEqual(latentMovement, originXy)) {
      for (const standerItem of iterateStoodOnByItems(
        moverItem.state.stoodOnBy,
        room,
      )) {
        assignLatentMovement(standerItem, room, latentMovement, deltaMS);
      }
    }
  }
};
