import type { AnyItemInPlay } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/RoomState";
import type { SceneryName } from "../../../sprites/planets";
import type { Xyz } from "../../../utils/vectors/vectors";
import { subXyz, xyzEqual, originXyz } from "../../../utils/vectors/vectors";
import type { FreeItem } from "../../physics/itemPredicates";
import { originalFramePeriod } from "../../render/animationTimings";

const latency = 2 * originalFramePeriod;

export const assignLatentMovement = <RoomId extends string>(
  itemToMove: FreeItem<SceneryName, RoomId>,
  room: RoomState<SceneryName, RoomId>,
  movementDelta: Xyz,
) => {
  itemToMove.state.latentMovement.push({
    // since the original game pushes items every other frame, the practical latency
    // for standing-on items is two frames
    moveAtRoomTime: room.roomTime + latency,
    positionDelta: movementDelta,
  });
};

export const assignLatentMovementFromStandingOn = <RoomId extends string>(
  movedItems: Set<AnyItemInPlay>,
  room: RoomState<SceneryName, RoomId>,
  startingPositions: Record<string, Xyz>,
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

    if (!xyzEqual(latentMovement, originXyz)) {
      for (const stander of moverItem.state.stoodOnBy) {
        assignLatentMovement(stander, room, latentMovement);
      }
    }
  }
};
