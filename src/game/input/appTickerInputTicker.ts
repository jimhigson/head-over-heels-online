import { appClock } from "../../utils/ticker/appClock";
import { updatePriority } from "../../utils/ticker/AppTicker";
import { type InputTicker } from "./InputStateTracker";

export const appTickerInputTicker: InputTicker = {
  start(fn) {
    // we want this to run at a lower update priority than anything else so that it back-runs
    // the interactions and only updates the last frame's record after everything else has had
    // a change to query it
    appClock.add(fn, undefined, updatePriority.interaction);
  },
  stop(fn) {
    appClock.remove(fn);
  },
};
