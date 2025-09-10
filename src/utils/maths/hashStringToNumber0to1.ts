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
  let h = 0x811c9dc5; // FNV-1a initial seed
  const len = str.length;
  for (let i = Math.max(0, len - 9); i < len; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x5bd1e995); // FNV-1a multiplier
    h ^= h >>> 15;
  }
  return (h >>> 0) / 0xffffffff; // Convert to 0-1 range
};
