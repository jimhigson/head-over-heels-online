//# allFunctionsCalledOnLoad

import { veryClose } from "../../../utils/epsilon";
import { rotatedX, rotatedY } from "../../../utils/vectors/rotateXy";
import { type Xyz } from "../../../utils/vectors/vectors";
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

// reused scratch for each item's render-box world position (render offset applied).
// a and b get *separate* scratch so both can be live at once; only one comparison
// happens at a time (single-threaded), so module-level is safe.
const aRenderScratch: Xyz = { x: 0, y: 0, z: 0 };
const bRenderScratch: Xyz = { x: 0, y: 0, z: 0 };

/** the world min-corner of an item's render box, using `scratch` if it has a render offset */
const renderBoxWorldPos = (item: DrawOrderComparable, scratch: Xyz): Xyz => {
  const { position } = item.state;
  const offset = item.renderAabbOffset;
  if (offset === undefined) {
    return position;
  }
  scratch.x = position.x + offset.x;
  scratch.y = position.y + offset.y;
  scratch.z = position.z + offset.z;
  return scratch;
};

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

  const aRenderPos = renderBoxWorldPos(a, aRenderScratch);
  const aRenderBb = a.renderAabb ?? a.aabb;
  const bRenderPos = renderBoxWorldPos(b, bRenderScratch);
  const bRenderBb = b.renderAabb ?? b.aabb;

  const visualOverlap = visuallyOverlaps(
    visualIndex.getItemAxesProjections(a)!,
    visualIndex.getItemAxesProjections(b)!,
  );

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
          a.renderAabbOffset !== undefined ||
          a.renderAabb !== undefined ||
          b.renderAabbOffset !== undefined ||
          b.renderAabb !== undefined;

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
