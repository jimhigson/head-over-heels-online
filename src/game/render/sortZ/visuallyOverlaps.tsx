import type { ProjectionOnAxes } from "./projectAabbCorners";

/** to compensate for floating point error, ranges have to be overlapping by this much to consider them to be visually overlapping */
const visuallyOverlapsMinimumOverlap = 0.000_01;
/** negative overlap means a small gap is allowed to be considered visually adjacent */
const visuallyAdjacentMinimumOverlap = -0.1;

const rangeOverlap = (
  aMin: number,
  aMax: number,
  bMin: number,
  bMax: number,

  tolerance: number,
) => {
  return bMax - tolerance > aMin && bMin < aMax - tolerance;
};

export const NO_OVERLAP = 0;
export const OVERLAP = 1;
export const ADJACENT_X = 2;
export const ADJACENT_Y = 3;

export type NO_OVERLAP = typeof NO_OVERLAP;
export type OVERLAP = typeof OVERLAP;
export type ADJACENT_X = typeof ADJACENT_X;
export type ADJACENT_Y = typeof ADJACENT_Y;
export type VisuallyOverlapsReturn =
  | ADJACENT_X
  | ADJACENT_Y
  | NO_OVERLAP
  | OVERLAP;

/**
 * return whether the projected hexagons of the two aabbs overlaps in
 * screen-space, and if not, whether they are adjacent
 */
export const visuallyOverlaps = (
  a: ProjectionOnAxes,
  b: ProjectionOnAxes,
): VisuallyOverlapsReturn => {
  const zAxisOverlap = rangeOverlap(
    a.zAxisProjectionMin,
    a.zAxisProjectionMax,
    b.zAxisProjectionMin,
    b.zAxisProjectionMax,
    visuallyOverlapsMinimumOverlap,
  );

  const xAxisOverlap = rangeOverlap(
    a.xAxisProjectionMin,
    a.xAxisProjectionMax,
    b.xAxisProjectionMin,
    b.xAxisProjectionMax,
    visuallyOverlapsMinimumOverlap,
  );

  const yAxisOverlap = rangeOverlap(
    a.yAxisProjectionMin,
    a.yAxisProjectionMax,
    b.yAxisProjectionMin,
    b.yAxisProjectionMax,
    visuallyOverlapsMinimumOverlap,
  );

  if (xAxisOverlap && yAxisOverlap && zAxisOverlap) {
    return OVERLAP;
  }

  if (
    yAxisOverlap &&
    zAxisOverlap &&
    rangeOverlap(
      a.xAxisProjectionMin,
      a.xAxisProjectionMax,
      b.xAxisProjectionMin,
      b.xAxisProjectionMax,
      visuallyAdjacentMinimumOverlap,
    )
  ) {
    return ADJACENT_X;
  }

  if (
    xAxisOverlap &&
    zAxisOverlap &&
    // y adjacent:
    rangeOverlap(
      a.yAxisProjectionMin,
      a.yAxisProjectionMax,
      b.yAxisProjectionMin,
      b.yAxisProjectionMax,
      visuallyAdjacentMinimumOverlap,
    )
  ) {
    return ADJACENT_Y;
  }

  return NO_OVERLAP;
};
