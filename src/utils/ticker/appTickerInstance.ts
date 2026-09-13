import { type AppTicker } from "./AppTicker";
import { BrowserClockAppTicker } from "./BrowserClockAppTicker";
import { TestDrivenAppTicker } from "./TestDrivenAppTicker";

/** the app's clock, from the first menu frame to the last frame of the game */
export const appTicker: AppTicker =
  import.meta.env.MODE === "visual-regression" ?
    new TestDrivenAppTicker()
  : new BrowserClockAppTicker();
