//# allFunctionsCalledOnLoad

import type { Xyz } from "../../../utils/vectors/vectors";
import type { GridSpatialIndex } from "../../physics/gridSpace/GridSpatialIndex";
import type { DrawOrderComparable } from "./DrawOrderComparable";
import type { ProjectionOnAxes } from "./projectAabbCorners";

import { veryClose } from "../../../utils/epsilon";
import { addXyz, axesXyz } from "../../../utils/vectors/vectors";

/** to compensate for floating point error, ranges have to be overlapping by this much to consider them to be visually overlapping */
const visuallyOverlapsMinimumOverlap = 0.000_01;
/** negative overlap means a small gap is allowed to be considered visually adjacent */
const visuallyAdjacentMinimumOverlap = -1;

const rangeOverlap = (
  aMin: number,
  aMax: number,
  bMin: number,
  bMax: number,

  tolerance: number,
) => {
  return bMax - tolerance > aMin && bMin < aMax - tolerance;
};

const NO_OVERLAP = 0;
const OVERLAP = 1;
const ADJACENT_X = 2;
const ADJACENT_Y = 3;
//const ADJACENT_Z = 4;

type NO_OVERLAP = typeof NO_OVERLAP;
type OVERLAP = typeof OVERLAP;
type ADJACENT_X = typeof ADJACENT_X;
type ADJACENT_Y = typeof ADJACENT_Y;
// ACTUALLY, we don't care about z-adjacency yet since it doesn't cause noticeable visual
// artifacts like x and y
//type ADJACENT_Z = typeof ADJACENT_Z;
type VISUALLY_OVERLAPS_RETURN = ADJACENT_X | ADJACENT_Y | NO_OVERLAP | OVERLAP;
//| ADJACENT_Z;

/**
 * return true iff the projected hexagons of the two aabbs overlaps in
 * screen-space
 */
const visuallyOverlaps = (
  a: ProjectionOnAxes,
  b: ProjectionOnAxes,
): VISUALLY_OVERLAPS_RETURN => {
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
    // x adjacent:
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

  /*  
  if (
    xAxisOverlap &&
    yAxisOverlap &&
    // z adjacent:
    rangeOverlap(aXMin, aXMax, bXMin, bXMax, visuallyAdjacentMinimumOverlap)
  ) {
    return ADJACENT_Z;
  }
  */

  return NO_OVERLAP;
};

export const zComparatorOfVisuallyOverlapping = (
  aPosition: Xyz,
  aBb: Xyz,
  bPosition: Xyz,
  bBb: Xyz,
) => {
  for (const axis of axesXyz) {
    const axisMinA = aPosition[axis];
    const axisMaxA = axisMinA + aBb[axis];

    const axisMinB = bPosition[axis];
    const axisMaxB = axisMinB + bBb[axis];

    // console.log(`check for <= in ${axis} :`, { axisMaxA, axisMinB });

    if (axisMaxA <= axisMinB) {
      // a is entirely less than b in this axis (no overlap)
      // flip for z axis, because higher z is in front, whereas for x and y, lower is in front
      return 1 * (axis === "z" ? -1 : 1);
    }

    // console.log(`check for >= in ${axis} :`, { axisMinA, axisMaxB });

    if (axisMinA >= axisMaxB) {
      // a is entirely less than b in this axis (no overlap)
      // flip for z axis, because higher z is in front, whereas for x and y, lower is in front
      return -1 * (axis === "z" ? -1 : 1);
    }

    // a and b overlap in this axis, so we need to check the next axis
  }

  // if we get here, two items are intersecting - this is very unusual, but can happen
  // for non-solid items - eg, the cloud left over after a pickup is collected can be
  // walked through. Return the difference of the isometric z-buffer depth for the two items.
  // since these intersecting items should be the same size, and this isn't critical, the bounding boxes
  // are not used to decide the order
  return zScore(bPosition) - zScore(aPosition);
};

/**
 * comparator suitable for ordering by z (with a topographic sort, not a normal sort)
 *
 *  returns:
 *    >0 if a is in front of b
 *    0 if neither is in front/behind the other
 *    <0 if a is behind b
 */
export const zComparator = (
  a: DrawOrderComparable,
  b: DrawOrderComparable,
  spatialIndex: GridSpatialIndex<string, string, DrawOrderComparable>,
): number => {
  if (
    // zero-volume (render) bb items don't participate in z-ordering - this is THE one way
    // to take an item out of z-sorting for efficiency.
    a.fixedZIndex !== undefined ||
    b.fixedZIndex !== undefined
  ) {
    return 0;
  }

  const aPos =
    a.renderAabbOffset ?
      addXyz(a.state.position, a.renderAabbOffset)
    : a.state.position;
  const aBb = a.renderAabb || a.aabb;
  const bPos =
    b.renderAabbOffset ?
      addXyz(b.state.position, b.renderAabbOffset)
    : b.state.position;
  const bBb = b.renderAabb || b.aabb;

  const visualOverlap = visuallyOverlaps(
    spatialIndex.getItemAxesProjections(a)!,
    spatialIndex.getItemAxesProjections(b)!,
  );

  switch (visualOverlap) {
    case OVERLAP: {
      return zComparatorOfVisuallyOverlapping(aPos, aBb, bPos, bBb);
    }
    case ADJACENT_X: {
      // special case for where items are touching on an edge along the y axis, meaning that one
      // item must be the same height as if it were on top of the other.
      // eg - a wall next to a floor
      if (
        veryClose(aPos.y, bPos.y + bBb.y) &&
        veryClose(aPos.z, bPos.z + bBb.z)
      ) {
        return 1;
      }
      if (
        veryClose(bPos.y, aPos.y + aBb.y) &&
        veryClose(bPos.z, aPos.z + aBb.z)
      ) {
        return -1;
      }

      // whichever has the lower x position is in front. This helps when items render outside of their
      // bounding boxes (eg, heels standing on a floor with a wall behind, can otherwise get cut off by the wall)
      // TODO: this would be better solved by allowing renderBBs to be larger than aabbs, but that is not implemented yet
      // since the order detection doesn't support overlapping items
      //return bPos.y - aPos.y;
      return 0;
    }
    case ADJACENT_Y: {
      // same as ADJACENT_X, but for adjacency along the y axis (look at x and z)
      if (
        veryClose(aPos.x, bPos.x + bBb.x) &&
        veryClose(aPos.z, bPos.z + bBb.z)
      ) {
        return 1;
      }
      if (
        veryClose(bPos.x, aPos.x + aBb.x) &&
        veryClose(bPos.z, aPos.z + aBb.z)
      ) {
        return -1;
      }
      return 0;
    }
    // case ADJACENT_Z: {
    // }
    default: {
      visualOverlap satisfies NO_OVERLAP;
      return 0;
    }
  }
};

const zScore = (itemPosition: Xyz) =>
  itemPosition.x + itemPosition.y - itemPosition.z;
