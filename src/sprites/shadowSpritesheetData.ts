import type { SpritesheetData } from "pixi.js";
import { largeItemTextureSize, smallItemTextureSize } from "./textureSizes";

export const shadowSpritesheetData = {
  frames: {
    "shadowMask.fullBlock": {
      frame: { x: 226, y: 395, ...largeItemTextureSize },
    },
    "shadow.fullBlock": {
      frame: { x: 259, y: 395, ...largeItemTextureSize },
    },
    "shadowMask.smallBlock": {
      frame: { x: 226, y: 395, ...largeItemTextureSize },
    },
    "shadow.smallBlock": {
      frame: { x: 308, y: 456, ...largeItemTextureSize },
    },
    "shadowMask.conveyor": {
      frame: { x: 333, y: 456, ...largeItemTextureSize },
    },
    "shadow.smallRound": {
      frame: { x: 159, y: 291, ...smallItemTextureSize },
    },
  },
} as const satisfies Pick<SpritesheetData, "frames">;
