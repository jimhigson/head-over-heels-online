import { type Container } from "pixi.js";

import { orthoPlaneForNormal } from "../../utils/vectors/orthoPlane";
import {
  cameraAngleBase,
  rotateXy,
  rotateXyz,
  rotateXyzByInverseCameraAngle,
} from "../../utils/vectors/rotateXy";
import { addXyz, subXy, type Xy, type Xyz } from "../../utils/vectors/vectors";
import { blockSizePx } from "../physics/mechanicsConstants";

/* position on 2d screen for a given xyz in game-space 3d pixels */
export const projectWorldXyzToScreenX = (
  { x: xw = 0, y: yw = 0 }: Partial<Xyz>,
  cameraAngle: Xy = cameraAngleBase,
): number => {
  const { x, y } = rotateXy({ x: xw, y: yw }, cameraAngle);
  return y - x;
};

/**
 * the screen-x range a footprint (position + aabb) spans when projected -
 * which of the four corners projects leftmost/rightmost depends on the camera
 * angle (the side corners at even quarter-turns, the origin/far corners at
 * odd), so take the extremes over all of them
 */
export const projectFootprintScreenXExtent = (
  position: Xy,
  aabb: Xy,
  cameraAngle: Xy = cameraAngleBase,
): { left: number; right: number } => {
  const cornerScreenXs = [
    projectWorldXyzToScreenX(position, cameraAngle),
    projectWorldXyzToScreenX(
      { x: position.x + aabb.x, y: position.y },
      cameraAngle,
    ),
    projectWorldXyzToScreenX(
      { x: position.x, y: position.y + aabb.y },
      cameraAngle,
    ),
    projectWorldXyzToScreenX(
      { x: position.x + aabb.x, y: position.y + aabb.y },
      cameraAngle,
    ),
  ];
  return {
    left: Math.min(...cornerScreenXs),
    right: Math.max(...cornerScreenXs),
  };
};

export const projectWorldXyzToScreenXy = (
  { x: xw = 0, y: yw = 0, z: zw = 0 }: Partial<Xyz>,
  cameraAngle: Xy = cameraAngleBase,
): Xy => {
  // rotate the world x,y about the vertical (z) axis for the camera angle, then
  // apply the fixed 2:1 isometric projection (z still projects straight up):
  const { x, y } = rotateXy({ x: xw, y: yw }, cameraAngle);
  return {
    x: y - x,
    y: -(x + y) / 2 - zw,
  };
};

export const projectWorldXyzToScreenXyOnContainer = (
  { x: xw = 0, y: yw = 0, z: zw = 0 }: Partial<Xyz>,
  cameraAngle: Xy = cameraAngleBase,
  container: Container,
): void => {
  // rotate the world x,y about the vertical (z) axis for the camera angle, then
  // apply the fixed 2:1 isometric projection (z still projects straight up):
  const { x, y } = rotateXy({ x: xw, y: yw }, cameraAngle);
  container.x = y - x;
  container.y = -(x + y) / 2 - zw;
};

/**
 * for the editor - convert screen (mouse) xy to world xyz, on
 * a plane
 */
export const unprojectScreenXyToWorldXyzOnFace = (
  /** any point on the plane we are projecting to */
  pointOnPlane: Xyz,
  /** vector of normal to the plane, in world space */
  plane: Xyz,
  /** the screen x,y in game engine (scaled) pixels */
  scrXy: Xy,
  cameraAngle: Xy = cameraAngleBase,
): Xyz => {
  const scrXyOfPointOnPlane = projectWorldXyzToScreenXy(
    pointOnPlane,
    cameraAngle,
  );

  // adjust xs, xy to be relative to the projected-on-screen origin of the item:
  const scrXyRelativeToItemOrigin = subXy(scrXy, scrXyOfPointOnPlane);

  return addXyz(
    unprojectScreenXyToWorldXyz(plane, scrXyRelativeToItemOrigin, cameraAngle),
    pointOnPlane,
  );
};

/**
 * Inverse of @see {projectWorldXyzToScreenXy}
 * for the editor - convert screen (mouse) xy to world xyz, for a plane
 * starting at the origin
 */
export const unprojectScreenXyToWorldXyz = (
  /** the normal vector to the plane, in world space */
  planeNormal: Xyz,
  scrXy: Xy,
  cameraAngle: Xy = cameraAngleBase,
): Xyz =>
  // the screen geometry is fixed relative to the camera: rotate the plane into
  // camera space, unproject there, then rotate the result back to world space:
  rotateXyzByInverseCameraAngle(
    unprojectScreenXyToCameraSpaceXyz(
      rotateXyz(planeNormal, cameraAngle),
      scrXy,
    ),
    cameraAngle,
  );

const unprojectScreenXyToCameraSpaceXyz = (
  /** the normal vector to the plane, in camera space */
  planeNormal: Xyz,
  { x: xScr, y: yScr }: Xy,
): Xyz => {
  const orthoPlane = orthoPlaneForNormal(planeNormal);

  switch (orthoPlane) {
    case "xy":
      // For xy-plane (normal = [0, 0, 1]), z = 0
      // on top/bottom face
      return {
        x: -xScr / 2 - yScr,
        y: xScr / 2 - yScr,
        z: 0,
      };

    case "xz":
      // For xz-plane (normal = [0, 1, 0]), y = 0
      // on away/towards face
      return {
        x: -xScr,
        y: 0,
        z: xScr / 2 - yScr,
      };

    case "yz":
      // For yz-plane (normal = [1, 0, 0]), x = 0
      // left/right face
      return {
        x: 0,
        y: xScr,
        z: -xScr / 2 - yScr,
      };

    default:
      orthoPlane satisfies never;
      throw new Error(
        "only axis-aligned planes are supported for unprojection",
      );
  }
};

/** get the in-game x,y,z for any given block x,y,z */
export const blockXyzToFineXyz = ({
  x: xb = 0,
  y: yb = 0,
  z: zb = 0,
}: Partial<Xyz>): Xyz => {
  return {
    x: xb * blockSizePx.x,
    y: yb * blockSizePx.y,
    z: zb * blockSizePx.z,
  };
};

/**
 * get the in-game x,y,z for any given block x,y,z
 * * without rounding, so results can be fractional
 */
export const fineXyzToBlockXyz = ({
  x: xf = 0,
  y: yf = 0,
  z: zf = 0,
}: Partial<Xyz>): Xyz => {
  return {
    x: xf / blockSizePx.x,
    y: yf / blockSizePx.y,
    z: zf / blockSizePx.z,
  };
};

/* position on 2d screen for a given xyz in game-space block position */
export const projectBlockXyzToScreenXy = (
  blockXyz: Partial<Xyz>,
  cameraAngle: Xy = cameraAngleBase,
): Xy => projectWorldXyzToScreenXy(blockXyzToFineXyz(blockXyz), cameraAngle);
