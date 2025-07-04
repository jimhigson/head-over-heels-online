import { veryClose } from "../veryClose";

export const directionsXy4 = ["away", "towards", "left", "right"] as const;
export type DirectionXy4 = (typeof directionsXy4)[number];
export type DirectionXyz4 = DirectionXy4 | "up" | "down";

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

export const directionAxis = (direction: DirectionXy4): AxisXy =>
  direction === "away" || direction === "towards" ? "y" : "x";

export const oppositeDirection = (direction: DirectionXy4): DirectionXy4 =>
  direction === "away" ? "towards"
  : direction === "towards" ? "away"
  : direction === "left" ? "right"
  : "left";

/**
 * doors sit along the axis perpendicular to their direction
 */
export const doorAlongAxis = (doorDirection: DirectionXy4): AxisXy =>
  perpendicularAxisXy(directionAxis(doorDirection));

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

export const lengthXyz = ({ x, y, z }: Xyz) => Math.sqrt(x * x + y * y + z * z);
export const lengthXy = ({ x, y }: Xy) => Math.sqrt(x * x + y * y);

export const unitVector = (xyz: Xyz): Xyz => {
  const l = lengthXyz(xyz);
  if (l === 0) {
    throw new Error("unitVector called with zero length vector");
  }
  return scaleXyz(xyz, 1 / l);
};

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
