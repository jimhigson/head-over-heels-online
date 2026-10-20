import { type AppThunk } from "../../store";
import { nextSpritesheetName } from "./userSettingsSlice";

/**
 * cycle to the next sprite option, including the debug spritesheet iff
 * cheats are on (cheats-on lives in the debug slice, out of the userSettings
 * reducer's reach)
 */
export const cycleSpritesheetNameThunk =
  (): AppThunk => (dispatch, getState) => {
    dispatch(
      nextSpritesheetName({
        includeDebug: getState().debug.cheatsOn,
      }),
    );
  };
