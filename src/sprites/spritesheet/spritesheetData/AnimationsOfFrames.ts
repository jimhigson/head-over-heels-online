import type { SpritesheetFrameData } from "pixi.js";

import type { FramesWithSpeed } from "./spriteSheetData";

/**
 * Add some extra type safety to pixi's spritesheets by forcing animation
 * frames to reference frames from the spritesheet
 */

export type AnimationsOfFrames<TextureId extends string> = {
  frames: Record<TextureId, SpritesheetFrameData>;
  animations: Record<string, FramesWithSpeed<TextureId[]>>;
  meta?: unknown;
};
