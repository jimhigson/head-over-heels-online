export const directions = ["away", "towards", "left", "right"] as const;
export type Direction = (typeof directions)[number];

export const directionVectors: Record<Direction, Xyz> = {
  away: { x: 0, y: 1, z: 0 },
  left: { x: 1, y: 0, z: 0 },
  right: { x: -1, y: 0, z: 0 },
  towards: { x: 0, y: -1, z: 0 },
};

export type Xy = {
  x: number;
  y: number;
};

export const crossAxis = (axis: Axis): Axis => (axis === "x" ? "y" : "x");

export const addXy = (xy: Xy, ...xys: Array<Partial<Xy>>): Xy =>
  xys.reduce<Xy>(
    (ac, xyi) => ({
      x: ac.x + (xyi.x ?? 0),
      y: ac.y + (xyi.y ?? 0),
    }),
    xy,
  );

export const addXyz = (xyz: Xyz, ...xyzs: Array<Partial<Xyz>>): Xyz =>
  xyzs.reduce<Xyz>(
    (ac, xyi) => ({
      x: ac.x + (xyi.x ?? 0),
      y: ac.y + (xyi.y ?? 0),
      z: ac.z + (xyi.z ?? 0),
    }),
    xyz,
  );

export const originXyz: Xyz = { x: 0, y: 0, z: 0 };

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
export type Axis = "x" | "y";

//export type Aabb = [Xyz, Xyz];
/** how big is the collision box around an item? */
export type Aabb = Xyz;
