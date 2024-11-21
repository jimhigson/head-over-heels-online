import type { Container } from "pixi.js";
import { isIntegerXyzOrCloseTo, type XyMaybeZ } from "@/utils/vectors";
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

/* position on 2d screen for a given xyz in game-space 3d pixels */
export const projectWorldXyzToScreenXy = (position: Partial<Xyz>): Xy => {
  const coordinatesAreInteger = isIntegerXyzOrCloseTo(position);

  return coordinatesAreInteger ?
      projectWorldXyzToScreenXyInteger(position)
    : projectWorldXyzToScreenXyFloat(position);
};

export const projectWorldXyzToScreenXyInteger = ({
  x = 0,
  y = 0,
  z = 0,
}: Partial<Xyz>): Xy => {
  return {
    x: y - x,
    y:
      // >> 1 is /2 but rounded down
      -((x + y) >> 1) - z,
  };
};

export const projectWorldXyzToScreenXyFloat = ({
  x = 0,
  y = 0,
  z = 0,
}: Partial<Xyz>): Xy => {
  return {
    x: y - x,
    y:
      // >> 1 is /2 but rounded down
      -(x + y) / 2 - z,
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
