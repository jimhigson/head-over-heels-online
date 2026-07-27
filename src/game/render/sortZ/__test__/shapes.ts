import { type Xyz } from "../../../../utils/vectors/vectors";

/**
 * box size mix, reflecting real rooms: blocks, double-heights, zero-thickness
 * and thin walls, tall thin pillars, floor slabs, long items
 */
export const shapes: Xyz[] = [
  { x: 16, y: 16, z: 16 },
  { x: 16, y: 16, z: 32 },
  { x: 0, y: 64, z: 48 },
  { x: 64, y: 0, z: 48 },
  { x: 1, y: 48, z: 48 },
  { x: 8, y: 8, z: 100 },
  { x: 128, y: 128, z: 16 },
  { x: 48, y: 16, z: 16 },
  { x: 16, y: 48, z: 16 },
  { x: 12, y: 12, z: 12 },
];
