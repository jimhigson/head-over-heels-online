import {
  projectApparentBottomCentre,
  projectApparentLeftBase,
  projectApparentRightBase,
  projectApparentTop,
  projectApparentTopLeft,
  projectApparentTopRight,
} from "../../../game/render/sortZ/projectAabbCorners";
import { nonZero } from "../../../utils/epsilon";
import { rotateXyzByInverseCameraAngle } from "../../../utils/vectors/cameraAngleVectors";
import { rotateXyz } from "../../../utils/vectors/rotateXy";
import { type Plane, type Xy, type Xyz } from "../../../utils/vectors/vectors";
import { type EditorUnionOfAllItemInPlayTypes } from "../../editorTypes";
import { type Tool } from "../interactivity/Tool";

const edgeTolerancePx = 3;
const edgeToleranceBetweenFacesPx = 1.5;

/**
 * Calculates the perpendicular distance from a point to a line in 2-space.
 *
 * @returns {number} The perpendicular distance to the line
 */
function distancePointToLine2D(
  /**
   * the mouse (or whatever) point we want to measure the distance
   * to the line from
   */
  { x, y }: Xy,
  /** any point on the line */
  refPoint: Xy,
  /** direction vector of the line */
  d: Xy,
): number {
  // Vector from A to P
  const AP = { x: x - refPoint.x, y: y - refPoint.y };

  // Cross product in 2D (returns scalar)
  const cross = AP.x * d.y - AP.y * d.x;

  // Magnitude of v using hypot:
  return Math.abs(cross) / nonZero(Math.hypot(d.x, d.y));
}

export const betweenRightAndTowards: Plane = {
  point: { x: -1, y: -1, z: 0 },
  normal: { x: 0, y: 0, z: 1 },
};
export const betweenRightAndUp: Plane = {
  point: { x: -1, y: 0, z: 1 },
  normal: { x: 0, y: 1, z: 0 },
};
export const betweenTowardsAndUp: Plane = {
  point: { x: 0, y: -1, z: 1 },
  normal: { x: 1, y: 0, z: 0 },
};
export const betweenUpAndAway: Plane = {
  point: { x: 0, y: 1, z: 1 },
  normal: { x: 1, y: 0, z: 0 },
};
export const betweenUpAndLeft: Plane = {
  point: { x: 1, y: 0, z: 1 },
  normal: { x: 0, y: 1, z: 0 },
};
export const betweenLeftAndTowards: Plane = {
  point: { x: 1, y: -1, z: 0 },
  normal: { x: 0, y: 0, z: 1 },
};
export const betweenTowardsAndDown: Plane = {
  point: { x: 0, y: -1, z: -1 },
  normal: { x: 1, y: 0, z: 0 },
};
export const betweenRightAndAway: Plane = {
  point: { x: -1, y: 1, z: 0 },
  normal: { x: 0, y: 0, z: 1 },
};
export const betweenRightAndDown: Plane = {
  point: { x: -1, y: 0, z: -1 },
  normal: { x: 0, y: 1, z: 0 },
};

/**
 * get the edge of the item being pointed at, as a physical (world-space) plane
 */
