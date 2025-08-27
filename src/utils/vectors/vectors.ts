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

export type DirectionXyDiagonal = (typeof directionsXyDiagonal)[number];

export const directionsXy8 = [
  ...directionsXy4,
  ...directionsXyDiagonal,
] as const;
export type DirectionXy8 = (typeof directionsXy8)[number];

// prettier-ignore
type Matrix3x3 = [
  number, number, number, // Row 1
  number, number, number, // Row 2
  number, number, number, // Row 3
];

export const tangentAxis = (direction: DirectionXy4): AxisXy =>
  direction === "away" || direction === "towards" ? "y" : "x";

export const normalAxis = (direction: DirectionXy4): AxisXy =>
  perpendicularAxisXy(tangentAxis(direction));

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

export type DirectionZ = "down" | "up";
export type Direction4Xyz = DirectionXy4 | DirectionZ;
export type Direction8Xyz = DirectionXy8 | DirectionZ;

export type Xy = {
  x: number;
  y: number;
};

export const perpendicularAxisXy = (axis: AxisXy): AxisXy =>
  axis === "x" ? "y" : "x";

export const addXy = (xy: Xy, ...xys: Array<Partial<Xy>>): Xy =>
  xys.reduce<Xy>(
    (ac, xyi) => ({
      x: ac.x + (xyi.x ?? 0),
      y: ac.y + (xyi.y ?? 0),
    }),
    xy,
  );

export const subXy = (xy: Xy, ...xys: Array<Partial<Xy>>): Xy =>
  xys.reduce<Xy>(
    (ac, xyi) => ({
      x: ac.x - (xyi.x ?? 0),
      y: ac.y - (xyi.y ?? 0),
    }),
    xy,
  );

export const scaleXy = (xy: Xy, scale: number): Xy => ({
  x: xy.x * scale,
  y: xy.y * scale,
});
export const scaleXyz = (xy: Xyz, scale: number): Xyz => ({
  x: xy.x * scale,
  y: xy.y * scale,
  z: xy.z * scale,
});
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

export const cornerVectorsXyz = [
  { x: 0, y: 0, z: 0 },
  { x: 0, y: 0, z: 1 },
  { x: 0, y: 1, z: 0 },
  { x: 0, y: 1, z: 1 },
  { x: 1, y: 0, z: 0 },
  { x: 1, y: 0, z: 1 },
  { x: 1, y: 1, z: 0 },
  { x: 1, y: 1, z: 1 },
] as const satisfies Array<Xyz>;
/** the corners that are visible in the isometric view */
export const visibleCornerVectorsXyz = [
  { x: 0, y: 0, z: 0 },
  { x: 0, y: 0, z: 1 },
  { x: 0, y: 1, z: 0 },
  { x: 0, y: 1, z: 1 },
  { x: 1, y: 0, z: 0 },
  { x: 1, y: 0, z: 1 },
  { x: 1, y: 1, z: 1 },
] as const satisfies Array<Xyz>;

/**
 * clockwise rotation of the xy component
 */
export const perpendicularXyz = ({ x, y, z }: Xyz): Xyz => ({
  x: y,
  y: -x,
  z,
});

export const addXyz = (...xyzs: Array<Partial<Xyz>>): Xyz => {
  return xyzs.reduce<Xyz>(
    ({ x: acX, y: acY, z: acZ }, { x: iX = 0, y: iY = 0, z: iZ = 0 }) => ({
      x: acX + iX,
      y: acY + iY,
      z: acZ + iZ,
    }),
    originXyz,
  );
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

export const subXyz = (xyz: Xyz, ...xyzs: Array<Partial<Xyz>>): Xyz =>
  xyzs.reduce<Xyz>(
    (ac, xyi) => ({
      x: ac.x - (xyi.x ?? 0),
      y: ac.y - (xyi.y ?? 0),
      z: ac.z - (xyi.z ?? 0),
    }),
    xyz,
  );

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
  } else {
    return input;
  }
};

export const isExactIntegerXyz = ({ x = 0, y = 0, z = 0 }: Partial<Xyz>) =>
  Number.isInteger(x) && Number.isInteger(y) && Number.isInteger(z);

export const roundXyz = ({ x, y, z }: Xyz) => ({
  x: Math.round(x),
  y: Math.round(y),
  z: Math.round(z),
});
export const roundXyzToXyHalves = ({ x, y, z }: Xyz) => ({
  x: Math.round(x * 2) / 2,
  y: Math.round(y * 2) / 2,
  z: Math.round(z),
});

