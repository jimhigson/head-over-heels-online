import { cameraAngleBase } from "../../../utils/vectors/cameraAngleVectors";
import { rotatedX, rotatedY } from "../../../utils/vectors/rotateXy";
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

// Individual corner projection functions
export const projectBottomCentre = (
  position: Xyz,
  cameraAngle: Xy = cameraAngleBase,
) => projectWorldXyzToScreenXy(position, cameraAngle);

export const projectTopLeft = (
  position: Xyz,
  aabb: Xyz,
  cameraAngle: Xy = cameraAngleBase,
) =>
  projectWorldXyzToScreenXy(
    addXyz(position, { x: aabb.x, z: aabb.z }),
    cameraAngle,
  );

export const projectTopRight = (
  position: Xyz,
  aabb: Xyz,
  cameraAngle: Xy = cameraAngleBase,
) =>
  projectWorldXyzToScreenXy(
    addXyz(position, { y: aabb.y, z: aabb.z }),
    cameraAngle,
  );

export const projectC010 = (
  position: Xyz,
  aabb: Xyz,
  cameraAngle: Xy = cameraAngleBase,
) => projectWorldXyzToScreenXy(addXyz(position, { y: aabb.y }), cameraAngle);

export const projectC100 = (
  position: Xyz,
  aabb: Xyz,
  cameraAngle: Xy = cameraAngleBase,
) => projectWorldXyzToScreenXy(addXyz(position, { x: aabb.x }), cameraAngle);

export const projectC111 = (
  position: Xyz,
  aabb: Xyz,
  cameraAngle: Xy = cameraAngleBase,
) => projectWorldXyzToScreenXy(addXyz(position, aabb), cameraAngle);

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
 * z is the rotation axis, so it is unchanged; the world x and y are rotated by the
 * camera angle (`rotatedX`/`rotatedY`). For our 90° camera turns those are a signed
 * axis pick, so the two opposite xy corners span the extreme. The 2:1 iso
 * projection (screen-x = rotY − rotX, screen-y = −(rotX + rotY)/2 − z) is then
 * applied here at the point of use. Computed as scalars rather than allocating an
 * `Xy` per corner, since this runs per item per frame.
 */
export const projectAabbAxes = (
  writeInto: object,
  position: Xyz,
  aabb: Xyz,
  cameraAngle: Xy,
): ProjectionOnAxes => {
  const x0 = position.x;
  const x1 = position.x + aabb.x;
  const y0 = position.y;
  const y1 = position.y + aabb.y;
  const z0 = position.z;
  const z1 = position.z + aabb.z;

  const rotXLo = rotatedX(x0, y0, cameraAngle);
  const rotXHi = rotatedX(x1, y1, cameraAngle);
  const rotXMin = Math.min(rotXLo, rotXHi);
  const rotXMax = Math.max(rotXLo, rotXHi);

  const rotYLo = rotatedY(x0, y0, cameraAngle);
  const rotYHi = rotatedY(x1, y1, cameraAngle);
  const rotYMin = Math.min(rotYLo, rotYHi);
  const rotYMax = Math.max(rotYLo, rotYHi);

  const writeIntoTyped = writeInto as ProjectionOnAxes;

  /** the left/right silhouette on screen-x (= rotY − rotX) */
  writeIntoTyped.zAxisProjectionMin = rotYMin - rotXMax;
  writeIntoTyped.zAxisProjectionMax = rotYMax - rotXMin;

  /** the C of the projected world-x sloped line (y = x/2 − c): c = −rotY − z;
   * a greater c is projected higher (further depth and/or height) */
  writeIntoTyped.xAxisProjectionMin = -rotYMax - z1;
  writeIntoTyped.xAxisProjectionMax = -rotYMin - z0;

  /** the C of the projected world-y sloped line (y = x/2 − c): c = −rotX − z */
  writeIntoTyped.yAxisProjectionMin = -rotXMax - z1;
  writeIntoTyped.yAxisProjectionMax = -rotXMin - z0;

  return writeIntoTyped;
};
