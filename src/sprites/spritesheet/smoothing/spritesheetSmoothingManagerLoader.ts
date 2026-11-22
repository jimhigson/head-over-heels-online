import nanoEqual from "nano-equal";

import { startAppListening } from "../../../store/listenerMiddleware";
import { clearAllData } from "../../../store/slices/clearAllData";
import { selectSmoothingInputs } from "../../../store/slices/smoothing/selectSmoothingInputs";
import {
  smoothingFailed,
  spritesheetSmootherStarted,
} from "../../../store/slices/smoothing/smoothingSlice";
import { store } from "../../../store/store";
import { importOnce } from "../../../utils/importOnce";
import { smoothedSpritesheetCacheNamePrefix } from "./smoothedSpritesheetCacheNamePrefix";
import type { SpritesheetSmoothingManager } from "./spritesheetSmoothingManager";

/**
 * the smoothing manager, once it has loaded - its readers run synchronously,
 * and only once the store says a smoothing is done, which only the manager says
 */
let maybeLoadedManager: SpritesheetSmoothingManager | undefined;

const importManagerOnce = importOnce(async () => {
  const { spritesheetSmoothingManager } =
    await import("./spritesheetSmoothingManager");
  maybeLoadedManager = spritesheetSmoothingManager;
  return spritesheetSmoothingManager;
});

/**
 * delete every smoothed sheet stored on the device, so the next is smoothed
 * from scratch
 */
const deleteStoredSmoothedSpritesheets = async (): Promise<void> => {
  // only secure contexts have the cache api
  if (!("caches" in globalThis)) {
    return;
  }
  for (const name of await caches.keys()) {
    if (name.startsWith(smoothedSpritesheetCacheNamePrefix)) {
      await caches.delete(name);
    }
  }
};

/**
 * loads the smoothing manager once smoothing is first asked for, and hands it
 * out from then on
 */
export const spritesheetSmoothingManagerLoader = {
  /**
   * the smoothing manager, if smoothing has been asked for this session and
   * it has loaded
   */
  loaded(): SpritesheetSmoothingManager | undefined {
    return maybeLoadedManager;
  },
};

/**
 * smooths for the settings as they are, then on every change of the smoothing
 * they ask for, and forgets smoothed sheets when all data is cleared - outside
 * the editor, whose store has none of the game state it smooths for. The
 * smoothing manager is fetched only once a smoothing is asked for
 */
const startSmoothingListener = () => {
  startAppListening({
    predicate(action, currentState, previousState) {
      return (
        spritesheetSmootherStarted.match(action) ||
        clearAllData.match(action) ||
        !nanoEqual(
          selectSmoothingInputs(currentState),
          selectSmoothingInputs(previousState),
        )
      );
    },
    async effect(
      action,
      { dispatch, getState, cancelActiveListeners, signal },
    ) {
      // only smoothing for the latest settings matters: one already under
      // way is stopped, as its signal is this listener's
      cancelActiveListeners();
      if (clearAllData.match(action)) {
        maybeLoadedManager?.forget();
        // sheets stored by earlier sessions go too, loaded manager or not
        await deleteStoredSmoothedSpritesheets();
        if (signal.aborted) {
          return;
        }
      }
      if (
        selectSmoothingInputs(getState()) === undefined &&
        maybeLoadedManager === undefined
      ) {
        // nothing smoothed this session, so nothing to stop or settle
        return;
      }
      const smoothingManager = await importManagerOnce().catch((e: unknown) => {
        if (!signal.aborted) {
          console.error(
            new Error("could not load the spritesheet smoothing manager", {
              cause: e,
            }),
          );
          // counts towards smoothing being turned off on this device
          dispatch(smoothingFailed());
        }
        return undefined;
      });
      if (smoothingManager === undefined || signal.aborted) {
        return;
      }
      await smoothingManager.smoothAskedFor(dispatch, getState, signal);
    },
  });
  store.dispatch(spritesheetSmootherStarted());
};

if (import.meta.env.VITE_APP !== "editor") {
  startSmoothingListener();
}
