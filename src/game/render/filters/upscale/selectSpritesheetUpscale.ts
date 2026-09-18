import { selectIsUpscaledSprites } from "../../../../store/slices/gameMenus/gameMenusSelectors";
import { selectTotalUpscale } from "../../../../store/slices/upscale/upscaleSlice";
import { type GameRootState } from "../../../../store/store";
import { maxSpritesheetUpscale } from "./maxSpritesheetUpscale";

/**
 * Select from the store the upscale factor for spritesheets,
 * constrained by the hardware
 */
export const selectSpritesheetUpscale = (state: GameRootState): number =>
  selectIsUpscaledSprites(state) ?
    Math.min(
      // ceil sides it towards being larger, for better quality
      Math.ceil(selectTotalUpscale(state)),
      // but even if scaling up, don't go past the max:
      maxSpritesheetUpscale(),
    )
  : 1;
