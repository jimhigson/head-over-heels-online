import { Xyz } from "../../modelTypes";
import { blockSizePx } from "@/sprites/pixiSpriteSheet";

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

/* position on 2d screen for a given xyz in game-space block position */
export const projectBlockToScreen = ({
  x = 0,
  y = 0,
  z = 0,
}: Partial<Xyz>): Xyz => {
  return projectToScreen({
    x: x * blockSizePx.w,
    y: y * blockSizePx.d,
    z: z * blockSizePx.h,
  });
};
