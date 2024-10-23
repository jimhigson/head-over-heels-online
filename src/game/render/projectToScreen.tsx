import { Xyz } from "../../modelTypes";

/* position on 2d screen for a given xyz in game-space 3d pixels */

export const projectToScreen = (x: number, y: number, z: number = 0): Xyz => {
  const projY = -(x + y) / 2 - z;
  return {
    x: y - x,
    y: projY,
    // z here is the z-index, for if the renderer needs it
    z: z - x - y,
  };
};
