import { selectCurrentRoomState } from "../game/gameState/gameStateSelectors/selectCurrentRoomState";
import { isFreeItem } from "../model/ItemInPlayNarrowedUnions";
import type { GameStateWithMockInput } from "./MockInputStateTracker";

/**
 * counts the separate collisions (eg, bumps) a free item records with another
 * item, for checking how many times they bumped. Pass `frameCallback` as a
 * play-through's frame callback (in every play-through to be counted), then read
 * `count`. Contact that carries on without a new collision, such as scraping or
 * pushing, isn't counted again
 */
export const makeCollisionCounter = (
  /**
   * the free item that collides
   */
  colliderId: string,
  /**
   * the item collided with
   */
  collidedWithId: string,
) => {
  let count = 0;
  let countedAtRoomTime: number | undefined = undefined;
  return {
    frameCallback(gameState: GameStateWithMockInput) {
      const collider = selectCurrentRoomState(gameState)?.items[colliderId];
      if (collider === undefined || !isFreeItem(collider)) {
        throw new Error(
          `"${colliderId}" is not a free item in the current room, so can't collide`,
        );
      }
      const { collidedWith } = collider.state;
      if (
        collidedWith.roomTime !== countedAtRoomTime &&
        collidedWith.by[collidedWithId] === true
      ) {
        count++;
        countedAtRoomTime = collidedWith.roomTime;
      }
    },
    get count() {
      return count;
    },
  };
};
