import {
  isItemType,
  isJoystick,
  isPushable,
  isSlidingItem,
} from "./itemPredicates";
import { isFreeItem } from "./itemPredicates";
import { collision1to1, collision1toMany } from "../collision/aabbCollision";
import type { GameState } from "../gameState/GameState";
import { isSolid } from "./itemPredicates";
import { mtv } from "./slidingCollision";
import { sortObstaclesAboutPriorityAndVector } from "./collisionsOrder";
import {
  removeStandingOn,
  setStandingOn,
} from "../gameState/mutators/modifyStandingOn";
import { type UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import type { Xyz } from "../../utils/vectors/vectors";
import {
  xyzEqual,
  originXyz,
  addXyz,
  subXyz,
  scaleXyz,
} from "../../utils/vectors/vectors";
import { maxPushRecursionDepth } from "./mechanicsConstants";
import { roomItemsIterable, type RoomState } from "../../model/RoomState";
import { stoodOnItem } from "../../model/stoodOnItemsLookup";
import type { handleItemsTouchingItems } from "./handleTouch/handleItemsTouchingItems";

const log = 0;

type MoveItemOptions<RoomId extends string, RoomItemId extends string> = {
  subjectItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>;
  posDelta: Xyz;
  gameState: GameState<RoomId> /**
   * if given, the item that pushed this item to cause it to move. This is primarily a protection
   * against infinite loops where two items get stuck pushing each other
   */;
  room: RoomState<RoomId, RoomItemId>;
  pusher?: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>;
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

  onTouch?: typeof handleItemsTouchingItems;
};

/**
 * @param subjectItem the item that is wanting to move
 * @param xyzDelta
 */
export const moveItem = <RoomId extends string, RoomItemId extends string>({
  subjectItem,
  posDelta,
  gameState,
  room,
  pusher,
  deltaMS,
  forceful = isItemType("lift")(subjectItem) && pusher === undefined,
  recursionDepth = 0,
  onTouch,
}: MoveItemOptions<RoomId, RoomItemId>) => {
  if (xyzEqual(posDelta, originXyz)) {
    // applying zero movement - do nothing
    return;
  }

  const {
    state: { position: originalPosition },
  } = subjectItem;

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
      onTouch ? "with touch handling callback" : "skipping touch handling",
    );

  // strategy is to move to the target position, then back off as needed
  subjectItem.state.position = addXyz(originalPosition, posDelta);
  if (isFreeItem(subjectItem)) {
    const { actedOnAt } = subjectItem.state;
    // it isn't clear why subjectItem would ever *not* be a freeItem
    if (actedOnAt.roomTime === room.roomTime) {
      if (pusher) {
        actedOnAt.by[pusher.id] = true;
      }
    } else {
      actedOnAt.by = (pusher ? { [pusher.id]: true } : {}) as Record<
        RoomItemId,
        true
      >;
      actedOnAt.roomTime = room.roomTime;
    }
  }

  const sortedCollisions = sortObstaclesAboutPriorityAndVector(
    posDelta,
    collision1toMany(subjectItem, roomItemsIterable(room.items)),
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

  let touchedJoystick = false;
  for (const collidedWithItem of sortedCollisions) {
    if (!collision1to1(subjectItem, collidedWithItem)) {
      // it is possible there is no longer a collision due to previous sliding - we have
      // been protected from this collision by previous collisions so it no longer applies
      continue;
    }

    if (isFreeItem(subjectItem)) {
      // it isn't clear why a non-free item would be colliding with anything
      const { collidedWith } = subjectItem.state;
      // record the collision
      if (collidedWith.roomTime === room.roomTime) {
        if (pusher) {
          collidedWith.by[collidedWithItem.id] = true;
        }
      } else {
        collidedWith.by = { [collidedWithItem.id]: true } as Record<
          RoomItemId,
          true
        >;
        collidedWith.roomTime = room.roomTime;
      }
    }

    const collisionIsWithJoystick = isJoystick(collidedWithItem);

    if (
      pusher !== collidedWithItem &&
      /* each item is only allowed to touch one joystick per frame. Otherwise,
      in rooms such as #blacktooth47market it is possible to touch two at
      once and make silly old face go super-quick */
      !(touchedJoystick && collisionIsWithJoystick)
    ) {
      if (onTouch !== undefined) {
        if (log) {
          console.log(
            `handling ${subjectItem.id} touching ${collidedWithItem.id}`,
          );
        }
        onTouch({
          movingItem: subjectItem,
          touchedItem: collidedWithItem,
          movementVector: subXyz(subjectItem.state.position, originalPosition),
          gameState,
          deltaMS,
          room,
        });

        touchedJoystick = touchedJoystick || collisionIsWithJoystick;
      }
    }

    // the touch handler might have removed either item from the world - in this case we can move on or stop:
    if (room.items[subjectItem.id] === undefined) {
      if (log) {
        console.log(
          `mover ${subjectItem.id} is not in the room, so will halt processing their movement`,
        );
      }
      return;
    }
    if (room.items[collidedWithItem.id] === undefined) {
      if (log) {
        console.log(
          `collided item ${subjectItem.id} is not in the room, will skip that collision`,
        );
      }
      continue;
    }

    if (!isSolid(collidedWithItem, subjectItem) || !isSolid(subjectItem)) {
      if (log)
        console.log(
          `[${pusher ? `push by ${pusher.id}` : "first cause"}]`,
          `moving ${subjectItem.id}`,
          "either mover or ",
          collidedWithItem.id,
          "is not solid so not applying mtv",
        );
      continue;
    }

    const backingOffMtv = mtv(
      subjectItem.state.position,
      subjectItem.aabb,
      collidedWithItem.state.position,
      collidedWithItem.aabb,
    );

    if (log)
      console.log(
        `[${pusher ? `push by ${pusher.id}` : "first cause"}]`,
        `${subjectItem.id} collided 💥 with ${collidedWithItem.id} to give backing-off mtv`,
        backingOffMtv,
      );

    // push any pushable items that we intersect:
    if (
      isPushable(subjectItem, collidedWithItem, forceful) &&
      collidedWithItem !== pusher
    ) {
      const pushCoefficient =
        forceful || isSlidingItem(collidedWithItem) ?
          // lifts don't slow down when stuff is on them
          -1
          // split the difference - the pushed item moves half as far forward as our intersection
        : -0.5;

      // the vector in the direction of the push:
      const forwardPushVector = scaleXyz(backingOffMtv, pushCoefficient);

      // we are going slower due to pushing so back off, but not completely:
      subjectItem.state.position = addXyz(
        subjectItem.state.position,
        backingOffMtv,
        forwardPushVector,
      );

      if (log)
        console.log(
          `[${pusher ? `push by ${pusher.id}` : "first cause"}]`,
          `${subjectItem.id} will recursively push ${collidedWithItem.id} by ${forwardPushVector}
          with push coefficient of ${pushCoefficient}`,
        );

      if (recursionDepth < maxPushRecursionDepth) {
        // recursively apply push to pushed item
        // (but only if we didn't already recurse down to the maximum depth)
        moveItem({
          subjectItem: collidedWithItem,
          posDelta: forwardPushVector,
          pusher: subjectItem,
          gameState,
          room,
          deltaMS,
          forceful,
          recursionDepth: recursionDepth + 1,
          onTouch,
        });
      }

      // it is possible we pushed the other item out of the room:
      if (room.items[collidedWithItem.id] === undefined) {
        continue;
      }

      // recalculate the subject's mtv given the new pushee position. This will make the pusher
      // go more slowly, since the pushee will move a bit less than the subject originally wanted to
      subjectItem.state.position = addXyz(
        subjectItem.state.position,
        mtv(
          subjectItem.state.position,
          subjectItem.aabb,
          collidedWithItem.state.position,
          collidedWithItem.aabb,
        ),
      );
    } else {
      // collision was not with a pushable thing

      // back off to slide on the obstacle (we're not pushing it):
      subjectItem.state.position = addXyz(
        subjectItem.state.position,
        backingOffMtv,
      );

      if (log)
        console.log(
          `[${pusher ? `push by ${pusher.id}` : "first cause"}]`,
          `${subjectItem.id} can't push ${collidedWithItem.id} so simply backed off to`,
          subjectItem.state.position,
        );
    }

    // check if we landed on the item we collided with to take over the standingOn slot::
    if (isFreeItem(subjectItem) && backingOffMtv.z > 0) {
      // moving vertically down onto the item

      if (
        subjectItem.state.standingOnItemId === null ||
        !sortedCollisions.includes(
          stoodOnItem(subjectItem.state.standingOnItemId, room),
        )
      ) {
        if (log)
          console.log(
            `[${pusher ? `push by ${pusher.id}` : "first cause"}]`,
            `${subjectItem.id} is a free item and collided vertically with ${collidedWithItem.id}`,
            collidedWithItem,
            `so will set ${subjectItem.id} as standing on ${collidedWithItem.id}`,
          );

        // not colliding with the thing we were stood on before - take over the slot:
        removeStandingOn(subjectItem, room);
        setStandingOn({ above: subjectItem, below: collidedWithItem });
      }
    }
  }
};
