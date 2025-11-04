import type { Xyz } from "../../../utils/vectors/vectors";
import type { GameState } from "../../gameState/GameState";
import type { handleItemsTouchingItems } from "../handleTouch/handleItemsTouchingItems";

import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import { roomSpatialIndexKey, type RoomState } from "../../../model/RoomState";
import { stoodOnItem } from "../../../model/stoodOnItemsLookup";
import { veryClose } from "../../../utils/epsilon";
import {
  addXyz,
  elementWiseProductXyz,
  lengthXyz,
  originXyz,
  subXyz,
  xyzEqual,
} from "../../../utils/vectors/vectors";
import {
  collision1to1,
  collisionItemWithIndex,
} from "../../collision/aabbCollision";
import { removeStandingOn } from "../../gameState/mutators/standingOn/removeStandingOn";
import { setStandingOnWithoutRemovingOldFirst } from "../../gameState/mutators/standingOn/setStandingOn";
import { updateItemPosition } from "../../gameState/mutators/updateItemPosition";
import { sortObstaclesAboutPriorityAndVector } from "../collisionsOrder";
import { isLift, isPushable, isSlidingItem } from "../itemPredicates";
import { isFreeItem } from "../itemPredicates";
import { isSolid } from "../itemPredicates";
import { maxPushRecursionDepth } from "../mechanicsConstants";
import { mtv } from "../mtv";
import { recordActedOnBy, recordCollision } from "../recordActedOnBy";
import { backingOffTranslationAfterCollision } from "./backingOffTranslationAfterCollision";
import { helpfulMovementVector } from "./helpfulMovementVector";

// turn this on for *very* noisy logging of all the movements/pushes etc.
// esbuild should remove these if statements at build time
const log = 0;

type MoveItemOptions<RoomId extends string, RoomItemId extends string> = {
  // not everything that moves is a free item - fired doughnuts and lifts are non-free items that need moving
  subjectItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>;
  posDelta: Xyz;
  gameState: GameState<RoomId> /**
   * if given, the item that pushed this item to cause it to move. This is primarily a protection
   * against infinite loops where two items get stuck pushing each other
   */;
  room: RoomState<RoomId, RoomItemId>;

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

  /**
   * the nodes we previously visited on the path down the tree to get to here.
   * Set is a little faster than array since we need to look up if strings are present.
   *
   * The size of the path is also checked for maximum recursion depth
   */
  path?: Set<RoomItemId>;

  // is this a recursive call from a helpful movement vector? If so, no further helpful movement
  // can also be applied
  isHelpful?: boolean;
};

// from an mtv, multiplying by these vectors gives the push vector to apply to the pushed item
// - they are negative since the push is in the opposite direction to the mtv. They are smaller
// in z (unless forceful) since a upward push should be harder than pushing in x,y plane
// and if downwards pushing, the item is probably already falling anyway so probably doesn't need
// a push.
// the z can't be less than about 0.4 or #safari19triple from original campaign is not possible
// to stack the spring on the drum to get the rabbit
const pushVectorMultiplierForceful = { x: -1, y: -1, z: -1 };
const pushVectorMultiplierNormal = { x: -0.6, y: -0.6, z: -0.4 };
const pushVectorMultiplierWithSliding = { x: -1, y: -1, z: -0.4 };

/**
 * @param subjectItem the item that is wanting to move
 * @param xyzDelta
 */
