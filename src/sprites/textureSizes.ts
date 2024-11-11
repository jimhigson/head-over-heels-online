import type { SpriteSize } from "@/model/modelTypes";

export const floorTileSize = { w: 32, h: 16 } as const satisfies SpriteSize;
export const wallTileSize = { w: 16, h: 55 } as const satisfies SpriteSize;
export const doorTextureSize = { w: 24, h: 56 };
export const doorLegsTextureSize = { w: 16, h: 32 };
export const largeItemTextureSize = { w: 32, h: 28 };
export const smallItemTextureSize = { w: 24, h: 24 };
