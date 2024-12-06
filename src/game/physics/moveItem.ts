import type { AnyItemInPlay, UnknownItemInPlay } from "@/model/ItemInPlay";
import { isItemType } from "./itemPredicates";
import { isFreeItem } from "./itemPredicates";
import type { Xyz } from "@/utils/vectors/vectors";
import {
  addXyz,
  originXyz,
  scaleXyz,
  subXyz,
  xyzEqual,
} from "@/utils/vectors/vectors";
import { collision1to1, collision1toMany } from "../collision/aabbCollision";
import type { GameState } from "../gameState/GameState";
import { currentRoom } from "../gameState/GameState";
import { isSolid } from "./itemPredicates";
import { mtv } from "./slidingCollision";
import { sortObstaclesAboutPriorityAndVector } from "./collisionsOrder";
import { handleItemsTouchingItems } from "./handleTouch/handleItemsTouchingItems";
import { objectValues } from "iter-tools";
import {
  removeStandingOn,
  setStandingOn,
} from "../gameState/mutators/removeStandingOn";

const log = 0;

type MoveItemOptions<RoomId extends string> = {
  subjectItem: UnknownItemInPlay<RoomId>;
  posDelta: Xyz;
  gameState: GameState<RoomId> /**
   * if given, the item that pushed this item to cause it to move. This is primarily a protection
   * against infinite loops where two items get stuck pushing each other
   */;
  pusher?: AnyItemInPlay;
  deltaMS: number;
  /**
   * if true, anything this movement tries to push will get moved the total amount.
   *
   * Otherwise, if false/undefined, recursive pushing will split the movement 50/50 between mover and pushee.
   *
   * Heels putting a carried item down should be forceful - everything has to move the full amount!
   *
   * Lifts are always forceful - they don't slow down then things are on them. But they can be stopped
   * as a special case if something gets stuck under them.
   */
  forceful?: boolean;

  recursionDepth?: number;
};

/**
 * @param subjectItem the item that is wanting to move
 * @param xyzDelta
 * @returns true if the tick should halt here
 */
export const moveItem = <RoomId extends string>({
  subjectItem,
  posDelta,
  gameState,
  pusher,
  deltaMS,
  forceful = isItemType("lift")(subjectItem) && pusher === undefined,
  recursionDepth = 0,
}: MoveItemOptions<RoomId>): boolean => {
  if (xyzEqual(posDelta, originXyz)) {
    return false;
  }

  if (recursionDepth > 16) {
    throw new Error("this probably means a non-terminating issue");
  }

  const room = currentRoom(gameState);
  const {
    state: { position: originalPosition },
  } = subjectItem;

  // strategy is to move to the target position, then back off as needed
  subjectItem.state.position = addXyz(originalPosition, posDelta);

  if (log)
    console.log(
      `[${pusher ? `push by ${pusher.id}` : "first cause"}]`,
      `💨 moving ${subjectItem.id} @`,
      subjectItem.state.position,
      `bb:`,
      subjectItem.aabb,
      ` by `,
      posDelta,
      pusher ? ""
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- this is just for logging
      : (subjectItem.state as any).vels,
    );

  const sortedCollisions = sortObstaclesAboutPriorityAndVector(
    posDelta,
    collision1toMany(subjectItem, objectValues(room.items)),
  );

  if (log)
    console.log(
      `[${pusher ? `push by ${pusher.id}` : "first cause"}]`,
      subjectItem.id,
      "💥 collided with:",
      `[${sortedCollisions.map((c) => c.id).join(", ")}]`,
      sortedCollisions,
      "from room items:",
      room.items,
    );

  for (const collision of sortedCollisions) {
    if (
      //dist - 0.001 > lastProcessedDistance &&
      !collision1to1(subjectItem, collision)
    ) {
      // it is possible there is no longer a collision due to previous sliding - we have
      // been protected from this collision by previous collisions so it no longer applies
      continue;
    }

    if (
      pusher !== collision &&
      handleItemsTouchingItems({
        movingItem: subjectItem,
        touchee: collision,
        movementVector: subXyz(subjectItem.state.position, originalPosition),
        gameState,
        deltaMS,
      })
    ) {
      return true;
    }

    if (
      !isSolid(collision, gameState.progression) ||
      !isSolid(subjectItem, gameState.progression)
    ) {
      if (log)
        console.log(
          `[${pusher ? `push by ${pusher.id}` : "first cause"}]`,
          `moving ${subjectItem.id}`,
          "either mover or ",
          collision.id,
          "is not solid so not applying mtv",
        );
      continue;
    }

    const backingOffMtv = mtv(
      subjectItem.state.position,
      subjectItem.aabb,
      collision.state.position,
      collision.aabb,
    );

    if (log)
      console.log(
        `[${pusher ? `push by ${pusher.id}` : "first cause"}]`,
        `${subjectItem.id} collided 💥 with ${collision.id} to give backing-off mtv`,
        backingOffMtv,
      );

    // push falling (pushable) items that we intersect:
    if (isFreeItem(collision) && collision !== pusher) {
      const pushCoefficient =
        forceful ?
          // lifts don't slow down when stuff is on them
          -1
          // split the difference - the pushee moves half as far forward as our intersection
        : -0.5;

      // the vector in the direction of the push:
      const forwardPushVector = scaleXyz(backingOffMtv, pushCoefficient);

      // we are going slower due to pushing so back off some more:
      subjectItem.state.position = addXyz(
        subjectItem.state.position,
        backingOffMtv,
        forwardPushVector,
      );

      if (log)
        console.log(
          `[${pusher ? `push by ${pusher.id}` : "first cause"}]`,
          `${subjectItem.id} will recursively push ${collision.id} by ${forwardPushVector}
          with push coefficient of ${pushCoefficient}`,
        );

      // recursively apply push to pushee
      if (
        moveItem({
          subjectItem: collision,
          posDelta: forwardPushVector,
          pusher: subjectItem,
          gameState,
          deltaMS,
          forceful,
          recursionDepth: recursionDepth + 1,
        })
      ) {
        // halt if the recursive call halted
        return true;
      }
      // recalculate the subject's mtv given the new pushee position. This will make the pusher
      // go more slowly, since the pushee
      subjectItem.state.position = addXyz(
        subjectItem.state.position,
        mtv(
          subjectItem.state.position,
          subjectItem.aabb,
          collision.state.position,
          collision.aabb,
        ),
      );
    } else {
      // back off to slide on the obstacle (we're not pushing it):
      subjectItem.state.position = addXyz(
        subjectItem.state.position,
        backingOffMtv,
      );

      if (log)
        console.log(
          `[${pusher ? `push by ${pusher.id}` : "first cause"}]`,
          `${subjectItem.id} can't push ${collision.id} so simply backed off to`,
          subjectItem.state.position,
        );
    }

    // check if we landed on the item to take over the standingOn slot::
    if (isFreeItem(subjectItem) && backingOffMtv.z > 0) {
      // moving vertically down onto the item
      if (
        subjectItem.state.standingOn === null ||
        !sortedCollisions.includes(subjectItem.state.standingOn)
      ) {
        if (log)
          console.log(
            `[${pusher ? `push by ${pusher.id}` : "first cause"}]`,
            `${subjectItem.id} is a free item and collided vertically with ${collision.id}`,
            collision,
            `so will set ${subjectItem.id} as standing on ${collision.id}`,
          );

        // not colliding with the thing we were stood on before - take over the slot:
        removeStandingOn(subjectItem);
        setStandingOn(subjectItem, collision);
      }
    }
  }

  return false; // no reason found to halt, can tick the next item
};
