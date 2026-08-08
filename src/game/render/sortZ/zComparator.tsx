//# allFunctionsCalledOnLoad

import { epsilon } from "../../../utils/epsilon";
import {
  rotatedXMaxOverRect,
  rotatedXMinOverRect,
  rotatedYMaxOverRect,
  rotatedYMinOverRect,
} from "../../../utils/vectors/rotatedOverRect";
import { type Xyz, type XyzBox } from "../../../utils/vectors/vectors";
import {
  type RenderBox,
  type RenderBoxes,
} from "../renderBox/makeItemRenderBoxAtCameraAngle";
import { type DrawOrderBroadPhase } from "./DrawOrderBroadPhase";
import { type DrawOrderComparable } from "./DrawOrderComparable";
import { effectiveFixedZIndex } from "./fixedZIndexes";
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

// reused scratch for each item's physical size triple (read out of its box)
// when it has no render box; same aliasing rules as the position scratch:
const aPhysicalSizeScratch: Xyz = { x: 0, y: 0, z: 0 };
const bPhysicalSizeScratch: Xyz = { x: 0, y: 0, z: 0 };

/** the world min-corner of an item's render box, using `scratch` if it has a render offset */
const renderBoxWorldPos = (
  item: DrawOrderComparable,
  renderBox: RenderBox | undefined,
  scratch: Xyz,
): Xyz => {
  const { box } = item.state;
  const offset = renderBox?.renderAabbOffset;
  if (offset === undefined) {
    return box;
  }
  scratch.x = box.x + offset.x;
  scratch.y = box.y + offset.y;
  scratch.z = box.z + offset.z;
  return scratch;
};

