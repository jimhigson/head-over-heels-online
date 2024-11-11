import type { SpritesheetFrameData } from "pixi.js";

/**
 * Add some extra type safety to pixi's spritesheets by forcing animation
 * frames to reference frames from the spritesheet
 */

export type AnimationsOfFrames<TextureId extends string> = {
  frames: Record<TextureId, SpritesheetFrameData>;
  animations: Record<string, TextureId[]>;
  meta?: unknown;
};
