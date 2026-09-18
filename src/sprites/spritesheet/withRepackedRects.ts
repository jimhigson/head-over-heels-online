import { objectEntriesIter } from "../../utils/entries";
import { type AppSpritesheetDataWithVariants } from "./AppSpritesheet";
import { type FrameRect } from "./composeSpritesheetForUpscale";

/**
 * Pure function that produces a frames map (like on a pixi Spritesheet) but a new version with the
 * frames where they are on a repacked sheet, defined by overrides, not their original position.
 */
export const withRepackedRects = (
  frames: AppSpritesheetDataWithVariants["frames"],
  overrides: ReadonlyMap<string, FrameRect>,
): AppSpritesheetDataWithVariants["frames"] => {
  const repacked = {} as AppSpritesheetDataWithVariants["frames"];
  for (const [id, entry] of objectEntriesIter(frames)) {
    const override = overrides.get(id);
    repacked[id] =
      override === undefined ? entry : (
        { ...entry, frame: { ...entry.frame, ...override } }
      );
  }
  return repacked;
};
