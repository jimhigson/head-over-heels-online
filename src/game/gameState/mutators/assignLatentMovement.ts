import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type { LatentMovementFrame } from "../../../model/ItemStateMap";
import type { RoomState } from "../../../model/RoomState";
import { iterateStoodOnByItems } from "../../../model/stoodOnItemsLookup";
import type { Xyz } from "../../../utils/vectors/vectors";
import {
  subXyz,
  xyzEqual,
  originXyz,
  scaleXyz,
} from "../../../utils/vectors/vectors";
import type { FreeItem } from "../../physics/itemPredicates";
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
  const latentMovementFrame: LatentMovementFrame = {
    endAtRoomTime: room.roomTime + deltaMS + latency,
    startAtRoomTime: room.roomTime + latency,
    velocity: scaleXyz(movementDelta, 1 / deltaMS),
  };

  itemToMove.state.latentMovement.push(latentMovementFrame);
};

export const assignLatentMovementFromStandingOn = <
  RoomId extends string,
  RoomItemId extends string,
>(
  movedItems: Set<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>>,
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
    const previousPosition: Xyz | undefined = startingPositions[moverItem.id];

    if (previousPosition === undefined) {
      // item was introduced to the world during this tick, can't have latent movement:
      continue;
    }

    // check what is standing on us - this implies that we're also checking what everything is stood on,
    // but gives us a chance to apply latent movement:
    const movementDelta = subXyz(moverItem.state.position, previousPosition);

    // latent movement is only horizontal - anything else, collisions and gravity can handle
    const latentMovement = { ...movementDelta, z: 0 };

    // TODO: quit early if nothing standing on this item
    // TODO: optimise by using xyEqual here instead, and create xyz only when needed
    if (!xyzEqual(latentMovement, originXyz)) {
      for (const standerItem of iterateStoodOnByItems(
        moverItem.state.stoodOnBy,
        room,
      )) {
        assignLatentMovement(standerItem, room, latentMovement, deltaMS);
      }
    }
  }
};
