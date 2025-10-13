import type { Application } from "pixi.js";

import type { GameApi } from "./src/game/gameMain";
import type { AppStore } from "./src/store/store";

declare global {
  interface Window {
    // put the store on the window for e2e tests to use
    _e2e_store?: AppStore;
    // put the gameApi on the window for e2e tests to use
    _e2e_gamePageGameAi?: GameApi<string>;
    // put the pixi application on the window for e2e tests to use
    _e2e_pixiApplication?: Application;
  }
}
