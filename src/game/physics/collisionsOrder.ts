import type {
  UnionOfAllItemInPlayTypes,
  ItemInPlayType,
} from "../../model/ItemInPlay";
import type { Xyz } from "../../utils/vectors/vectors";
import { dotProductXyz } from "../../utils/vectors/vectors";

export type SortableObstacle = Pick<
  UnionOfAllItemInPlayTypes,
  "aabb" | "id"
> & {
  state: { position: Xyz };
  type: ItemInPlayType;
};

/**
 * since conveyors can lead to other conveyors, sort them so that the
 * active conveyor will always be the first one in the chain when two
 * are stood on at once. This allows objects to be nicely moved around
 * conveyor corners (see blacktooth26)
 */
/*
const conveyorOrderComparator = (
  a: ItemInPlay<"conveyor">,
  b: ItemInPlay<"conveyor">,
) => {
  const aLeadsTo = addXyz(
    a.state.position,
    scaleXyz(unitVectors[a.config.direction], blockSizePx.w * a.config.count),
  );

  if (
    xyzEqual(aLeadsTo, b.state.position) ||
    xyzEqual(addXyz(aLeadsTo, blockSizeXyzPx), addXyz(b.state.position, b.aabb))
  ) {
    return -1;
  }

  const bLeadsTo = addXyz(
    b.state.position,
    scaleXyz(unitVectors[b.config.direction], blockSizePx.w * b.config.count),
  );

  if (
    xyzEqual(bLeadsTo, a.state.position) ||
    xyzEqual(addXyz(bLeadsTo, blockSizeXyzPx), addXyz(a.state.position, a.aabb))
  ) {
    return 1;
  }

  return 0;
};
*/

export const obstaclePointEarliestPointInVector = (
  vector: Xyz,
  obstacle: SortableObstacle,
): Xyz => {
  return {
    x:
      vector.x > 0 ?
        obstacle.state.position.x
      : obstacle.state.position.x + obstacle.aabb.x,
    y:
      vector.y > 0 ?
        obstacle.state.position.y
      : obstacle.state.position.y + obstacle.aabb.y,
    z:
      vector.z > 0 ?
        obstacle.state.position.z
      : obstacle.state.position.z + obstacle.aabb.z,
  };
};
/**
 * When hitting two items simultaneously, the order for which to collide with first.
 * Lower is sooner.
 */
export const typeOrderPreference: Record<ItemInPlayType, number> = {
  // least impactful to touch:
  stopAutowalk: 5,
  portal: 5,
  wall: 5,
  doorLegs: 5,
  sceneryPlayer: 5,
  bubbles: 5, // actually never solid so won't collide

  // the game plays better when switches are easier to touch than the blocks they control (eg, pen3)
  switch: 10,

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
  floor: 20,
  floorEdge: 20, // not actually possible to touch
  hushPuppy: 20,
  teleporter: 20,

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

  slidingDeadly: 100,
  moveableDeadly: 100,
  deadlyBlock: 100,
  monster: 100, // most impactful to touch

  // things that are not actually possible to touch
  floatingText: 200,
  emitter: 200,
};

export const collisionsPriorityComparator = <I extends SortableObstacle>(
  a: I,
  b: I,
): number => {
  return typeOrderPreference[a.type] - typeOrderPreference[b.type];
};

export const sortObstaclesAboutPriorityAndVector = <I extends SortableObstacle>(
  vector: Xyz,
  obstacles: Array<I>,
): Array<I> => {
  return obstacles.toSorted((obsA, obsB) => {
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
     * If of the same type, sort obstacles so that the ones the subject will see first (travelling along the
     * @param vector) are first in the list. This gives the natural order of collision
     * to process the mtvs in.
     *
     * Without this, the order of the obstacles can be arbitrary and snagging is possible
     * on the boundary of two adjacent obstacles, for example if falling while holding
     * the direction towards a tower of blocks
     */
    const aDistance = dotProductXyz(
      vector,
      obstaclePointEarliestPointInVector(vector, obsA),
    );
    const bDistance = dotProductXyz(
      vector,
      obstaclePointEarliestPointInVector(vector, obsB),
    );

    if (Math.abs(aDistance - bDistance) < 0.0001) {
      // these are effectively being touched at the same time. Arbitrarily
      // choose based on the alphabetical order of the ids. This means that
      // the order is stable between frames. Otherwise, it would flicker back
      // and forth due to floating point errors, for example if in a nest of
      // joysticks like on#blacktooth47market an moving at exactly 45 degrees,
      // so both joysticks touched have equal claim at being touched first
      return obsA.id < obsB.id ? -1 : 1;
    }

    return aDistance - bDistance;
  });
};
