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
    const previousGameSpeed = selectGameSpeed(store.getState());
    const savedMinFps = ticker.minFPS;
    const savedMaxFps = ticker.maxFPS;
    const savedSpeed = ticker.speed;

    // remove minFPS so pixi is happy to give a single tick for a large jump:
    ticker.minFPS = 0;
    // remove the maxFPS throttle (the main loop throttles to 10fps while the
    // game speed is zero): Ticker.update silently swallows the whole update -
    // firing no listeners at all - when called within maxFPS's
    // minimum-elapsed interval, which would eat jumps smaller than ~100ms:
    ticker.maxFPS = 0;
    // fake the game actually running at normal speed for one tick:
    ticker.speed = 1;
    store.dispatch(setGameSpeed(1));
    ticker.update(ticker.lastTime + jumpMs);
    store.dispatch(setGameSpeed(previousGameSpeed));
    ticker.speed = savedSpeed;

    ticker.maxFPS = savedMaxFps;
    ticker.minFPS = savedMinFps;
    // tidy up the ticker's lastTime
    ticker.lastTime = performance.now();
  };
};