export const moveItem = <RoomId extends string, RoomItemId extends string>({
  subjectItem,
  posDelta,
  gameState,
  room,
  deltaMS,
  onTouch,
  path = new Set(),
  forceful = isLift(subjectItem) && path.size === 0,
  isHelpful,
}: MoveItemOptions<RoomId, RoomItemId>) => {
  if (xyzEqual(posDelta, originXyz)) {
    // applying zero movement - do nothing
    return;
  }

  const {
    state: { position: originalPosition },
  } = subjectItem;

  if (log)
    console.group(
      `[${path.size === 0 ? `first cause` : "pushed"} in ${room.id}]`,
      "on path",
      [...path.values()],
      `💨 moving ${subjectItem.id} @`,
      subjectItem.state.position,
      `bb:`,
      subjectItem.aabb,
      ` by `,
      posDelta,
      onTouch ? "with touch handling callback" : "skipping touch handling",
    );

  // strategy is to move to the target position, then back off as needed
  updateItemPosition(room, subjectItem, addXyz(originalPosition, posDelta));

  if (path.size === 0) {
    // record 'first cause' acting on, directly from the mechanics.
    // (n>1)-cause are recorded in the collision loop
    recordActedOnBy(undefined, subjectItem, room);
  }

  const sortedCollisions = sortObstaclesAboutPriorityAndVector(
    posDelta,
    collisionItemWithIndex(subjectItem, room[roomSpatialIndexKey]).toArray(),
  );

  if (log) {
    if (sortedCollisions.length === 0) {
      console.log(
        `[${path.size === 0 ? `first cause` : "pushed"}]`,
        subjectItem.id,
        "💥👎 'did not collide with anything",
      );
    } else
      console.log(
        `[${path.size === 0 ? `first cause` : "pushed"}]`,
        subjectItem.id,
        "💥 collided with item(s):",
        `[${sortedCollisions.map((c) => c.id).join(", ")}]`,
        sortedCollisions,
        "from room items:",
        room.items,
      );
  }

  for (const collidedWithItem of sortedCollisions) {
    // avoid a circular pushing - if these are colliding, the parent
    // calls can handle it. This can avoid:
    //    A -push-> B --push-> C -push-> A
    //      -push-> C          ^ here there's no need to handle C pushing A, since A is up
    //                           the tree and will be handled for us when A pushes C directly
    //                           when it is done pushing B
    if (path.has(collidedWithItem.id)) {
      if (log) {
        console.log(
          `[${path.size === 0 ? `first cause` : "pushed"}]`,
          `skipping collision handling for ${subjectItem.id} with ${collidedWithItem.id} as it is already on the path`,
        );
      }
      continue;
    }

    if (!collision1to1(subjectItem, collidedWithItem)) {
      // it is possible there is no longer a collision due to previous pushing and backing-off of the subjectItem - we have
      // been protected from this collision by previous collisions so it no longer applies
      if (log) {
        console.log(
          `${subjectItem.id} @`,
          subjectItem.state.position,
          `❌💥 no longer colliding with ${collidedWithItem.id} @`,
          collidedWithItem.state.position,
          `after handling previous collisions`,
        );
      }
      continue;
    } else {
      if (log) {
        console.log(
          `${subjectItem.id} @`,
          subjectItem.state.position,
          `*is STILL* 💥 with ${collidedWithItem.id} @`,
          collidedWithItem.state.position,
          `after handling previous collisions`,
        );
      }
    }

    // record this acting on:
    recordActedOnBy(subjectItem, collidedWithItem, room);

    if (onTouch !== undefined) {
      if (log) {
        console.log(
          `handling onTouch() callback for ${subjectItem.id} touching ${collidedWithItem.id}`,
        );
      }
    }
    onTouch?.({
      movingItem: subjectItem,
      touchedItem: collidedWithItem,
      movementVector: subXyz(subjectItem.state.position, originalPosition),
      gameState,
      deltaMS,
      room,
    });

    // the touch handler might have removed either item from the world - in this case we can move on or stop:
    if (room.items[subjectItem.id] === undefined) {
      if (log) {
        console.log(
          `mover ${subjectItem.id} is not in the room, so will halt processing their movement`,
        );
        console.groupEnd();
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

    // check for solidness has to be done after onTouch since touching non-solid items can have side-effects
    if (!isSolid(collidedWithItem, subjectItem) || !isSolid(subjectItem)) {
      if (log)
        console.log(
          `[${path.size === 0 ? `first cause` : "pushed"}]`,
          `moving ${subjectItem.id}`,
          "either mover or ",
          collidedWithItem.id,
          "is not solid so won't calculate/apply mtv",
        );
      continue;
    }

    const collidedWithIsPushable = isPushable(
      subjectItem,
      collidedWithItem,
      forceful,
    );

    const backingOffMtv = backingOffTranslationAfterCollision(
      subjectItem,
      collidedWithItem,
      forceful,
      originalPosition,
    );

    /**
     * already touching distinguishes between hitting something and scraping on it, or landing on the ground
     * and the collision detection finding that you were already standing on it. Used to set the collidedWith
     * state - for example, for sound rendering
     */
    const wasAlreadyTouchingCollidedWithItem = veryClose(
      lengthXyz(
        mtv(
          // look back to check with the original position, not the current, updated position
          // after the movement delta was applied:
          originalPosition,
          subjectItem.aabb,
          collidedWithItem.state.position,
          collidedWithItem.aabb,
        ),
      ),
      // a zero mtv means we are already touching the item, but not intersecting it
      0,
    );

    if (log)
      console.log(
        `[${path.size === 0 ? `first cause` : "pushed"}]`,
        `${subjectItem.id} collided 💥 with ${collidedWithItem.id} to give backing-off mtv`,
        backingOffMtv,
      );

    // push any pushable items that we intersect:
    if (collidedWithIsPushable) {
      const pushMultiplier =
        forceful ? pushVectorMultiplierForceful
        : isSlidingItem(collidedWithItem) ? pushVectorMultiplierWithSliding
        : pushVectorMultiplierNormal;

      // the vector in the direction of the push (opposite direction to the mtv)
      const forwardPushVector = elementWiseProductXyz(
        backingOffMtv,
        pushMultiplier,
      );

      // we are going slower due to pushing so back off, but not completely:
      updateItemPosition(
        room,
        subjectItem,
        addXyz(
          subjectItem.state.position,
          backingOffMtv, // this would back off all the way out of the item
          // but we keep going some and stay partially inside
          forwardPushVector,
        ),
      );

      if (log)
        console.log(
          `[${path.size === 0 ? `first cause` : "pushed"}]`,
          `${subjectItem.id} will recursively push ${collidedWithItem.id} by`,
          forwardPushVector,
          "with push coefficient of",
          pushMultiplier,
        );

      if (path.size < maxPushRecursionDepth) {
        // recursively apply push to pushed item
        // (but only if we didn't already recurse down to the maximum depth)
        moveItem({
          subjectItem: collidedWithItem,
          posDelta: forwardPushVector,
          gameState,
          room,
          deltaMS,
          forceful,
          path: path.add(subjectItem.id),
          onTouch,
        });
        // that recursive call is done now, and path is edited in-place to reduce gc
        path.delete(subjectItem.id);
      } else {
        console.warn("hit recursion depth limit", new Error());
      }

      // it is possible we pushed the other item out of the room (if it is a playable character),
      // or into non-existence in some other way
      if (room.items[collidedWithItem.id] === undefined) {
        continue;
      }

      // recalculate the subject's mtv given the new pushee position. This will make the pusher
      // go more slowly, since the pushee will move a bit less than the subject originally wanted to
      updateItemPosition(
        room,
        subjectItem,
        addXyz(
          subjectItem.state.position,
          mtv(
            subjectItem.state.position,
            subjectItem.aabb,
            collidedWithItem.state.position,
            collidedWithItem.aabb,
          ),
        ),
      );
    } else {
      // collision was not with a pushable thing - just back off
      // to slide on the obstacle (we're not pushing it):
      updateItemPosition(
        room,
        subjectItem,
        addXyz(subjectItem.state.position, backingOffMtv),
      );

      if (log)
        console.log(
          `[${path.size === 0 ? `first cause` : "pushed"}]`,
          `${subjectItem.id} can't push ${collidedWithItem.id} so simply backed off to`,
          subjectItem.state.position,
        );
    }

    // check if we landed on the item we collided with to take over the standingOn slot::
    if (
      isFreeItem(subjectItem) &&
      // item is pushing us off it vertically - a good sign that we're standing on it
      backingOffMtv.z > 0 &&
      // have to be moving downwards to stand on something. It is possible to have a positive
      // mtv in z while jumping against an item, for the moment when the character is slightly
      // inside the corner. Eg, springs would record standing on momentarily, and appear compressed
      // if jumped against (but not on)
      posDelta.z < 0
    ) {
      if (
        // subject not already standing on something
        subjectItem.state.standingOnItemId === null ||
        // huh? - not colliding with the item we were previously standing on
        // - guess this means it is ok to take over its slot (?)
        !sortedCollisions.includes(
          stoodOnItem(subjectItem.state.standingOnItemId, room),
        )
      ) {
        if (log)
          console.log(
            `[${path.size === 0 ? `first cause` : "pushed"}]`,
            `${subjectItem.id} is a free item and collided vertically with ${collidedWithItem.id}`,
            collidedWithItem,
            `so will set ${subjectItem.id} as standing on ${collidedWithItem.id}`,
          );

        // not colliding with the thing we were stood on before - take over the slot:
        removeStandingOn(subjectItem, room);
        setStandingOnWithoutRemovingOldFirst({
          above: subjectItem,
          below: collidedWithItem,
        });
      }
    }

    if (
      // TODO: it isn't clear why a non-free item would be colliding with anything(?)
      isFreeItem(subjectItem) &&
      // checking not already touching prevents 'scraping' from rendering/sounding like a collision
      // however - maybe if we want scraping sounds this could be useful
      !wasAlreadyTouchingCollidedWithItem
    ) {
      if (log)
        console.log(
          `📝 recording to state: collision of ${subjectItem.id} with ${collidedWithItem.id}`,
          "originalPosition:",
          originalPosition,
          "->",
          "newPosition:",
          subjectItem.state.position,
          "delta",
          subXyz(subjectItem.state.position, originalPosition),
        );

      recordCollision(subjectItem, collidedWithItem, room);
    }
  }

  if (
    // TODO: it isn't clear why a non-free item would be moving - tighten up moveItem input params
    // and remove this check
    isFreeItem(subjectItem) &&
    !isHelpful
  ) {
    const hmv = helpfulMovementVector(
      subjectItem,
      originalPosition,
      posDelta,
      deltaMS,
      room,
      sortedCollisions,
    );
    if (hmv) {
      moveItem({
        subjectItem,
        posDelta: hmv,
        gameState,
        room,
        deltaMS,
        forceful: false,
        onTouch,
        isHelpful: true,
      });
    }
  }

  if (log) console.groupEnd();
};
