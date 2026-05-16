/**
 * Test if two ranges overlap
 */
export const rangesOverlap = (
  start1: number,
  end1: number,
  start2: number,
  end2: number,
): boolean => {
  return start1 <= end2 && start2 <= end1;
};
