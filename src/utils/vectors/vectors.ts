//# allFunctionsCalledOnLoad
import { epsilon, veryClose } from "../epsilon";

export const directionsXy4 = ["away", "towards", "left", "right"] as const;
export type DirectionXy4 = (typeof directionsXy4)[number];
export type DirectionXyz4 = "down" | "up" | DirectionXy4;

export const directionsXyDiagonal = [
  "awayRight",
  "towardsRight",
  "towardsLeft",
  "awayLeft",
] as const;

export const directionsXy8 = [
  ...directionsXy4,
  ...directionsXyDiagonal,
] as const;
export type DirectionXy8 = (typeof directionsXy8)[number];

export const tangentAxis = (direction: DirectionXy4): AxisXy =>
  direction === "away" || direction === "towards" ? "y" : "x";

/**
 * the axis a vector points most strongly along - the vector counterpart of
 * {@link tangentAxis}. For an axis-aligned vector this is simply its non-zero
 * axis; for an off-axis vector (eg a direction part-way through a camera turn)
 * it is the dominant component
 */
export const dominantAxisXy = ({ x, y }: Xy): AxisXy =>
  Math.abs(y) > Math.abs(x) ? "y" : "x";

export const oppositeDirection = (direction: DirectionXy4): DirectionXy4 =>
  direction === "away" ? "towards"
  : direction === "towards" ? "away"
  : direction === "left" ? "right"
  : "left";

/**
 * doors sit along the axis perpendicular to their direction
 */
export const doorAlongAxis = (doorDirection: DirectionXy4): AxisXy =>
  perpendicularAxisXy(tangentAxis(doorDirection));

type DirectionZ = "down" | "up";
export type Direction8Xyz = DirectionXy8 | DirectionZ;

export type Xy = {
  x: number;
  y: number;
};

export const perpendicularAxisXy = (axis: AxisXy): AxisXy =>
  axis === "x" ? "y" : "x";

export const addXy = (xy: Xy, ...xys: Array<Partial<Xy>>): Xy => {
  const result = {
    x: xy.x,
    y: xy.y,
  };

  for (const xyToAdd of xys) {
    result.x += xyToAdd.x ?? 0;
    result.y += xyToAdd.y ?? 0;
  }

  return result;
};

export const subXy = (xy: Xy, ...xys: Array<Partial<Xy>>): Xy => {
  const result = {
    x: xy.x,
    y: xy.y,
  };

  for (const xyToSub of xys) {
    result.x -= xyToSub.x ?? 0;
    result.y -= xyToSub.y ?? 0;
  }

  return result;
};

export const scaleXy = (xy: Xy, scale: number): Xy => ({
  x: xy.x * scale,
  y: xy.y * scale,
});

export const scaleXyInPlace = (xy: Xy, scale: number): Xy => {
  xy.x *= scale;
  xy.y *= scale;
  return xy;
};

export const scaleXyz = (xy: Xyz, scale: number): Xyz => ({
  x: xy.x * scale,
  y: xy.y * scale,
  z: xy.z * scale,
});

export const scaleXyzWriteInto = (
  writeInto: object,
  xyz: Xyz,
  scale: number,
): Xyz => {
  const writeIntoTyped = writeInto as Xyz;
  writeIntoTyped.x = xyz.x * scale;
  writeIntoTyped.y = xyz.y * scale;
  writeIntoTyped.z = xyz.z * scale;
  return writeIntoTyped;
};

export const scaleXyzInPlace = (xyz: Xyz, scale: number): Xyz => {
  xyz.x *= scale;
  xyz.y *= scale;
  xyz.z *= scale;
  return xyz;
};

export const productXyz = (a: Xyz, b: Xyz): Xyz => ({
  x: a.x * b.x,
  y: a.y * b.y,
  z: a.z * b.z,
});

export const lengthXyz = ({ x, y, z }: Xyz) => Math.hypot(x, y, z);
export const lengthXy = ({ x, y }: Xy) => Math.hypot(x, y);
export const lengthXyzSquared = ({ x, y, z }: Xyz) => x ** 2 + y ** 2 + z ** 2;
export const lengthXySquared = ({ x, y }: Xy) => x ** 2 + y ** 2;

