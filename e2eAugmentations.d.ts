import { type Application } from "pixi.js";

import { type EditorE2eApi } from "./src/editor/RoomEditingArea/useEditorE2eApi";
import { type GameApi } from "./src/game/GameApi";
import { type PlayableItem } from "./src/game/physics/itemPredicates";
import {
  type CharacterName,
  type IndividualCharacterName,
} from "./src/model/modelTypes";
import { type AppStore } from "./src/store/store";

declare global {
  interface Window {
    // put the store on the window for e2e tests to use
    _e2e_store?: AppStore;
    // put the gameApi on the window for e2e tests to use
    _e2e_gamePageGameAi?: GameApi<string>;
    // the level editor's handle for e2e tests: converts world positions to page
    // coordinates, and reports what the pointer resolved to
    _e2e_editor?: EditorE2eApi;
    // put the pixi application on the window for e2e tests to use
    _e2e_pixiApplication?: Application;
    // always set (not just in visual-regression builds) for pixi devtools;
    // e2e tests walk its stage to read render-world ground truth
    __PIXI_APP__?: Application;
    // camera-angle developer tool: hold the camera at any angle (degrees
    // anticlockwise from the base view)
    __e2e_holdCameraAtDegrees?: (degrees: number) => void;
    // fast-forward the game simulation by a duration (ms) in one synchronous
    // burst, independent of the ticker - usable while the game speed is zero
    // to play out a scenario setup (falling items, expiring floating text)
    // deterministically.
    __e2e_fastForwardMs?: (ms: number) => void;
    // swop the active character to a named one (head/heels) via the swop mutator
    // directly - usable while the game speed is zero, where the input-driven
    // swop (read only inside the speed-scaled physics tick) can never fire
    __e2e_swopCharacter?: (name: IndividualCharacterName) => void;
    // the item the player is currently controlling, via the same selector the
    // game itself uses - so specs querying it inside the browser don't walk the
    // room's items themselves
    __e2e_currentPlayable?: () =>
      PlayableItem<CharacterName, string, string> | undefined;
  }
}
