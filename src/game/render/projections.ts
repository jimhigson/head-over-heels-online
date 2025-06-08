import type { Container } from "pixi.js";
import { blockSizePx } from "../../sprites/spritePivots";
import type {
  XyMaybeZ,
  Xyz,
  Xy,
  OrthoPlane,
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
 * for the editor, mostly - convert screen (mouse) to world, on
 * the visible surface of an object
 */
export const unprojectScreenXyToWorldXyzOnFace = (
  { x: xs, y: ys }: Xy,
  itemPosition: Xyz,
  plane: OrthoPlane,
): Xyz => {
  const itemOriginScreen = projectWorldXyzToScreenXy(itemPosition);

  // adjust xs, xy to be relative to the projected-on-screen origin of the item:
  const xsAdj = xs - itemOriginScreen.x;
  const ysAdj = ys - itemOriginScreen.y;

  switch (plane) {
    case "xy": {
      // top/bottom face
      return {
        x: -(xsAdj / 2 + ysAdj) + itemPosition.x,
        y: xsAdj / 2 - ysAdj + itemPosition.y,
        z: itemPosition.z,
      };
    }
    case "xz": {
      // away/towards face
      return {
        x: -xsAdj + itemPosition.x,
        y: itemPosition.y,
        z: xsAdj / 2 - ysAdj + itemPosition.z,
      };
    }
    case "yz": {
      // left/right face
      return {
        x: itemPosition.x,
        y: xsAdj + itemPosition.y,
        z: -xsAdj / 2 - ysAdj + itemPosition.z,
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
