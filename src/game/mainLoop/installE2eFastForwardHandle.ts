import { type Application } from "pixi.js";

import { selectGameSpeed } from "../../store/slices/gameMenus/gameMenusSelectors";
import { setGameSpeed } from "../../store/slices/userSettings/userSettingsSlice";
import { store } from "../../store/store";

/**
 * e2e-only: install `window.__e2e_fastForwardMs`, which advances the
 * game simulation by a fixed duration deterministically while it is otherwise
 * frozen (game speed 0) - eg to play out a scenario's setup, or let transient
 * floating text expire, before a screenshot.
 */
export const installE2eFastForwardHandle = (app: Application) => {
  if (import.meta.env.MODE !== "visual-regression") {
    throw new Error("visual regression code only");
  }

  window.__e2e_fastForwardMs = (jumpMs: number) => {
    const { ticker } = app;
    const state = store.getState();

    const [topMenu] = state.gameMenus.openMenus;
    if (topMenu !== undefined) {
      // the game speed is zero while a menu covers the game, which would
      // silently consume the jump without advancing the world by anything.
      // Failing loudly here is the difference between a test that reports a
      // problem and one that screenshots the wrong moment
      throw new Error(
        `cannot fast-forward while the "${topMenu.menuId}" menu is open - close it first`,
      );
    }

    const previousGameSpeed = selectGameSpeed(state);
    const savedMinFps = ticker.minFPS;

    // the main loop truncates any frame longer than minFPS allows, so that a
    // stalled tab cannot teleport everything through the scenery - remove that
    // limit so the whole jump lands as a single tick:
    ticker.minFPS = 0;
    // the game is normally frozen at speed zero while a scenario is set up;
    // run it at its natural speed for the duration of the jump:
    store.dispatch(setGameSpeed(1));

    ticker.update(ticker.lastTime + jumpMs);

    store.dispatch(setGameSpeed(previousGameSpeed));
    ticker.minFPS = savedMinFps;
    // tidy up the ticker's lastTime
    ticker.lastTime = performance.now();
  };
};
