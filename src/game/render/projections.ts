import type { Container } from "pixi.js";

import { blockSizePx } from "../../sprites/spritePivots";
import { orthoPlaneForNormal } from "../../utils/vectors/orthoPlane";
import {
  addXyz,
  subXy,
  type Xy,
  type XyMaybeZ,
  type Xyz,
} from "../../utils/vectors/vectors";

export const moveContainerToBlockXyz = (
  blockXyz: XyMaybeZ,
  sprite: Container,
) => {
  const projectionXyz = projectBlockXyzToScreenXy(blockXyz);

  sprite.x = projectionXyz.x;
  sprite.y = projectionXyz.y;

  return sprite;
};

/* position on 2d screen for a given xyz in game-space 3d pixels */
export const projectWorldXyzToScreenX = ({
  x: xw = 0,
  y: yw = 0,
}: Partial<Xyz>): number => yw - xw;

export const projectWorldXyzToScreenY = ({
  x: xw = 0,
  y: yw = 0,
  z: zw = 0,
}: Partial<Xyz>): number => -(xw + yw) / 2 - zw;

export const projectWorldXyzToScreenXy = ({
  x: xw = 0,
  y: yw = 0,
  z: zw = 0,
}: Partial<Xyz>): Xy => {
  return {
    x: yw - xw,
    y: -(xw + yw) / 2 - zw,
  };
};

/**
 * for the editor - convert screen (mouse) xy to world xyz, on
 * a plane
 */
export const unprojectScreenXyToWorldXyzOnFace = (
  /** any point on the plane we are projecting to */
  pointOnPlane: Xyz,
  /** vector of normal to the plane */
  plane: Xyz,
  /** the screen x,y in game engine (scaled) pixels */
  scrXy: Xy,
): Xyz => {
  const scrXyOfPointOnPlane = projectWorldXyzToScreenXy(pointOnPlane);

  // adjust xs, xy to be relative to the projected-on-screen origin of the item:
  const scrXyRelativeToItemOrigin = subXy(scrXy, scrXyOfPointOnPlane);

  return addXyz(
    unprojectScreenXyToWorldXyz(plane, scrXyRelativeToItemOrigin),
    pointOnPlane,
  );
};

/**
 * Inverse of @see {projectWorldXyzToScreenXy}
 * for the editor - convert screen (mouse) xy to world xyz, for a plane
 * starting at the origin
 */
export const unprojectScreenXyToWorldXyz = (
  /** the normal vector to the plane */
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
    x: xb * blockSizePx.w,
    y: yb * blockSizePx.d,
    z: zb * blockSizePx.h,
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
    x: xf / blockSizePx.w,
    y: yf / blockSizePx.d,
    z: zf / blockSizePx.h,
  };
};

/* position on 2d screen for a given xyz in game-space block position */
export const projectBlockXyzToScreenXy = (blockXyz: Partial<Xyz>): Xy => {
  return projectWorldXyzToScreenXy(blockXyzToFineXyz(blockXyz));
};
