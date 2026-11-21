import { objectEntriesIter } from "../../utils/entries";
import type { FrameRect } from "./repackSpritesheetForSmoothUpscale";
import type { TextureId } from "./spritesheetData/makeSpritesheetData";

/**
 * Pure function giving spritesheet data in the layout of the image drawn: as
 * it is, or a new version with its frames where a repacked sheet has them,
 * not at their original positions.
 */
export const withRepackedRects = <
  SpritesheetData extends {
    frames: Partial<Record<TextureId, { frame: FrameRect }>>;
  },
>(
  spritesheetData: SpritesheetData,
  /**
   * where each frame is on the repacked sheet - undefined if the sheet drawn
   * is not repacked
   */
  repackedFrameRects: ReadonlyMap<TextureId, FrameRect> | undefined,
): SpritesheetData => {
  if (repackedFrameRects === undefined) {
    return spritesheetData;
  }
  const repacked: Partial<Record<TextureId, { frame: FrameRect }>> = {};
  for (const [id, entry] of objectEntriesIter(spritesheetData.frames)) {
    const override = repackedFrameRects.get(id);
    repacked[id] =
      override === undefined ? entry : (
        { ...entry, frame: { ...entry.frame, ...override } }
      );
  }
  return {
    ...spritesheetData,
    frames: repacked as SpritesheetData["frames"],
  };
};
