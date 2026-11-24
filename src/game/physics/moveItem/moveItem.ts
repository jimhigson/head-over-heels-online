import { itemBehaviourKey } from "../../../model/ItemInPlay";
import {
  type FreeItem,
  isFreeItem,
  type UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlayNarrowedUnions";
import { roomSpatialIndexKey, type RoomState } from "../../../model/RoomState";
import { stoodOnByItem, stoodOnItem } from "../../../model/stoodOnItemsLookup";
import { epsilon, veryClose } from "../../../utils/epsilon";
import {
  addXyz,
  elementWiseProductXyz,
  lengthXyz,
  originXyz,
  scaleXyz,
  sizeAxes,
  subXyz,
  type Xyz,
  type XyzBox,
  xyzEqual,
  xyzVeryClose,
} from "../../../utils/vectors/vectors";
import { visualiseVectorForLogs } from "../../../utils/vectors/visualiseVectorForLogs";
import {
  appendApproximateCollisionsTowardsWithIndex,
  collision2Items,
} from "../../collision/aabbCollision";
import { boxFacesJustTouchingAxis } from "../../collision/boxFacesJustTouchingAxis";
import { findStandingOnWithHighestPriorityAndMostOverlapInRange } from "../../collision/checkStandingOn";
import type { GameState } from "../../gameState/GameState";
import { removeStandingOn } from "../../gameState/mutators/standingOn/removeStandingOn";
import { setStandingOnWithoutRemovingOldFirst } from "../../gameState/mutators/standingOn/setStandingOnWithoutRemovingOldFirst";
import {
  stampWithMovedProgression,
  updateItemPosition,
} from "../../gameState/mutators/updateItemBox";
import { sortObstaclesAboutPriorityAndOverlapInPlace } from "../collisionsOrder";
import { handleDisappearingOnTouch } from "../handleTouch/handleDisappearingOnTouch";
import { maxPushRecursionDepth } from "../mechanicsConstants";
import { mtv } from "../mtv";
import { recordActedOnBy, recordCollision } from "../recordActedOnBy";
import { backingOffTranslationAfterCollision } from "./backingOffTranslationAfterCollision";
import { helpfulMovementVector } from "./helpfulMovementVector";

// turn this on for *very* noisy logging of all the movements/pushes etc.
// esbuild should remove these if statements at build time
const log = import.meta.env.VITE_LOG_MOVE_ITEM;

export type MoveItemOptions<
  RoomId extends string,
  RoomItemId extends string,
> = {
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
   * Otherwise, if false/undefined, the push is split between mover and pushee
   * by their masses.
   *
   * Heels putting a carried item down should be forceful - everything has to move the full amount!
   */
  forceful?: boolean;

  recursionDepth?: number;

  /**
   * whether the items touched while moving react to the touch
   */
  handleTouches: boolean;

  /**
   * where this call's push path - the items pushing it, down the tree to here -
   * starts on the shared path stack. Recursive calls pass their own down;
   * undefined for a call starting a new path, as top-level calls do
   *
   * The length of the path is also checked for maximum recursion depth.
   */
  pathStart?: number;

  /**
   * is this a recursive call from a helpful movement vector? If so, no further helpful movement
   * can also be applied
   */
  isHelpful?: boolean;

  /**
   * resolve collisions even if posDelta is zero - for an item that has been placed
   * where it may already be overlapping other items
   */
  processZeroMovement?: boolean;
};

/**
 * a move that ends exactly against an item it was moving towards, having been
 * apart from it, is a collision even though they don't overlap - it is recorded
 * as one (eg, for a bump sound), but isn't a touch.
 *
 * @returns whether the subject landed on it - arrived exactly on top of it
 */
const recordArrivingJustTouching = <
  RoomId extends string,
  RoomItemId extends string,
>(
  subjectItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  nearbyItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  /**
   * where the subject was before the move
   */
  originalBox: Readonly<XyzBox>,
  posDelta: Xyz,
  room: RoomState<RoomId, RoomItemId>,
  /**
   * where the push path - the items up the push chain, which move with the
   * subject - starts on the path stack
   */
  pathStart: number,
): boolean => {
  if (
    pushPathStack.includes(nearbyItem.id, pathStart) ||
    nearbyItem[itemBehaviourKey].isNonSolid(nearbyItem, subjectItem) ||
    subjectItem[itemBehaviourKey].isNonSolid(subjectItem)
  ) {
    return false;
  }
  const { box } = subjectItem.state;
  const { box: nearbyBox } = nearbyItem.state;
  const axis = boxFacesJustTouchingAxis(box, nearbyBox);
  if (axis === undefined) {
    return false;
  }
  const sizeAxis = sizeAxes[axis];
  const nearbyIsAhead = nearbyBox[axis] >= box[axis] + box[sizeAxis] - epsilon;
  const movingTowards = nearbyIsAhead ? posDelta[axis] > 0 : posDelta[axis] < 0;
  // was apart, not already touching (eg, scraping along it):
  const gapBefore =
    nearbyIsAhead ?
      nearbyBox[axis] - (originalBox[axis] + originalBox[sizeAxis])
    : originalBox[axis] - (nearbyBox[axis] + nearbyBox[sizeAxis]);
  if (!movingTowards || gapBefore < epsilon) {
    return false;
  }
  if (isFreeItem(subjectItem)) {
    recordCollision(subjectItem, nearbyItem, room);
    return (
      axis === "z" &&
      !nearbyIsAhead &&
      subjectItem.state.standingOnItemId === null
    );
  }
  if (isFreeItem(nearbyItem)) {
    // a mover that isn't free (eg, a lift) has nowhere to record the collision,
    // but the free item it arrived against does:
    recordCollision(nearbyItem, subjectItem, room);
  }
  return false;
};

/**
 * the items pushed by every moveItem call in progress, shared to save allocating
 * per call. Each call pushes onto the top, and truncates back to where it found
 * it once it has backed off from its own pushed items, so recursive calls nest
 */
const pushedItemsStack: Array<UnionOfAllItemInPlayTypes<string, string>> = [];

/**
 * how far the subject has travelled from its original box during the current
 * moveItem call, as of the collisions handled so far
 *
 * never keep a reference to this, or read it again, across a recursive moveItem
 * call, it will be overwritten
 */
const travelSoFarBuffer: Xyz = { x: 0, y: 0, z: 0 };

/**
 * the items collided with, or only touched, by every moveItem call in progress,
 * shared to save allocating per call. Each call's - its collisions, then the
 * items it only touches - are the top of the stack while it runs: recursive
 * calls add theirs above, and truncate back before returning
 */
const collisionsStack: Array<UnionOfAllItemInPlayTypes<string, string>> = [];

/**
 * the ids on the push path of every moveItem call in progress, shared to save
 * allocating per call - each call's path is the stack from its `pathStart` up.
 * Calls add the subject before recursing and remove it after, so paths nest
 */
const pushPathStack: Array<string> = [];

/**
 * whether an item is among a call's collisions - `[start, end)` on the
 * collisions stack
 */
const collisionsStackIncludesItemInRange = (
  /**
   * the item to look for
   */
  item: UnionOfAllItemInPlayTypes<string, string>,
  /**
   * where the call's collisions start on the collisions stack
   */
  start: number,
  /**
   * where the call's collisions end on the collisions stack - the items it
   * only touches come after, and aren't searched
   */
  end: number,
): boolean => {
  for (let i = start; i < end; i++) {
    if (collisionsStack[i] === item) {
      return true;
    }
  }
  return false;
};

/**
 * back the subject off from everything it has pushed since its last back-off,
 * then forget those items. Pushing a run of items before backing off from any
 * of them means every push in the run is from the same position
 */
const backOffFromPushedItems = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
  subjectItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  /**
   * the largest partial back-off along the travel from the pushes, if any were
   * along the travel
   */
  alongTravelPushBackOff: undefined | Xyz,
  /**
   * where the subject's pushed items start on the stack
   */
  pushedItemsStart: number,
) => {
  if (
    alongTravelPushBackOff === undefined &&
    pushedItemsStack.length === pushedItemsStart
  ) {
    // pushed nothing since the last back-off:
    return;
  }
  if (alongTravelPushBackOff !== undefined) {
    updateItemPosition(
      room,
      subjectItem,
      addXyz(subjectItem.state.box, alongTravelPushBackOff),
    );
  }
  for (let i = pushedItemsStart; i < pushedItemsStack.length; i++) {
    // only the subject's own pushes are read, so they are of its room's types:
    const pushedItem = pushedItemsStack[i] as UnionOfAllItemInPlayTypes<
      RoomId,
      RoomItemId
    >;
    // it is possible we pushed the other item out of the room (if it is a playable character),
    // or into non-existence in some other way
    if (room.items[pushedItem.id] === undefined) {
      continue;
    }
    // recalculate the subject's mtv given the new pushee position. This will make the pusher
    // go more slowly, since the pushee will move a bit less than the subject originally wanted to
    updateItemPosition(
      room,
      subjectItem,
      addXyz(
        subjectItem.state.box,
        mtv(subjectItem.state.box, pushedItem.state.box),
      ),
    );
  }
  pushedItemsStack.length = pushedItemsStart;
};

