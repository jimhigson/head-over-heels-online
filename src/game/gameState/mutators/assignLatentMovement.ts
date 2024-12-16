import type { AnyItemInPlay } from "@/model/ItemInPlay";
import { type Xyz, subXyz, xyzEqual, originXyz } from "@/utils/vectors/vectors";
import type { GameState } from "../gameState/GameState";
import { originalFramePeriod } from "../render/animationTimings";

export const assignLatentMovement = <RoomId extends string>(
  movedItems: Set<AnyItemInPlay>,
  gameState: GameState<RoomId>,
  startingPositions: Record<string, Xyz>
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
        stander.state.latentMovement.push({
          // since the original game pushes items every other frame, the practical latency
          // for standing-on items is two frames
          moveAtGameTime: gameState.gameTime + 2 * originalFramePeriod,
          positionDelta: latentMovement,
        });
      }
    }
  }
};
