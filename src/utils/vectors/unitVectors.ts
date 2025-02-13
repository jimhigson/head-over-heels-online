import type { Direction8Xyz, Xyz } from "./vectors";
import { unitVector } from "./vectors";

export const unitVectors: Record<Direction8Xyz, Xyz> = {
  away: { x: 0, y: 1, z: 0 },
  left: { x: 1, y: 0, z: 0 },
  right: { x: -1, y: 0, z: 0 },
  towards: { x: 0, y: -1, z: 0 },
  down: { x: 0, y: 0, z: -1 },
  up: { x: 0, y: 0, z: 1 },
  awayRight: unitVector({ x: 1, y: 1, z: 0 }),
  towardsRight: unitVector({ x: 1, y: -1, z: 0 }),
  towardsLeft: unitVector({ x: -1, y: -1, z: 0 }),
  awayLeft: unitVector({ x: -1, y: 1, z: 0 }),
};
