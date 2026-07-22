import { type Xyz } from "../vectors/vectors";

const fnvInitialSeed = 0x81_1c_9d_c5;

/**
 * one round of the FNV-1a-style mixer shared by the numeric hashes: the
 * multiply+shift spreads even small, nearby values across the whole range (a
 * plain xor would leave them clustered near zero)
 */
const mix = (h: number, value: number): number => {
  h ^= value;
  h = Math.imul(h, 0x01_00_01_93);
  h ^= h >>> 15;
  return h;
};

/**
 * Generates a deterministic pseudo-random number between 0 and 1 from a string.
 *
 * Used to give floating enemies (cyberman, bubbleRobot, emperorsGuardian) unique
 * phase offsets in their vertical bobbing animations. This prevents all floating
 * enemies in a room from bobbing in perfect synchronisation - each enemy bobs at
 * the same frequency but starts at a different point in the sine wave.
 *
 * Uses a variant of the FNV-1a hash algorithm for speed and good distribution.
 * Only hashes the last 9 characters of the string for performance. This makes it well
 * suited to hashing short unique IDs that differ at the end, particularly item ids
 * from the original campaign such as `monster@(1,2,3)`
 *
 * @param str - Typically an item's unique ID
 * @returns A number between 0 and 1
 */
export const hashStringToNumber0to1 = (str: string): number => {
  let h = fnvInitialSeed;
  const len = str.length;
  for (let i = Math.max(0, len - 9); i < len; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x5b_d1_e9_95); // FNV-1a multiplier
    h ^= h >>> 15;
  }
  return (h >>> 0) / 0xff_ff_ff_ff; // Convert to 0-1 range
};

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
 * mixing - see {@link mix} for why plain xor would not do.
 */
export const hashXyzToNumber0to1 = (
  { x, y, z }: Xyz,
  /**
   * extra values folded into the hash, eg a roomTime to de-synchronise items
   * emitted at the same position but different times
   */
  ...extra: number[]
): number => {
  let h = fnvInitialSeed;
  h = mix(h, Math.round(x * 8));
  h = mix(h, Math.round(y * 8));
  h = mix(h, Math.round(z * 8));
  for (let i = 0; i < extra.length; i++) {
    h = mix(h, Math.round(extra[i] * 8));
  }
  return (h >>> 0) / 0x1_00_00_00_00;
};

/**
 * A tiny, fast, non-cryptographic hash of a number to a number in `[0, 1)` -
 * for deriving further stable pseudo-random values from ones that already
 * exist, eg rolling deterministic pseudo-randomness from an item's `hash`.
 * Callers combine multiple inputs by adding them (eg `hash + roomTime`).
 *
 * The integer part and the fraction (at 32-bit resolution) are folded in
 * separately, so values in `[0, 1)` (like item hashes) keep their full
 * resolution and values above 1 (like times in ms) still differ by their
 * whole part. Takes exactly one number - no varargs - so calling it in
 * per-tick physics code allocates nothing.
 */
export const hashNumberToNumber0to1 = (n: number): number => {
  let h = fnvInitialSeed;
  h = mix(h, Math.floor(n));
  h = mix(h, Math.floor((n % 1) * 0x1_00_00_00_00));
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
