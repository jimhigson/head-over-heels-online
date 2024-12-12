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
      frame: { x: 333, y: 456, ...smallItemTextureSize },
    },
    "shadow.smallBlock": {
      frame: { x: 308, y: 456, ...smallItemTextureSize },
    },
    "shadowMask.conveyor": {
      frame: { x: 292, y: 395, ...largeItemTextureSize },
    },
    "shadow.smallRound": {
      frame: { x: 159, y: 291, ...smallItemTextureSize },
    },
    "shadowMask.smallRound": {
      frame: { x: 184, y: 291, ...smallItemTextureSize },
    },
    "shadowMask.tower": {
      frame: { x: 27, y: 349, ...smallItemTextureSize },
    },
  },
} as const satisfies Pick<SpritesheetData, "frames">;
