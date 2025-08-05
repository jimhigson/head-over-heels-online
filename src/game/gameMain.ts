import { Application } from "pixi.js";
import { type Campaign } from "../model/modelTypes";
import { changeCharacterRoom } from "./gameState/mutators/changeCharacterRoom";
import { loadGameState } from "./gameState/loadGameState";
import type { GameApi } from "./GameApi";
import { selectCurrentPlayableItem } from "./gameState/gameStateSelectors/selectPlayableItem";
import { MainLoop } from "./mainLoop/mainLoop";
import type { Xy } from "../utils/vectors/vectors";
import { TextureStyle } from "pixi.js";

import "pixi.js/advanced-blend-modes";
import type { InputStateTrackerInterface } from "./input/InputStateTracker";
import { store } from "../store/store";
import {
  gameRestoreFromSave,
  roomExplored,
} from "../store/slices/gameMenusSlice";
import type { SavedGameState } from "./gameState/saving/SavedGameState";
import { selectCurrentRoomState } from "./gameState/gameStateSelectors/selectCurrentRoomState";
import { maxFps } from "./physics/mechanicsConstants";
import { stopAppAutoRendering } from "../utils/pixi/stopAppAutoRendering";
import { typedURLSearchParams } from "../options/queryParams";
import { trackTextures } from "../textureInspector/main";

TextureStyle.defaultOptions.scaleMode = "nearest";

/**
 * we are now outside of React-land - pure pixi game engine!
 */
export const gameMain = async <RoomId extends string>(
  campaign: Campaign<RoomId>,
  inputStateTracker: InputStateTrackerInterface,
): Promise<GameApi<RoomId>> => {
  const app = new Application();

  await app.init({
    background: "#000000",
    // run on the shared ticker to keep in sync with the input state tracker
    sharedTicker: true,
    eventFeatures: {
      // https://pixijs.com/8.x/guides/components/interaction
      // this is needed for the on-screen controls:
      move: true,
      globalMove: true,
      click: true,
      wheel: false,
    },
    // I will have to tell pixi.js when to render:
    autoStart: false,
    // the ColourClash filter requires a backbuffer (although this is
    // only used when not colourised)
    useBackBuffer: true,
  });

  trackTextures(app);

  stopAppAutoRendering(app);
  app.ticker.maxFPS = maxFps;

  const noSaves = typedURLSearchParams().get("noSaves");

  const savedGameToContinueFrom =
    noSaves ? undefined : (
      (store.getState().gameMenus.currentGame as
        | SavedGameState<RoomId>
        | undefined)
    );

  const gameState = loadGameState({
    campaign,
    inputStateTracker,
    savedGame: savedGameToContinueFrom,
  });
  if (savedGameToContinueFrom !== undefined) {
    store.dispatch(
      gameRestoreFromSave(savedGameToContinueFrom.store.gameMenus),
    );
  } else {
    // starting a new game - the player has at least explored the rooms they start in:
    if (gameState.characterRooms.head)
      store.dispatch(roomExplored(gameState.characterRooms.head.id));
    if (gameState.characterRooms.heels)
      store.dispatch(roomExplored(gameState.characterRooms.heels.id));
  }

  const loop = new MainLoop(app, gameState).start();

  return {
    campaign,
    renderIn(containerElement) {
      containerElement.appendChild(app.canvas);
    },
    resizeTo(newSize: Xy) {
      console.log("explicitly setting app renderer size to", newSize);
      // app.resizeTo is not very reliable - it only resizes if the window resizes. That's usually
      // fine, but if the upscale changes without a window resize it can mean that we get the wrong size initially
      // instead - be explicit about it:
      app.renderer?.resize(newSize.x, newSize.y);
    },
    changeRoom(roomId: RoomId) {
      const currentPlayable = selectCurrentPlayableItem(gameState);
      if (currentPlayable === undefined) {
        return;
      }
      changeCharacterRoom({
        playableItem: currentPlayable,
        gameState,
        toRoomId: roomId,
        changeType: "level-select",
      });
    },
    get currentRoom() {
      return selectCurrentRoomState(gameState);
    },
    get gameState() {
      return gameState;
    },
    reincarnateFrom(savedGame: SavedGameState<RoomId>) {
      loadGameState({
        campaign,
        inputStateTracker,
        savedGame,
        writeInto: gameState,
      });
    },
    stop() {
      console.warn("tearing down game");
      app.canvas.parentNode?.removeChild(app.canvas);
      loop.stop();
      app.destroy();
    },
  };
};

export default gameMain;
