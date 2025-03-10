import type { InputDirectionMode } from "../../store/slices/gameMenusSlice";
import { unitVectors } from "../../utils/vectors/unitVectors";
import {
  dotProductXyz,
  lengthXyz,
  originXyz,
  scaleXyz,
  unitVector,
  vectorClosestDirectionXy4,
  vectorClosestDirectionXy8,
  type Xyz,
} from "../../utils/vectors/vectors";

export const snapAngleRadians = 13 * (Math.PI / 180);

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

const isometricX: Xyz = unitVector({ x: 1, y: 2, z: 0 });
const isometricY: Xyz = unitVector({ x: -1, y: 2, z: 0 });
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

  return scaleXyz(newDirection, inputMagnitude / lengthXyz(newDirection));
};

export const strictSnapXy4 = (input: Xyz) => {
  const direction = vectorClosestDirectionXy4(input);
  return direction === undefined ? originXyz : unitVectors[direction];
};
export const strictSnapXy8 = (input: Xyz) => {
  const direction = vectorClosestDirectionXy8(input);
  return direction === undefined ? originXyz : unitVectors[direction];
};

/**
 * if an input vector is close to an axis, snap it to that axis
 * while still allowing a range of arbitrary values
 */
export const lightlySnapXy4 = (vector: Xyz): Xyz => {
  const { x, y } = vector;
  const magnitude = Math.sqrt(x * x + y * y);
  if (magnitude === 0) return originXyz; // Handle zero vector case

  const threshold = Math.cos(snapAngleRadians); // Convert radians to cosine threshold

  // Normalize vector
  const normX = x / magnitude;
  const normY = y / magnitude;

  // Compute absolute dot products for left/right and up/down
  const dotRight = Math.abs(normX); // |x| for left/right
  const dotUp = Math.abs(normY); // |y| for up/down

  // Determine closest direction within threshold
  if (dotRight > dotUp) {
    if (dotRight >= threshold)
      return { x: Math.sign(x) * magnitude, y: 0, z: 0 };
  } else {
    if (dotUp >= threshold) return { x: 0, y: Math.sign(y) * magnitude, z: 0 };
  }

  // Return original if no snapping occurs
  return vector;
};

export const snapXy: Record<InputDirectionMode, (input: Xyz) => Xyz> = {
  "4-way": strictSnapXy4,
  "8-way": strictSnapXy8,
  analogue: lightlySnapXy4,
};
