/** start inclusive, end exclusive */
export type NumberPair = [start: number, end: number];

/**
 * Test if two ranges overlap
 */
export const pairsOverlap = (
  range1: NumberPair,
  range2: NumberPair,
): boolean => {
  const [start1, end1] = range1;
  const [start2, end2] = range2;

  return rangesOverlap(start1, end1, start2, end2);
};

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
