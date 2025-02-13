import type { SpritesheetData } from "pixi.js";
import { largeItemTextureSize, smallItemTextureSize } from "./textureSizes";

export const shadowSpritesheetData = {
  frames: {

    "shadowMask.smallBlock": {
      frame: { x: 333, y: 456, ...smallItemTextureSize },
    },
    "shadow.smallBlock": {
      frame: { x: 308, y: 456, ...smallItemTextureSize },
    },

  },
} as const satisfies Pick<SpritesheetData, "frames">;
