import { itemBehaviourKey } from "../../../model/ItemInPlay";
import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlayNarrowedUnions";
import {
  dotProductXy,
  lengthXySquared,
  lengthXyzSquared,
  originXyz,
  scaleXyzInPlace,
  type Xyz,
  type XyzBox,
} from "../../../utils/vectors/vectors";
import { collisionBoxes } from "../../collision/aabbCollision";
import { mtvAgainstTravelWriteInto, mtvAlongVectorWriteInto } from "../mtv";

/**
 * which kind of translation {@link backingOffTranslationAfterCollision} wrote:
 *
 *  - `alongTravel` : backwards along the subject's travel in xy - every one
 *                    for the same travel points the same way
 *  - `axisAligned` : a normal, axis-aligned mtv
 */
export type BackingOffType = "alongTravel" | "axisAligned";

/**
 * the widest angle between the reverse of the subject's travel and the
 * collision's contact normal that still backs off (and so pushes) along the
 * travel. A little wider than 45°, so diagonal travel into a face qualifies.
 *
 * It is acos(√0.44) ≈ 48.45°: the angle at which a one-step overlap, projected
 * onto the reverse travel, is 0.44 of the travel's length (0.5 being exactly
 * 45°)
 */
const maxAlongTravelAngleDegrees = 48.45;
const maxAlongTravelAngleRadians = (maxAlongTravelAngleDegrees * Math.PI) / 180;
// squared, so the test needs no square roots:
const minAlongTravelCosSquared = Math.cos(maxAlongTravelAngleRadians) ** 2;

const reverseTravelXyBuffer: Xyz = { x: 0, y: 0, z: 0 };

/**
 * An mtv in a specific direction - either:
 *
 *  - along the reverse of the travel: colliding with a pushable thing and
 *    pushing in xy only (no z)
 *  - or, a normal `mtv` : if colliding up/down, or colliding with a non-pushable
 *
 * @returns which of these was written
 */
export const backingOffTranslationAfterCollision = <
  RoomId extends string,
  RoomItemId extends string,
>(
  subjectItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  collidedWithItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  forceful: boolean,
  /**
   * how far the subject has travelled from `originalBox`, after any backing off
   * already done - its direction is the direction of travel
   */
  travel: Xyz,
  /**
   * where the subject was before the travel
   */
  originalBox: Readonly<XyzBox>,
  /**
   * receives the translation
   */
  writeInto: Xyz,
): BackingOffType => {
  const collidedWithIsPushable = collidedWithItem[
    itemBehaviourKey
  ].isPushableBy(collidedWithItem, subjectItem, forceful);

  // a push can't pull - so a pushable item is never pushed by an mtv pointing
  // along the travel. Unless the subject was overlapping it before travelling,
  // since then it didn't move in through any face:
  mtvAgainstTravelWriteInto(
    subjectItem.state.box,
    collidedWithItem.state.box,
    (
      collidedWithIsPushable &&
        !collisionBoxes(originalBox, collidedWithItem.state.box)
    ) ?
      travel
    : originXyz,
    writeInto,
  );

  // disable this branch to make pushing much more like the original game (only in four directions
  // and having to move 'behind' items in those 4 directions to push them) - it isn't totally clear
  // what the right interpretation of pushing 4-sided AABBs is in an 8-way or analgoue world, but this
  // does make positioning blocks by pushing them easier (and less annoying) and also removes a mechanic
  // where a block can be stuck in a corner, not able to be pushed out
  if (
    !collidedWithIsPushable ||
    // vertical pushing (ie, from lifts) doesn't get the special treatment - this is always
    // using the normal backing off mtv
    writeInto.z !== 0
  ) {
    return "axisAligned";
  }

  const mtvLengthSquared = lengthXyzSquared(writeInto);
  const travelLengthXySquared = lengthXySquared(travel);
  if (mtvLengthSquared === 0 || travelLengthXySquared === 0) {
    // touching without overlap, or no travel in xy to back off along
    return "axisAligned";
  }

  // backing off along the reverse of the travel - this doesn't apply along z, you
  // can't 'push' upwards. Well, you can, but that's the normal aabb mtvs
  reverseTravelXyBuffer.x = -travel.x;
  reverseTravelXyBuffer.y = -travel.y;

  // the angle between the contact normal and the reverse travel - a property of
  // direction only, so the depth of the overlap doesn't affect it. Modifying the
  // mtv to be in the direction of travel allows items to be pushed diagonally
  // for example, even though for aabbs, the mtv is always axis aligned
  const contactDot = dotProductXy(writeInto, reverseTravelXyBuffer);

  if (
    // squaring loses the sign - a contact normal against the reverse travel is never along it:
    contactDot <= 0 ||
    // cos² of the angle, compared without the square roots of the lengths:
    contactDot ** 2 <=
      minAlongTravelCosSquared * mtvLengthSquared * travelLengthXySquared
  ) {
    return "axisAligned";
  }

  mtvAlongVectorWriteInto(
    subjectItem.state.box,
    collidedWithItem.state.box,
    reverseTravelXyBuffer,
    writeInto,
  );
  const backingOffLengthXySquared = lengthXySquared(writeInto);
  if (backingOffLengthXySquared > travelLengthXySquared) {
    // never back past where the subject started - an overlap it started with
    // isn't from the travel:
    scaleXyzInPlace(
      writeInto,
      Math.sqrt(travelLengthXySquared / backingOffLengthXySquared),
    );
  }
  return "alongTravel";
};
