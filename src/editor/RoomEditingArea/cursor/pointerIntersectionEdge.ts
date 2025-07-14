import { projectAabbCorners } from "../../../game/render/sortZ/projectAabbCorners";
import type { Plane } from "../../../utils/vectors/vectors";
import { type Xy, type Xyz } from "../../../utils/vectors/vectors";
import type { EditorUnionOfAllItemInPlayTypes } from "../../editorTypes";
import type { Tool } from "../../Tool";

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
  return Math.abs(cross) / Math.hypot(d.x, d.y);
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
 * get the edge of the item being pointed at
 */
export const pointerIntersectionEdge = (
  item: EditorUnionOfAllItemInPlayTypes,
  pointerXy: Xy,
  face: Xyz,
  _tool: Tool,
): Plane | undefined => {
  const cornerProjections = projectAabbCorners(
    item.state.position,
    // using aabb, not renderAabb, so doors can be placed on walls above where they render
    item.aabb,
  );

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

  const isRight = face.x < 0;
  const isTowards = face.y < 0;
  const isUp = face.z > 0;

  if (isRight || isTowards) {
    // edge (1)
    // faces that share a vertical edge:
    const d = distancePointToLine2D(pointerXy, cornerProjections.bottomCentre, {
      x: 0,
      y: -1,
    });
    if (d < edgeToleranceBetweenFacesPx) {
      return betweenRightAndTowards;
    }
  }
  if (isRight || isUp) {
    // edge (2)
    const d = distancePointToLine2D(pointerXy, cornerProjections.topRight, {
      x: 2,
      y: -1,
    });

    // faces that share an edge:
    if (d < edgeToleranceBetweenFacesPx) {
      return betweenRightAndUp;
    }
  }
  if (isTowards || isUp) {
    // edge (3)
    // faces that share an edge:
    const d = distancePointToLine2D(pointerXy, cornerProjections.topLeft, {
      x: 2,
      y: 1,
    });
    if (d < edgeToleranceBetweenFacesPx) {
      return betweenTowardsAndUp;
    }
  }

  switch (true) {
    case isUp: {
      const corner = cornerProjections.c111;
      // edge (4)
      const d1 = distancePointToLine2D(pointerXy, corner, {
        x: 2,
        y: 1,
      });
      if (d1 < edgeTolerancePx) {
        return betweenUpAndAway;
      }
      // edge (5)
      const d2 = distancePointToLine2D(pointerXy, corner, {
        x: -2,
        y: 1,
      });
      if (d2 < edgeTolerancePx) {
        return betweenUpAndLeft;
      }
      break;
    }

    case isTowards: {
      const corner = cornerProjections.c100;
      // edge (6)
      const d1 = distancePointToLine2D(pointerXy, corner, {
        x: 0,
        y: -1,
      });
      if (d1 < edgeTolerancePx) {
        return betweenLeftAndTowards;
      }
      // edge (7)
      const d2 = distancePointToLine2D(pointerXy, corner, {
        x: 2,
        y: 1,
      });
      if (d2 < edgeTolerancePx) {
        return betweenTowardsAndDown;
      }
      break;
    }

    case isRight: {
      const corner = cornerProjections.c010;
      // edge (8)
      const d1 = distancePointToLine2D(pointerXy, corner, {
        x: 0,
        y: -1,
      });
      if (d1 < edgeTolerancePx) {
        return betweenRightAndAway;
      }
      // edge (9)
      const d2 = distancePointToLine2D(pointerXy, corner, {
        x: -2,
        y: 1,
      });
      if (d2 < edgeTolerancePx) {
        return betweenRightAndDown;
      }
      break;
    }
  }

  return undefined; // not on any edge
};
