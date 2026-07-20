import { type Application } from "pixi.js";

import { type GameApi } from "./src/game/GameApi";
import { type ItemZGraph } from "./src/game/render/ItemRenderContexts";
import { type IndividualCharacterName } from "./src/model/modelTypes";
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
    // fast-forward the game simulation by a duration (ms) in one synchronous
    // burst, independent of the ticker - usable while the game speed is zero
    // to play out a scenario setup (falling items, expiring floating text)
    // deterministically.
    __e2e_fastForwardMs?: (ms: number) => void;
    // swop the active character to a named one (head/heels) via the swop mutator
    // directly - usable while the game speed is zero, where the input-driven
    // swop (read only inside the speed-scaled physics tick) can never fire
    __e2e_swopCharacter?: (name: IndividualCharacterName) => void;
    // always set (not just in visual-regression builds) for pixi devtools;
    // e2e tests walk its stage to read render-world ground truth
    __PIXI_APP__?: Application;
  }
}
