import type { Direction8Xyz, Xyz } from "./vectors";

import { addXyz, unitVectorInPlace } from "./vectors";

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
