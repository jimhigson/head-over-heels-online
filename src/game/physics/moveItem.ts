import type { Xyz } from "../../utils/vectors/vectors";
import type { GameState } from "../gameState/GameState";
import type { handleItemsTouchingItems } from "./handleTouch/handleItemsTouchingItems";

import { type UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import { roomSpatialIndexKey, type RoomState } from "../../model/RoomState";
import { stoodOnItem } from "../../model/stoodOnItemsLookup";
import { veryClose } from "../../utils/epsilon";
import {
  addXyz,
  dotProductXyz,
  lengthXyz,
  lengthXyzSquared,
  originXyz,
  scaleXyz,
  subXyz,
  xyzEqual,
} from "../../utils/vectors/vectors";
import {
  collision1to1,
  collisionItemWithIndex,
} from "../collision/aabbCollision";
import { removeStandingOn } from "../gameState/mutators/removeStandingOn";
import { setStandingOn } from "../gameState/mutators/setStandingOn";
import { updateItemPosition } from "../gameState/mutators/updateItemPosition";
import { sortObstaclesAboutPriorityAndVector } from "./collisionsOrder";
import { isItemType, isPushable, isSlidingItem } from "./itemPredicates";
import { isFreeItem } from "./itemPredicates";
import { isSolid } from "./itemPredicates";
import { maxPushRecursionDepth } from "./mechanicsConstants";
import { mtv, mtvAlongVector } from "./mtv";
import { recordActedOnBy, recordCollision } from "./recordActedOnBy";

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

  path?: Set<string>;
};

const backingOffTranslationAfterCollision = <
  RoomId extends string,
  RoomItemId extends string,
>(
  subjectItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  collidedWithItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  forceful: boolean,
  // the starting position of the subject, before collisions - can be used to get the
  // direction they're heading in by the time they get to this collision. If a single collision (or the first of
  // multiple) this will be equal to the initial position
  originalPosition: Xyz,
): Xyz => {
  const collidedWithIsPushable = isPushable(
    subjectItem,
    collidedWithItem,
    forceful,
  );

  const backingOffMtv = mtv(
    subjectItem.state.position,
    subjectItem.aabb,
    collidedWithItem.state.position,
    collidedWithItem.aabb,
  );

  // disable this branch to make pushing much more like the original game (only in four directions
  // and having to move 'behind' items in those 4 directions to push them) - it isn't totally clear
  // what the right interpretation of pushing 4-sided AABBs is in an 8-way or analgoue world, but this
  // does make positioning blocks by pushing them easier (and less annoying) and also removes a mechanic
  // where a block can be stuck in a corner, not able to be pushed out
  if (
    collidedWithIsPushable &&
    // vertical pushing (ie, from lifts) doesn't get the special treatment - this is always
    // using the normal backing off mtv
    backingOffMtv.z === 0
  ) {
    // vector that would put the subject back where they started - this is easier than
    // their forward travel since it keeps the projection with their mtv positive
    const subjectTravelReverseVector = subXyz(
      originalPosition,
      subjectItem.state.position,
    );

    const travelRevDistSquared = lengthXyzSquared(subjectTravelReverseVector);
    // find the projection along the distance we've moved so far of the backing off mtv.
    // basically, this tells us if the backing off is in a similar enough direction to the opposite
    // of our direction of travel that we can modify it only back off in the direction we are travelling.
    // modifying the mtv to be in the direction of travel allows items to be pushed diagonally for
    // example, even though for aabbs, the mtv is always axis aligned. Dividing by the distance would give
    // the projection - / by dist² gives projection as fraction of the travel distance
    const backingOffProjectedOnMovementVector =
      dotProductXyz(backingOffMtv, subjectTravelReverseVector) /
      travelRevDistSquared;

    // a little bit wider than 45° (which would be 0.5 here)
    if (backingOffProjectedOnMovementVector > 0.44) {
      return mtvAlongVector(
        subjectItem.state.position,
        subjectItem.aabb,
        collidedWithItem.state.position,
        collidedWithItem.aabb,
        // this doesn't apply along z - you can't 'push' upwards. Well, you can, but that's the
        // normal aabb mtvs
        { ...subjectTravelReverseVector, z: 0 },
      );
    }
  }

  return backingOffMtv;
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
  onTouch,
  //recursionDepth = 0,
  /*
   * the nodes we previously visited on the path down the tree to get to here.
   * Set is a little faster than array since we need to look up if strings are present
   */
  path = new Set(),
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
      `[${pusher ? `push by ${pusher.id}` : "first cause"} in ${room.id}]`,
      "on path",
      [...path.values()],
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
  updateItemPosition(room, subjectItem, addXyz(originalPosition, posDelta));

  if (pusher === undefined) {
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
        `[${pusher ? `push by ${pusher.id}` : "first cause"}]`,
        subjectItem.id,
        "💥👎 'did not collide with anything",
      );
    } else
      console.log(
        `[${pusher ? `push by ${pusher.id}` : "first cause"}]`,
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
          `[${pusher ? `push by ${pusher.id}` : "first cause"}]`,
          `skipping collision handling for ${subjectItem.id} with ${collidedWithItem.id} as it is already on the path`,
        );
      }
      continue;
    }

    if (!collision1to1(subjectItem, collidedWithItem)) {
      if (log) {
        console.log(
          `${subjectItem.id} @`,
          subjectItem.state.position,
          `❌💥 no longer colliding with ${collidedWithItem.id} @`,
          collidedWithItem.state.position,
          `after handling previous collisions`,
        );
      }
      // it is possible there is no longer a collision due to previous pushing and backing-off of the subjectItem - we have
      // been protected from this collision by previous collisions so it no longer applies
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
          `[${pusher ? `push by ${pusher.id}` : "first cause"}]`,
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
        `[${pusher ? `push by ${pusher.id}` : "first cause"}]`,
        `${subjectItem.id} collided 💥 with ${collidedWithItem.id} to give backing-off mtv`,
        backingOffMtv,
      );

    // push any pushable items that we intersect:
    if (collidedWithIsPushable /*&& collidedWithItem !== pusher */) {
      const pushCoefficient =
        (
          // don't slow down if we are forceful
          forceful ||
          // don't slow down for an item that's going to slide away anyway:
          isSlidingItem(collidedWithItem)
        ) ?
          // 1 puts our whole movement back in - we don't slow down/back off at all
          // lifts don't slow down when stuff is on them
          -1
          // split the difference - the pushed item moves half as far forward as our intersection
        : -0.5;

      // the vector in the direction of the push:
      const forwardPushVector = scaleXyz(backingOffMtv, pushCoefficient);

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
          `[${pusher ? `push by ${pusher.id}` : "first cause"}]`,
          `${subjectItem.id} will recursively push ${collidedWithItem.id} by`,
          forwardPushVector,
          "with push coefficient of",
          pushCoefficient,
        );

      // if (
      //   subjectItem?.id === "portableBlock" &&
      //   collidedWithItem.id === "heels"
      // ) {
      //   debugger;
      // }

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
          pusher: subjectItem,
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
          `[${pusher ? `push by ${pusher.id}` : "first cause"}]`,
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

    if (
      // it isn't clear why a non-free item would be colliding with anything(?)
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

  if (log) console.groupEnd();
};
