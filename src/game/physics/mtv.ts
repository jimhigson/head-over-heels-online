import type { Xyz } from "../../utils/vectors/vectors";

import {
  axesXyz,
  lengthXyz,
  scaleXyz,
  unitVector,
} from "../../utils/vectors/vectors";

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
 * Check if two rectangular objects are colliding.
 */
const checkRectangularCollision = (
  moverPosition: Xyz,
  moverAabb: Xyz,
  obstaclePosition: Xyz,
  obstacleAabb: Xyz,
): boolean => {
  return (
    moverPosition.x < obstaclePosition.x + obstacleAabb.x &&
    moverPosition.x + moverAabb.x > obstaclePosition.x &&
    moverPosition.y < obstaclePosition.y + obstacleAabb.y &&
    moverPosition.y + moverAabb.y > obstaclePosition.y &&
    moverPosition.z < obstaclePosition.z + obstacleAabb.z &&
    moverPosition.z + moverAabb.z > obstaclePosition.z
  );
};

/**
 * Calculate the minimum translation along a specific direction vector to separate two rectangular objects.
 * Uses arithmetic ray-AABB intersection to find the exact distance along the vector for separation.
 *
 * @param vector - The direction vector along which to calculate separation.
 *                 Can be any direction, not limited to axis-aligned.
 * @returns The minimum translation vector along the constraint direction to separate the objects.
 */
export const mtvAlongVector = (
  moverPosition: Xyz,
  moverAabb: Xyz,
  obstaclePosition: Xyz,
  obstacleAabb: Xyz,
  vector: Xyz,
): Xyz => {
  // Normalize the vector
  const vectorLength = lengthXyz(vector);
  if (vectorLength < 0.0001) {
    // Zero vector - can't constrain
    return { x: 0, y: 0, z: 0 };
  }
  const direction = unitVector(vector);

  // First, check if objects are already separated
  if (
    !checkRectangularCollision(
      moverPosition,
      moverAabb,
      obstaclePosition,
      obstacleAabb,
    )
  ) {
    return { x: 0, y: 0, z: 0 };
  }

  // Ray-AABB intersection approach
  // We need to find the minimum t where the boxes no longer overlap

  let tMin = -Infinity;
  let tMax = Infinity;

  // For each axis, calculate the range of t where boxes overlap
  for (const axis of axesXyz) {
    const dirComponent = direction[axis];

    if (Math.abs(dirComponent) < 0.0001) {
      // No movement along this axis - check if already overlapping
      const moverMin = moverPosition[axis];
      const moverMax = moverPosition[axis] + moverAabb[axis];
      const obstacleMin = obstaclePosition[axis];
      const obstacleMax = obstaclePosition[axis] + obstacleAabb[axis];

      if (moverMax <= obstacleMin || moverMin >= obstacleMax) {
        // No overlap on this axis means no collision at all
        return { x: 0, y: 0, z: 0 };
      }
      // Otherwise, this axis doesn't constrain t
      continue;
    }

    // Calculate t values where the boxes align on this axis
    // We want the range where they overlap
    const obstacleMin = obstaclePosition[axis];
    const obstacleMax = obstaclePosition[axis] + obstacleAabb[axis];
    const moverMin = moverPosition[axis];
    const moverMax = moverPosition[axis] + moverAabb[axis];

    // t values where edges align
    const t1 = (obstacleMin - moverMax) / dirComponent;
    const t2 = (obstacleMax - moverMin) / dirComponent;

    // The overlap range depends on direction
    const tEnter = Math.min(t1, t2);
    const tExit = Math.max(t1, t2);

    // Update the overall overlap range
    tMin = Math.max(tMin, tEnter);
    tMax = Math.min(tMax, tExit);
  }

  // If tMin > tMax, boxes don't overlap at any point along the ray
  if (tMin > tMax) {
    return { x: 0, y: 0, z: 0 };
  }

  // We're currently overlapping (t=0 is in range [tMin, tMax])
  // We need to move to t=tMax to just exit the overlap
  // Actually, we want to move just past tMax to fully separate

  // Since we start overlapping, we want to exit the overlap
  // If tMax > 0, move forward to tMax
  // If tMin < 0, move backward to tMin

  if (tMax > 0 && (tMin >= 0 || tMax < -tMin)) {
    // Move forward to exit
    return scaleXyz(direction, tMax);
  } else if (tMin < 0) {
    // Move backward to exit
    return scaleXyz(direction, tMin);
  } else {
    // Already separated or touching
    return { x: 0, y: 0, z: 0 };
  }
};

/**
 * Calculate the standard axis-aligned Minimum Translation Vector (MTV) to separate two rectangular objects.
 * Returns the shortest axis-aligned vector to push the mover out of the obstacle.
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
