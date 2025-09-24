import { detectDeviceType } from "../../../utils/detectDeviceType";
import { startAppListening } from "../../listenerMiddleware";
import { setEmulatedResolution } from "../gameMenus/gameMenusSlice";
import { updateUpscaleNow } from "./updateUpscaleNow";

export const updateUpscaleWhenEmulatedResolutionChanges = () => {
  if (detectDeviceType() !== "server") {
    // when the emulated resolution setting changes in user settings, update the upscale
    // in our slice. This is cross-slice chaining via listener api.
    startAppListening({
      actionCreator: setEmulatedResolution,
      effect(_action, { dispatch, getState }) {
        updateUpscaleNow(dispatch, getState);
      },
    });
  }
};

export const updateUpscaleWhenDisplaySettingsChange = () => {
  if (detectDeviceType() !== "server") {
    // when the emulated resolution setting changes in user settings, update the upscale
    // in our slice. This is cross-slice chaining via listener api.
    startAppListening({
      predicate(
        _action,
        {
          gameMenus: {
            userSettings: { displaySettings: currentDisplaySettings },
          },
        },
        {
          gameMenus: {
            userSettings: { displaySettings: previousDisplaySettings },
          },
        },
      ) {
        return currentDisplaySettings !== previousDisplaySettings;
      },
      effect(_action, { dispatch, getState }) {
        // any time the display settings change, update the upscale. Currently, only
        // turning on/off the CRT filter will change the upscale (because with it on we have a lower
        // maximum upscale) but this seem prudent anyway
        updateUpscaleNow(dispatch, getState);
      },
    });
  }
};
