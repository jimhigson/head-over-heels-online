import { type ResolutionName } from "../../../originalGame";
import { type AppThunk } from "../../store";
import { selectEmulatedResolutionName } from "../gameMenus/gameMenusSelectors";
import { upscaleOptionsForCurrentDevice } from "./upscaleOptionsForCurrentDevice";
import { upscaleToWindow } from "./upscaleSlice";

/**
 * Recompute the upscale value from the current window/element size and
 * display settings, and dispatch the result to the upscale slice.
 *
 * Dispatched as a thunk: `dispatch(updateUpscaleThunk(...))`.
 */
export const updateUpscaleThunk =
  (
    fixedEmulatedResolution?: ResolutionName,
    targetElement?: HTMLElement,
  ): AppThunk =>
  (dispatch, getState) => {
    dispatch(
      upscaleToWindow(
        upscaleOptionsForCurrentDevice(
          fixedEmulatedResolution ?? selectEmulatedResolutionName(getState()),
          getState().userSettings.userSettings.displaySettings,
          targetElement,
        ),
      ),
    );
  };
