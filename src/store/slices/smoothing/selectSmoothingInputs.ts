import { spritesheetArtSourceUrl } from "../../../sprites/spritesheet/spritesheetArtSourceUrl";
import type { GameRootState } from "../../store";
import { selectSpritesheetArtName } from "../gameMenus/gameMenusSelectors";
import { selectSpritesheetSmoothUpscale } from "./selectSpritesheetSmoothUpscale";
import type { SmoothingInputs } from "./smoothingSlice";

/**
 * the smoothing of the spritesheet the settings ask for, or undefined if they ask
 * for none. None is asked for until the settings and any art override are
 * rehydrated, so the defaults they replace never start a smoothing
 */
export const selectSmoothingInputs = (
  state: GameRootState,
): SmoothingInputs | undefined => {
  if (
    !state.userSettings._persist.rehydrated ||
    !state.spritesheetOverride._persist.rehydrated ||
    !state.smoothing._persist.rehydrated
  ) {
    return undefined;
  }
  const smoothUpscale = selectSpritesheetSmoothUpscale(state);
  if (smoothUpscale === 1) {
    return undefined;
  }
  const spritesheetName = selectSpritesheetArtName(state);
  return {
    spritesheetName,
    sourceUrl: spritesheetArtSourceUrl(state, spritesheetName),
    smoothUpscale,
  };
};
