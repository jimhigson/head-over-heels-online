export const directions4Xy = ["away", "towards", "left", "right"] as const;
export type Direction4Xy = (typeof directions4Xy)[number];

export const directionsXyDiagonal = [
  "awayRight",
  "rightTowards",
  "towardsLeft",
  "leftAway",
] as const;

export type DirectionXyDiagonal = (typeof directionsXyDiagonal)[number];

export const directions8Xy = [
  ...directions4Xy,
  ...directionsXyDiagonal,
] as const;
export type Direction8Xy = (typeof directions8Xy)[number];

// prettier-ignore
type Matrix3x3 = [
  number, number, number, // Row 1
  number, number, number, // Row 2
  number, number, number, // Row 3
];

export const directionAxis = (direction: Direction4Xy): AxisXy =>
  direction === "away" || direction === "towards" ? "y" : "x";

export const oppositeDirection = (direction: Direction4Xy): Direction4Xy =>
  direction === "away" ? "towards"
  : direction === "towards" ? "away"
  : direction === "left" ? "right"
  : "left";

/**
 * doors sit along the axis perpendicular to their direction
 */
export const doorAlongAxis = (doorDirection: Direction4Xy): AxisXy =>
  perpendicularAxisXy(directionAxis(doorDirection));

export type DirectionZ = "down" | "up";
export type Direction4Xyz = Direction4Xy | DirectionZ;
export type Direction8Xyz = Direction8Xy | DirectionZ;

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

export const scaleXyz = (xy: Xyz, scale: number): Xyz => ({
  x: xy.x * scale,
  y: xy.y * scale,
  z: xy.z * scale,
});

export const xyzMagnitude = ({ x, y, z }: Xyz) =>
  Math.sqrt(x * x + y * y + z * z);

export const unitVector = (xyz: Xyz): Xyz =>
  scaleXyz(xyz, 1 / xyzMagnitude(xyz));

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
 * because of floating point error, after processing mtv it is possible to get
 * values that should be integers but are off by a tiny amount. To correct, we consider
 * anything that is within 1/1000 of a pixel to be exactly on that pixel
 */
const isIntegerOrCloseTo = (n: number) => Math.abs(n - Math.round(n)) < 0.001;
/* is the xyz in integer position (or very close to) */
export const isIntegerXyzOrCloseTo = ({ x = 0, y = 0, z = 0 }: Partial<Xyz>) =>
  isIntegerOrCloseTo(x) && isIntegerOrCloseTo(y) && isIntegerOrCloseTo(z);

export const isExactIntegerXyz = ({ x = 0, y = 0, z = 0 }: Partial<Xyz>) =>
  Number.isInteger(x) && Number.isInteger(y) && Number.isInteger(z);

export const roundXyz = ({ x, y, z }: Xyz) => ({
  x: Math.round(x),
  y: Math.round(y),
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
export type AxisXy = "x" | "y";

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

export const vectorClosestDirectionXy4 = ({ x, y }: Xy): Direction4Xy => {
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

export const distanceXySquared = (
  { x: x1, y: y1 }: Xyz,
  { x: x2, y: y2 }: Xyz,
) => {
  return Math.abs(x2 - x1) ** 2 + Math.abs(y2 - y1) ** 2;
};
