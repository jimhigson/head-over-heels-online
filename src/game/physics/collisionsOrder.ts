import type { UnknownItemInPlay, ItemInPlayType } from "../../model/ItemInPlay";
import type { Xyz } from "../../utils/vectors/vectors";
import { dotProductXyz } from "../../utils/vectors/vectors";

export type SortableObstacle = Pick<UnknownItemInPlay, "aabb" | "id"> & {
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
/** when hitting two items simultaneously, the order for which to collide with first */
export const typeOrderPreference: Record<ItemInPlayType, number> = {
  // least impactful to touch:
  stopAutowalk: 0,
  portal: 0,
  wall: 0,
  doorLegs: 0,
  sceneryPlayer: 0,
  bubbles: 0, // actually never solid so won't collide

  block: 1,
  barrier: 1,
  floor: 1,
  floorEdge: 1, // not actually possible to touch
  hushPuppy: 1,
  teleporter: 1,
  doorFrame: 1,

  lift: 2,
  movableBlock: 2,
  portableBlock: 2,
  slidingBlock: 2,
  spring: 2,

  ball: 3,
  joystick: 3,
  switch: 3,
  charles: 3,
  conveyor: 3,

  head: 4,
  heels: 4,
  headOverHeels: 4,

  pickup: 8,

  firedDoughnut: 9,

  slidingDeadly: 10,
  moveableDeadly: 10,
  deadlyBlock: 10,
  monster: 10, // most impactful to touch
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

    return aDistance - bDistance;
  });
};
