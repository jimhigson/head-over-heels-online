import nanoEqual from "nano-equal";

import { worldCornerForCameraCorner } from "../../../game/render/sortZ/projectAabbCorners";
import { twClass } from "../../../utils/twClass" with { type: "macro" };
import { rotateXyz } from "../../../utils/vectors/rotateXy";
import { type Xy } from "../../../utils/vectors/vectors";
import {
  betweenLeftAndTowards,
  betweenRightAndAway,
  betweenRightAndDown,
  betweenRightAndTowards,
  betweenRightAndUp,
  betweenTowardsAndDown,
  betweenTowardsAndUp,
  betweenUpAndAway,
  betweenUpAndLeft,
} from "./pointerIntersectionEdge";
import { type PointingAtOnItem } from "./PointingAt";

/**
 * the resize cursor to show for the corner/edge being pointed at, or undefined
 * if not pointing at a resizable corner/edge.
 *
 * The cursor is a screen-space hint, but the pointed-at corner/edge are
 * physical (world-space) - rotate them back to their apparent (camera-space)
 * identities to choose the cursor, so eg the nearest vertical edge always
 * shows the up/down cursor whichever physical edge it is at the current
 * camera angle.
 */
export const resizeCursorForPointingAt = (
  { corner, edge }: PointingAtOnItem,
  cameraAngle: Xy,
): `cursor-${string}` | undefined => {
  if (corner) {
    // the apparent top corner of the box (over the camera-hidden base corner):
    const apparentTopCorner = worldCornerForCameraCorner(
      true,
      true,
      cameraAngle,
    );
    if (
      corner.z === 1 &&
      corner.x === apparentTopCorner.x &&
      corner.y === apparentTopCorner.y
    ) {
      return twClass("cursor-n-resize");
    }
    return undefined;
  }

  if (edge) {
    const apparentEdge = {
      point: rotateXyz(edge.point, cameraAngle),
      normal: rotateXyz(edge.normal, cameraAngle),
    };

    if (nanoEqual(apparentEdge, betweenRightAndAway)) {
      return twClass("cursor-e-resize");
    }
    if (nanoEqual(apparentEdge, betweenRightAndTowards)) {
      return twClass("cursor-s-resize");
    }
    if (nanoEqual(apparentEdge, betweenLeftAndTowards)) {
      return twClass("cursor-w-resize");
    }
    if (
      nanoEqual(apparentEdge, betweenRightAndUp) ||
      nanoEqual(apparentEdge, betweenUpAndAway)
    ) {
      return twClass("cursor-ne-resize");
    }
    if (
      nanoEqual(apparentEdge, betweenTowardsAndUp) ||
      nanoEqual(apparentEdge, betweenUpAndLeft)
    ) {
      return twClass("cursor-nw-resize");
    }
    if (nanoEqual(apparentEdge, betweenRightAndDown)) {
      return twClass("cursor-se-resize");
    }
    if (nanoEqual(apparentEdge, betweenTowardsAndDown)) {
      return twClass("cursor-sw-resize");
    }
  }

  return undefined;
};
