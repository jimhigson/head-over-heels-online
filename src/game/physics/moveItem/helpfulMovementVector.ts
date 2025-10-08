import type { WritableDeep } from "type-fest";

import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type { Collideable } from "../../collision/aabbCollision";
import type { FreeItem } from "../itemPredicates";

import { roomSpatialIndexKey, type RoomState } from "../../../model/RoomState";
import { veryClose } from "../../../utils/epsilon";
import {
  lengthXySquared,
  perpendicularAxisXy,
  subXyz,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { collisionItemWithIndex } from "../../collision/aabbCollision";
import { isJoystick, isPushable, isSolid } from "../itemPredicates";

/** a preallocated buffer to write sensors into, to avoid gc */
const sensorBuffer: WritableDeep<Collideable> = {
  id: "sensor",
  aabb: { x: 0, y: 0, z: 0 },
  state: { position: { x: 0, y: 0, z: 0 } },
};

// how far out of the item do the sensors stick?
const sensorProjectionLength = 0.1;
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

const collisionNone = 0;
const collisionWithPushable = 1;
const collisionWithUnpushable = 2;
const collisionWithNonSliding = 3;

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

  const unmovingInX = veryClose(originalPosDelta.x, 0);
  const unmovingInY = veryClose(originalPosDelta.y, 0);
  if (unmovingInX === unmovingInY) {
    // if not originally travelling on a cardinal axis, this does not apply.
    // No tolerance for analogue stick players since they have snapping to axes
    // so should be hitting cardinals or getting normal sliding collision
    return;
  }

  const finalPosDelta = subXyz(updatedPosition, originalPosition);

  // by calculating in xy only, hmv is applied also while jumping:
  const finalDeltaSpeedXySq = lengthXySquared(finalPosDelta) / deltaMs;
  if (!veryClose(finalDeltaSpeedXySq, 0)) {
    // if some meaningful movement happened, do not apply this:
    return;
  }

  // let's add sensors around the AABB to see where they are colliding
  // 3 sensors, taking up the full height of the item, at left, centre, right
  // positions in the xy plane:

  // z is easy - sensors are always full-height matching the item:
  sensorBuffer.state.position.z = updatedPosition.z;
  sensorBuffer.aabb.z = subjectItem.aabb.z;

  const movementAxis = unmovingInX ? "y" : "x";

  const collidesWithDoorFrame = collisions.some((i) => i.type === "doorFrame");

  const sensorWidth =
    collidesWithDoorFrame ? sensorWidthWhenCollidingWithDoorFrame
    : subjectItem.state.standingOnItemId === null ?
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
      c === subjectItem || !isSolid(c) ? collisionNone
      : isPushable(subjectItem, c) ? collisionWithPushable
        // we don't apply hmv when colliding with joysticks since you want to snag on them to keep pushing:
      : isJoystick(c) ? collisionWithNonSliding
      : collisionWithUnpushable;

    return Math.max(ac, score);
  };
  const collidesNegSide: number = collisionItemWithIndex(
    sensorBuffer,
    room[roomSpatialIndexKey],
  ).reduce(accumulateCollisionScore, 0);

  if (collidesNegSide === collisionWithNonSliding) {
    return;
  }

  // test positive direction in cross axis:
  sensorBuffer.state.position[crossAxis] =
    subjectItem.state.position[crossAxis] +
    subjectItem.aabb[crossAxis] -
    sensorWidthPx;

  const collidesPosSide: number = collisionItemWithIndex(
    sensorBuffer,
    room[roomSpatialIndexKey],
  ).reduce(accumulateCollisionScore, 0);

  if (collidesPosSide === collisionWithNonSliding) {
    return;
  }

  if (collidesNegSide === collidesPosSide) {
    return;
  }

  return {
    x:
      unmovingInX ?
        originalPosDelta.y *
        (collidesNegSide > collidesPosSide ? 1 : -1) *
        (originalPosDelta.y > 0 ? 1 : -1) *
        slideSpeedCoef
      : 0,
    y:
      unmovingInY ?
        originalPosDelta.x *
        (collidesNegSide > collidesPosSide ? 1 : -1) *
        (originalPosDelta.x > 0 ? 1 : -1) *
        slideSpeedCoef
      : 0,
    z: 0,
  };
};
