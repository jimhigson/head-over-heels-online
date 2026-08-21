import { type AppTicker } from "./AppTicker";
import { BrowserClockAppTicker } from "./BrowserClockAppTicker";
import { TestDrivenAppTicker } from "./TestDrivenAppTicker";

/** the app's clock, from the first menu frame to the last frame of the game */
export const appClock: AppTicker =
  import.meta.env.MODE === "visual-regression" ?
    new TestDrivenAppTicker()
  : new BrowserClockAppTicker();

// as pixi does for its shared ticker: whoever adds the first listener - the
// menus' input tracker, long before the game exists - expects it to start
// running, rather than having to know it owns starting the clock
appClock.autoStart = true;
