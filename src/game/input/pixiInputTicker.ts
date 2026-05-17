import { Ticker, UPDATE_PRIORITY } from "pixi.js";

import { type InputTicker } from "./InputStateTracker";

export const pixiInputTicker: InputTicker = {
  start(fn) {
    // we want this to run at a lower update priority than anything else so that it back-runs
    // the interactions and only updates the last frame's record after everything else has had
    // a change to query it
    Ticker.shared.add(fn, undefined, UPDATE_PRIORITY.INTERACTION);
  },
  stop(fn) {
    Ticker.shared.remove(fn);
  },
};
