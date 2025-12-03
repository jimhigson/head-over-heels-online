import type { SpriteSize } from "../../../model/modelTypes";
import type { Xy } from "../../../utils/vectors/vectors";

export const floorTileSize = { w: 32, h: 16 } as const satisfies SpriteSize;
export const wallTileSize = { w: 16, h: 56 } as const satisfies SpriteSize;
export const doorTextureSize = { w: 23, h: 57 };
export const doorLegsTextureSize = { w: 16, h: 32 };
export const largeItemTextureSize = { w: 32, h: 28 };
export const smallItemTextureSize = { w: 24, h: 24 };
export const smallItemOutlineTextureSize = { w: 26, h: 26 };
export const hudCharTextureSize = { w: 8, h: 8 };
export const hudLowercaseCharTextureSize = { w: 8, h: 10 };

export const smallItemGridLocation = (gridPos: Xy) => {
  return {
    x: gridPos.x * (smallItemTextureSize.w + 1) + 1,
    y: gridPos.y * (smallItemTextureSize.h + 1) + 2,
  };
};
export const largeItemGridLocation = (gridPos: Xy) => {
  return {
    x: gridPos.x * (largeItemTextureSize.w + 1) + 1,
    y: gridPos.y * (largeItemTextureSize.h + 1) + 682,
  };
};
