import { RenderTexture } from "pixi.js";

import { spritesheetSideLength } from "../../../gfx/spritesheetMeta/spritesheetSize.macro.ts" with { type: "macro" };

/**
 * the GPU texture a room sheet is baked into: reuses the previous room's
 * texture (the bake's first pass clears it, so no pixels survive between
 * rooms), avoiding a GPU free+alloc on every room change.
 */
export const reuseOrCreateRoomSheetTexture = (
  previousTarget: RenderTexture | undefined,
  /** total rows the packed layout uses, from y=0 */
  requiredHeight: number,
  /**
   * backing-store scale of the bake (the sheet's logical size times this);
   * a previous target at a different resolution cannot be reused
   */
  resolution: number,
): RenderTexture => {
  if (import.meta.env.DEV && requiredHeight > spritesheetSideLength) {
    throw new Error(
      `packed sheet (${requiredHeight} rows) does not fit the ${spritesheetSideLength}-row target`,
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
    width: spritesheetSideLength,
    height: spritesheetSideLength,
    resolution,
    antialias: false,
    autoGenerateMipmaps: false,
  });
};
