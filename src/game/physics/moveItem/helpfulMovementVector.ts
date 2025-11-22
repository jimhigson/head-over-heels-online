import type { WritableDeep } from "type-fest";

import { isEmpty } from "iter-tools-es";

import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type { CollideableItem } from "../../collision/aabbCollision";
import type { FreeItem } from "../itemPredicates";

import { roomSpatialIndexKey, type RoomState } from "../../../model/RoomState";
import { epsilon, veryClose } from "../../../utils/epsilon";
import {
  lengthXySquared,
  perpendicularAxisXy,
  subXyz,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { collisionItemWithIndex } from "../../collision/aabbCollision";
import {
  isDeadly,
  isJoystick,
  isPlayableItem,
  isPushable,
  isSolid,
} from "../itemPredicates";

// how far out of the item do the sensors stick?
const sensorProjectionLength = 0.1;

/** a preallocated buffer to write sensors into, to avoid gc */
const sensorBuffer: WritableDeep<CollideableItem> = {
  id: "sensor",
  aabb: { x: 0, y: 0, z: 0 },
  state: { position: { x: 0, y: 0, z: 0 } },
};
/**
 * a second preallocated buffer to write sensors into, to avoid gc, to use for checking after sliding aren't falling off
 * the current surface
 */
const belowSensorBuffer: WritableDeep<CollideableItem> = {
  id: "sensor",
  aabb: {
    x: sensorProjectionLength,
    y: sensorProjectionLength,
    z: sensorProjectionLength,
  }, // this never changes from being an (almost) 1-cube
  state: { position: { x: 0, y: 0, z: 0 } },
};

// how wide are the sensors, as proportion of the object being moved?
// this dictates how much overlap is needed to give a hmv, with:
//  * 0.5 meaning
//  * < 0.5 being more permissive (more eager to give an hmv)
//  * > 0.5 being less permissive (less eager to give an hmv)
//  * 1 means no hmvs at all
const sensorWidthWhileStanding = 5 / 12;
const sensorWidthWhileFalling = 6 / 12;
const sensorWidthWhileJumping = 1;
// 1/12 means 1px for a small bounding-box item (ie, a player) - do a lot of
// helping for doorways
const sensorWidthWhenCollidingWithDoorFrame = 1 / 12;

const slideScoreColWithNone = 0;
const slideScoreColWithDoorFrame = 1;
const slideScoreColWithPushable = 2;
const slideScoreColWithUnpushable = 3;
const slideScoreColWithNonSliding = 4;

const slideSpeedCoef = 0.75;

/**
 * Not standard mtv-based sliding collision: work out items we collided with but probably
 * wanted to move past (for eligible moving items). This only applies if we have zero
 * movement in the frame, but were trying to move.
 * 'sliding' against items collided with, but only just */
export const helpfulMovementVector = <
  RoomId extends string,
  RoomItemId extends string,
>(
  subjectItem: FreeItem<RoomId, RoomItemId>,
  originalPosition: Xyz,
  originalPosDelta: Xyz,
  deltaMs: number,
  room: RoomState<RoomId, RoomItemId>,
  collisions: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>[],
): undefined | Xyz => {
  if (collisions.length === 0) {
    return;
  }

  const updatedPosition = subjectItem.state.position;

  // if the item was 'trying' to move in x
  const unmovingInX = veryClose(originalPosDelta.x, 0);
  // if the item was 'trying' to move in y
  const unmovingInY = veryClose(originalPosDelta.y, 0);
  if (unmovingInX === unmovingInY) {
    // if not originally travelling on a cardinal axis, this does not apply.
    // No tolerance for analogue stick players since they have snapping to axes
    // so should be hitting cardinals or getting normal sliding collision
    return;
  }

  const finalPosDelta = subXyz(updatedPosition, originalPosition);

  // by calculating speed in xy only, hmv is applied also while jumping:
  const finalDeltaSpeedXySq = lengthXySquared(finalPosDelta) / deltaMs;
  if (!veryClose(finalDeltaSpeedXySq, 0)) {
    // if no meaningful movement happened in xy, do not apply hmv:
    return;
  }

  const standingOnNothing = subjectItem.state.standingOnItemId === null;

  // let's add sensors around the AABB to see where they are colliding
  // 3 sensors, taking up the full height of the item, at left, centre, right
  // positions in the xy plane:

  // z is easy - sensors are always full-height matching the item:
  sensorBuffer.state.position.z = updatedPosition.z;
  sensorBuffer.aabb.z =
    standingOnNothing ?
      // setting a very small sensor height while falling allows drifting into
      // smaller gaps when there's a barrier above and below. Eg, head jumping
      // through the disappeared barrier in #blacktooth14
      epsilon
      // sensor buffer equal height to the item that might be sliding
    : subjectItem.aabb.z;

  const movementAxis = unmovingInX ? "y" : "x";

  const collidesWithDoorFrame = collisions.some((i) => i.type === "doorFrame");

  const sensorWidth =
    collidesWithDoorFrame ? sensorWidthWhenCollidingWithDoorFrame
    : standingOnNothing ?
      subjectItem.state.vels.gravity.z < 0 ?
        sensorWidthWhileFalling
      : sensorWidthWhileJumping
    : sensorWidthWhileStanding;

  sensorBuffer.state.position[movementAxis] =
    subjectItem.state.position[movementAxis] +
    (originalPosDelta[movementAxis] < 0 ?
      -sensorProjectionLength
    : subjectItem.aabb[movementAxis]);
  sensorBuffer.aabb[movementAxis] = sensorProjectionLength;

  const crossAxis = perpendicularAxisXy(movementAxis);

  const sensorWidthPx = sensorWidth * subjectItem.aabb[crossAxis];

  sensorBuffer.aabb[crossAxis] = sensorWidthPx;

  // test negative direction in cross axis:
  sensorBuffer.state.position[crossAxis] =
    subjectItem.state.position[crossAxis];

  // collisions with each sensor get a score:
  //  0: nothing there (hmv goes towards if other is non-zero)
  //  1: something there, but is pushable (hmv goes towards if other is not pushable)
  //  2: something there, not pushable
  const accumulateCollisionScore = (
    ac: number,
    c: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  ): number => {
    const score: number =
      c === subjectItem || !isSolid(c) ? slideScoreColWithNone
      : c.type === "doorFrame" ? slideScoreColWithDoorFrame
      : isPushable(subjectItem, c) ? slideScoreColWithPushable
        // we don't apply hmv when colliding with joysticks since you want to snag on them to keep pushing:
      : isJoystick(c) ? slideScoreColWithNonSliding
      : slideScoreColWithUnpushable;

    return Math.max(ac, score);
  };

  const slideScoreNegSide: number = collisionItemWithIndex(
    sensorBuffer,
    room[roomSpatialIndexKey],
  ).reduce(accumulateCollisionScore, 0);

  if (slideScoreNegSide === slideScoreColWithNonSliding) {
    // colliding with something that prohibits sliding (ie, joystick)
    return;
  }

  // check if there's something to slide onto in neg side (don't slide off a surface to fall off)
  // eg - the stairs in #moonbase30
  belowSensorBuffer.state.position.z = subjectItem.state.position.z - 1;
  // this is wrongly positioned - needs to take into account the side of the object; sensorProjectionLength
  // is not 1 byt maybe belowsensor should be a sensorProjectionLength-cube (?)
  belowSensorBuffer.state.position[movementAxis] =
    sensorBuffer.state.position[movementAxis];
  belowSensorBuffer.state.position[crossAxis] =
    subjectItem.state.position[crossAxis];

  const collidesNegSideBelow = collisionItemWithIndex(
    belowSensorBuffer,
    room[roomSpatialIndexKey],
  ).filter((c) => isSolid(c) && !(isPlayableItem(subjectItem) && isDeadly(c)));

  const somewhereToSlideToOnNegSide =
    standingOnNothing || !isEmpty(collidesNegSideBelow);

  // switch sensorBuffer to test positive direction in cross axis:
  sensorBuffer.state.position[crossAxis] =
    subjectItem.state.position[crossAxis] +
    subjectItem.aabb[crossAxis] -
    sensorWidthPx;

  const slideScorePosSide: number = collisionItemWithIndex(
    sensorBuffer,
    room[roomSpatialIndexKey],
  ).reduce(accumulateCollisionScore, 0);

  if (slideScorePosSide === slideScoreColWithNonSliding) {
    // colliding with something that prohibits sliding (ie, joystick)
    return;
  }

  belowSensorBuffer.state.position[crossAxis] =
    subjectItem.state.position[crossAxis] + subjectItem.aabb[crossAxis] - 1;

  const collidesPosSideBelow = collisionItemWithIndex(
    belowSensorBuffer,
    room[roomSpatialIndexKey],
  ).filter((c) => isSolid(c) && !(isPlayableItem(subjectItem) && isDeadly(c)));

  const somewhereToSlideToOnPosSide =
    standingOnNothing || !isEmpty(collidesPosSideBelow);

  if (slideScoreNegSide === slideScorePosSide) {
    // equally motivated to slide both ways, so move none
    return;
  }

  const negWins = slideScoreNegSide > slideScorePosSide;

  if (negWins) {
    if (!somewhereToSlideToOnPosSide) {
      return;
    }
  } else {
    if (!somewhereToSlideToOnNegSide) {
      return;
    }
  }

  return {
    x:
      unmovingInX ?
        originalPosDelta.y *
        (negWins ? 1 : -1) *
        (originalPosDelta.y > 0 ? 1 : -1) *
        slideSpeedCoef
      : 0,
    y:
      unmovingInY ?
        originalPosDelta.x *
        (negWins ? 1 : -1) *
        (originalPosDelta.x > 0 ? 1 : -1) *
        slideSpeedCoef
      : 0,
    z: 0,
  };
};
