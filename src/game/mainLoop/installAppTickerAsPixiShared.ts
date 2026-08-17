import { Ticker } from "pixi.js";

import { type AppTicker } from "../../utils/ticker/AppTicker";
import { appTicker } from "../../utils/ticker/appTickerInstance";

/** pixi's two ticker singletons, which it fills in on first access */
type TickerSingletonStatics = {
  _shared: AppTicker | undefined;
  _system: AppTicker | undefined;
};

/**
 * Although we patch pixi, don't want pixi to reach into our app code, so assign it
 * our app-specific tickers at run-time rather than patch them in
 *
 * Must happen before anything reads `Ticker.shared` or `Ticker.system`
 */
export const installAppTickerAsPixiShared = () => {
  const tickerStatics = Ticker as unknown as TickerSingletonStatics;

  if (tickerStatics._shared === appTicker) {
    return;
  }

  if (tickerStatics._shared !== undefined) {
    throw new Error(
      "pixi's shared ticker already exists - install this before anything reads Ticker.shared",
    );
  }

  tickerStatics._shared = appTicker;
  tickerStatics._system = appTicker;
};
