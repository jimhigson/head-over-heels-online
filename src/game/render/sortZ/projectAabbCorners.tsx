import { cameraAngleBase } from "../../../utils/vectors/cameraAngleVectors";
import { addXyz, type Xy, type Xyz } from "../../../utils/vectors/vectors";
import { projectWorldXyzToScreenXy } from "../projections";

export type ProjectionOnAxes = {
  xAxisProjectionMin: number;
  xAxisProjectionMax: number;
  yAxisProjectionMin: number;
  yAxisProjectionMax: number;
  zAxisProjectionMin: number;
  zAxisProjectionMax: number;
};

/**
 * of the six visible corners of the projected cuboid aabb, we need to find three to describe
 * the bounds of the rendered shape
 *                  c111  ---top
 *                  /\
 *       c101 = tl /  \ tr = c011
 *           left |    | right
 *           c100 |    |c010
 *                 \  /
 *                  \/
 *                  bc  ---bottom
 */

export const projectCorner = (
  position: Xyz,
  aabb: Xyz,
  cornerVector: Xyz,
  cameraAngle: Xy = cameraAngleBase,
) =>
  projectWorldXyzToScreenXy(
    addXyz(position, {
      x: cornerVector.x * aabb.x,
      y: cornerVector.y * aabb.y,
      z: cornerVector.z * aabb.z,
    }),
    cameraAngle,
  );

/**
 * the world footprint corner (as a 0/1 per-axis vector) that lands on the given
 * camera-space footprint corner once rotated by the camera angle. The four 90°
 * camera angles map footprint corners bijectively, so this lets callers project
 * the *apparent* silhouette corners of a box with the angle threaded through
 * the projection - no rotated box is ever built.
 *
 * (in camera space, min-x/min-y is the near corner; max-x/max-y is the hidden
 * back corner)
 */
export const worldCornerForCameraCorner = (
  cameraXMax: boolean,
  cameraYMax: boolean,
  { x: cx, y: cy }: Xy,
): Xy =>
  cy === 0 ?
    {
      x: cameraXMax === cx > 0 ? 1 : 0,
      y: cameraYMax === cx > 0 ? 1 : 0,
    }
  : {
      x: cameraYMax === cy > 0 ? 1 : 0,
      y: cameraXMax === cy < 0 ? 1 : 0,
    };

/*
 * apparent silhouette corners: where the classic base-angle corners
 * (bottomCentre / topLeft / topRight / c111 / c100 / c010) *appear* on screen
 * at any camera angle. At the base angle each is identical to its classic
 * counterpart.
 */

export const projectApparentBottomCentre = (
  position: Xyz,
  aabb: Xyz,
  cameraAngle: Xy,
): Xy => {
  const { x, y } = worldCornerForCameraCorner(false, false, cameraAngle);
  return projectCorner(position, aabb, { x, y, z: 0 }, cameraAngle);
};

export const projectApparentTopLeft = (
  position: Xyz,
  aabb: Xyz,
  cameraAngle: Xy,
): Xy => {
  const { x, y } = worldCornerForCameraCorner(true, false, cameraAngle);
  return projectCorner(position, aabb, { x, y, z: 1 }, cameraAngle);
};

export const projectApparentTopRight = (
  position: Xyz,
  aabb: Xyz,
  cameraAngle: Xy,
): Xy => {
  const { x, y } = worldCornerForCameraCorner(false, true, cameraAngle);
  return projectCorner(position, aabb, { x, y, z: 1 }, cameraAngle);
};

/** the highest projected corner (the c111 corner at the base angle) */
export const projectApparentTop = (
  position: Xyz,
  aabb: Xyz,
  cameraAngle: Xy,
): Xy => {
  const { x, y } = worldCornerForCameraCorner(true, true, cameraAngle);
  return projectCorner(position, aabb, { x, y, z: 1 }, cameraAngle);
};