export const unitVector = (xyz: Xyz): Xyz => {
  const l = lengthXyz(xyz);
  if (l === 0) {
    throw new Error("unitVector called with zero length vector");
  }
  return scaleXyz(xyz, 1 / l);
};

export const unitVectorInPlace = (xyz: Xyz): Xyz => {
  const l = lengthXyz(xyz);
  if (l === 0) {
    throw new Error("unitVectorInPlace called with zero length vector");
  }
  return scaleXyzInPlace(xyz, 1 / l);
};

/** all eight corners of a unit cube, as 0/1 per-axis vectors */
export const allCornerVectorsXyz = [
  { x: 0, y: 0, z: 0 },
  { x: 0, y: 0, z: 1 },
  { x: 0, y: 1, z: 0 },
  { x: 0, y: 1, z: 1 },
  { x: 1, y: 0, z: 0 },
  { x: 1, y: 0, z: 1 },
  { x: 1, y: 1, z: 0 },
  { x: 1, y: 1, z: 1 },
] as const satisfies Array<Xyz>;

export const addXyz = (...xyzs: Array<Partial<Xyz>>): Xyz => {
  if (xyzs.length === 0) {
    return { x: 0, y: 0, z: 0 };
  }

  const [first, ...rest] = xyzs;
  const result = {
    x: first.x ?? 0,
    y: first.y ?? 0,
    z: first.z ?? 0,
  };

  for (const xyz of rest) {
    result.x += xyz.x ?? 0;
    result.y += xyz.y ?? 0;
    result.z += xyz.z ?? 0;
  }

  return result;
};

export const addXyzWriteInto = (
  writeInto: object,
  ...xyzs: Array<Partial<Xyz>>
): Xyz => {
  const writeIntoTyped = writeInto as Xyz;

  if (xyzs.length === 0) {
    writeIntoTyped.x = 0;
    writeIntoTyped.y = 0;
    writeIntoTyped.z = 0;
    return writeIntoTyped;
  }

  writeIntoTyped.x = xyzs[0].x ?? 0;
  writeIntoTyped.y = xyzs[0].y ?? 0;
  writeIntoTyped.z = xyzs[0].z ?? 0;

  for (let i = 1; i < xyzs.length; i++) {
    writeIntoTyped.x += xyzs[i].x ?? 0;
    writeIntoTyped.y += xyzs[i].y ?? 0;
    writeIntoTyped.z += xyzs[i].z ?? 0;
  }

  return writeIntoTyped;
};

export const addXyzInPlace = (xyz: Xyz, ...xyzs: Array<Partial<Xyz>>): Xyz => {
  for (const xyzi of xyzs) {
    xyz.x += xyzi.x ?? 0;
    xyz.y += xyzi.y ?? 0;
    xyz.z += xyzi.z ?? 0;
  }
  return xyz;
};

/**
 * Calc the element-wise (or Hadamard) product
 */
export const elementWiseProductXyz = (...xyzs: Array<Xyz>): Xyz => {
  return xyzs.reduce<Xyz>(
    ({ x: acX, y: acY, z: acZ }, { x: iX, y: iY, z: iZ }) => ({
      x: acX * iX,
      y: acY * iY,
      z: acZ * iZ,
    }),
    unitXyz,
  );
};

export const subXyz = (xyz: Xyz, ...xyzs: Array<Partial<Xyz>>): Xyz => {
  const result = {
    x: xyz.x,
    y: xyz.y,
    z: xyz.z,
  };

  for (const xyzToSub of xyzs) {
    result.x -= xyzToSub.x ?? 0;
    result.y -= xyzToSub.y ?? 0;
    result.z -= xyzToSub.z ?? 0;
  }

  return result;
};

export const subXyzInPlace = (xyz: Xyz, ...xyzs: Array<Partial<Xyz>>): Xyz => {
  for (const xyzi of xyzs) {
    xyz.x -= xyzi.x ?? 0;
    xyz.y -= xyzi.y ?? 0;
    xyz.z -= xyzi.z ?? 0;
  }
  return xyz;
};

