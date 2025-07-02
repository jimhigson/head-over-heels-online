import type { Container } from "pixi.js";
import { blockSizePx } from "../../sprites/spritePivots";
import {
  type XyMaybeZ,
  type Xyz,
  type Xy,
  type OrthoPlane,
  addXyz,
  subXy,
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
  x = 0,
  y = 0,
}: Partial<Xyz>): number => y - x;

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
 * the visible surface of an object
 */
export const unprojectScreenXyToWorldXyzOnFace = (
  /** the screen x,y in game engine (scaled) pixels */
  scrPos: Xy,
  itemPosition: Xyz,
  plane: OrthoPlane,
): Xyz => {
  const itemOriginScreen = projectWorldXyzToScreenXy(itemPosition);

  // adjust xs, xy to be relative to the projected-on-screen origin of the item:
  const scrPosAdj = subXy(scrPos, itemOriginScreen);

  return addXyz(unprojectScreenXyToWorldXyz(scrPosAdj, plane), itemPosition);
};

/**
 * for the editor - convert screen (mouse) xy to world xyz, for a plane
 * starting at the origin
 */
export const unprojectScreenXyToWorldXyz = (
  /** the screen x,y in game engine (scaled) pixels */
  { x: xScr, y: yScr }: Xy,
  plane: OrthoPlane,
): Xyz => {
  // adjust xs, xy to be relative to the projected-on-screen origin of the item:

  switch (plane) {
    case "xy": {
      // top/bottom face
      return {
        x: -(xScr / 2 + yScr),
        y: xScr / 2 - yScr,
        z: 0,
      };
    }
    case "xz": {
      // away/towards face
      return {
        x: -xScr,
        y: 0,
        z: xScr / 2 - yScr,
      };
    }
    case "yz": {
      // left/right face
      return {
        x: 0,
        y: xScr,
        z: -xScr / 2 - yScr,
      };
    }
    default:
      plane satisfies never;
      throw new Error(`unknown plane ${plane}`);
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

/** get the in-game x,y,z for any given block x,y,z */
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
