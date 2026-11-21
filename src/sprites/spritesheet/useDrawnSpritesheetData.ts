import { useMemo } from "preact/hooks";
import type { SetRequiredDeep } from "type-fest";

import { spritesheetSideLength } from "../../../gfx/spritesheetMeta/spritesheetSize.macro.ts" with { type: "macro" };
import { useAppSelector } from "../../store/hooks";
import { selectCurrentSpritesheetData } from "../../store/slices/gameMenus/gameMenusSelectors";
import { selectIsAskedForSmoothingReadyToUse } from "../../store/slices/smoothing/selectIsAskedForSmoothingReadyToUse";
import { useCurrentSpritesheetArtUrl } from "../../store/useCurrentSpritesheetArtUrl";
import type { AppSpritesheetData } from "./AppSpritesheet";
import { spritesheetSmoothingManagerLoader } from "./smoothing/spritesheetSmoothingManagerLoader";
import { withRepackedRects } from "./withRepackedRects";

/**
 * sheet data whose meta says the image it is drawn from, and that image's
 * size in source pixels, as the crops are
 */
export type DrawnSpritesheetData = SetRequiredDeep<
  AppSpritesheetData,
  "meta.image" | "meta.size"
>;

/**
 * the current sheet's data as it is drawn.
 *
 *    if smoothing is on, returns the smoothed sheet if processed yet, otherwise the unsmoothed one
 *    if smoothing is off, returns the unsmoothed sheet
 */
export const useDrawnSpritesheetData = (): DrawnSpritesheetData => {
  const spritesheetData = useAppSelector(selectCurrentSpritesheetData);
  const artUrl = useCurrentSpritesheetArtUrl();
  // the store says when smoothing is done, so the manager is read again then -
  // never in the editor, which does not smooth
  const isSmoothingReadyToUse =
    import.meta.env.VITE_APP === "editor" ?
      false
      // oxlint-disable-next-line react-hooks/rules-of-hooks -- build-time macro, not run-time conditional
    : useAppSelector(selectIsAskedForSmoothingReadyToUse);
  const smoothedSpritesheet =
    isSmoothingReadyToUse ?
      spritesheetSmoothingManagerLoader.loaded()?.currentSmoothedSpritesheet
    : undefined;

  // the same object while nothing changes, so what is built from it is kept
  return useMemo(() => {
    if (smoothedSpritesheet === undefined) {
      return {
        ...spritesheetData,
        meta: {
          ...spritesheetData.meta,
          image: artUrl,
          size: { w: spritesheetSideLength, h: spritesheetSideLength },
        },
      };
    }
    const { repackedFrameRects, pngUrl, pixelWidth, pixelHeight, resolution } =
      smoothedSpritesheet;
    const repacked = withRepackedRects(spritesheetData, repackedFrameRects);
    return {
      ...repacked,
      meta: {
        ...repacked.meta,
        image: pngUrl,
        size: { w: pixelWidth / resolution, h: pixelHeight / resolution },
      },
    };
  }, [spritesheetData, artUrl, smoothedSpritesheet]);
};
