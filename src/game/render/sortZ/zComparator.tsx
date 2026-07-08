//# allFunctionsCalledOnLoad

import { epsilon, veryClose } from "../../../utils/epsilon";
import { rotatedX, rotatedY } from "../../../utils/vectors/rotateXy";
import { type Xyz } from "../../../utils/vectors/vectors";
import {
  type RenderBox,
  type RenderBoxes,
} from "../renderBox/makeItemRenderBoxAtCameraAngle";
import { type DrawOrderComparable } from "./DrawOrderComparable";
import { effectiveFixedZIndex } from "./fixedZIndexes";
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

// reused scratch for each item's render-box world position (render offset applied).
// a and b get *separate* scratch so both can be live at once; only one comparison
// happens at a time (single-threaded), so module-level is safe.
const aRenderScratch: Xyz = { x: 0, y: 0, z: 0 };
const bRenderScratch: Xyz = { x: 0, y: 0, z: 0 };

/** the world min-corner of an item's render box, using `scratch` if it has a render offset */
const renderBoxWorldPos = (
  item: DrawOrderComparable,
  renderBox: null | RenderBox | undefined,
  scratch: Xyz,
): Xyz => {
  const { position } = item.state;
  const offset = renderBox?.renderAabbOffset;
  if (offset === undefined) {
    return position;
  }
  scratch.x = position.x + offset.x;
  scratch.y = position.y + offset.y;
  scratch.z = position.z + offset.z;
  return scratch;
};

/** overlap length of two 1-D intervals; ≤ 0 when they meet at a point or are disjoint */
const intervalOverlap = (
  aLo: number,
  aHi: number,
  bLo: number,
  bHi: number,
): number => Math.min(aHi, bHi) - Math.max(aLo, bLo);

/**
 * comparator suitable for ordering by z (with a topographic sort, not a normal sort)
 *
 *  returns:
 *    >0 if a is in front of b
 *    0 if neither is in front/behind the other
 *    <0 if a is behind b
 *
 * The camera rotation is folded into the comparison (via the camera angle on the
 * VisualIndex): the broad-phase projections are already camera-correct, and the fine
 * phase below compares in camera space without ever building a rotated box.
 */
