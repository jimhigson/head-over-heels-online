import { itemBehaviourKey } from "../../../model/itemInPlay/ItemInPlay";
import type {
  FreeItem,
  UnionOfAllItemInPlayTypes,
} from "../../../model/itemInPlay/ItemInPlayNarrowedUnions";
import type { LatentMovementFrame } from "../../../model/itemInPlay/ItemStateMap";
import { forEachRoomItem } from "../../../model/roomItemsInPlayIterators";
import type { RoomState } from "../../../model/RoomState";
import { stoodOnByItem } from "../../../model/stoodOnItemsLookup";
import {
  originXy,
  scaleXyz,
  subXyz,
  xyEqual,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { originalFramePeriod } from "../../render/animationTimings";

// since the original game pushes items every other frame, the practical latency
// for standing-on items is two frames (80ms)
export const standingOnLatencyMs = 2 * originalFramePeriod;

export const assignLatentMovement = <
  RoomId extends string,
  RoomItemId extends string,
>(
  itemToMove: FreeItem<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  movementDelta: Xyz,
  deltaMS: number,
  /**
   * how long after this tick's end (the current room time) the movement starts
   */
  latency: number,
) => {
  const latentMovementFrame: LatentMovementFrame<RoomItemId> = {
    endAtRoomTime: room.roomTime + deltaMS + latency,
    startAtRoomTime: room.roomTime + latency,
    velocity: scaleXyz(movementDelta, 1 / deltaMS),
    // we know the itemToMove is standing on something, since that's how we found it, so the
    // non-null assertion (!) is safe here:
    fromStandingOn: itemToMove.state.standingOnItemId!,
  };

  itemToMove.state.latentMovement.push(latentMovementFrame);
};

/**
 * whether one item pushed both of these during this tick
 */
const pushedBySameItem = <RoomId extends string, RoomItemId extends string>(
  a: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  b: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
): boolean => {
  const { actedOnAt: aActedOnAt } = a.state;
  const { actedOnAt: bActedOnAt } = b.state;
  if (
    aActedOnAt.roomTime !== room.roomTime ||
    bActedOnAt.roomTime !== room.roomTime
  ) {
    return false;
  }
  for (const pusherId in aActedOnAt.by) {
    if (bActedOnAt.by[pusherId] === true) {
      return true;
    }
  }
  return false;
};

/**
 * the part of a mover's movement on one axis beyond the stander's own - never
 * backwards, against the mover's movement
 */
const movementBeyond = (
  moverMovement: number,
  standerMovement: number,
): number =>
  moverMovement > 0 ? Math.max(0, moverMovement - standerMovement)
  : moverMovement < 0 ? Math.min(0, moverMovement - standerMovement)
  : 0;

/**
 * how far a mover's movement this tick carries an item standing on it. When one
 * item pushed both, that push already moved the stander along with the mover,
 * so it is carried only by any of the mover's movement beyond its own
 */
const carriedMovement = <RoomId extends string, RoomItemId extends string>(
  moverItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  standerItem: FreeItem<RoomId, RoomItemId>,
  /**
   * how far the mover moved this tick
   */
  moverMovement: Xyz,
  /**
   * item id -> box when this tick started
   */
  startingPositions: ReadonlyMap<string, Xyz>,
  room: RoomState<RoomId, RoomItemId>,
): Xyz => {
  const standerStart = startingPositions.get(standerItem.id);
  if (
    standerStart === undefined ||
    !pushedBySameItem(moverItem, standerItem, room)
  ) {
    return moverMovement;
  }
  const standerMovement = subXyz(standerItem.state.box, standerStart);
  return {
    x: movementBeyond(moverMovement.x, standerMovement.x),
    y: movementBeyond(moverMovement.y, standerMovement.y),
    z: 0,
  };
};

const isStoodOnByAnything = (item: UnionOfAllItemInPlayTypes) => {
  for (const _ in item.state.stoodOnBy) {
    return true;
  }
  return false;
};

export const assignLatentMovementFromStandingOn = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
  /** item id -> box when this tick started */
  startingPositions: ReadonlyMap<string, Xyz>,
  deltaMS: number,
  /**
   * the room's progression count when this tick started - items stamped
   * after it are the ones that moved (or resized) during this tick
   */
  progressionAtTickStart: number,
) => {
  /**
   * standing on updated here for all - because, eg, if a lift moves down with a player on it,
   * if the check is done inside the lift's tick, the player is then not on the lift and has no
   * ability to walk (the walk mechanic will return a null result) while the lift descends
   */
  forEachRoomItem(room.items, (moverItem) => {
    if (moverItem.state.movedOrResizedOnProgression <= progressionAtTickStart) {
      // did not move during this tick:
      return;
    }
    if (
      // if nothing is stood on this item, no latent movement to assign:
      !isStoodOnByAnything(moverItem) ||
      // behaviours can turn off latent movement for items
      !moverItem[itemBehaviourKey].createsLatentMovementForStander(moverItem)
    ) {
      return;
    }

    const previousPosition = startingPositions.get(moverItem.id);

    if (previousPosition === undefined) {
      // item was introduced to the world during this tick, can't have latent movement:
      return;
    }

    // work out how much we moved in this frame
    const latentMovement = subXyz(moverItem.state.box, previousPosition);

    // latent movement is only horizontal - anything else, collisions and gravity can handle
    latentMovement.z = 0;

    if (!xyEqual(latentMovement, originXy)) {
      for (const standerId in moverItem.state.stoodOnBy) {
        const standerItem = stoodOnByItem(standerId, room);
        const carried = carriedMovement(
          moverItem,
          standerItem,
          latentMovement,
          startingPositions,
          room,
        );
        if (xyEqual(carried, originXy)) {
          continue;
        }
        assignLatentMovement(
          standerItem,
          room,
          carried,
          deltaMS,
          // the mover moved over the whole tick just gone, so its movement is
          // replayed the latency after it started, not after the tick ended:
          standingOnLatencyMs - deltaMS,
        );
      }
    }
  });
};