export const pointerIntersectionEdge = (
  item: EditorUnionOfAllItemInPlayTypes,
  pointerXy: Xy,
  /** the physical (world-space) face the pointer is over */
  face: Xyz,
  _tool: Tool,
  cameraAngle: Xy,
): Plane | undefined => {
  const { position } = item.state;
  // using aabb, not renderAabb, so doors can be placed on walls above where they render
  const { aabb } = item;

  // the screen geometry (which lines the silhouette edges lie along) is fixed
  // relative to the camera, so classify using the apparent face, then map the
  // found edge back to its physical plane at the end:
  const apparentFace = rotateXyz(face, cameraAngle);

  const physicalPlane = (apparentPlane: Plane): Plane => ({
    point: rotateXyzByInverseCameraAngle(apparentPlane.point, cameraAngle),
    normal: rotateXyzByInverseCameraAngle(apparentPlane.normal, cameraAngle),
  });

  /*
   * find any of 7 visible (edges)
   *            .
   *           / \
   *          /   \
   *        (5)   (4) (0,1,1)
   *        /       \
   *  [tl] /  <up>   \ [tr]
   *      |\         /|
   *      | \       / |
   *      | (3)   (2) |
   *     (6)  \   /   (8) (-1,1,0)
   *      |<Tw>\ /<Rt>|
   *       \    V    /
   *       (7)  |z  (9) (-1,0,-1)
   *         \ (1) /
   *          \ | /
   *           \|/
   *            V
   *           [bc]
   */

  const isRight = apparentFace.x < 0;
  const isTowards = apparentFace.y < 0;
  const isUp = apparentFace.z > 0;

  if (isRight || isTowards) {
    // edge (1)
    // faces that share a vertical edge:
    const d = distancePointToLine2D(
      pointerXy,
      projectApparentBottomCentre(position, aabb, cameraAngle),
      {
        x: 0,
        y: -1,
      },
    );
    if (d < edgeToleranceBetweenFacesPx) {
      return physicalPlane(betweenRightAndTowards);
    }
  }
  if (isRight || isUp) {
    // edge (2)
    const d = distancePointToLine2D(
      pointerXy,
      projectApparentTopRight(position, aabb, cameraAngle),
      {
        x: 2,
        y: -1,
      },
    );

    // faces that share an edge:
    if (d < edgeToleranceBetweenFacesPx) {
      return physicalPlane(betweenRightAndUp);
    }
  }
  if (isTowards || isUp) {
    // edge (3)
    // faces that share an edge:
    const d = distancePointToLine2D(
      pointerXy,
      projectApparentTopLeft(position, aabb, cameraAngle),
      {
        x: 2,
        y: 1,
      },
    );
    if (d < edgeToleranceBetweenFacesPx) {
      return physicalPlane(betweenTowardsAndUp);
    }
  }

  switch (true) {
    case isUp: {
      const corner = projectApparentTop(position, aabb, cameraAngle);
      // edge (4)
      const d1 = distancePointToLine2D(pointerXy, corner, {
        x: 2,
        y: 1,
      });
      if (d1 < edgeTolerancePx) {
        return physicalPlane(betweenUpAndAway);
      }
      // edge (5)
      const d2 = distancePointToLine2D(pointerXy, corner, {
        x: -2,
        y: 1,
      });
      if (d2 < edgeTolerancePx) {
        return physicalPlane(betweenUpAndLeft);
      }
      break;
    }

    case isTowards: {
      const corner = projectApparentLeftBase(position, aabb, cameraAngle);
      // edge (6)
      const d1 = distancePointToLine2D(pointerXy, corner, {
        x: 0,
        y: -1,
      });
      if (d1 < edgeTolerancePx) {
        return physicalPlane(betweenLeftAndTowards);
      }
      // edge (7)
      const d2 = distancePointToLine2D(pointerXy, corner, {
        x: 2,
        y: 1,
      });
      if (d2 < edgeTolerancePx) {
        return physicalPlane(betweenTowardsAndDown);
      }
      break;
    }

    case isRight: {
      const corner = projectApparentRightBase(position, aabb, cameraAngle);
      // edge (8)
      const d1 = distancePointToLine2D(pointerXy, corner, {
        x: 0,
        y: -1,
      });
      if (d1 < edgeTolerancePx) {
        return physicalPlane(betweenRightAndAway);
      }
      // edge (9)
      const d2 = distancePointToLine2D(pointerXy, corner, {
        x: -2,
        y: 1,
      });
      if (d2 < edgeTolerancePx) {
        return physicalPlane(betweenRightAndDown);
      }
      break;
    }
  }

  return undefined; // not on any edge
};
