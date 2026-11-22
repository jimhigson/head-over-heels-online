import {
  lengthXyz,
  originXyz,
  scaleXyzWriteInto,
  unitVector,
  type Xy,
  type Xyz,
  type XyzBox,
} from "../../utils/vectors/vectors";
import { collisionBoxes } from "../collision/aabbCollision";

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
 * how far along the direction overlapping boxes travel before they no longer
 * overlap on one axis - infinitely far if not moving along that axis
 */
const exitAlongAxis = (
  /**
   * the direction's component on this axis
   */
  directionComponent: number,
  moverMin: number,
  moverSize: number,
  obstacleMin: number,
  obstacleSize: number,
): number =>
  Math.abs(directionComponent) < 0.000_1 ? Number.POSITIVE_INFINITY
  : directionComponent > 0 ?
    (obstacleMin + obstacleSize - moverMin) / directionComponent
  : (obstacleMin - (moverMin + moverSize)) / directionComponent;

/**
 * Calculate the translation forwards along a direction vector that separates two rectangular objects.
 * Uses arithmetic ray-AABB intersection to find the exact distance along the vector for separation.
 *
 * @param vector - The direction vector along which to calculate separation.
 *                 Can be any direction, not limited to axis-aligned.
 * @returns The translation along the vector (never against it) to separate the objects.
 */
export const mtvAlongVectorWriteInto = (
  moverBox: Readonly<XyzBox>,
  obstacleBox: Readonly<XyzBox>,
  vector: Xyz,
  writeInto: Partial<Xyz>,
): Xyz => {
  // Normalize the vector
  const vectorLength = lengthXyz(vector);
  if (vectorLength < 0.000_1) {
    // Zero vector - can't constrain
    Object.assign(writeInto, originXyz);
    return writeInto as Xyz;
  }
  const direction = unitVector(vector);

  // First, check if objects are already separated
  if (!collisionBoxes(moverBox, obstacleBox)) {
    // write origin and return
    Object.assign(writeInto, originXyz);
    return writeInto as Xyz;
  }

  // Ray-AABB intersection approach: the boxes overlap at t=0, so they come
  // apart the soonest of when they separate on each axis moved along
  const tExit = Math.min(
    exitAlongAxis(
      direction.x,
      moverBox.x,
      moverBox.xd,
      obstacleBox.x,
      obstacleBox.xd,
    ),
    exitAlongAxis(
      direction.y,
      moverBox.y,
      moverBox.yd,
      obstacleBox.y,
      obstacleBox.yd,
    ),
    exitAlongAxis(
      direction.z,
      moverBox.z,
      moverBox.zd,
      obstacleBox.z,
      obstacleBox.zd,
    ),
  );

  // only ever exit forwards:
  return scaleXyzWriteInto(writeInto, direction, tExit);
};

/**
 * @see mtvAlongVectorWriteInto but returns a new object for the result
 */
export const mtvAlongVector = (
  moverBox: Readonly<XyzBox>,
  obstacleBox: Readonly<XyzBox>,
  vector: Xyz,
): Xyz => {
  return mtvAlongVectorWriteInto(moverBox, obstacleBox, vector, {});
};

/**
 * the mtv on one axis - out of the obstacle's max face (positive) or min face
 * (negative), whichever is shallower of those the mover could have entered through
 */
const mtvOnAxisAgainstTravel = (
  /**
   * overlap out of the obstacle's max face, moving the mover positive
   */
  overlapOutOfMax: number,
  /**
   * overlap out of the obstacle's min face, moving the mover negative
   */
  overlapOutOfMin: number,
  /**
   * the mover's travel on this axis
   */
  travel: number,
): number =>
  // travelling negative, so can only have come in through the max face:
  travel < 0 ? overlapOutOfMax
    // travelling positive, so can only have come in through the min face:
  : travel > 0 ? -overlapOutOfMin
  : Math.abs(overlapOutOfMax) < Math.abs(overlapOutOfMin) ? overlapOutOfMax
  : -overlapOutOfMin;

/**
 * The axis-aligned Minimum Translation Vector (MTV) to separate a moving object
 * from an obstacle it moved into: the shortest axis-aligned vector out of the
 * obstacle, through a face the mover could have moved in through. On an axis the
 * mover travels along, that is only the face it was travelling towards - out of
 * the other face would move the mover forwards, and so push the obstacle
 * backwards (eg the far side of a corner it is sliding past)
 */
