import type { InputDirectionMode } from "../../store/slices/gameMenus/gameMenusSlice";

import { nonZero } from "../../utils/epsilon";
import { unitVectors } from "../../utils/vectors/unitVectors";
import {
  dotProductXyz,
  lengthXyz,
  originXyz,
  scaleXyz,
  unitVectorInPlace,
  vectorClosestDirectionXy4,
  vectorClosestDirectionXy8,
  type Xyz,
} from "../../utils/vectors/vectors";

// by default, snap on 13º
const defaultSnapThreshold = Math.cos(13 * (Math.PI / 180));

const rad = -Math.PI / 4; // 45 degrees in radians
export const rotateInputVector45 = (vector: Xyz): Xyz => {
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return {
    x: vector.x * cos - vector.y * sin,
    y: vector.x * sin + vector.y * cos,
    z: 0,
  };
};

export const rotateInputVector45InPlace = (vector: Xyz): Xyz => {
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const originalX = vector.x;

  vector.x = originalX * cos - vector.y * sin;
  vector.y = originalX * sin + vector.y * cos;

  return vector;
};

const isometricX: Xyz = unitVectorInPlace({ x: 1, y: 2, z: 0 });
const isometricY: Xyz = unitVectorInPlace({ x: -1, y: 2, z: 0 });
export const isometricInputVector = (input: Xyz): Xyz => {
  const inputMagnitude = lengthXyz(input);

  if (inputMagnitude === 0) {
    return input;
  }

  const newDirection = {
    x: dotProductXyz(input, isometricX),
    y: dotProductXyz(input, isometricY),
    z: 0,
  };

  return scaleXyz(
    newDirection,
    inputMagnitude / nonZero(lengthXyz(newDirection)),
  );
};

type SnapXyFn = (input: Xyz) => Xyz;

export const strictSnapXy4: SnapXyFn = (input) => {
  const direction = vectorClosestDirectionXy4(input);
  return direction === undefined ? originXyz : unitVectors[direction];
};
export const strictSnapXy8: SnapXyFn = (input) => {
  const direction = vectorClosestDirectionXy8(input);
  return direction === undefined ? originXyz : unitVectors[direction];
};

/**
 * if an input vector is close to an axis, snap it to that axis
 * while still allowing a range of arbitrary values
 */
export const lightlySnapXy4 = (
  vector: Xyz,
  /**
   * the cosine of the angle (in radians) that is the threshold angle from
   * cardinal directions below which snapping occurs
   */
  cosineThreshold: number = defaultSnapThreshold,
): Xyz => {
  const { x, y } = vector;
  const magnitude = Math.sqrt(x * x + y * y);
  if (magnitude === 0) return originXyz; // Handle zero vector case

  // Normalize vector
  const normX = x / magnitude;
  const normY = y / magnitude;

  // Compute absolute dot products for left/right and up/down
  const dotRight = Math.abs(normX); // |x| for left/right
  const dotUp = Math.abs(normY); // |y| for up/down

  // Determine closest direction within threshold
  if (dotRight > dotUp) {
    if (dotRight >= cosineThreshold) {
      return { x: Math.sign(x) * magnitude, y: 0, z: 0 };
    }
  } else {
    if (dotUp >= cosineThreshold) {
      return { x: 0, y: Math.sign(y) * magnitude, z: 0 };
    }
  }

  // Return original if no snapping occurs
  return vector;
};

export const snapXyFnMap: Record<InputDirectionMode, SnapXyFn> = {
  "4-way": strictSnapXy4,
  "8-way": strictSnapXy8,
  analogue: lightlySnapXy4,
};