/** an item's physical size triple, written into `scratch` from its box */
const physicalSize = (box: Readonly<XyzBox>, scratch: Xyz): Xyz => {
  scratch.x = box.xd;
  scratch.y = box.yd;
  scratch.z = box.zd;
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
 * The camera rotation is folded into the comparison (via the angles on the
 * DrawOrderBroadPhase): the broad-phase projections are already camera-correct, and the fine
 * phase below compares in camera space without ever building a rotated box.
 * Participation (fixed-z, hidden walls) follows the settled quarter angle; all
 * geometry follows the continuous geometry angle θ, so ordering stays correct
 * mid-way through a camera transition.
 */
export const zComparator = (
  a: DrawOrderComparable,
  b: DrawOrderComparable,
  broadPhase: DrawOrderBroadPhase<DrawOrderComparable>,
  /** the drawn extents, owned by the caller (in-game, the room renderer) */
  renderBoxes: RenderBoxes<DrawOrderComparable>,
): number => {
  const { quarterAngle, geometryAngle } = broadPhase;

  if (
    // fixed-z-index items (including walls hidden at this angle) don't
    // participate in z-ordering - this is THE one way to take an item out of
    // z-sorting for efficiency.
    effectiveFixedZIndex(a, quarterAngle) !== undefined ||
    effectiveFixedZIndex(b, quarterAngle) !== undefined
  ) {
    return 0;
  }

  const aRenderBox = renderBoxes.get(a);
  const bRenderBox = renderBoxes.get(b);
  const aRenderPos = renderBoxWorldPos(a, aRenderBox, aRenderScratch);
  const aRenderBb =
    aRenderBox?.renderAabb ?? physicalSize(a.state.box, aPhysicalSizeScratch);
  const bRenderPos = renderBoxWorldPos(b, bRenderBox, bRenderScratch);
  const bRenderBb =
    bRenderBox?.renderAabb ?? physicalSize(b.state.box, bPhysicalSizeScratch);

  const aProj = broadPhase.getItemAxesProjections(a)!;
  const bProj = broadPhase.getItemAxesProjections(b)!;
  const visualOverlap = visuallyOverlaps(aProj, bProj);

  switch (visualOverlap) {
    case OVERLAP: {
      let renderBBsOrder: number = zComparatorOfVisuallyOverlapping(
        aRenderPos,
        aRenderBb,
        bRenderPos,
        bRenderBb,
        geometryAngle,
      );
      if (renderBBsOrder === Z_COMPARATOR_OF_VISUALLY_OVERLAPPING_UNDECIDED) {
        // a boxless item renders true to its physical aabb, so only an item
        // with a box gives a second, different pair of boxes to test:
        const renderBBDifferentFromPhysical =
          aRenderBox !== undefined || bRenderBox !== undefined;

        if (renderBBDifferentFromPhysical) {
          // if the render bbs are undecided, move onto the physical bbs:
          renderBBsOrder = zComparatorOfVisuallyOverlapping(
            a.state.box,
            physicalSize(a.state.box, aPhysicalSizeScratch),
            b.state.box,
            physicalSize(b.state.box, bPhysicalSizeScratch),
            geometryAngle,
          );
        }
      }
      if (renderBBsOrder === Z_COMPARATOR_OF_VISUALLY_OVERLAPPING_UNDECIDED) {
        renderBBsOrder = zComparatorOfVisuallyOverlappingByMtv(
          aRenderPos,
          aRenderBb,
          bRenderPos,
          bRenderBb,
          geometryAngle,
        );
      }
      return renderBBsOrder;
    }
    case ADJACENT_X:
    case ADJACENT_Y: {
      // (ADJACENT_X = gap on the world-x family axis).
      // The bodies sharing a seam below do so in camera-space.
      //
      // Which camera family a world family renders as swaps
      // when the camera dominance swaps (at odd quarter turns), so select
      // the body by camera dominance - this reproduces the camera-labelled
      // pairing at all four quarter angles and switches once, at the turn
      // midpoint, in between:
      const gapOnWorldX = visualOverlap === ADJACENT_X;
      const cameraXDominant =
        Math.abs(geometryAngle.x) >= Math.abs(geometryAngle.y);

      const ax0 = aRenderPos.x;
      const ax1 = aRenderPos.x + aRenderBb.x;
      const ay0 = aRenderPos.y;
      const ay1 = aRenderPos.y + aRenderBb.y;
      const bx0 = bRenderPos.x;
      const bx1 = bRenderPos.x + bRenderBb.x;
      const by0 = bRenderPos.y;
      const by1 = bRenderPos.y + bRenderBb.y;
      const aZMin = aRenderPos.z;
      const aZMax = aRenderPos.z + aRenderBb.z;
      const bZMin = bRenderPos.z;
      const bZMax = bRenderPos.z + bRenderBb.z;

      // camera-space intervals by interval arithmetic over the footprints -
      // exact at any camera angle:
      const aXMin = rotatedXMinOverRect(ax0, ax1, ay0, ay1, geometryAngle);
      const aXMax = rotatedXMaxOverRect(ax0, ax1, ay0, ay1, geometryAngle);
      const bXMin = rotatedXMinOverRect(bx0, bx1, by0, by1, geometryAngle);
      const bXMax = rotatedXMaxOverRect(bx0, bx1, by0, by1, geometryAngle);
      const aYMin = rotatedYMinOverRect(ax0, ax1, ay0, ay1, geometryAngle);
      const aYMax = rotatedYMaxOverRect(ax0, ax1, ay0, ay1, geometryAngle);
      const bYMin = rotatedYMinOverRect(bx0, bx1, by0, by1, geometryAngle);
      const bYMax = rotatedYMaxOverRect(bx0, bx1, by0, by1, geometryAngle);

      if (gapOnWorldX === cameraXDominant) {
        // special case for where items are touching on an edge along the camera-x
        // axis - eg a wall next to a floor. Compared in camera space: the
        // camera-space y interval and z (the rotation axis, unchanged).
        //
        // the items abut along a seam whose edges are collinear on screen. Its
        // real length is the overlap of the two abutting edges in projected-x
        // (screen-x = rotY − rotX). Each box abuts at the corner nearest the
        // seam: the box on the plus side of the camera-x-family functional
        // (−rotY − z, computed locally from the same camera extents) touches at
        // its high-rotY corner, the other at its low-rotY corner. A seam that
        // collapses to a point (eg a zero-thickness wall meeting a floor
        // end-on) is not a real seam, so gives no ordering:
        const aOnPlusSide = -aYMax - aZMax > -bYMax - bZMax;
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

        // one box entirely above the other (their world-z ranges are disjoint)
        // rests over the seam and draws in front - it occludes down the near
        // side. world-z is the rotation axis, so this holds at every angle,
        // unlike the camera-space y extremes it replaces (those only land on
        // the seam corner at the quarters; off-quarter the slanted seam spreads
        // them to opposite ends of the shared edge, missing the abutment):
        if (aZMin >= bZMax - epsilon) {
          return 1;
        }
        if (bZMin >= aZMax - epsilon) {
          return -1;
        }

        // higher (camera) y places items behind, higher z places them in front;
        // subtract z from y to account for both effects:
        return bYMin - bZMin - (aYMin - aZMin);
      }
      // as the camera-x body above, but for a seam along the camera-y axis
      // (look at the camera-space x interval and z). The plus side is on the
      // camera-y-family functional (−rotX − z), computed locally:
      const aOnPlusSide = -aXMax - aZMax > -bXMax - bZMax;
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

      // as the camera-x body: one box entirely above the other rests over the
      // seam and draws in front, decided on world-z alone so it holds at every
      // angle:
      if (aZMin >= bZMax - epsilon) {
        return 1;
      }
      if (bZMin >= aZMax - epsilon) {
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
