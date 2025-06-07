import { upscaleOptionsForCurrentDevice } from "./upscaleOptionsForCurrentDevice";
import { detectDeviceType } from "../../../utils/detectDeviceType";
import { startAppListening } from "../../listenerMiddleware";
import { setEmulatedResolution } from "../gameMenusSlice";
import { upscaleToWindow } from "./upscaleSlice";

export const updateUpscaleWhenEmulatedResolutionChanges = () => {
  if (detectDeviceType() !== "server") {
    // when the emulated resolution setting changes in user settings, update the upscale
    // in our slice. This is cross-slice chaining via listener api.
    startAppListening({
      actionCreator: setEmulatedResolution,
      effect(action, { dispatch, getState }) {
        const { emulatedResolution } =
          getState().gameMenus.userSettings.displaySettings;

        if (emulatedResolution !== undefined) {
          dispatch(
            upscaleToWindow(upscaleOptionsForCurrentDevice(emulatedResolution)),
          );
        }
      },
    });
  }
};
