//# allFunctionsCalledOnLoad

import { veryClose } from "../../../utils/epsilon";
import { addXyz } from "../../../utils/vectors/vectors";
import { worldBoxToCameraSpace } from "../projections";
import { type DrawOrderComparable } from "./DrawOrderComparable";
import { type VisualIndex } from "./VisualIndex";
import {
  ADJACENT_X,
  ADJACENT_Y,
  type NO_OVERLAP,
  OVERLAP,
  visuallyOverlaps,
} from "./visuallyOverlaps";
import {
  Z_COMPARATOR_OF_VISUALLY_OVERLAPPING_UNDECIDED,
  zComparatorOfVisuallyOverlapping,
  zComparatorOfVisuallyOverlappingByMtv,
} from "./zComparatorOfVisuallyOverlapping";

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
  visualIndex: VisualIndex<DrawOrderComparable>,
): number => {
  if (
    // zero-volume (render) bb items don't participate in z-ordering - this is THE one way
    // to take an item out of z-sorting for efficiency.
    a.fixedZIndex !== undefined ||
    b.fixedZIndex !== undefined
  ) {
    return 0;
  }

  const { cameraAngle } = visualIndex;

  // compare in camera space so the fixed-camera draw-order rule below stays correct
  // for the current rotation (a 90° turn changes which item is in front):
  const aPhysical = worldBoxToCameraSpace(
    a.state.position,
    a.aabb,
    cameraAngle,
  );
  const aPos = aPhysical.position;
  const aAabb = aPhysical.aabb;
  const aVisual = worldBoxToCameraSpace(
    a.renderAabbOffset ?
      addXyz(a.state.position, a.renderAabbOffset)
    : a.state.position,
    a.renderAabb || a.aabb,
    cameraAngle,
  );
  const aPosVisual = aVisual.position;
  const aBbVisual = aVisual.aabb;

  const bPhysical = worldBoxToCameraSpace(
    b.state.position,
    b.aabb,
    cameraAngle,
  );
  const bPos = bPhysical.position;
  const bAabb = bPhysical.aabb;
  const bVisual = worldBoxToCameraSpace(
    b.renderAabbOffset ?
      addXyz(b.state.position, b.renderAabbOffset)
    : b.state.position,
    b.renderAabb || b.aabb,
    cameraAngle,
  );
  const bPosVisual = bVisual.position;
  const bBbVisual = bVisual.aabb;

  const visualOverlap = visuallyOverlaps(
    visualIndex.getItemAxesProjections(a)!,
    visualIndex.getItemAxesProjections(b)!,
  );

  switch (visualOverlap) {
    case OVERLAP: {
      let renderBBsOrder: number = zComparatorOfVisuallyOverlapping(
        aPosVisual,
        aBbVisual,
        bPosVisual,
        bBbVisual,
      );
      if (renderBBsOrder === Z_COMPARATOR_OF_VISUALLY_OVERLAPPING_UNDECIDED) {
        const renderBBDifferentFromPhysical =
          a.renderAabbOffset !== undefined ||
          a.renderAabb !== undefined ||
          b.renderAabbOffset !== undefined ||
          b.renderAabb !== undefined;

        if (renderBBDifferentFromPhysical) {
          // if the render bbs are undecided, move onto the physical bbs:
          renderBBsOrder = zComparatorOfVisuallyOverlapping(
            aPos,
            aAabb,
            bPos,
            bAabb,
          );
        }
      }
      if (renderBBsOrder === Z_COMPARATOR_OF_VISUALLY_OVERLAPPING_UNDECIDED) {
        renderBBsOrder = zComparatorOfVisuallyOverlappingByMtv(
          aPosVisual,
          aBbVisual,
          bPosVisual,
          bBbVisual,
        );
      }
      return renderBBsOrder;
    }
    case ADJACENT_X: {
      // special case for where items are touching on an edge along the x axis
      // eg - a wall next to a floor
      if (
        veryClose(aPosVisual.y, bPosVisual.y + bBbVisual.y) &&
        veryClose(aPosVisual.z, bPosVisual.z + bBbVisual.z)
      ) {
        return 1;
      }
      if (
        veryClose(bPosVisual.y, aPosVisual.y + aBbVisual.y) &&
        veryClose(bPosVisual.z, aPosVisual.z + aBbVisual.z)
      ) {
        return -1;
      }

      // higher y places items behind, higher z places them in front;
      // subtract z from y to account for both effects:
      return bPosVisual.y - bPosVisual.z - (aPosVisual.y - aPosVisual.z);
    }
    case ADJACENT_Y: {
      // same as ADJACENT_X, but for adjacency along the y axis (look at x and z)
      if (
        veryClose(aPosVisual.x, bPosVisual.x + bBbVisual.x) &&
        veryClose(aPosVisual.z, bPosVisual.z + bBbVisual.z)
      ) {
        return 1;
      }
      if (
        veryClose(bPosVisual.x, aPosVisual.x + aBbVisual.x) &&
        veryClose(bPosVisual.z, aPosVisual.z + aBbVisual.z)
      ) {
        return -1;
      }

      // higher x places items behind, higher z places them in front;
      // subtract z from x to account for both effects:
      return bPosVisual.x - bPosVisual.z - (aPosVisual.x - aPosVisual.z);
    }
    default: {
      visualOverlap satisfies NO_OVERLAP;
      return 0;
    }
  }
};
