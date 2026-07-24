import { directionIndexXy8, type DirectionXy8 } from "./vectors";

/**
 * the octant ring index of a named direction - for the name-keyed boundaries
 * (spritesheet layout/meta) to reach the numbered sprite-variant space.
 *
 * Generic over the direction so a literal name gives its literal index, which
 * keeps the `.dN` template literal types exact. Its own module so callers can
 * macro-import it while still importing values from {@link ./vectors} normally.
 */
export const octantIndexOfDirection = <D extends DirectionXy8>(
  direction: D,
): (typeof directionIndexXy8)[D] => directionIndexXy8[direction];

/**
 * type-level {@link octantIndexOfDirection}: the literal octant ring index of a
 * named direction (eg `OctantIndexOfDirection<"left">` is `0`), for `.dN`
 * template literal types to stay keyed by direction name
 */
export type OctantIndexOfDirection<D extends DirectionXy8> =
  (typeof directionIndexXy8)[D];
