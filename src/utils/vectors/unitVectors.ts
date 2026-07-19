import {
  addXyz,
  type Direction8Xyz,
  directionsXy8Octants,
  unitVectorInPlace,
  type Xyz,
} from "./vectors";

const l = { x: 1, y: 0, z: 0 };
const r = { x: -1, y: 0, z: 0 };
const t = { x: 0, y: -1, z: 0 };
const a = { x: 0, y: 1, z: 0 };

export const unitVectors: Record<Direction8Xyz, Xyz> = {
  away: a,
  left: l,
  right: r,
  towards: t,
  down: { x: 0, y: 0, z: -1 },
  up: { x: 0, y: 0, z: 1 },
  awayRight: unitVectorInPlace(addXyz(a, r)),
  towardsRight: unitVectorInPlace(addXyz(t, r)),
  towardsLeft: unitVectorInPlace(addXyz(t, l)),
  awayLeft: unitVectorInPlace(addXyz(a, l)),
};

/**
 * the eight unit direction vectors in octant ring order, indexed by their
 * {@link DirectionIndexXy8} - the vector counterpart of
 * {@link directionsXy8Octants}, so a discretised direction index maps straight
 * to its unit vector without naming the direction
 */
export const unitVectorsXy8Octants: readonly Xyz[] = directionsXy8Octants.map(
  (direction) => unitVectors[direction],
);
