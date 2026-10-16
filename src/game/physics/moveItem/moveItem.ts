import { itemBehaviourKey } from "../../../model/ItemInPlay";
import {
  type FreeItem,
  isFreeItem,
  isSlidingItem,
  type UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlayNarrowedUnions";
import { roomSpatialIndexKey, type RoomState } from "../../../model/RoomState";
import {
  iterateStoodOnByItems,
  stoodOnItem,
} from "../../../model/stoodOnItemsLookup";
import { veryClose } from "../../../utils/epsilon";
import {
  addXyz,
  elementWiseProductXyz,
  lengthXyz,
  originXyz,
  scaleXyz,
  subXyz,
  type Xyz,
  type XyzBox,
  xyzEqual,
} from "../../../utils/vectors/vectors";
import { visualiseVectorForLogs } from "../../../utils/vectors/visualiseVectorForLogs";
import {
  collision2Items,
  collisionItemWithIndex,
} from "../../collision/aabbCollision";
import { type GameState } from "../../gameState/GameState";
import { removeStandingOn } from "../../gameState/mutators/standingOn/removeStandingOn";
import { setStandingOnWithoutRemovingOldFirst } from "../../gameState/mutators/standingOn/setStandingOnWithoutRemovingOldFirst";
import { updateItemPosition } from "../../gameState/mutators/updateItemBox";
import { sortObstaclesAboutPriorityAndVector } from "../collisionsOrder";
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
   * Otherwise, if false/undefined, recursive pushing will split the movement 50/50 between mover and pushee.
   *
   * Heels putting a carried item down should be forceful - everything has to move the full amount!
   *
   * Lifts are always forceful - they don't slow down then things are on them. But they can be stopped
   * as a special case if something gets stuck under them.
   */
  forceful?: boolean;

  recursionDepth?: number;

  /**
   * whether the items touched while moving react to the touch
   */
  handleTouches: boolean;

  /**
   * the nodes we previously visited on the path down the tree to get to here.
   *
   * only required if this is a non-top-level call, recursive calls will always be passed this
   * down from the parent call
   *
   * undefined for an empty path (a top-level call), so moves that push nothing allocate no Set
   *
   * The size of the path is also checked for maximum recursion depth.
   */
  visited?: Set<RoomItemId>;

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
  visited,
  // forceful must be explicitly given if recursive (not a top-level moveItem call), otherwise
  // an item which is mid-chain will make further calls forceful even though it is only the
  // receiver of an upstream push
  forceful = subjectItem[itemBehaviourKey].pushesForcefully,
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

  // recursive calls add to and then delete from the path, so its size is the same whenever read here:
  const pathDepth = visited?.size ?? 0;
  // the path to pass to recursive calls - only created if this call recurses:
  let pathToHere = visited;

  const {
    state: { box: originalBox },
  } = subjectItem;

  if (log) {
    console.group(
      `[${pathDepth === 0 ? `first cause` : `pushed ${pathDepth} deep`}]`,
      "on path",
      visited === undefined ? [] : [...visited.values()],
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

  const sortedCollisions = sortObstaclesAboutPriorityAndVector(
    posDelta,
    collisionItemWithIndex(subjectItem, room[roomSpatialIndexKey]),
  );

  if (log) {
    if (sortedCollisions.length === 0) {
      console.log(subjectItem.id, "💥👎 'did not collide with anything");
    } else {
      console.log(
        subjectItem.id,
        "💥 collided with item(s):",
        `[${sortedCollisions.map((c) => c.id).join(", ")}]`,
        sortedCollisions,
        "from room items:",
        room.items,
      );
    }
  }

  for (const collidedWithItem of sortedCollisions) {
    // avoid a circular pushing - if these are colliding, the parent
    // calls can handle it. This can avoid:
    //    A -push-> B --push-> C -push-> A
    //      -push-> C          ^ here there's no need to handle C pushing A, since A is up
    //                           the tree and will be handled for us when A pushes C directly
    //                           when it is done pushing B
    if (visited?.has(collidedWithItem.id)) {
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

    if (handleTouches) {
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

    const collidedWithIsPushable = collidedWithItem[
      itemBehaviourKey
    ].isPushableBy(collidedWithItem, subjectItem, forceful);

    const backingOffMtv = backingOffTranslationAfterCollision(
      subjectItem,
      collidedWithItem,
      forceful,
      originalBox,
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
          subjectItem.state.box,
          backingOffMtv, // this would back off all the way out of the item
          // but we keep going some and stay partially inside
          forwardPushVector,
        ),
      );

      if (log) {
        console.log(
          `${subjectItem.id} will recursively push ${collidedWithItem.id} by`,
          forwardPushVector,
          "with push coefficient of",
          pushMultiplier,
        );
      }

      if (pathDepth < maxPushRecursionDepth) {
        const pushedZBefore = collidedWithItem.state.box.z;
        // recursively apply push to pushed item
        // (but only if we didn't already recurse down to the maximum depth)
        pathToHere ??= new Set<RoomItemId>();
        causedHelpful ||= moveItem({
          subjectItem: collidedWithItem,
          posDelta: forwardPushVector,
          gameState,
          room,
          deltaMS,
          forceful,
          visited: pathToHere.add(subjectItem.id),
          handleTouches,
        });
        // that recursive call is done now, and path is edited in-place to reduce gc
        pathToHere.delete(subjectItem.id);

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

      // recalculate the subject's mtv given the new pushee position. This will make the pusher
      // go more slowly, since the pushee will move a bit less than the subject originally wanted to
      updateItemPosition(
        room,
        subjectItem,
        addXyz(
          subjectItem.state.box,
          mtv(subjectItem.state.box, collidedWithItem.state.box),
        ),
      );
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
      collidedWithItem[itemBehaviourKey].isStandable(
        collidedWithItem,
        subjectItem,
      ) &&
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

    if (
      // TODO: it isn't clear why a non-free item would be colliding with anything(?)
      isFreeItem(subjectItem) &&
      // checking not already touching prevents 'scraping' from rendering/sounding like a collision
      // however - maybe if we want scraping sounds this could be useful
      !wasAlreadyTouchingCollidedWithItem
    ) {
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

      recordCollision(subjectItem, collidedWithItem, room);
    }
  }

  if (
    // TODO: it isn't clear why a non-free item would be moving - tighten up moveItem input params
    // and remove this check
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
      sortedCollisions,
    );
    if (hmv) {
      if (log) {
        console.log(
          `🦺 applying helpful movement vector to ${subjectItem.id} of`,
          ...visualiseVectorForLogs(hmv),
        );
      }

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
        visited: (pathToHere ??= new Set<RoomItemId>()).add(subjectItem.id),
      });
      pathToHere.delete(subjectItem.id);

      causedHelpful = true;
    }
  }

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
      pathToHere,
    );
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
  /** undefined for an empty path, as in {@link MoveItemOptions} */
  visited: Set<RoomItemId> | undefined,
) => {
  let pathToHere = visited;
  for (const rider of iterateStoodOnByItems(movedItem.state.stoodOnBy, room)) {
    const riderTerminalFallVelocity =
      -rider[itemBehaviourKey].terminalFallVelocity(rider) * deltaMS;

    recordActedOnBy(movedItem.id, rider, room, false, true);
    const riderZBefore = rider.state.box.z;
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
      visited: (pathToHere ??= new Set<RoomItemId>()).add(movedItem.id),
      handleTouches,
    });
    pathToHere.delete(movedItem.id);
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
