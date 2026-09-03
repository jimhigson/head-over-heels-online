import { selectGameSpeed } from "../../store/slices/gameMenus/gameMenusSelectors";
import { setGameSpeed } from "../../store/slices/userSettings/userSettingsSlice";
import { store } from "../../store/store";
import { appClock } from "../../utils/ticker/appClock";

/**
 * e2e-only: install `window.__e2e_advanceTime`. Installed as the app starts,
 * not with the game - in these builds the clock never ticks on its own, so the
 * menus need this to run a tick long before any game exists
 */
export const installE2eAdvanceTimeHandle = () => {
  if (import.meta.env.MODE !== "visual-regression") {
    throw new Error("visual regression code only");
  }

  /**
   * run one tick, worth this many milliseconds of game time. Zero is a repaint:
   * every listener runs, the renderer among them, and nothing moves
   */
  window.__e2e_advanceTime = (advanceMs: number) => {
    const previousGameSpeed = selectGameSpeed(store.getState());
    // the main loop multiplies the tick by the game speed, which is zero while a
    // scenario is being set up - run at natural speed for the tick only:
    store.dispatch(setGameSpeed(1));

    appClock.advance(advanceMs);

    store.dispatch(setGameSpeed(previousGameSpeed));
  };
};
