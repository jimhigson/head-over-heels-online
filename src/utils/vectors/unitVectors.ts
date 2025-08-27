import type { Direction8Xyz, Xyz } from "./vectors";

import { addXyz, unitVector } from "./vectors";

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
  awayRight: unitVector(addXyz(a, r)),
  towardsRight: unitVector(addXyz(t, r)),
  towardsLeft: unitVector(addXyz(t, l)),
  awayLeft: unitVector(addXyz(a, l)),
};