// from an mtv, multiplying by these vectors gives the push vector to apply to the pushed item
// - they are negative since the push is in the opposite direction to the mtv.
const pushVectorMultiplierForceful = { x: -1, y: -1, z: -1 };

// pushing an item of equal mass gives these multipliers. They are smaller
// in z since a upward push should be harder than pushing in x,y plane
// and if downwards pushing, the item is probably already falling anyway so probably doesn't need
// a push.
// the z can't be less than about 0.4 or #safari19triple from original campaign is not possible
// to stack the spring on the drum to get the rabbit
const equalMassPushMultiplierXy = 0.6;
const equalMassPushMultiplierZ = 0.4;

/**
 * the quadratic through (0, 0), (0.5, equalMassMultiplier) and (1, 1) - plain
 * arithmetic, so deterministic across js engines
 */
const pushMultiplierForMassShare = (
  /** the pusher's share of the two items' total mass, 0…1 */
  pusherMassShare: number,
  /** the multiplier when both items have the same mass */
  equalMassMultiplier: number,
): number => {
  const linearCoefficient = 4 * equalMassMultiplier - 1;
  return (
    pusherMassShare *
    (linearCoefficient + (1 - linearCoefficient) * pusherMassShare)
  );
};

const pushMultiplierBuffer: Xyz = { x: 0, y: 0, z: 0 };

