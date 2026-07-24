import { RenderTexture } from "pixi.js";

import { spritesheetSize } from "./spritesheetData/makeBaseSpritesheetData";

/**
 * every room sheet bakes into a double-height (power-of-two, so warp-mesh
 * edge sampling of the base region rounds identically to the square base
 * sheet's) atlas: the base layout on top, the variant strip below. The strip
 * must fit in the lower half; VR catches it if it ever outgrows this.
 */
const sheetTargetHeight = spritesheetSize.h * 2;

/**
 * the GPU texture a room sheet is baked into: reuses the previous room's
 * texture (the bake's first pass clears it, so no pixels survive between
 * rooms), avoiding a GPU free+alloc on every room change.
 */
export const reuseOrCreateSheetTarget = (
  previousTarget: RenderTexture | undefined,
  stripHeight: number,
): RenderTexture => {
  if (
    import.meta.env.DEV &&
    spritesheetSize.h + stripHeight > sheetTargetHeight
  ) {
    throw new Error(
      `variant strip (${stripHeight} rows) does not fit the double-height sheet`,
    );
  }

  return (
    previousTarget ??
    RenderTexture.create({
      width: spritesheetSize.w,
      height: sheetTargetHeight,
      antialias: false,
      autoGenerateMipmaps: false,
    })
  );
};
