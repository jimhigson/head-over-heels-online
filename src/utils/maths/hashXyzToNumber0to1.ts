import { type Xyz } from "../vectors/vectors";

/**
 * A tiny, fast, non-cryptographic hash of a position (plus any extra salt
 * values) to a number in `[0, 1)`. Used to give each item a stable
 * pseudo-random value (its `hash`) so that identical animations in a room don't
 * play in lock-step. The only requirements on this value are that it is stable
 * between room loads and not derived from the item id (ids can be rewritten, eg
 * when the columnar codec synthesises them for the original campaign) - it does
 * not have to relate to the item's position, that is just a convenient stable
 * seed. Emitters can pass an extra value such as `roomTime` so co-located items
 * emitted at different times don't start their animations in sync.
 *
 * Positions sit on a 1/8 grid, so each value is scaled to an integer before
 * mixing; the FNV-1a-style multiply+shift spreads even small, nearby values
 * across the whole range (a plain xor would leave them clustered near zero - ie
 * all starting on frame 0, the opposite of what we want).
 */
export const hashXyzToNumber0to1 = (
  { x, y, z }: Xyz,
  /**
   * extra values folded into the hash, eg a roomTime to de-synchronise items
   * emitted at the same position but different times
   */
  ...extra: number[]
): number => {
  let h = 0x81_1c_9d_c5;
  for (const n of [x, y, z, ...extra]) {
    h ^= Math.round(n * 8);
    h = Math.imul(h, 0x01_00_01_93);
    h ^= h >>> 15;
  }
  return (h >>> 0) / 0x1_00_00_00_00;
};

/**
 * a distinct phase in `[0, 1)` for the nth sub-part of an item that shares one
 * `hash` (eg each tile of a multi-tile wall), by stepping around the unit
 * interval by the golden ratio - which spreads successive indices about as
 * evenly as possible.
 */
export const phaseForSubItem = (
  hash: number | undefined,
  index: number,
): number => ((hash ?? 0) + index * 0.618_033_988_749_895) % 1;
