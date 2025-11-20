import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";

import {
  dotProductXyz,
  lengthXyzSquared,
  subXyz,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { isPushable } from "../itemPredicates";
import { mtv, mtvAlongVector } from "../mtv";

/**
 * An mtv  in a specific direction - either:
 *
 *  - `mtvAlongVector`   : colliding with a pushable thing and pushing in xy only (no z)
 *  - or, a normal `mtv` : if colliding up/down, or colliding with a non-pushable
 *
 */
export const backingOffTranslationAfterCollision = <
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

  const backingOffSimpleMtv = mtv(
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
    backingOffSimpleMtv.z === 0
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
    // the projection -
    //
    //  x/dist²
    //  is (x➗dist)➗dist,
    //  is projection➗dist,
    //  ie the projection as fraction of the travel distance
    const backingOffProjectedOnMovementVectorMagnitude: number =
      dotProductXyz(backingOffSimpleMtv, subjectTravelReverseVector) /
      travelRevDistSquared;

    // this doesn't apply along z - you can't 'push' upwards. Well, you can, but that's the
    // normal aabb mtvs
    subjectTravelReverseVector.z = 0;

    // a little bit wider than 45° (which would be 0.5 here)
    if (backingOffProjectedOnMovementVectorMagnitude > 0.44) {
      return mtvAlongVector(
        subjectItem.state.position,
        subjectItem.aabb,
        collidedWithItem.state.position,
        collidedWithItem.aabb,
        // this doesn't apply along z - you can't 'push' upwards. Well, you can, but that's the
        // normal aabb mtvs
        subjectTravelReverseVector,
      );
    }
  }

  return backingOffSimpleMtv;
};
