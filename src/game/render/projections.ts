import type { Container } from "pixi.js";
import { blockSizePx } from "../../sprites/spritePivots";
import type { XyMaybeZ, Xyz, Xy } from "../../utils/vectors/vectors";

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
 * since x,y screen co-ord is ambiguous, assume that the z is constant
 * at zero - ie, the projection is onto a horizontal plane starting at
 * the origin
 */
export const projectScreenXyToWorldXyz = ({ x: xs, y: ys }: Xy): Xyz => {
  return {
    y: xs / 2 - ys,
    x: -(xs / 2 + ys),
    z: 0,
  };
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
