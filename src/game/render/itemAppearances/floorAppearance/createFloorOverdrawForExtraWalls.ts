import { Graphics } from "pixi.js";
import type { ExtraWallRanges } from "./findExtraWallRanges";
import { projectBlockXyzToScreenXy } from "../../projectToScreen";

export const createFloorOverdrawForExtraWalls = ({
  extraWallRanges,
  blockXMin,
  blockYMin,
}: {
  extraWallRanges: ExtraWallRanges;
  blockXMin: number;
  blockYMin: number;
}) => {
  return new Graphics()
    .poly(
      (extraWallRanges.towards ?
        [
          // bottom
          {
            x: extraWallRanges.towards[0] - 0.5 + blockXMin,
            y: extraWallRanges.right[0] - 0.5 + blockYMin,
          },
          // left
          {
            x: extraWallRanges.towards[1] + 0.5 - blockXMin,
            y: extraWallRanges.right[0] - 0.5 + blockYMin,
          },
          // top
          {
            x: extraWallRanges.towards[1] + 0.5 - blockXMin,
            y: extraWallRanges.right[1] + 0.5 - blockYMin,
          },
          // right
          {
            x: extraWallRanges.towards[0] - 0.5 + blockXMin,
            y: extraWallRanges.right[1] + 0.5 - blockYMin,
          },
        ]
      : [
          // bottom
          {
            x: extraWallRanges.left[0] + 0.5 - blockXMin,
            y: extraWallRanges.away[0] + 0.5,
          },
          // left
          {
            x: extraWallRanges.left[1] + 2.5 - blockXMin,
            y: extraWallRanges.away[0],
          },
          // top
          {
            x: extraWallRanges.left[1] + 2.5 - blockXMin,
            y: extraWallRanges.away[1] + 2.5,
          },
          // right
          {
            x: extraWallRanges.left[0] + 0.5 - blockXMin,
            y: extraWallRanges.away[1] + 2.5,
          },
        ]
      ).map(projectBlockXyzToScreenXy),
      true,
    )
    .fill(0x000000);
};