/**
 * the mass of the heaviest item the subject is pushing in this move
 */
const heaviestPushedMass = <RoomId extends string, RoomItemId extends string>(
  subjectItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  /**
   * where the move's collisions start on the collisions stack
   */
  collisionsStart: number,
  /**
   * where the move's collisions end on the collisions stack
   */
  collisionsEnd: number,
  forceful: boolean,
  /**
   * where the push path - the items up the push chain, which aren't pushed
   * back - starts on the path stack
   */
  pathStart: number,
): number => {
  let heaviestMass = 0;
  for (let i = collisionsStart; i < collisionsEnd; i++) {
    // only the subject's own collisions are read, so they are of its room's types:
    const collision = collisionsStack[i] as UnionOfAllItemInPlayTypes<
      RoomId,
      RoomItemId
    >;
    const collisionBehaviour = collision[itemBehaviourKey];
    if (
      !pushPathStack.includes(collision.id, pathStart) &&
      collisionBehaviour.isPushableBy(collision, subjectItem, forceful) &&
      !collisionBehaviour.isNonSolid(collision, subjectItem)
    ) {
      heaviestMass = Math.max(heaviestMass, collisionBehaviour.mass(collision));
    }
  }
  return heaviestMass;
};

/**
 * the push multiplier for a non-forceful push, from the pusher's share of its
 * own mass and the pushed mass: 0 for no push, 1 for the whole movement. Writes
 * into a reused buffer
 */
const pushVectorMultiplierByMass = <
  RoomId extends string,
  RoomItemId extends string,
>(
  pusher: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  pushed: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  /**
   * the mass resisting the push - the heaviest of everything pushed at once,
   * so items pushed together move together
   */
  pushedMass: number,
): Xyz => {
  const pusherMass = pusher[itemBehaviourKey].mass(pusher);
  const pusherMassShare = pusherMass / (pusherMass + pushedMass);
  const multiplierXy =
    // sliding items move the whole way in xy:
    pushed[itemBehaviourKey].isSliding(pushed) ?
      1
    : pushMultiplierForMassShare(pusherMassShare, equalMassPushMultiplierXy);
  pushMultiplierBuffer.x = -multiplierXy;
  pushMultiplierBuffer.y = -multiplierXy;
  pushMultiplierBuffer.z = -pushMultiplierForMassShare(
    pusherMassShare,
    equalMassPushMultiplierZ,
  );
  return pushMultiplierBuffer;
};

/**
 * the subject's movement, as given to the items it touches. A subject given no
 * movement (see processZeroMovement) is overlapping the touched item, so is treated as
 * moving into it, against the mtv that would separate them - touched items can then
 * react to the direction they are being pushed in
 */
