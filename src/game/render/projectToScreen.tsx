import { blockSizePx } from "@/sprites/pixiSpriteSheet";
import { Xyz } from "@/utils/vectors";

/* position on 2d screen for a given xyz in game-space 3d pixels */
export const projectToScreen = ({ x = 0, y = 0, z = 0 }: Partial<Xyz>): Xyz => {
  const projY = -(x + y) / 2 - z;
  return {
    x: y - x,
    y: projY,
    // z here is the z-index, for if the renderer needs it
    // boost x and y because height alone can never put an item in front
    // of another item it is set back from, no matter what the relative heights
    z: z - (x << 8) - (y << 8),
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
export const projectBlockToScreen = (blockXyz: Partial<Xyz>): Xyz => {
  return projectToScreen(blockXyzToFineXyz(blockXyz));
};
