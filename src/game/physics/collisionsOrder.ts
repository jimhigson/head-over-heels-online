import type { ItemInPlayType } from "../../model/itemInPlay/ItemInPlay";
import { boxOverlapVolume, type XyzBox } from "../../utils/vectors/vectors";
import type { CollideableItem } from "../collision/aabbCollision";

export type SortableObstacle = CollideableItem & {
  type: ItemInPlayType;
};

/**
 * When hitting two items simultaneously, the order for which to collide with first.
 * Lower is sooner.
 */
const typeOrderPreference: Record<ItemInPlayType, number> = {
  // least impactful to touch:
  stopAutowalk: 5,
  portal: 5,
  wall: 5,
  blocker: 5,
  doorLegs: 5,
  sceneryPlayer: 5,
  bubbles: 5, // actually never solid so won't collide

  // the game plays better when switches are easier to touch than the blocks they control (eg, pen3)
  switch: 10,
  button: 10,
  // mirrors flip on touch like switches, so are preferentially touched over plain blocks:
  mirror: 10,

  // putting doorframe earlier than wall would make doorways easier to walk into
  // (since hitting both a doorframe and wall simultaneously would preferentially
  // collide with the doorframe) - but it also means that when sliding down walls,
  // it is possible to stand on top of the doorframe
  doorFrame: 15,

  // balls can be more impactful, but by putting them before block,
  // it is easier to knock balls off of towers in rooms like egyptus8,
  // which is fun!
  ball: 18,

  block: 20,
  barrier: 20,
  lamp: 20,
  // only monsters can touch light beams:
  lightBeam: 20,
  floor: 20,
  hushPuppy: 20,
  teleporter: 20,
  portableTeleporter: 20,

  lift: 30,
  movingPlatform: 30,
  pushableBlock: 30,
  portableBlock: 30,
  sceneryCrown: 30,
  slidingBlock: 30,
  spring: 30,

  joystick: 40,
  charles: 40,
  conveyor: 40,

  head: 50,
  heels: 50,
  headOverHeels: 50,

  pickup: 80,

  firedDoughnut: 90,

  // slightly preferential to deadly blocks
  // since they are safe to touch from the sides
  // (in original game they are the same - deadly from any direction)
  spikes: 98,

  // deadly items are the most impactful to touch
  slidingDeadly: 100,
  moveableDeadly: 100,
  deadlyBlock: 100,
  monster: 100,

  // things that are not actually possible to touch
  floatingText: 200,
  particle: 200,
  editorGhost: 200,
  emitter: 200,
  timer: 200,
  soundEffect: 200,
  outOfBounds: 200,
};

export const collisionsPriorityComparator = <I extends SortableObstacle>(
  a: I,
  b: I,
): number => {
  return typeOrderPreference[a.type] - typeOrderPreference[b.type];
};

/**
 * the order to handle the obstacles in: by type priority, then by how much the
 * subject overlaps them, then by id
 */
const compareObstaclesAboutPriorityAndOverlap = <I extends SortableObstacle>(
  subjectBox: Readonly<XyzBox>,
  obsA: I,
  obsB: I,
): number => {
  /*
   * the most important factor in this sort is the type of the items collided with. Less impactful items are moved
   * to the start of the ordering so that they 'protect' against more impactful ones. Eg, if landing simultaneously
   * on a block and a monster, the block should be processed first so that the monster is not touched (and the block
   * becomes the `.standingOn` property of the player)
   */
  const priorityOrder = collisionsPriorityComparator(obsA, obsB);
  if (priorityOrder !== 0) {
    return priorityOrder;
  }

  /*
   * the most-overlapped obstacle first:

   *  - when falling dragging on a stack of (non-coalesced) blocks, falling
   *    while moving towards it, and between two blocks, we don't want to switch
   *    to colliding first with a lower block the moment we start colliding with it,
   *    or else it could give an extra push up, if the mtv with it is on the corner
   *    and the vertical vector is the shortest way out of it.
   *  - likewise, if we switch too late, we can get extra boosts downwards, because
   *    a block now mostly above is collided with first, and the mtv that is shortest
   *    could be downwards, making fall more quickly
   *  - equivalent in xy plane: when walking at 45° along a row of non-coalesced
   *    blocks, boost or snag the subject along the row
   */
  const overlapOrder =
    boxOverlapVolume(subjectBox, obsB.state.box) -
    boxOverlapVolume(subjectBox, obsA.state.box);
  if (Math.abs(overlapOrder) >= 0.000_1) {
    return overlapOrder;
  }

  // these are effectively overlapped as much as each other. Arbitrarily
  // choose based on the alphabetical order of the ids. This means that
  // the order is stable between frames. Otherwise, it would flicker back
  // and forth due to floating point errors, for example if in a nest of
  // joysticks like on#blacktooth47market an moving at exactly 45 degrees,
  // so both joysticks touched have equal claim at being touched first
  return obsA.id < obsB.id ? -1 : 1;
};

/**
 * sorts the obstacles in `[start, end)` in place, ordered as
 * {@link compareObstaclesAboutPriorityAndOverlap}. An insertion sort, since a
 * move rarely collides with more than a few items
 */
export const sortObstaclesAboutPriorityAndOverlapInPlace = <
  I extends SortableObstacle,
>(
  /**
   * the subject's box, after its travel. Every @see obstacle must overlap it
   * - the order is not defined for any that don't
   */
  subjectBox: Readonly<XyzBox>,
  obstacles: I[],
  start: number,
  end: number,
): void => {
  for (let i = start + 1; i < end; i++) {
    const obstacle = obstacles[i];
    let j = i - 1;
    while (
      j >= start &&
      compareObstaclesAboutPriorityAndOverlap(
        subjectBox,
        obstacles[j],
        obstacle,
      ) > 0
    ) {
      obstacles[j + 1] = obstacles[j];
      j--;
    }
    obstacles[j + 1] = obstacle;
  }
};