export const subXyzWriteInto = (
  writeInto: object,
  xyz: Xyz,
  ...xyzs: Array<Partial<Xyz>>
): Xyz => {
  const writeIntoTyped = writeInto as Xyz;
  writeIntoTyped.x = xyz.x;
  writeIntoTyped.y = xyz.y;
  writeIntoTyped.z = xyz.z;

  for (const xyzToSub of xyzs) {
    writeIntoTyped.x -= xyzToSub.x ?? 0;
    writeIntoTyped.y -= xyzToSub.y ?? 0;
    writeIntoTyped.z -= xyzToSub.z ?? 0;
  }
  return writeIntoTyped;
};

export const xyzEqual = (
  { x: ax, y: ay, z: az }: Xyz,
  { x: bx, y: by, z: bz }: Xyz,
) => {
  return ax === bx && ay === by && az === bz;
};
export const xyEqual = ({ x: ax, y: ay }: Xy, { x: bx, y: by }: Xy) => {
  return ax === bx && ay === by;
};

/**
 * for floating point error where numbers should be integers but aren't quite
 *  - for example the number 99.99999999999999 coming out of the mtv/collisions
 * algorithm when it should be 100
 */
export const xyzSnapIfCloseToIntegers = (input: Xyz): Xyz => {
  const { x } = input;
  const xNearest = Math.round(x);
  const xNeedsCorrect = !Number.isInteger(x) && veryClose(x, xNearest);

  const { y } = input;
  const yNearest = Math.round(y);
  const yNeedsCorrect = !Number.isInteger(y) && veryClose(y, yNearest);

  const { z } = input;
  const zNearest = Math.round(z);
  const zNeedsCorrect = !Number.isInteger(z) && veryClose(input.z, zNearest);

  if (xNeedsCorrect || yNeedsCorrect || zNeedsCorrect) {
    return {
      x: xNeedsCorrect ? xNearest : x,
      y: yNeedsCorrect ? yNearest : y,
      z: zNeedsCorrect ? zNearest : z,
    };
  }
  return input;
};

export const isExactIntegerXyz = ({ x = 0, y = 0, z = 0 }: Partial<Xyz>) =>
  Number.isInteger(x) && Number.isInteger(y) && Number.isInteger(z);

export const roundXyz = ({ x, y, z }: Xyz) => ({
  x: Math.round(x),
  y: Math.round(y),
  z: Math.round(z),
});

export const originXy: Xy = Object.freeze({ x: 0, y: 0 });
export const originXyz: Xyz = Object.freeze({ x: 0, y: 0, z: 0 });
export const unitXyz: Xyz = Object.freeze({ x: 1, y: 1, z: 1 });
/** xyz vector with unit length in x and y */
export const unitXyz_xy: Xyz = Object.freeze({ x: 1, y: 1, z: 0 });
/** xyz vector with unit length in x and z */
export const unitXyz_xz: Xyz = Object.freeze({ x: 1, y: 0, z: 1 });
/** xyz vector with unit length in y and z */
export const unitXyz_yz: Xyz = Object.freeze({ x: 0, y: 1, z: 1 });
/** xyz vector with unit length in x only */
export const unitXyz_x: Xyz = Object.freeze({ x: 1, y: 0, z: 0 });
/** xyz vector with unit length in y only */
export const unitXyz_y: Xyz = Object.freeze({ x: 0, y: 1, z: 0 });
/** xyz vector with unit length in z only */
export const unitXyz_z: Xyz = Object.freeze({ x: 0, y: 0, z: 1 });

export type Xyz = {
  x: number;
  y: number;
  z: number;
};
export type AxisXy = "x" | "y";

export const axesXyz = ["x", "y", "z"] as const;

export type Aabb = Readonly<Xyz>;

/**
 * dot product - the component of one vector in the direction of another
 */
export const dotProductXyz = (a: Xyz, b: Xyz): number => {
  return a.x * b.x + a.y * b.y + a.z * b.z;
};

export const dotProductXy = (a: Xy, b: Xy): number => {
  return a.x * b.x + a.y * b.y;
};

/**
 * the 2D (scalar) cross product - positive when `b` is anticlockwise of `a`,
 * negative when clockwise, zero when parallel
 */
