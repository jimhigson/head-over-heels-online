import { type GameRootState } from "../../store";
import { selectIsUpscaledSprites } from "../gameMenus/gameMenusSelectors";
import { selectTotalUpscale } from "../upscale/upscaleSlice";
import { maxSpritesheetSmoothUpscale } from "./maxSpritesheetSmoothUpscale";

/**
 * Select from the store the upscale factor for spritesheets,
 * constrained by the hardware
 */
export const selectSpritesheetSmoothUpscale = (state: GameRootState): number =>
  selectIsUpscaledSprites(state) ?
    Math.min(
      // ceil sides it towards being larger, for better quality
      Math.ceil(selectTotalUpscale(state)),
      // but even if scaling up, don't go past the max:
      maxSpritesheetSmoothUpscale(),
    )
  : 1;
