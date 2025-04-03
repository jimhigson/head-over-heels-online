import { projectWorldXyzToScreenXy } from "../../../../../render/projectToScreen";
import type { Bounds } from "./Map.svg";
import type { RoomGridPositionSpec } from "./roomGridPositions";
import { roomWorldPosition } from "./roomWorldPosition";

/**
 * the top-most position a rendered room's bounds can have
 * in the svg picture (will be negative)
 */
const roomTop = projectWorldXyzToScreenXy(
  roomWorldPosition({ x: 1, y: 1, z: 1 }),
).y;
/**
 * the right-most position a rendered room's bounds can have
 * in the svg picture (will be positive)
 */
const roomRight = projectWorldXyzToScreenXy(
  roomWorldPosition({ x: 0, y: 1, z: 0 }),
).x;

export const findMapBounds = <RoomId extends string>(
  roomGridPositionSpecs: Array<RoomGridPositionSpec<RoomId>>,
): Bounds => {
  return roomGridPositionSpecs.reduce<Bounds>(
    (ac, { gridPosition }) => {
      const projection = projectWorldXyzToScreenXy(
        roomWorldPosition(gridPosition),
      );

      return {
        t: Math.min(ac.t, projection.y + roomTop),
        b: Math.max(ac.b, projection.y),
        l: Math.min(ac.l, projection.x - roomRight),
        r: Math.max(ac.r, projection.x + roomRight),
      };
    },
    {
      t: Number.POSITIVE_INFINITY,
      b: Number.NEGATIVE_INFINITY,
      l: Number.POSITIVE_INFINITY,
      r: Number.NEGATIVE_INFINITY,
    },
  );
};