export const crossProductXy = (a: Xy, b: Xy): number => {
  return a.x * b.y - a.y * b.x;
};

export const vectorClosestDirectionXy4 = ({
  x,
  y,
}: Xy): DirectionXy4 | undefined => {
  if (veryClose(x, 0) && veryClose(y, 0)) {
    return undefined;
  }

  if (y > x) {
    if (y > -x) {
      return "away";
    }
    return "right";
  }
  if (y > -x) {
    return "left";
  }
  return "towards";
};

/**
 * like {@link vectorClosestDirectionXy4}, for vectors that are non-zero by
 * construction (eg a facing, which is always a real direction) - never
 * returns undefined, so call sites need no defaulting. Zero-length input
 * throws in dev/vr builds; production trusts the caller (a pathological zero
 * resolves to an arbitrary direction rather than crashing)
 */
export const nonZeroClosestDirectionXy4 = (
  x: number,
  y: number,
): DirectionXy4 => {
  if (
    (import.meta.env.DEV || import.meta.env.MODE === "visual-regression") &&
    veryClose(x, 0) &&
    veryClose(y, 0)
  ) {
    throw new Error(
      "zero-length vector given where a non-zero direction vector is required",
    );
  }
  if (y > x) {
    if (y > -x) {
      return "away";
    }
    return "right";
  }
  if (y > -x) {
    return "left";
  }
  return "towards";
};

/**
 * like {@link nonZeroClosestDirectionXy4} but returning the direction's ring
 * index (see {@link DirectionIndexXy4}) instead of its name - for sprite
 * variant arithmetic. Same comparisons, so ties resolve identically
 */
export const nonZeroClosestDirectionIndexXy4 = (
  x: number,
  y: number,
): DirectionIndexXy4 => {
  if (
    (import.meta.env.DEV || import.meta.env.MODE === "visual-regression") &&
    veryClose(x, 0) &&
    veryClose(y, 0)
  ) {
    throw new Error(
      "zero-length vector given where a non-zero direction vector is required",
    );
  }
  if (y > x) {
    // away, or right
    return y > -x ? 2 : 4;
  }
  // left, or towards
  return y > -x ? 0 : 6;
};

/**
 * like {@link nonZeroClosestDirectionXy4}, taking the direction as an {@link Xy}
 * (eg a facing, which is always a real direction).
 */
export const nonZeroVectorClosestDirectionXy4 = ({ x, y }: Xy): DirectionXy4 =>
  nonZeroClosestDirectionXy4(x, y);

/**
 * the eight directions in ring order, anchored at +x (`left = {x:1,y:0}`, the
 * traditional zero angle) and stepping 45° anticlockwise per index - so the
 * index is `atan2(y,x)` in eighth-turns, directly usable as a sprite-variant
 * number (`.d0`..`.d7`). Each step is the 45° turn that a quarter-turn of the
 * camera advances by two of.
 */
export const directionsXy8Octants: DirectionXy8[] = [
  "left",
  "awayLeft",
  "away",
  "awayRight",
  "right",
  "towardsRight",
  "towards",
  "towardsLeft",
];

/** index around {@link directionsXy8Octants} - the 8-way sprite-variant number */
export type DirectionIndexXy8 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
/**
 * the 4-way sprite-variant number: the octant ring index of a cardinal - the
 * even members of {@link directionsXy8Octants} (left=0, away=2, right=4,
 * towards=6), anchored at +x and stepping 90° anticlockwise. A subtype of
 * {@link DirectionIndexXy8}, so cardinal and octant variants share one numbering
 * and successive quarter camera turns advance an apparent facing by two octants
 * around it
 */
export type DirectionIndexXy4 = 0 | 2 | 4 | 6;

/**
 * the octant ring index of each named direction - the numbered sprite-variant
 * space keyed by name, so imperative sites can compare against a named index
 * (eg `=== directionIndexXy8.right`) rather than a bare integer. Kept in step
 * with {@link directionsXy8Octants} by the dev assertion below
 */
export const directionIndexXy8 = {
  left: 0,
  awayLeft: 1,
  away: 2,
  awayRight: 3,
  right: 4,
  towardsRight: 5,
  towards: 6,
  towardsLeft: 7,
} as const satisfies Record<DirectionXy8, DirectionIndexXy8>;

