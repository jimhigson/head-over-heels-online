import { type AppThunk } from "../../store";
import { nextSpritesOption } from "./userSettingsSlice";

/**
 * cycle to the next sprite option, including the debug spritesheet iff
 * cheats are on (cheats-on lives in the debug slice, out of the userSettings
 * reducer's reach)
 */
export const cycleSpritesOptionThunk = (): AppThunk => (dispatch, getState) => {
  dispatch(
    nextSpritesOption({
      includeDebug: getState().debug.cheatsOn,
    }),
  );
};
