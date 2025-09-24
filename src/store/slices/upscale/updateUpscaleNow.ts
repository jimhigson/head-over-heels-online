import type { ResolutionName } from "../../../originalGame";
import type { store } from "../../store";

import { selectEmulatedResolutionName } from "../gameMenus/gameMenusSelectors";
import { upscaleOptionsForCurrentDevice } from "./upscaleOptionsForCurrentDevice";
import { upscaleToWindow } from "./upscaleSlice";

export const updateUpscaleNow = (
  /**
   * taking parameters this way makes this safe to call from the store setup, without
   * a circular dependency coming going back to the store
   */
  dispatch: typeof store.dispatch,
  getState: typeof store.getState,
  fixedEmulatedResolution?: ResolutionName,
  targetElement?: HTMLElement,
) => {
  dispatch(
    upscaleToWindow(
      upscaleOptionsForCurrentDevice(
        fixedEmulatedResolution ?? selectEmulatedResolutionName(getState()),
        getState().gameMenus.userSettings.displaySettings,
        targetElement,
      ),
    ),
  );
};