/** the octant ring index of each x/y axis (x runs left, y runs away) */
export const axisIndexXy8 = {
  x: directionIndexXy8.left,
  y: directionIndexXy8.away,
} as const satisfies Record<AxisXy, DirectionIndexXy4>;

/**
 * reflect an octant ring index about the vertical screen axis. In this
 * isometric projection the world x=y diagonal projects vertically, so the
 * reflection maps each direction to the one whose projected form is its
 * horizontal mirror (left↔away, right↔towards); awayLeft (d1) and
 * towardsRight (d5) project onto the axis itself so are their own mirrors
 */
export const mirrorDirectionIndexXy8 = (
  index: DirectionIndexXy8,
): DirectionIndexXy8 => ((10 - index) % 8) as DirectionIndexXy8;

export const vectorClosestDirectionXy8 = ({
  x,
  y,
}: Xy): DirectionXy8 | undefined => {
  if (veryClose(x, 0) && veryClose(y, 0)) {
    return undefined;
  }

  const angle = Math.atan2(y, x);
  const octant = Math.round((8 * angle) / (2 * Math.PI)) & 7;

  return directionsXy8Octants[octant];
};

/**
 * like {@link vectorClosestDirectionXy8}, for a non-zero direction given as its
 * x/y components (no Xy allocation) - for hot paths that already have the
 * components to hand. Zero-length input throws in dev/vr builds; production
 * trusts the caller (a pathological zero resolves to an arbitrary direction
 * rather than crashing)
 */
export const nonZeroClosestDirectionXy8 = (
  x: number,
  y: number,
): DirectionXy8 => {
  return directionsXy8Octants[nonZeroClosestDirectionIndexXy8(x, y)];
};

/**
 * like {@link nonZeroClosestDirectionXy8} but returning the octant ring index
 * (see {@link DirectionIndexXy8}) instead of its name - for sprite variant
 * arithmetic
 */
export const nonZeroClosestDirectionIndexXy8 = (
  x: number,
  y: number,
): DirectionIndexXy8 => {
  if (
    (import.meta.env.DEV || import.meta.env.MODE === "visual-regression") &&
    veryClose(x, 0) &&
    veryClose(y, 0)
  ) {
    throw new Error(
      "zero-length vector given where a non-zero direction vector is required",
    );
  }
  const angle = Math.atan2(y, x);
  return (Math.round((8 * angle) / (2 * Math.PI)) & 7) as DirectionIndexXy8;
};

/**
 * like {@link nonZeroClosestDirectionXy8}, taking the direction as an {@link Xy}
 * (eg a facing, which is always a real direction).
 */
export const nonZeroVectorClosestDirectionXy8 = ({ x, y }: Xy): DirectionXy8 =>
  nonZeroClosestDirectionXy8(x, y);

/**
 * whether a direction vector lies in the {towards, right} half-plane
 * (x + y < 0). Exact for rotated cardinals: {away, left} sum their components
 * to +1 and {towards, right} to −1, so this single sign test answers "is this
 * one of the near/negative sides" for a world direction rotated to its
 * camera-apparent orientation - at any continuous angle, no snapping
 */
export const isNegativeSideXy = ({ x, y }: Xy): boolean => x + y < 0;

/**
 * whether the vector (x, y) rounds to the given cardinal unit vector - ie
 * whether {@link nonZeroClosestDirectionXy4} of (x, y) names that cardinal.
 * Scalar cardinal components so callers can negate without allocating. Uses
 * the same strict comparisons as the rounding, so ties at exact diagonals
 * resolve identically
 */
export const roundsToCardinalXy4 = (
  x: number,
  y: number,
  cardinalX: number,
  cardinalY: number,
): boolean =>
  y > x === cardinalY > cardinalX && y > -x === cardinalY > -cardinalX;

/**
 * the x/y axis a wall or door runs along: the axis perpendicular to its
 * outward-facing direction vector - the vector counterpart of
 * {@link doorAlongAxis}
 */
export const alongAxisOfDirectionXy = (direction: Xy): AxisXy =>
  perpendicularAxisXy(dominantAxisXy(direction));

