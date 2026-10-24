import { Graphics, type Renderer, RenderTexture } from "pixi.js";

import { type FrameRect } from "../../../../sprites/spritesheet/composeSpritesheetForUpscale";

/**
 * a mask of a sheet at 1x: each frame's rect in a colour of its own, and
 * transparent in the space between them, so a pass can tell one frame
 * from the next even where they lie flush
 */
export const renderFrameRectsMask = (
  pixiRenderer: Renderer,
  frameRects: Iterable<FrameRect>,
  /**
   * the sheet's size, in 1x pixels
   */
  width: number,
  height: number,
): RenderTexture => {
  const rects = new Graphics();
  let frameIndex = 0;
  for (const { x, y, w, h } of frameRects) {
    frameIndex++;
    // the index itself as the colour: never zero, and distinct per frame
    rects.rect(x, y, w, h).fill(frameIndex);
  }
  const mask = RenderTexture.create({ width, height, resolution: 1 });
  pixiRenderer.render({ container: rects, target: mask });
  rects.destroy();
  mask.source.scaleMode = "nearest";
  return mask;
};
