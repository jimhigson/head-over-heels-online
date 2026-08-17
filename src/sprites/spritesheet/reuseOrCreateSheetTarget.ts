import { RenderTexture } from "pixi.js";

import { spritesheetSize } from "./spritesheetData/makeBaseSpritesheetData";

/**
 * every room sheet bakes into a square (power-of-two) atlas holding the whole
 * freshly-packed layout. The pack must fit; the throw below catches it if it
 * outgrows this.
 */
const sheetTargetHeight = spritesheetSize.h;

/**
 * the GPU texture a room sheet is baked into: reuses the previous room's
 * texture (the bake's first pass clears it, so no pixels survive between
 * rooms), avoiding a GPU free+alloc on every room change.
 */
export const reuseOrCreateSheetTarget = (
  previousTarget: RenderTexture | undefined,
  /** total rows the packed layout uses, from y=0 */
  requiredHeight: number,
  /**
   * backing-store scale of the bake (the sheet's logical size times this);
   * a previous target at a different resolution cannot be reused
   */
  resolution: number,
): RenderTexture => {
  if (import.meta.env.DEV && requiredHeight > sheetTargetHeight) {
    throw new Error(
      `packed sheet (${requiredHeight} rows) does not fit the ${sheetTargetHeight}-row target`,
    );
  }

  if (
    previousTarget !== undefined &&
    previousTarget.source.resolution === resolution
  ) {
    return previousTarget;
  }
  previousTarget?.destroy(true);

  return RenderTexture.create({
    width: spritesheetSize.w,
    height: sheetTargetHeight,
    resolution,
    antialias: false,
    autoGenerateMipmaps: false,
  });
};