export const zComparator = (
  a: DrawOrderComparable,
  b: DrawOrderComparable,
  visualIndex: VisualIndex<DrawOrderComparable>,
  /** the drawn extents, owned by the caller (in-game, the room renderer) */
  renderBoxes: RenderBoxes<DrawOrderComparable>,
): number => {
  const { cameraAngle } = visualIndex;

  if (
    // fixed-z-index items (including walls hidden at this angle) don't
    // participate in z-ordering - this is THE one way to take an item out of
    // z-sorting for efficiency.
    effectiveFixedZIndex(a, cameraAngle) !== undefined ||
    effectiveFixedZIndex(b, cameraAngle) !== undefined
  ) {
    return 0;
  }

  const aRenderBox = renderBoxes.get(a);
  const bRenderBox = renderBoxes.get(b);
  const aRenderPos = renderBoxWorldPos(a, aRenderBox, aRenderScratch);
  const aRenderBb = aRenderBox?.renderAabb ?? a.aabb;
  const bRenderPos = renderBoxWorldPos(b, bRenderBox, bRenderScratch);
  const bRenderBb = bRenderBox?.renderAabb ?? b.aabb;

  const aProj = visualIndex.getItemAxesProjections(a)!;
  const bProj = visualIndex.getItemAxesProjections(b)!;
  const visualOverlap = visuallyOverlaps(aProj, bProj);

  switch (visualOverlap) {
    case OVERLAP: {
      let renderBBsOrder: number = zComparatorOfVisuallyOverlapping(
        aRenderPos,
        aRenderBb,
        bRenderPos,
        bRenderBb,
        cameraAngle,
      );
      if (renderBBsOrder === Z_COMPARATOR_OF_VISUALLY_OVERLAPPING_UNDECIDED) {
        const renderBBDifferentFromPhysical =
          aRenderBox !== undefined || bRenderBox !== undefined;

        if (renderBBDifferentFromPhysical) {
          // if the render bbs are undecided, move onto the physical bbs:
          renderBBsOrder = zComparatorOfVisuallyOverlapping(
            a.state.position,
            a.aabb,
            b.state.position,
            b.aabb,
            cameraAngle,
          );
        }
      }
      if (renderBBsOrder === Z_COMPARATOR_OF_VISUALLY_OVERLAPPING_UNDECIDED) {
        renderBBsOrder = zComparatorOfVisuallyOverlappingByMtv(
          aRenderPos,
          aRenderBb,
          bRenderPos,
          bRenderBb,
          cameraAngle,
        );
      }
      return renderBBsOrder;
    }
    case ADJACENT_X: {
      // special case for where items are touching on an edge along the (camera) x
      // axis - eg a wall next to a floor. Compared in camera space: the camera-space
      // y interval (world x,y rotated by cameraAngle) and z (the rotation axis,
      // unchanged):
      const aRotY0 = rotatedY(aRenderPos.x, aRenderPos.y, cameraAngle);
      const aRotY1 = rotatedY(
        aRenderPos.x + aRenderBb.x,
        aRenderPos.y + aRenderBb.y,
        cameraAngle,
      );
      const aYMin = Math.min(aRotY0, aRotY1);
      const aYMax = Math.max(aRotY0, aRotY1);
      const bRotY0 = rotatedY(bRenderPos.x, bRenderPos.y, cameraAngle);
      const bRotY1 = rotatedY(
        bRenderPos.x + bRenderBb.x,
        bRenderPos.y + bRenderBb.y,
        cameraAngle,
      );
      const bYMin = Math.min(bRotY0, bRotY1);
      const bYMax = Math.max(bRotY0, bRotY1);
      const aZMin = aRenderPos.z;
      const aZMax = aRenderPos.z + aRenderBb.z;
      const bZMin = bRenderPos.z;
      const bZMax = bRenderPos.z + bRenderBb.z;

      // the items abut along a seam that runs in world-x; being ADJACENT_X, that seam's
      // edges are collinear on screen. Its real length is the overlap of the two
      // abutting edges in projected-x (screen-x = rotY − rotX). Each box abuts along its
      // world-x edge at the corner nearest the seam: the box on the +xAxisProjection
      // side touches at its high-rotY corner, the other at its low-rotY corner. A seam
      // that collapses to a point (eg a zero-thickness wall meeting a floor end-on) is
      // not a real seam, so gives no ordering:
      const aRotX0 = rotatedX(aRenderPos.x, aRenderPos.y, cameraAngle);
      const aRotX1 = rotatedX(
        aRenderPos.x + aRenderBb.x,
        aRenderPos.y + aRenderBb.y,
        cameraAngle,
      );
      const bRotX0 = rotatedX(bRenderPos.x, bRenderPos.y, cameraAngle);
      const bRotX1 = rotatedX(
        bRenderPos.x + bRenderBb.x,
        bRenderPos.y + bRenderBb.y,
        cameraAngle,
      );
      const aXMin = Math.min(aRotX0, aRotX1);
      const aXMax = Math.max(aRotX0, aRotX1);
      const bXMin = Math.min(bRotX0, bRotX1);
      const bXMax = Math.max(bRotX0, bRotX1);
      const aOnPlusSide = aProj.xAxisProjectionMin > bProj.xAxisProjectionMin;
      const aEdgeRotY = aOnPlusSide ? aYMax : aYMin;
      const bEdgeRotY = aOnPlusSide ? bYMin : bYMax;
      const seamOverlap = intervalOverlap(
        aEdgeRotY - aXMax,
        aEdgeRotY - aXMin,
        bEdgeRotY - bXMax,
        bEdgeRotY - bXMin,
      );
      if (seamOverlap < epsilon) {
        return 0;
      }

      if (veryClose(aYMin, bYMax) && veryClose(aZMin, bZMax)) {
        return 1;
      }
      if (veryClose(bYMin, aYMax) && veryClose(bZMin, aZMax)) {
        return -1;
      }

      // higher (camera) y places items behind, higher z places them in front;
      // subtract z from y to account for both effects:
      return bYMin - bZMin - (aYMin - aZMin);
    }
    case ADJACENT_Y: {
      // same as ADJACENT_X, but for adjacency along the (camera) y axis (look at the
      // camera-space x interval and z):
      const aRotX0 = rotatedX(aRenderPos.x, aRenderPos.y, cameraAngle);
      const aRotX1 = rotatedX(
        aRenderPos.x + aRenderBb.x,
        aRenderPos.y + aRenderBb.y,
        cameraAngle,
      );
      const aXMin = Math.min(aRotX0, aRotX1);
      const aXMax = Math.max(aRotX0, aRotX1);
      const bRotX0 = rotatedX(bRenderPos.x, bRenderPos.y, cameraAngle);
      const bRotX1 = rotatedX(
        bRenderPos.x + bRenderBb.x,
        bRenderPos.y + bRenderBb.y,
        cameraAngle,
      );
      const bXMin = Math.min(bRotX0, bRotX1);
      const bXMax = Math.max(bRotX0, bRotX1);
      const aZMin = aRenderPos.z;
      const aZMax = aRenderPos.z + aRenderBb.z;
      const bZMin = bRenderPos.z;
      const bZMax = bRenderPos.z + bRenderBb.z;

      // the items abut along a seam that runs in world-y; being ADJACENT_Y, that seam's
      // edges are collinear on screen. Its real length is the overlap of the two
      // abutting edges in projected-x (screen-x = rotY − rotX). Each box abuts along its
      // world-y edge at the corner nearest the seam: the box on the +yAxisProjection
      // side touches at its high-rotX corner, the other at its low-rotX corner. A seam
      // that collapses to a point (eg a zero-thickness wall meeting a floor end-on) is
      // not a real seam, so gives no ordering:
      const aRotY0 = rotatedY(aRenderPos.x, aRenderPos.y, cameraAngle);
      const aRotY1 = rotatedY(
        aRenderPos.x + aRenderBb.x,
        aRenderPos.y + aRenderBb.y,
        cameraAngle,
      );
      const bRotY0 = rotatedY(bRenderPos.x, bRenderPos.y, cameraAngle);
      const bRotY1 = rotatedY(
        bRenderPos.x + bRenderBb.x,
        bRenderPos.y + bRenderBb.y,
        cameraAngle,
      );
      const aYMin = Math.min(aRotY0, aRotY1);
      const aYMax = Math.max(aRotY0, aRotY1);
      const bYMin = Math.min(bRotY0, bRotY1);
      const bYMax = Math.max(bRotY0, bRotY1);
      const aOnPlusSide = aProj.yAxisProjectionMin > bProj.yAxisProjectionMin;
      const aEdgeRotX = aOnPlusSide ? aXMax : aXMin;
      const bEdgeRotX = aOnPlusSide ? bXMin : bXMax;
      const seamOverlap = intervalOverlap(
        aYMin - aEdgeRotX,
        aYMax - aEdgeRotX,
        bYMin - bEdgeRotX,
        bYMax - bEdgeRotX,
      );
      if (seamOverlap < epsilon) {
        return 0;
      }

      if (veryClose(aXMin, bXMax) && veryClose(aZMin, bZMax)) {
        return 1;
      }
      if (veryClose(bXMin, aXMax) && veryClose(bZMin, aZMax)) {
        return -1;
      }

      // higher (camera) x places items behind, higher z places them in front;
      // subtract z from x to account for both effects:
      return bXMin - bZMin - (aXMin - aZMin);
    }
    default: {
      visualOverlap satisfies NO_OVERLAP;
      return 0;
    }
  }
};