/**
 * rotate a facing by `octants` eighth-turns around the clockwise octant ring
 * (one octant = 45°). Two octants (90°) preserves parity, so a cardinal facing
 * stays cardinal; one octant (45°) steps through all eight directions.
 */
export const rotateDirectionXy8 = (
  direction: DirectionXy8,
  sense: "anticlockwise" | "clockwise",
  octants: number,
): DirectionXy8 => {
  const i = directionsXy8Octants.indexOf(direction);
  // clockwise advances around the ring; anticlockwise is the complement:
  const step = sense === "clockwise" ? octants : 8 - octants;
  return directionsXy8Octants[(i + step) % 8];
};

// the cardinal directions in clockwise order (the even members of
// directionsXy8Octants), so a quarter-turn is ±1 step:
const directionsXy4Clockwise: DirectionXy4[] = [
  "right",
  "towards",
  "left",
  "away",
];

/**
 * rotate a 4-way (cardinal) facing by a quarter-turn (90°), staying cardinal -
 * the type-preserving counterpart of {@link rotateDirectionXy8} for items whose
 * direction is a {@link DirectionXy4}.
 */
export const rotateDirectionXy4 = (
  direction: DirectionXy4,
  sense: "anticlockwise" | "clockwise",
): DirectionXy4 => {
  const i = directionsXy4Clockwise.indexOf(direction);
  // +1 = 90° clockwise; +3 ≡ −1 (mod 4) = 90° anticlockwise:
  const step = sense === "clockwise" ? 1 : 3;
  return directionsXy4Clockwise[(i + step) % 4];
};

/** whether a 90° camera angle is an odd number of quarter-turns (which swaps the x and y axes) */
export const cameraAngleIsOddQuarterTurn = (quarterCameraAngle: Xy): boolean =>
  quarterCameraAngle.x === 0;

/** rotate an x/y axis by a camera angle - swaps x↔y on an odd quarter-turn, unchanged on an even one */
export const rotateAxisXyByCameraAngle = (
  axis: AxisXy,
  cameraAngle: Xy,
): AxisXy =>
  cameraAngleIsOddQuarterTurn(cameraAngle) ? perpendicularAxisXy(axis) : axis;

export const distanceSquaredXy = (
  { x: x1, y: y1 }: Xyz,
  { x: x2, y: y2 }: Xyz,
) => {
  return Math.abs(x2 - x1) ** 2 + Math.abs(y2 - y1) ** 2;
};

export const manhattanDistanceXy = (
  { x: x1, y: y1 }: Xyz,
  { x: x2, y: y2 }: Xyz,
) => {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
};

export const manhattanDistanceXyz = (
  { x: x1, y: y1, z: z1 }: Xyz,
  { x: x2, y: y2, z: z2 }: Xyz,
) => Math.abs(x2 - x1) + Math.abs(y2 - y1) + Math.abs(z2 - z1);

export const manhattanLengthXyz = ({ x, y, z }: Xyz) =>
  Math.abs(x) + Math.abs(y) + Math.abs(z);

export type Plane = {
  /** vector of a normal to all points on the plane */
  normal: Xyz;
  /** any point on the plane */
  point: Xyz;
};

/**
 * Checks if two vectors are in the same direction (parallel and pointing the same way).
 * Returns true if v2 is a positive scalar multiple of v1.
 */
export const areInSameDirection = (
  /** First vector */
  v1: Xyz,
  /** Second vector */
  v2: Xyz,
): boolean => {
  const dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;

  // Early exit if dot product is negative or zero
  if (dot <= 0) {
    return false;
  }

  // Check if parallel: |v1 · v2| = |v1| * |v2|
  const mag1Sq = v1.x * v1.x + v1.y * v1.y + v1.z * v1.z;
  const mag2Sq = v2.x * v2.x + v2.y * v2.y + v2.z * v2.z;

  // Compare squared values to avoid sqrt
  return Math.abs(dot * dot - mag1Sq * mag2Sq) < epsilon;
};

export const resetXyzInPlace = (xyz: Xyz) => {
  xyz.x = 0;
  xyz.y = 0;
  xyz.z = 0;
};
