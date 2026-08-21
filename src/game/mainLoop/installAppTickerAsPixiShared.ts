import { Ticker } from "pixi.js";

import { appClock } from "../../utils/ticker/appClock";
import { type AppTicker } from "../../utils/ticker/AppTicker";

/** pixi's two ticker singletons, which it fills in on first access */
type TickerSingletonStatics = {
  _shared: AppTicker | undefined;
  _system: AppTicker | undefined;
};

/**
 * give pixi the app's clock, so rendering, sprites, its event throttling and
 * its scheduler all run from the one we control. Must happen before anything
 * reads `Ticker.shared` or `Ticker.system` - the first read would build pixi's
 * own, and anything added to that would be left behind
 */
export const installAppTickerAsPixiShared = () => {
  // pixi's `Ticker` type is nominal - it has private members - so no other class
  // can be assigned to it however exactly it matches. `AppTickerCoversPixiTicker`
  // checks the shape instead
  const tickerStatics = Ticker as unknown as TickerSingletonStatics;

  if (tickerStatics._shared === appClock) {
    return;
  }

  if (tickerStatics._shared !== undefined) {
    throw new Error(
      "pixi's shared ticker already exists - install this before anything reads Ticker.shared",
    );
  }

  tickerStatics._shared = appClock;
  tickerStatics._system = appClock;
};