export const originXy: Xy = Object.freeze({ x: 0, y: 0 });
export const originXyz: Xyz = Object.freeze({ x: 0, y: 0, z: 0 });
export const unitXyz: Xyz = Object.freeze({ x: 1, y: 1, z: 1 });

export type Xyz = {
  x: number;
  y: number;
  z: number;
};
export type XyMaybeZ = {
  x: number;
  y: number;
  z?: number;
};
export const axesXy = ["x", "y"] as const;
export type AxisXy = (typeof axesXy)[number];

export const axesXyz = ["x", "y", "z"] as const;
export type AxisXyz = (typeof axesXyz)[number];

export type Aabb = Readonly<Xyz>;

/**
 * dot product - the component of one vector in the direction of another
 */
export const dotProductXyz = (a: Xyz, b: Xyz): number => {
  return a.x * b.x + a.y * b.y + a.z * b.z;
};

export const multiplyMatrixVector = (
  matrix: Matrix3x3,
  { x, y, z }: Xyz,
): Xyz => ({
  x: matrix[0] * x + matrix[1] * y + matrix[2] * z,
  y: matrix[3] * x + matrix[4] * y + matrix[5] * z,
  z: matrix[6] * x + matrix[7] * y + matrix[8] * z,
});

// prettier-ignore
/** matrix to multiply against to discard the z component of a vector */
export const xyOnlyMatrix : Matrix3x3 = [
  1, 0, 0, // Row 1
  0, 1, 0, // Row 2
  0, 0, 0, // Row 3
];

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
    } else {
      return "right";
    }
  } else {
    if (y > -x) {
      return "left";
    } else {
      return "towards";
    }
  }
};

const directionsXy8Octants: DirectionXy8[] = [
  // these need to be in order clockwise
  "right",
  "towardsRight",
  "towards",
  "towardsLeft",
  "left",
  "awayLeft",
  "away",
  "awayRight",
];

export const vectorClosestDirectionXy8 = ({
  x,
  y,
}: Xy): DirectionXy8 | undefined => {
  if (veryClose(x, 0) && veryClose(y, 0)) {
    return undefined;
  }

  const angle = Math.atan2(-y, -x);
  const octant = Math.round((8 * angle) / (2 * Math.PI)) & 7;

  return directionsXy8Octants[octant];
};

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

export type OrthoPlane = "xy" | "xz" | "yz";

/**
 * For when a text descrition of a plane is easier to work with,
 * convert a normal vector to a plane
 */
export const orthoPlaneForNormal = (
  /** the normal vector to the plane */
  planeNormal: Xyz,
): OrthoPlane => {
  const { x: nx, y: ny, z: nz } = planeNormal;

  // For xy-plane (normal = [0, 0, 1]), z = 0
  // on top/bottom face
  if (veryClose(nx, 0) && veryClose(ny, 0) && !veryClose(nz, 0)) {
    return "xy";
  }

  // For xz-plane (normal = [0, 1, 0]), y = 0
  // on away/towards face
  if (veryClose(nx, 0) && !veryClose(ny, 0) && veryClose(nz, 0)) {
    return "xz";
  }

  // For yz-plane (normal = [1, 0, 0]), x = 0
  // left/right face
  if (!veryClose(nx, 0) && veryClose(ny, 0) && veryClose(nz, 0)) {
    return "yz";
  }

  throw new Error(
    `only axis-aligned planes are supported, cannot get normal plane for ${JSON.stringify(planeNormal)}`,
  );
};

export type Plane = {
  /** vector of a normal to all points on the plane */
  normal: Xyz;
  /** any point on the plane */
  point: Xyz;
};

export const absXyz = ({ x, y, z }: Xyz): Xyz => ({
  x: Math.abs(x),
  y: Math.abs(y),
  z: Math.abs(z),
});

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
  if (dot <= 0) return false;

  // Check if parallel: |v1 · v2| = |v1| * |v2|
  const mag1Sq = v1.x * v1.x + v1.y * v1.y + v1.z * v1.z;
  const mag2Sq = v2.x * v2.x + v2.y * v2.y + v2.z * v2.z;

  // Compare squared values to avoid sqrt
  return Math.abs(dot * dot - mag1Sq * mag2Sq) < epsilon;
};