const touchMovementVector = <RoomId extends string, RoomItemId extends string>(
  subjectItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  touchedItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  originalBox: Readonly<XyzBox>,
  posDelta: Xyz,
): Xyz =>
  xyzEqual(posDelta, originXyz) ?
    scaleXyz(mtv(subjectItem.state.box, touchedItem.state.box), -1)
  : subXyz(subjectItem.state.box, originalBox);

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
  handleTouches,
  pathStart = pushPathStack.length,
  forceful = false,
  isHelpful,
  processZeroMovement = false,
}: MoveItemOptions<RoomId, RoomItemId>): boolean => {
  if (!processZeroMovement && xyzEqual(posDelta, originXyz)) {
    // applying zero movement - do nothing
    return false;
  }

  /**
   * record if any recursive call caused a helpful movement vector to be applied.
   * this is tracked because we only want one helpful movement vector per top-level
   * moveItem call. Ie, if you push something that gets an hmv, you can't also have one.
   */
  let causedHelpful = false;

  // recursive calls add to and then remove from the path, so its length is the same whenever read here:
  const pathDepth = pushPathStack.length - pathStart;

  const {
    state: { box: originalBox },
  } = subjectItem;

  if (log) {
    console.group(
      `[${pathDepth === 0 ? `first cause` : `pushed ${pathDepth} deep`}]`,
      "on path",
      pushPathStack.slice(pathStart),
      `💨 moving ${subjectItem.id} @`,
      subjectItem.state.box,
      `\n By:`,
      ...visualiseVectorForLogs(posDelta),
      handleTouches ? "with touch handling" : "skipping touch handling",
    );
  }

  // strategy is to move to the target position, then back off as needed
  updateItemPosition(room, subjectItem, addXyz(originalBox, posDelta));

  if (pathDepth === 0) {
    // record 'first cause' acting on, directly from the mechanics.
    // (n>1)-cause are recorded in the collision loop
    recordActedOnBy(
      undefined,
      subjectItem,
      room,
      posDelta.x !== 0 || posDelta.y !== 0,
      posDelta.z !== 0,
    );
  }

  // this call's collisions are the ones on the stack from here up:
  const collisionsStart = collisionsStack.length;
  // items touching or almost touching the sides travelled towards are found
  // too, so arriving against one (with no overlap to collide with) can still be
  // recorded as a collision:
  appendApproximateCollisionsTowardsWithIndex(
    subjectItem.state.box,
    posDelta,
    room[roomSpatialIndexKey],
    subjectItem,
    collisionsStack,
  );
  // the items collided with first, then the ones only touched or almost
  // touched - checked for arriving against once the collisions are handled:
  let collisionsEnd = collisionsStart;
  for (let i = collisionsStart; i < collisionsStack.length; i++) {
    const nearbyItem = collisionsStack[i];
    if (collision2Items(subjectItem, nearbyItem)) {
      collisionsStack[i] = collisionsStack[collisionsEnd];
      collisionsStack[collisionsEnd] = nearbyItem;
      collisionsEnd++;
    }
  }
  const touchedEnd = collisionsStack.length;
  sortObstaclesAboutPriorityAndOverlapInPlace(
    subjectItem.state.box,
    collisionsStack,
    collisionsStart,
    collisionsEnd,
  );

  if (log) {
    if (collisionsEnd === collisionsStart) {
      console.log(subjectItem.id, "💥👎 'did not collide with anything");
    } else {
      console.log(
        subjectItem.id,
        "💥 collided with item(s):",
        `[${collisionsStack
          .slice(collisionsStart, collisionsEnd)
          .map((c) => c.id)
          .join(", ")}]`,
        collisionsStack.slice(collisionsStart, collisionsEnd),
        "from room items:",
        room.items,
      );
    }
  }

  /**
   * the largest of the partial back-offs along the travel from pushes not yet
   * backed off from - every one points the same way, so the largest also
   * satisfies the others
   */
  let alongTravelPushBackOff: undefined | Xyz = undefined;
  // this call's pushed items are the ones on the stack from here up:
  const pushedItemsStart = pushedItemsStack.length;

  for (
    let collisionIndex = collisionsStart;
    collisionIndex < collisionsEnd;
    collisionIndex++
  ) {
    // only this call's collisions are read, so they are of its room's types:
    const collidedWithItem = collisionsStack[
      collisionIndex
    ] as UnionOfAllItemInPlayTypes<RoomId, RoomItemId>;
    // read once, before the touch handling below, and not again after it. An
    // item can become pushable or not in play (eg, a cyberman waking), but a
    // change made by this touch only goes unseen for the rest of this move
    const collidedWithIsPushable = collidedWithItem[
      itemBehaviourKey
    ].isPushableBy(collidedWithItem, subjectItem, forceful);
    if (!collidedWithIsPushable) {
      // back off from the items pushed so far first, so they protect the subject
      // from this item as they would if it had backed off from each as it went:
      backOffFromPushedItems(
        room,
        subjectItem,
        alongTravelPushBackOff,
        pushedItemsStart,
      );
      alongTravelPushBackOff = undefined;
    }

    // avoid a circular pushing - if these are colliding, the parent
    // calls can handle it. This can avoid:
    //    A -push-> B --push-> C -push-> A
    //      -push-> C          ^ here there's no need to handle C pushing A, since A is up
    //                           the tree and will be handled for us when A pushes C directly
    //                           when it is done pushing B
    if (pushPathStack.includes(collidedWithItem.id, pathStart)) {
      if (log) {
        console.log(
          `🦺🦺🦺 skipping collision handling for ${subjectItem.id} with ${collidedWithItem.id} since ${subjectItem.id} was already visited to get here`,
        );
      }
      continue;
    }

    if (!collision2Items(subjectItem, collidedWithItem)) {
      // it is possible there is no longer a collision due to previous pushing and backing-off of the subjectItem - we have
      // been protected from this collision by previous collisions so it no longer applies
      if (log) {
        console.log(
          `${subjectItem.id} @`,
          subjectItem.state.box,
          `❌💥 no longer colliding with ${collidedWithItem.id} @`,
          collidedWithItem.state.box,
          `after handling previous collisions`,
        );
      }
      continue;
    } else {
      if (log) {
        console.log(
          `${subjectItem.id} @`,
          subjectItem.state.box,
          `*is STILL* 💥 with ${collidedWithItem.id} @`,
          collidedWithItem.state.box,
          `after handling previous collisions`,
        );
      }
    }

    // record this acting on:
    recordActedOnBy(
      subjectItem.id,
      collidedWithItem,
      room,
      // this is an approximation: assumes that the axes of the force acting on a pushed object is the same as the
      // axes of the force on the pusher
      posDelta.x !== 0 || posDelta.y !== 0,
      posDelta.z !== 0,
    );

    if (
      handleTouches &&
      // overlapping by no more than floating point error (eg left over from
      // backing off from an item beside this one) is still backed off from and
      // recorded, but isn't a touch:
      lengthXyz(mtv(subjectItem.state.box, collidedWithItem.state.box)) >=
        epsilon
    ) {
      if (log) {
        console.group(
          `handling touch of ${subjectItem.id} touching ${collidedWithItem.id}`,
        );
      }
      const touchEvent = {
        movingItem: subjectItem,
        touchedItem: collidedWithItem,
        movementVector: touchMovementVector(
          subjectItem,
          collidedWithItem,
          originalBox,
          posDelta,
        ),
        gameState,
        deltaMS,
        room,
      };
      subjectItem[itemBehaviourKey].onTouch(subjectItem, touchEvent, true);
      handleDisappearingOnTouch(touchEvent);
      if (log) {
        console.groupEnd();
      }
    }

    // the touch handler might have removed either item from the world - in this case we can move on or stop:
    if (room.items[subjectItem.id] === undefined) {
      if (log) {
        console.log(
          `mover ${subjectItem.id} is not in the room, so will halt processing their movement`,
        );
        console.groupEnd();
      }
      // nothing to back off from, outside the room - forget this call's items:
      pushedItemsStack.length = pushedItemsStart;
      collisionsStack.length = collisionsStart;
      return causedHelpful;
    }
    if (room.items[collidedWithItem.id] === undefined) {
      if (log) {
        console.log(
          `collided item ${subjectItem.id} is not in the room, will skip that collision`,
        );
      }
      continue;
    }

    // check for solidness has to be done after touch handling since touching non-solid items can have side-effects
    if (
      collidedWithItem[itemBehaviourKey].isNonSolid(
        collidedWithItem,
        subjectItem,
      ) ||
      subjectItem[itemBehaviourKey].isNonSolid(subjectItem)
    ) {
      if (log) {
        console.log(
          `moving ${subjectItem.id}`,
          "either mover or ",
          collidedWithItem.id,
          "is not solid so won't calculate/apply mtv",
        );
      }
      continue;
    }

    const backingOffMtv: Xyz = { x: 0, y: 0, z: 0 };
    // how far the subject has travelled so far, after any backing off already
    // done - eg, none across a wall it is sliding along. Filled just before its
    // one read below, since recursive moveItem calls overwrite it:
    const subjectBox = subjectItem.state.box;
    travelSoFarBuffer.x = subjectBox.x - originalBox.x;
    travelSoFarBuffer.y = subjectBox.y - originalBox.y;
    travelSoFarBuffer.z = subjectBox.z - originalBox.z;
    const backingOffType = backingOffTranslationAfterCollision(
      subjectItem,
      collidedWithItem,
      forceful,
      travelSoFarBuffer,
      originalBox,
      backingOffMtv,
    );

    /**
     * already touching distinguishes between hitting something and scraping on it, or landing on the ground
     * and the collision detection finding that you were already standing on it. Used to set the collidedWith
     * state - for example, for sound rendering
     */
    const wasAlreadyTouchingCollidedWithItem = veryClose(
      lengthXyz(
        mtv(
          // look back to check with the original box, not the current, updated box
          // after the movement delta was applied:
          originalBox,
          collidedWithItem.state.box,
        ),
      ),
      // a zero mtv means we are already touching the item, but not intersecting it
      0,
    );

    if (log) {
      console.log(
        `${subjectItem.id} collided 💥 with ${collidedWithItem.id} to give backing-off mtv`,
        backingOffMtv,
      );
    }

    // push any pushable items that we intersect:
    if (collidedWithIsPushable) {
      const pushMultiplier =
        forceful ?
          pushVectorMultiplierForceful
        : pushVectorMultiplierByMass(
            subjectItem,
            collidedWithItem,
            heaviestPushedMass(
              subjectItem,
              collisionsStart,
              collisionsEnd,
              forceful,
              pathStart,
            ),
          );

      // the vector in the direction of the push (opposite direction to the mtv)
      const forwardPushVector = elementWiseProductXyz(
        backingOffMtv,
        pushMultiplier,
      );

      if (log) {
        console.log(
          `${subjectItem.id} will recursively push ${collidedWithItem.id} by`,
          forwardPushVector,
          "with push coefficient of",
          pushMultiplier,
        );
      }

      const {
        x: pushedXBefore,
        y: pushedYBefore,
        z: pushedZBefore,
      } = collidedWithItem.state.box;
      if (pathDepth < maxPushRecursionDepth) {
        // recursively apply push to pushed item
        // (but only if we didn't already recurse down to the maximum depth)
        pushPathStack.push(subjectItem.id);
        causedHelpful ||= moveItem({
          subjectItem: collidedWithItem,
          posDelta: forwardPushVector,
          gameState,
          room,
          deltaMS,
          forceful,
          pathStart,
          handleTouches,
        });
        // that recursive call is done now - the path is shared to reduce gc
        pushPathStack.pop();

        if (
          isFreeItem(collidedWithItem) &&
          collidedWithItem.state.standingOnItemId === subjectItem.id
        ) {
          // carried up by what it stands on:
          recordLiftVel(
            collidedWithItem,
            collidedWithItem.state.box.z - pushedZBefore,
            room,
            deltaMS,
          );
        }
      } else if (log) {
        console.warn("hit recursion depth limit", new Error());
      }

      // it is possible we pushed the other item out of the room (if it is a playable character),
      // or into non-existence in some other way
      if (room.items[collidedWithItem.id] === undefined) {
        continue;
      }

      const pushedItemStuck =
        veryClose(collidedWithItem.state.box.x, pushedXBefore) &&
        veryClose(collidedWithItem.state.box.y, pushedYBefore) &&
        veryClose(collidedWithItem.state.box.z, pushedZBefore);

      if (pushedItemStuck) {
        // a pushable item that can't move stops the subject as an immovable one
        // would: back off from it now, so it protects the subject from whatever
        // is handled after it, and straight out of it from wherever that leaves
        // the subject, to slide along it
        backOffFromPushedItems(
          room,
          subjectItem,
          alongTravelPushBackOff,
          pushedItemsStart,
        );
        alongTravelPushBackOff = undefined;
        updateItemPosition(
          room,
          subjectItem,
          addXyz(
            subjectItem.state.box,
            mtv(subjectItem.state.box, collidedWithItem.state.box),
          ),
        );
      } else {
        if (backingOffType === "alongTravel") {
          // we are going slower due to pushing so will back off, but not completely -
          // the whole mtv would back off all the way out of the item, but we keep
          // going as far along the travel as the pushed item really went (which can be
          // less than it was pushed by, eg if it is pushing something else in turn):
          const backingOffLength = lengthXyz(backingOffMtv);
          if (backingOffLength > 0) {
            // the backing off points against the travel, so negate to measure along it:
            const pushedAlongTravel =
              -(
                (collidedWithItem.state.box.x - pushedXBefore) *
                  backingOffMtv.x +
                (collidedWithItem.state.box.y - pushedYBefore) * backingOffMtv.y
              ) / backingOffLength;
            const pushBackOff = scaleXyz(
              backingOffMtv,
              Math.max(0, 1 - pushedAlongTravel / backingOffLength),
            );
            if (
              alongTravelPushBackOff === undefined ||
              lengthXyz(pushBackOff) > lengthXyz(alongTravelPushBackOff)
            ) {
              alongTravelPushBackOff = pushBackOff;
            }
          }
        }

        // backed off from once everything is pushed, so every push is from the same position:
        pushedItemsStack.push(collidedWithItem);
      }
    } else {
      // collision was not with a pushable thing - just back off
      // to slide on the obstacle (we're not pushing it):
      updateItemPosition(
        room,
        subjectItem,
        addXyz(subjectItem.state.box, backingOffMtv),
      );

      if (log) {
        console.log(
          `${subjectItem.id} can't push ${collidedWithItem.id} so simply backed off to`,
          subjectItem.state.box,
        );
      }
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
        // check if we are not colliding with the item we were previously standing on
        // - in this case is ok to clear out item's standingOn slot
        !collisionsStackIncludesItemInRange(
          stoodOnItem(subjectItem.state.standingOnItemId, room),
          collisionsStart,
          collisionsEnd,
        )
      ) {
        if (log) {
          console.log(
            `${subjectItem.id} is a free item and collided vertically with ${collidedWithItem.id}`,
            collidedWithItem,
            `so will set ${subjectItem.id} as standing on ${collidedWithItem.id}`,
          );
        }

        // not colliding with the thing we were stood on before - take over the slot:
        removeStandingOn(subjectItem, room);
        setStandingOnWithoutRemovingOldFirst({
          above: subjectItem,
          below: collidedWithItem,
        });
      }
    }

    // checking not already touching prevents 'scraping' from rendering/sounding like a collision
    // however - maybe if we want scraping sounds this could be useful
    if (!wasAlreadyTouchingCollidedWithItem) {
      if (log) {
        console.log(
          `📝 recording to state: collision of ${subjectItem.id} with ${collidedWithItem.id}`,
          "originalBox:",
          originalBox,
          "->",
          "newBox:",
          subjectItem.state.box,
          "delta",
          subXyz(subjectItem.state.box, originalBox),
        );
      }

      if (isFreeItem(subjectItem)) {
        recordCollision(subjectItem, collidedWithItem, room);
      } else if (isFreeItem(collidedWithItem)) {
        // a mover that isn't free but can move (eg, a lift) just collided with a free item
        // - it has nowhere to record this collision itself, but the free item does, ie
        // for a player landing on a rising lift, it is possible that either they fall to the lift
        // first, or the lift rises to them - both should be recorded as collisions on the free item
        // ie the player landing on (colliding with) the lift
        recordCollision(collidedWithItem, subjectItem, room);
      }
    }
  }

  backOffFromPushedItems(
    room,
    subjectItem,
    alongTravelPushBackOff,
    pushedItemsStart,
  );

  // arriving against an item is judged from where the subject ended up, after
  // backing off from what it collided with:
  let landed = false;
  for (let i = collisionsEnd; i < touchedEnd; i++) {
    // only this call's items are read, so they are of its room's types:
    const touchedItem = collisionsStack[i] as UnionOfAllItemInPlayTypes<
      RoomId,
      RoomItemId
    >;
    // touch handling might have removed it:
    if (
      room.items[touchedItem.id] !== undefined &&
      recordArrivingJustTouching(
        subjectItem,
        touchedItem,
        originalBox,
        posDelta,
        room,
        pathStart,
      )
    ) {
      landed = true;
    }
  }

  if (landed) {
    // only free items can land, so assume is free:
    const freeSubjectItem = subjectItem as FreeItem<RoomId, RoomItemId>;

    // landed with no overlap for the collision handling to find, maybe on
    // several items at once (eg, across the seam between two blocks):
    const maybeStandingOn =
      findStandingOnWithHighestPriorityAndMostOverlapInRange(
        freeSubjectItem,
        // only this call's items are read, so they are of its room's types:
        collisionsStack as Array<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>>,
        collisionsEnd,
        touchedEnd,
      );
    if (maybeStandingOn !== undefined) {
      setStandingOnWithoutRemovingOldFirst({
        above: freeSubjectItem,
        below: maybeStandingOn,
      });
    }
  }

  if (
    // usually only free items move, but lifts are an exception
    isFreeItem(subjectItem) &&
    // somewhere down the tree already caused an hmv to be applied
    !causedHelpful &&
    // don't allow helpful movement vectors to recursively call others -
    // only one per top-level moveItem call
    !isHelpful
  ) {
    const hmv = helpfulMovementVector(
      subjectItem,
      originalBox,
      posDelta,
      deltaMS,
      room,
      collisionsStack,
      collisionsStart,
      collisionsEnd,
    );
    if (hmv) {
      if (log) {
        console.log(
          `🦺 applying helpful movement vector to ${subjectItem.id} of`,
          ...visualiseVectorForLogs(hmv),
        );
      }

      pushPathStack.push(subjectItem.id);
      moveItem({
        subjectItem,
        posDelta: hmv,
        gameState,
        room,
        deltaMS,
        forceful: false,
        handleTouches,
        isHelpful: true,
        // including self in the path of the recursive call here helps
        // cases like in #moonbase20/#moonbase23 (arrow rooms) where
        // the sliding blocks get piled up next to a door, and the sliding
        // vector b2 being pushed by b1 comes back to impact b1
        pathStart,
      });
      pushPathStack.pop();

      causedHelpful = true;
    }
  }

  // this call's collisions are no longer needed:
  collisionsStack.length = collisionsStart;

  const movedZ = subjectItem.state.box.z - originalBox.z;
  if (
    // the enclosing call's movedZ already includes this helpful movement, so it
    // moves the riders - moving them here too would move them twice:
    !isHelpful &&
    // rising riders are pushed, so only riding down is handled here
    movedZ < 0 &&
    pathDepth < maxPushRecursionDepth
  ) {
    moveRidersDown(
      subjectItem,
      movedZ,
      gameState,
      room,
      deltaMS,
      handleTouches,
      pathStart,
    );
  }

  // update progression only if actually moved, by more than floating point error:
  if (!xyzVeryClose(subjectItem.state.box, originalBox)) {
    stampWithMovedProgression(room, subjectItem);
  }

  if (log) {
    console.groupEnd();
  }

  return causedHelpful;
};