export const mtvAgainstTravelWriteInto = (
  moverBox: Readonly<XyzBox>,
  obstacleBox: Readonly<XyzBox>,
  /**
   * the mover's movement - zero to consider every face
   */
  travel: Xyz,
  writeInto: Partial<Xyz>,
): Xyz => {
  const oXMin = obstacleBox.x;
  const oXMax = oXMin + obstacleBox.xd;
  const oYMin = obstacleBox.y;
  const oYMax = oYMin + obstacleBox.yd;
  const oZMin = obstacleBox.z;
  const oZMax = oZMin + obstacleBox.zd;

  const mXMin = moverBox.x;
  const mXMax = mXMin + moverBox.xd;
  const mYMin = moverBox.y;
  const mYMax = mYMin + moverBox.yd;
  const mZMin = moverBox.z;
  const mZMax = mZMin + moverBox.zd;

  const dx1 = oXMax - mXMin; // Right overlap
  const dy1 = oYMax - mYMin; // Far overlap
  const dz1 = oZMax - mZMin; // overlap Bottom of mover with Top of solid

  const dx2 = mXMax - oXMin; // overlap Left of mover with Right of solid
  const dy2 = mYMax - oYMin; // overlap Away of mover with Towards of solid
  const dz2 = mZMax - oZMin; // overlap Top of mover with Bottom of solid

  // Find minimum overlap in x,y,z, out of only the faces opposing the travel:
  const mtvX = mtvOnAxisAgainstTravel(dx1, dx2, travel.x);
  const mtvY = mtvOnAxisAgainstTravel(dy1, dy2, travel.y);
  const mtvZ = mtvOnAxisAgainstTravel(dz1, dz2, travel.z);

  const absMtvX = Math.abs(mtvX);
  const absMtvY = Math.abs(mtvY);
  const absMtvZ = Math.abs(mtvZ) * zWeight;

  if (absMtvX < absMtvY && absMtvX < absMtvZ) {
    // x is the smallest
    writeInto.x = mtvX;
    writeInto.y = 0;
    writeInto.z = 0;
    return writeInto as Xyz; // Slide along x-axis
  }
  if (absMtvY < absMtvZ) {
    // y is the smallest
    writeInto.x = 0;
    writeInto.y = mtvY;
    writeInto.z = 0;
    return writeInto as Xyz; // Slide along y-axis
  }
  // z is the smallest
  writeInto.x = 0;
  writeInto.y = 0;
  writeInto.z = mtvZ;
  return writeInto as Xyz; // Slide along z-axis
};

/**
 * Calculate the standard axis-aligned Minimum Translation Vector (MTV) to separate two rectangular objects.
 * Returns the shortest axis-aligned vector to push the mover out of the obstacle.
 */
export const mtvWriteInto = (
  moverBox: Readonly<XyzBox>,
  obstacleBox: Readonly<XyzBox>,
  writeInto: Partial<Xyz>,
): Xyz =>
  mtvAgainstTravelWriteInto(moverBox, obstacleBox, originXyz, writeInto);

/**
 * Calculate the standard axis-aligned Minimum Translation Vector (MTV) to separate two rectangular objects.
 * Returns the shortest axis-aligned vector to push the mover out of the obstacle.
 *
 * Version that returns a new object for the result
 */
export const mtv = (
  moverBox: Readonly<XyzBox>,
  obstacleBox: Readonly<XyzBox>,
): Xyz => {
  return mtvWriteInto(moverBox, obstacleBox, {});
};

/**
 * @see mtvWriteInto in two dimensions.
 */
const mtvWriteIntoXy = (
  moverBox: Readonly<Pick<XyzBox, "x" | "xd" | "y" | "yd">>,
  obstacleBox: Readonly<Pick<XyzBox, "x" | "xd" | "y" | "yd">>,
  writeInto: Partial<Xy>,
): Xy => {
  const oXMin = obstacleBox.x;
  const oXMax = oXMin + obstacleBox.xd;
  const oYMin = obstacleBox.y;
  const oYMax = oYMin + obstacleBox.yd;

  const mXMin = moverBox.x;
  const mXMax = mXMin + moverBox.xd;
  const mYMin = moverBox.y;
  const mYMax = mYMin + moverBox.yd;

  const dx1 = oXMax - mXMin;
  const dy1 = oYMax - mYMin;
  const dx2 = mXMax - oXMin;
  const dy2 = mYMax - oYMin;

  const mtvX = Math.abs(dx1) < Math.abs(dx2) ? dx1 : -dx2;
  const mtvY = Math.abs(dy1) < Math.abs(dy2) ? dy1 : -dy2;

  if (Math.abs(mtvX) < Math.abs(mtvY)) {
    writeInto.x = mtvX;
    writeInto.y = 0;
    return writeInto as Xy;
  }
  writeInto.x = 0;
  writeInto.y = mtvY;
  return writeInto as Xy;
};

/**
 * @see mtvWriteIntoXy but returns a new object for the result.
 */
export const mtvXy = (
  moverBox: Readonly<Pick<XyzBox, "x" | "xd" | "y" | "yd">>,
  obstacleBox: Readonly<Pick<XyzBox, "x" | "xd" | "y" | "yd">>,
): Xy => {
  return mtvWriteIntoXy(moverBox, obstacleBox, {});
};
