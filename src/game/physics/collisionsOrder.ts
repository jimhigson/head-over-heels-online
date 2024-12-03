import type {
  UnknownItemInPlay,
  ItemInPlayType,
  ItemInPlay,
} from "@/model/ItemInPlay";
import { blockSizePx, blockSizeXyzPx } from "@/sprites/spritePivots";
import { unitVectors } from "@/utils/vectors/unitVectors";
import {
  type Xyz,
  addXyz,
  dotProductXyz,
  scaleXyz,
  xyzEqual,
} from "@/utils/vectors/vectors";

type Obstacle = Pick<UnknownItemInPlay, "aabb" | "id"> & {
  state: { position: Xyz };
  type: ItemInPlayType;
};

/**
 * since conveyors can lead to other conveyors, sort them so that the
 * active conveyor will always be the first one in the chain when two
 * are stood on at once. This allows objects to be nicely moved around
 * conveyor corners (see blacktooth26)
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO: use this when landing on two conveyors
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

export const obstaclePointEarliestPointInVector = (
  vector: Xyz,
  obstacle: Obstacle,
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
const typeOrderPreference: Record<ItemInPlayType, number> = {
  // least impactful to touch:
  stopAutowalk: 0,
  portal: 0,
  wall: 0,
  doorLegs: 0,
  sceneryPlayer: 0,

  block: 1,
  barrier: 1,
  floor: 1,
  book: 1,
  hushPuppy: 1,
  teleporter: 1,
  doorFrame: 1,

  lift: 2,
  movableBlock: 2,
  portableBlock: 2,
  spring: 2,

  ball: 3,
  joystick: 3,
  switch: 3,
  charles: 3,
  conveyor: 3,
  head: 3,
  heels: 3,

  pickup: 8,

  moveableDeadly: 10,
  deadlyBlock: 10,
  baddie: 10, // most impactful to touch
};

export const sortObstaclesAboutVector = <I extends Obstacle>(
  vector: Xyz,
  obstacles: Array<I>,
): Array<I> => {
  return obstacles.toSorted((obsA, obsB) => {
    /*
     * the most important factor in this sort is the type of the items collided with. Less impactful items are moved
     * to the start of the ordering so that they 'protect' against more impactful ones. Eg, if landing simultaneously
     * on a block and a baddie, the block should be processed first so that the baddie is not touched (and the block
     * becomes the `.standingOn` property of the player)
     */

    const aTypeScore = typeOrderPreference[obsA.type] << 8;
    const bTypeScore = typeOrderPreference[obsB.type] << 8;

    if (aTypeScore !== bTypeScore) {
      return aTypeScore - bTypeScore;
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
