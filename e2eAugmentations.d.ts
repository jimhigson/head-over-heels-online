import { type Application } from "pixi.js";

import { type GameApi } from "./src/game/gameMain";
import { type ItemZGraph } from "./src/game/render/ItemRenderContexts";
import { type AppStore } from "./src/store/store";

declare global {
  interface Window {
    // put the store on the window for e2e tests to use
    _e2e_store?: AppStore;
    // put the gameApi on the window for e2e tests to use
    _e2e_gamePageGameAi?: GameApi<string>;
    // put the pixi application on the window for e2e tests to use
    _e2e_pixiApplication?: Application;
    // the live draw-order graph of the most recently created room renderer,
    // shared here at creation for the z-order-graph dump developer cheat
    __e2e_zGraph?: ItemZGraph<string, string>;
    // z-order-graph dump developer cheat: dumps __e2e_zGraph's text form to the
    // console and returns it; installed when the lazy cheats module loads
    __e2e_dumpZGraph?: () => string;
  }
}