/** base-level corner below the apparent top-left (c100 at the base angle) */
export const projectApparentLeftBase = (
  position: Xyz,
  aabb: Xyz,
  cameraAngle: Xy,
): Xy => {
  const { x, y } = worldCornerForCameraCorner(true, false, cameraAngle);
  return projectCorner(position, aabb, { x, y, z: 0 }, cameraAngle);
};

/** base-level corner below the apparent top-right (c010 at the base angle) */
export const projectApparentRightBase = (
  position: Xyz,
  aabb: Xyz,
  cameraAngle: Xy,
): Xy => {
  const { x, y } = worldCornerForCameraCorner(false, true, cameraAngle);
  return projectCorner(position, aabb, { x, y, z: 0 }, cameraAngle);
};

/**
 * the base-level corner hidden behind the box at this camera angle ((1,1,0)
 * at the base angle) - the only aabb corner that cannot be pointed at
 */
export const apparentHiddenCornerVector = (cameraAngle: Xy): Xyz => {
  const { x, y } = worldCornerForCameraCorner(true, true, cameraAngle);
  return { x, y, z: 0 };
};

/**
 * The box's extent along the three on-screen axes, computed for the given camera
 * angle directly from the world box - no pre-rotated box.
 *
 * The projected silhouette of a world-axis-aligned box is a hexagon whose edges
 * come from three direction families: the screen projections of world-x, world-y
 * and world-z. With `c = cameraAngle.x`, `s = cameraAngle.y`, the three family
 * functionals over world `(x, y, z)` are:
 *
 *   - z-family (the screen-x silhouette; constant along world-z):
 *     `f_z = (s − c)·x + (c + s)·y`
 *   - x-family (constant along world-x): `f_x = −y − (c − s)·z`
 *   - y-family (constant along world-y): `f_y = −x − (c + s)·z`
 *
 * Each is linear over the box, so its extent is exact by interval arithmetic
 * (every coefficient contributes its own extreme corner independently) - valid
 * at ANY camera angle, not just the quarter turns. Two silhouettes at the same
 * angle overlap iff their intervals overlap on all three family axes (exact
 * SAT). Computed as scalars rather than allocating per corner, since this runs
 * per item per frame.
 */
export const projectAabbAxes = (
  writeInto: object,
  position: Xyz,
  aabb: Xyz,
  cameraAngle: Xy,
): ProjectionOnAxes => {
  const { x: c, y: s } = cameraAngle;
  const x0 = position.x;
  const x1 = position.x + aabb.x;
  const y0 = position.y;
  const y1 = position.y + aabb.y;
  const z0 = position.z;
  const z1 = position.z + aabb.z;

  /** f_z x coefficient; also f_x's z coefficient (`−(c − s)`) */
  const kSC = s - c;
  /** f_z y coefficient */
  const kCS = c + s;
  /** f_y z coefficient */
  const kNegCS = -kCS;

  const writeIntoTyped = writeInto as ProjectionOnAxes;

  writeIntoTyped.zAxisProjectionMin =
    (kSC > 0 ? kSC * x0 : kSC * x1) + (kCS > 0 ? kCS * y0 : kCS * y1);
  writeIntoTyped.zAxisProjectionMax =
    (kSC > 0 ? kSC * x1 : kSC * x0) + (kCS > 0 ? kCS * y1 : kCS * y0);

  writeIntoTyped.xAxisProjectionMin = -y1 + (kSC > 0 ? kSC * z0 : kSC * z1);
  writeIntoTyped.xAxisProjectionMax = -y0 + (kSC > 0 ? kSC * z1 : kSC * z0);

  writeIntoTyped.yAxisProjectionMin =
    -x1 + (kNegCS > 0 ? kNegCS * z0 : kNegCS * z1);
  writeIntoTyped.yAxisProjectionMax =
    -x0 + (kNegCS > 0 ? kNegCS * z1 : kNegCS * z0);

  return writeIntoTyped;
};
