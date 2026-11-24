import { selectCurrentRoomState } from "../game/gameState/gameStateSelectors/selectCurrentRoomState";
import { isFreeItem } from "../model/ItemInPlayNarrowedUnions";
import type { GameStateWithMockInput } from "./MockInputStateTracker";

/**
 * counts the separate collisions (eg, bumps) a free item records with another
 * item, for checking how many times they bumped. Pass `frameCallback` as a
 * play-through's frame callback (in every play-through to be counted), then read
 * `count`. Contact that carries on without a new collision, such as scraping or
 * pushing, isn't counted again.
 *
 * A collision on the frame straight after a counted one is part of the same
 * bump: an item kicked ahead (eg, a ball) can be caught again on the very next
 * frame, before it has started moving away - one push, not two bumps. Only that
 * one frame is forgiven, so colliding on every frame still counts as a bump
 * every other frame
 *
 * Ideally this two frame concession wouldn't be needed, but the vagaries of
 * variable time steps needs it for now
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
  /**
   * the time of the latest collision with the item, counted or not - so a
   * collision is only seen once, however many frames it stays recorded for
   */
  let seenAtRoomTime: number | undefined = undefined;
  /**
   * whether the previous frame's collision with the item started a bump
   */
  let countedOnPreviousFrame = false;
  return {
    frameCallback(gameState: GameStateWithMockInput) {
      const collider = selectCurrentRoomState(gameState)?.items[colliderId];
      if (collider === undefined || !isFreeItem(collider)) {
        throw new Error(
          `"${colliderId}" is not a free item in the current room, so can't collide`,
        );
      }
      const { collidedWith } = collider.state;
      const collidedThisFrame =
        collidedWith.roomTime !== seenAtRoomTime &&
        collidedWith.by[collidedWithId] === true;
      if (!collidedThisFrame) {
        countedOnPreviousFrame = false;
        return;
      }
      seenAtRoomTime = collidedWith.roomTime;
      if (countedOnPreviousFrame) {
        // part of the bump counted on the previous frame:
        countedOnPreviousFrame = false;
        return;
      }
      count++;
      countedOnPreviousFrame = true;
    },
    get count() {
      return count;
    },
  };
};
