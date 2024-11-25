import type { AnyItemInPlay, UnknownItemInPlay } from "@/model/ItemInPlay";
import { isFreeItem } from "@/model/ItemInPlay";
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
import { objectValues } from "iter-tools";
import { isSolid } from "./isSolid";
import { mtv, sortObstaclesAboutVector } from "./slidingCollision";
import { findStandingOn } from "../collision/findStandingOn";
import { handleItemsTouchingItems } from "./handleTouch/handleItemsTouchingItems";

/**
 * @param subjectItem the item that is wanting to move
 * @param xyzDelta
 */
export const moveItem = <RoomId extends string>({
  subjectItem,
  posDelta,
  gameState,
  pusher,
  deltaMS,
}: {
  subjectItem: UnknownItemInPlay<RoomId>;
  posDelta: Xyz;
  gameState: GameState<RoomId> /**
   * if given, the item that pushed this item to cause it to move. This is primarily a protection
   * against infinite loops where two items get stuck pushing each other
   */;
  pusher?: AnyItemInPlay;
  deltaMS: number;
}) => {
  if (xyzEqual(posDelta, originXyz)) {
    return;
  }

  const room = currentRoom(gameState);
  const {
    state: { position: originalPosition },
  } = subjectItem;

  // strategy is to move to the target position, then back off as needed
  subjectItem.state.position = addXyz(originalPosition, posDelta);

  const sortedCollisions = sortObstaclesAboutVector(
    posDelta,
    collision1toMany(subjectItem, objectValues(room.items)),
  );

  let lastProcessedDistance = -Infinity;
  for (const [dist, collision] of sortedCollisions) {
    if (
      dist - 0.001 > lastProcessedDistance &&
      !collision1to1(subjectItem, collision)
    ) {
      // it is possible there is no longer a collision due to previous sliding - in this case,
      // the mtv will be wrong and erratic - skip this obstacle

      // HERE: we want to only continue if the sorting didn't give an equal score to this
      // and the previous item. Otherwise, for example, if gravity is pushing us down onto two items,
      // we miss the chance to interact with them both (eg, on the boundary of two conveyors - we want to
      // use the direction from both. Otherwise, we are sensitive to the order items appeared in the world as
      // since the sort will not have changed this
      continue;
    }
    lastProcessedDistance = dist;

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
      return;
    }

    if (!isSolid(subjectItem, collision, gameState.pickupsCollected[room.id])) {
      continue;
    }

    const backingOffMtv = mtv(
      subjectItem.state.position,
      subjectItem.aabb,
      collision.state.position,
      collision.aabb,
    );

    // push falling (pushable) items that we intersect:
    if (isFreeItem(collision) && collision !== pusher) {
      const pushCoefficient =
        subjectItem.type === "lift" ?
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

      // recursively apply push to pushee
      moveItem({
        subjectItem: collision,
        posDelta: forwardPushVector,
        gameState,
        pusher: subjectItem,
        deltaMS,
      });
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

      // now the subject has backed off again, the pushee might be standing on it- update that:
      collision.state.standingOn = findStandingOn(
        collision,
        objectValues(room.items),
        gameState.pickupsCollected[room.id],
      );
    } else {
      // back off to slide on the obstacle (we're not pushing it):
      subjectItem.state.position = addXyz(
        subjectItem.state.position,
        backingOffMtv,
      );
    }
  }

  if (
    isFreeItem(subjectItem) &&
    // for recursive calls, this will be updated by the caller
    pusher === undefined
  ) {
    subjectItem.state.standingOn = findStandingOn(
      subjectItem,
      objectValues(room.items),
      gameState.pickupsCollected[room.id],
    );
  }
};