/**
 * riders (items standing on the moved item) ride down with it, but no faster
 * than they can fall. Rising riders are not handled here, since they are pushed
 * upwards using the normal physics path
 */
const moveRidersDown = <RoomId extends string, RoomItemId extends string>(
  movedItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  /**
   * how far the moved item actually went in z, after any collisions
   */
  movedZ: number,
  gameState: GameState<RoomId>,
  room: RoomState<RoomId, RoomItemId>,
  deltaMS: number,
  handleTouches: MoveItemOptions<RoomId, RoomItemId>["handleTouches"],
  /**
   * where the push path starts on the path stack, as in {@link MoveItemOptions}
   */
  pathStart: number,
) => {
  for (const riderId in movedItem.state.stoodOnBy) {
    const rider = stoodOnByItem(riderId, room);
    const riderTerminalFallVelocity =
      -rider[itemBehaviourKey].terminalFallVelocity(rider) * deltaMS;

    recordActedOnBy(movedItem.id, rider, room, false, true);
    const riderZBefore = rider.state.box.z;
    pushPathStack.push(movedItem.id);
    moveItem({
      subjectItem: rider,
      posDelta: {
        x: 0,
        y: 0,
        // move down, but only up to the termianl vall velocity of the item:
        z: Math.max(movedZ, riderTerminalFallVelocity),
      },
      gameState,
      room,
      deltaMS,
      forceful: false,
      pathStart,
      handleTouches,
    });
    pushPathStack.pop();
    recordLiftVel(rider, rider.state.box.z - riderZBefore, room, deltaMS);
  }
};

/**
 * records how fast a rider was carried in z by what it stands on, so it can
 * keep that speed on leaving. A rider can be carried more than once in a tick
 */
const recordLiftVel = <RoomId extends string, RoomItemId extends string>(
  rider: FreeItem<RoomId, RoomItemId>,
  /** how far the rider was actually carried in z */
  carriedZ: number,
  room: RoomState<RoomId, RoomItemId>,
  deltaMS: number,
) => {
  const { liftVel } = rider.state;
  if (liftVel.atRoomTime === room.roomTime) {
    liftVel.z += carriedZ / deltaMS;
  } else {
    liftVel.z = carriedZ / deltaMS;
    liftVel.atRoomTime = room.roomTime;
  }
};
