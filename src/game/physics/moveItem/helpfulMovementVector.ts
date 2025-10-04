import type { WritableDeep } from "type-fest";

import { isEmpty } from "iter-tools-es";

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
import { isSolid } from "../itemPredicates";

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

  const stillInX = veryClose(originalPosDelta.x, 0);
  const stillInY = veryClose(originalPosDelta.y, 0);
  if (stillInX === stillInY) {
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

  const movementAxis = stillInX ? "y" : "x";

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

  const collidesNeg = !isEmpty(
    collisionItemWithIndex(sensorBuffer, room[roomSpatialIndexKey]).filter(
      (c) => c !== subjectItem && isSolid(c),
    ),
  );

  // test positive direction in cross axis:
  sensorBuffer.state.position[crossAxis] =
    subjectItem.state.position[crossAxis] +
    subjectItem.aabb[crossAxis] -
    sensorWidthPx;

  const collidesPos = !isEmpty(
    collisionItemWithIndex(sensorBuffer, room[roomSpatialIndexKey]).filter(
      (c) => c !== subjectItem && isSolid(c),
    ),
  );

  if (collidesNeg === collidesPos) {
    return;
  }

  return {
    x:
      stillInX ?
        originalPosDelta.y *
        (collidesNeg ? 1 : -1) *
        (originalPosDelta.y > 0 ? 1 : -1)
      : 0,
    y:
      stillInY ?
        originalPosDelta.x *
        (collidesNeg ? 1 : -1) *
        (originalPosDelta.x > 0 ? 1 : -1)
      : 0,
    z: 0,
  };
};
