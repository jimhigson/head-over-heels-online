import { useEffect } from "preact/hooks";

import type { ResolutionName } from "../../../originalGame";

import { useAppDispatch } from "../../hooks";
import { startAppListening } from "../../listenerMiddleware";
import { updateUpscaleThunk } from "./updateUpscaleThunk";

/**
 * Recompute the upscale whenever any displaySettings field changes.
 * Uses the same targetElement as {@link useUpdateUpscaleWhenElementResizes}
 * so that the editor gets the correct pane size, not the window size.
 */

export const useUpdateUpscaleOnDisplaySettingsChange = (
  fixedEmulatedResolution?: ResolutionName,
  targetElement?: HTMLElement,
): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsub = startAppListening({
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
      effect() {
        dispatch(updateUpscaleThunk(fixedEmulatedResolution, targetElement));
      },
    });
    return unsub;
  }, [dispatch, fixedEmulatedResolution, targetElement]);
};
