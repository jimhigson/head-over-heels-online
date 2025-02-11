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
      : []
      ).map(projectBlockXyzToScreenXy),
      true,
    )
    .fill(0x000);
};
