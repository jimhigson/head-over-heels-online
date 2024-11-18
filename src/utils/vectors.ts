export const directions = ["away", "towards", "left", "right"] as const;
export type Direction = (typeof directions)[number];

export const directionAxis = (direction: Direction): AxisXy =>
  direction === "away" || direction === "towards" ? "y" : "x";

export const oppositeDirection = (direction: Direction): Direction =>
  direction === "away" ? "towards"
  : direction === "towards" ? "away"
  : direction === "left" ? "right"
  : "left";

/**
 * doors sit along the axis perpendicular to their direction
 */
export const doorAlongAxis = (doorDirection: Direction): AxisXy =>
  perpendicularAxisXy(directionAxis(doorDirection));

export const unitVectors: Record<Direction | "down" | "up", Xyz> = {
  away: { x: 0, y: 1, z: 0 },
  left: { x: 1, y: 0, z: 0 },
  right: { x: -1, y: 0, z: 0 },
  towards: { x: 0, y: -1, z: 0 },
  down: { x: 0, y: 0, z: -1 },
  up: { x: 0, y: 0, z: 1 },
};

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

export const addXyz = (xyz: Xyz, ...xyzs: Array<Partial<Xyz>>): Xyz =>
  xyzs.reduce<Xyz>(
    (ac, xyi) => ({
      x: ac.x + (xyi.x ?? 0),
      y: ac.y + (xyi.y ?? 0),
      z: ac.z + (xyi.z ?? 0),
    }),
    xyz,
  );

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

export type Aabb = Xyz;

/** how big is the collision box around an item? */
export const dotProductXyz = (a: Xyz, b: Xyz): number => {
  return a.x * b.x + a.y * b.y + a.z * b.z;
};
