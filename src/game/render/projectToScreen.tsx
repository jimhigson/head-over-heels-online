import type { Container } from "pixi.js";
import type { XyMaybeZ } from "@/utils/vectors";
import { blockSizePx } from "@/sprites/spritePivots";
import type { Xy, Xyz } from "@/utils/vectors";

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

/**
 * because of floating point error, after processing mtv it is possible to get
 * values that should be integers but are off by a tiny amount. To correct, we consider
 * anything that is within 1/1000 of a pixel to be exactly on that pixel
 */
const isIntegerOrCloseTo = (n: number) => Math.abs(n - Math.round(n)) < 0.001;

/* position on 2d screen for a given xyz in game-space 3d pixels */
export const projectWorldXyzToScreenXy = ({
  x = 0,
  y = 0,
  z = 0,
}: Partial<Xyz>): Xy => {
  const coordinatesAreInteger =
    isIntegerOrCloseTo(x) && isIntegerOrCloseTo(y) && isIntegerOrCloseTo(z);

  return {
    x: y - x,
    y:
      coordinatesAreInteger ?
        // >> 1 is /2 but rounded down
        -((x + y) >> 1) - z
        // NB: /2, not >>1 because we were given floats so support sub-pixel rendering
      : -(x + y) / 2 - z,
  };
};

/** get the in-game x,y,z for any given block x,y,z */
export const blockXyzToFineXyz = ({
  x = 0,
  y = 0,
  z = 0,
}: Partial<Xyz>): Xyz => {
  return {
    x: x * blockSizePx.w,
    y: y * blockSizePx.d,
    z: z * blockSizePx.h,
  };
};

/* position on 2d screen for a given xyz in game-space block position */
export const projectBlockXyzToScreenXy = (blockXyz: Partial<Xyz>): Xy => {
  return projectWorldXyzToScreenXy(blockXyzToFineXyz(blockXyz));
};
