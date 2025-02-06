import {
  dotProductXyz,
  lengthXyz,
  scaleXyz,
  unitVector,
  type Xyz,
} from "../../utils/vectors/vectors";

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

// if an input vector is close to an axis, snap it to that axis
export const snapToCardinal = (
  vector: { x: number; y: number },
  thresholdRad: number,
): { x: number; y: number } => {
  const { x, y } = vector;
  const magnitude = Math.sqrt(x * x + y * y);
  if (magnitude === 0) return { x: 0, y: 0 }; // Handle zero vector case

  const threshold = Math.cos(thresholdRad); // Convert radians to cosine threshold

  // Normalize vector
  const normX = x / magnitude;
  const normY = y / magnitude;

  // Compute absolute dot products for left/right and up/down
  const dotRight = Math.abs(normX); // |x| for left/right
  const dotUp = Math.abs(normY); // |y| for up/down

  // Determine closest direction within threshold
  if (dotRight > dotUp) {
    if (dotRight >= threshold) return { x: Math.sign(x) * magnitude, y: 0 };
  } else {
    if (dotUp >= threshold) return { x: 0, y: Math.sign(y) * magnitude };
  }

  // Return original if no snapping occurs
  return vector;
};
