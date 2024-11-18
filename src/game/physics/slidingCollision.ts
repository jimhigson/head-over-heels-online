import { addXyz, type Xyz } from "@/utils/vectors";
import type { UnknownItemInPlay } from "@/model/ItemInPlay";
import { iterate } from "@/utils/iterate";
import { dotProductXyz } from "@/utils/vectors";

/**
 * zBias causes the sliding collision to slightly favour moving in z over x and y.
 *
 * Why? Because head has to jump into gaps (ladders) that he only just fits in. Sometimes,
 * he has moved forward twice and up once. Since he moves forward at half the speed he moves
 * up, the x/y and z vectors are "equal" but because of floating point error, the collision
 * can choose x/y and put him outside of the ladder. It should choose z to clamp him between
 * the ladder rungs vertically
 *
 * An abosolute bias of 0.1 works for most frame rates, but at very high rates the value was
 * overwhelmed by the constant bias. A weight works better - a value of 0.5 was found experimentally
 * to allow getting into small gaps and not snagging
 */
const zWeight = 0.5;

/**
 * Calculate the Minimum Translation Vector (MTV) to get the @param item out of the @param solidItem
 */
export const mtv = (
  moverPosition: Xyz,
  moverAabb: Xyz,
  obstaclePosition: Xyz,
  obstacleAabb: Xyz,
): Xyz => {
  const dx1 = obstaclePosition.x + obstacleAabb.x - moverPosition.x; // Right overlap
  const dy1 = obstaclePosition.y + obstacleAabb.y - moverPosition.y; // Far overlap
  const dz1 = obstaclePosition.z + obstacleAabb.z - moverPosition.z; // overlap Bottom of mover with Top of solid

  const dx2 = moverPosition.x + moverAabb.x - obstaclePosition.x; // overlap Left of mover with Right of solid
  const dy2 = moverPosition.y + moverAabb.y - obstaclePosition.y; // overlap Away of mover with Towards of solid
  const dzT = moverPosition.z + moverAabb.z - obstaclePosition.z; // overlap Top of mover with Bottom of solid

  // Find minimum x overlap in x,y,z
  const mtvX = Math.abs(dx1) < Math.abs(dx2) ? dx1 : -dx2;
  const mtvY = Math.abs(dy1) < Math.abs(dy2) ? dy1 : -dy2;
  const mtvZ = Math.abs(dz1) < Math.abs(dzT) ? dz1 : -dzT;

  const absoluteMtvZ = Math.abs(mtvZ) * zWeight;

  if (Math.abs(mtvX) < Math.abs(mtvY) && Math.abs(mtvX) < absoluteMtvZ) {
    // x is the smallest
    return { x: mtvX, y: 0, z: 0 }; // Slide along x-axis
  }
  if (Math.abs(mtvY) < absoluteMtvZ) {
    // y is the smallest
    return { x: 0, y: mtvY, z: 0 }; // Slide along y-axis
  } else {
    // z is the smallest
    return { x: 0, y: 0, z: mtvZ }; // Slide along z-axis
  }
};

type Obstacle = Pick<UnknownItemInPlay, "aabb" | "id"> & {
  state: { position: Xyz };
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

/** sort obstacles so that the ones the subject will see first (travelling along the
 * @param vector) are first in the list. This gives the natural order of collision
 * to process the mtvs in.
 *
 * Without this, the order of the obstacles can be arbitrary and snagging is possible
 * on the boundary of two adjacent obstacles, for exmaple if falling while holding
 * the direction towards a tower of blocks
 */
export const sortObstaclesAboutVector = <I extends Obstacle>(
  vector: Xyz,
  obstacles: Iterable<I>,
): Array<I> => {
  return [...obstacles].sort((a, b) => {
    const aProjectedAlongVector = dotProductXyz(
      vector,
      obstaclePointEarliestPointInVector(vector, a),
    );
    const bProjectedAlongVector = dotProductXyz(
      vector,
      obstaclePointEarliestPointInVector(vector, b),
    );
    return aProjectedAlongVector - bProjectedAlongVector;
  });
};

export const slidingCollisionWithManyItems = (
  subjectItem: UnknownItemInPlay,
  xyzDelta: Xyz,
  obstacles: Iterable<Obstacle>,
): Xyz => {
  const {
    state: { position: previousPosition },
  } = subjectItem;

  const sortedObstacles = sortObstaclesAboutVector(xyzDelta, obstacles);

  //const foundStandingOn = iterate(sortedObstacles).find();

  return iterate(sortedObstacles).reduce<Xyz>(
    (posAc: Xyz, collisionItem: Obstacle) => {
      return addXyz(
        posAc,
        mtv(
          posAc,
          subjectItem.aabb,
          collisionItem.state.position,
          collisionItem.aabb,
        ),
      );
    },
    // original target position:
    addXyz(previousPosition, xyzDelta),
  );
};
