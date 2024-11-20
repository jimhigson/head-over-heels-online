import type { AnyItemInPlay, UnknownItemInPlay } from "@/model/ItemInPlay";
import { isItemType, isPlayableItem, itemFalls } from "@/model/ItemInPlay";
import type { Xyz } from "@/utils/vectors";
import {
  addXyz,
  doorAlongAxis,
  originXyz,
  scaleXyz,
  xyzEqual,
} from "@/utils/vectors";
import { collision1toMany } from "../collision/aabbCollision";
import type { GameState } from "../gameState/GameState";
import { currentRoom } from "../gameState/GameState";
import { iterate } from "@/utils/iterate";
import { objectValues } from "iter-tools";
import { handlePlayerTouchingPickup } from "./handleTouch/handlePlayerTouchingPickup";
import { isSolid } from "./isSolid";
import { mtv, sortObstaclesAboutVector } from "./slidingCollision";
import { handlePlayerTouchingItems } from "./handleTouch/handlePlayerTouchingItems";
import { findStandingOn } from "../collision/findStandingOn";

/*
 * colliding with doors is a special case - since they are so narrow, the playable character
 * slides sideways into their opening, to make them easier to walk through
 */
export const slideOnDoorFrames = (
  xyzDelta: Xyz,
  obstructions: Iterable<UnknownItemInPlay>,
): Xyz => {
  // it is only possible (at least in normal level design) to collide with one door at once
  // so take the first one:
  const doorFrame = iterate(obstructions).find(isItemType("doorFrame"));

  if (doorFrame === undefined) {
    return originXyz;
  }

  const {
    config: { direction, nearness },
  } = doorFrame;

  const axis = doorAlongAxis(direction);

  return nearness === "far" ?
      {
        x: axis === "x" ? -Math.abs(xyzDelta.y) : 0,
        y: axis === "y" ? -Math.abs(xyzDelta.x) : 0,
        z: 0,
      }
    : {
        x: axis === "x" ? Math.abs(xyzDelta.y) : 0,
        y: axis === "y" ? Math.abs(xyzDelta.x) : 0,
        z: 0,
      };
};

/**
 * @param subjectItem the item that is wanting to move
 * @param xyzDelta
 */
export const moveItem = <RoomId extends string>(
  subjectItem: UnknownItemInPlay<RoomId>,
  xyzDeltaPartial: Partial<Xyz>,
  gameState: GameState<RoomId>,
  /**
   * if given, the item that pushed this item to cause it to move. This is primarily a protection
   * against infinite loops where two items get stuck pushing each other
   */
  pusher?: AnyItemInPlay,
) => {
  const xyzDelta = addXyz(originXyz, xyzDeltaPartial);

  if (xyzEqual(xyzDelta, originXyz)) {
    return;
  }

  const room = currentRoom(gameState);
  const {
    state: { position: previousPosition },
  } = subjectItem;
  // strategy is to move to the target position, then back off as needed
  subjectItem.state.position = addXyz(previousPosition, xyzDelta);

  const collisions = collision1toMany(subjectItem, objectValues(room.items));

  if (isPlayableItem(subjectItem)) {
    if (
      handlePlayerTouchingItems(subjectItem, collisions, xyzDelta, gameState)
    ) {
      return;
    }
  }

  if (isItemType("pickup")(subjectItem)) {
    const player = collisions.find(isPlayableItem);
    if (player !== undefined) {
      handlePlayerTouchingPickup(gameState, player, subjectItem);
    }
  }

  const solidObstacles = collisions.filter((collidedWith) =>
    isSolid(subjectItem, collidedWith, gameState.pickupsCollected[room.id]),
  );

  const sortedObstacles = sortObstaclesAboutVector(xyzDelta, solidObstacles);

  for (const obstacle of sortedObstacles) {
    const backingOffMtv = mtv(
      subjectItem.state.position,
      subjectItem.aabb,
      obstacle.state.position,
      obstacle.aabb,
    );

    // push falling (pushable) items that we intersect:
    if (itemFalls(obstacle) && obstacle !== pusher) {
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
      moveItem<RoomId>(obstacle, forwardPushVector, gameState, subjectItem);
      // recalculate the subject's mtv given the new pushee position. This will make the pusher
      // go more slowly, since the pushee
      subjectItem.state.position = addXyz(
        subjectItem.state.position,
        mtv(
          subjectItem.state.position,
          subjectItem.aabb,
          obstacle.state.position,
          obstacle.aabb,
        ),
      );
    } else {
      // back off to slide on the obstacle (we're not pushing it):
      subjectItem.state.position = addXyz(
        subjectItem.state.position,
        backingOffMtv,
      );
    }
  }

  if (itemFalls(subjectItem)) {
    subjectItem.state.standingOn = findStandingOn(
      subjectItem,
      objectValues(room.items),
      gameState.pickupsCollected[room.id],
    );
  }

  subjectItem.state.position =
    // only players slide on doors:
    isPlayableItem(subjectItem) ?
      addXyz(
        subjectItem.state.position,
        slideOnDoorFrames(xyzDelta, solidObstacles),
      )
    : subjectItem.state.position;
};
