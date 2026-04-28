import { detectDeviceType } from "../../../utils/detectEnv/detectDeviceType";
import { startAppListening } from "../../listenerMiddleware";
import { updateUpscaleThunk } from "./updateUpscaleThunk";

/**
 * Recompute the upscale whenever any displaySettings field changes. The
 * predicate uses reference inequality on `userSettings.displaySettings`
 * — Immer produces a new reference on any sub-field change, so this fires
 * for emulatedResolution, crtFilter, and the rest. The over-eager fields
 * (showBoundingBoxes etc.) re-dispatch with the same calculated upscale,
 * which is a noop at the slice level.
 */
export const updateUpscaleWhenDisplaySettingsChange = () => {
  if (detectDeviceType() !== "server") {
    startAppListening({
      predicate(
        _action,
        {
          userSettings: {
            userSettings: { displaySettings: currentDisplaySettings },
          },
        },
        {
          userSettings: {
            userSettings: { displaySettings: previousDisplaySettings },
          },
        },
      ) {
        return currentDisplaySettings !== previousDisplaySettings;
      },
      effect(_action, { dispatch }) {
        dispatch(updateUpscaleThunk());
      },
    });
  }
};
