import { Application } from "pixi.js";
import type { CampaignLocator } from "../model/modelTypes";
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
  selectSaveForCampaign,
} from "../store/slices/gameMenusSlice";
import type { SavedGameState } from "./gameState/saving/SavedGameState";
import { selectCurrentRoomState } from "./gameState/gameStateSelectors/selectCurrentRoomState";
import { maxFps } from "./physics/mechanicsConstants";
import { stopAppAutoRendering } from "../utils/pixi/stopAppAutoRendering";
import { trackTextures } from "../textureInspector/main";
import { loadCampaignFromApi } from "../store/slices/campaigns/campaignApiHelpers";

TextureStyle.defaultOptions.scaleMode = "nearest";

/**
 * If you came from GamePage, we are now outside of React-land
 * - pure pixi/openGl game engine!
 */
export const gameMain = async <RoomId extends string>(
  campaignLocator: CampaignLocator,
  inputStateTracker: InputStateTrackerInterface,
): Promise<GameApi<RoomId>> => {
  const app = new Application();

  const [campaignResult] = await Promise.all([
    loadCampaignFromApi<RoomId>(campaignLocator),
    app.init({
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
    }),
  ]);

  if (campaignResult.error) {
    throw new Error("could not load campaign", { cause: campaignResult.error });
  }
  const campaign = campaignResult.data;

  trackTextures(app);

  stopAppAutoRendering(app);
  app.ticker.maxFPS = maxFps;

  const savedGameToContinueFrom = selectSaveForCampaign<RoomId>(
    store.getState(),
    campaignLocator,
  );

  const gameState = loadGameState({
    campaign,
    inputStateTracker,
    savedGame: savedGameToContinueFrom,
  });
  if (savedGameToContinueFrom !== undefined) {
    const savedGameInPlay = savedGameToContinueFrom.store.gameMenus.gameInPlay;
    store.dispatch(gameRestoreFromSave(savedGameInPlay));
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
