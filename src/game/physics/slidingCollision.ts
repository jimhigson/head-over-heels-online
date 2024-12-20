import { type Xyz } from "@/utils/vectors/vectors";

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
const zWeight = 1;

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

  const absMtvX = Math.abs(mtvX);
  const absMtvY = Math.abs(mtvY);
  const absMtvZ = Math.abs(mtvZ) * zWeight;

  if (absMtvX < absMtvY && absMtvX < absMtvZ) {
    // x is the smallest
    return { x: mtvX, y: 0, z: 0 }; // Slide along x-axis
  }
  if (absMtvY < absMtvZ) {
    // y is the smallest
    return { x: 0, y: mtvY, z: 0 }; // Slide along y-axis
  } else {
    // z is the smallest
    return { x: 0, y: 0, z: mtvZ }; // Slide along z-axis
  }
};
