import type { SpritesheetData } from "pixi.js";

export const hudSpritesheetData = {
  frames: {},
} as const satisfies Pick<SpritesheetData, "frames">;
