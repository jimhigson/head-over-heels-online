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
    // https://pixijs.com/8.x/guides/components/interaction
    eventFeatures: {
      move: true,
      globalMove: true,
      click: true,
      wheel: false,
    },
  });

  const savedGameToContinueFrom = store.getState().gameMenus
    .currentGame as SavedGameState<RoomId>;

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
    store.dispatch(roomExplored(gameState.characterRooms.head!.id));
    store.dispatch(roomExplored(gameState.characterRooms.heels!.id));
  }

  const loop = new MainLoop(app, gameState).start();

  return {
    campaign,
    events: gameState.events,
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
