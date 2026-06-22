import { Application, TextureStyle, type WebGLRenderer } from "pixi.js";

import { type CampaignLocator } from "../model/modelTypes";
import { loadSoundCategory } from "../sound/soundsLoader";
import { SpritesheetVariants } from "../sprites/spritesheet/variants/SpritesheetVariants";
import { loadCampaignFromApi } from "../store/slices/campaigns/campaignApiHelpers";
import {
  gameRestoreFromSave,
  roomExplored,
} from "../store/slices/gameInPlay/gameInPlaySlice";
import { selectSaveForCampaign } from "../store/slices/savedGames/savedGamesSlice";
import { store } from "../store/store";
import { trackTextures } from "../textureInspector/trackTextures";
import { stopAppAutoRendering } from "../utils/pixi/stopAppAutoRendering";
import { type Xy } from "../utils/vectors/vectors";
import { type GameApi } from "./GameApi";
import { selectCurrentRoomState } from "./gameState/gameStateSelectors/selectCurrentRoomState";
import { selectCurrentPlayableItem } from "./gameState/gameStateSelectors/selectPlayableItem";
import { loadGameState } from "./gameState/loadGameState";
import { changeCharacterRoom } from "./gameState/mutators/changeCharacterRoom";
import { type SavedGame } from "./gameState/saving/SavedGameState";
import { type InputStateTrackerInterface } from "./input/InputStateTracker";
import { MainLoop } from "./mainLoop/MainLoop";

TextureStyle.defaultOptions.scaleMode = "nearest";

/**
 * If you came from GamePage, we are now outside of React-land
 * - pure pixi/openGl game engine!
 */
export const gameMain = async <RoomId extends string>(
  campaignLocator: CampaignLocator,
  inputStateTracker: InputStateTrackerInterface,
): Promise<GameApi<RoomId>> => {
  const app = new Application<WebGLRenderer>();
  // the spritesheet variants are owned by game main, when the game is torn down they are
  // destroyed along with the Pixi Application that they belong to. This prevents the reuse of
  // assets used in one application in another, which can mean reclaimed resources trying to
  // be reused and cause missing textures in-game
  const spritesheetVariants = new SpritesheetVariants();

  const [campaignResult] = await Promise.all([
    loadCampaignFromApi<RoomId>(campaignLocator),
    loadSoundCategory("requiredForGameplay"),
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

  /**
   * put the canvas into p3 without any other changes of the colours used. This will cause colour shifts from
   * the raw spritesheet since I'm editing in an editor that doesn't support p3. However, the hue changes aren't
   * very dramatic, and the increased vibrancy looks nice for a retro game
   */
  app.renderer.gl.drawingBufferColorSpace = "display-p3";

  if (campaignResult.error) {
    // rebuild the error array (flattened to be serialisable for the redux store)
    // back into a linked cause chain of Errors:
    const cause = campaignResult.error.reduceRight<Error | undefined>(
      (innerCause, { message, stack }) => {
        const error = new Error(message, { cause: innerCause });
        error.stack = stack;
        return error;
      },
      undefined,
    );
    throw new Error(
      `could not load campaign ${JSON.stringify(campaignLocator)}`,
      { cause },
    );
  }
  const campaign = campaignResult.data;

  if (import.meta.env.DEV) {
    trackTextures(app);
  }

  stopAppAutoRendering(app);

  // only put on window after initialised and maxFPS set - this ensures it can also be
  // overwritten
  if (import.meta.env.MODE === "visual-regression") {
    window._e2e_pixiApplication = app;
  }
  // add for pixi dev tools:
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).__PIXI_APP__ = app;

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
    const savedGameInPlay = savedGameToContinueFrom.gameInPlay;
    store.dispatch(gameRestoreFromSave(savedGameInPlay));
  } else {
    // starting a new game - the player has at least explored the rooms they start in:
    if (gameState.characterRooms.head) {
      store.dispatch(roomExplored(gameState.characterRooms.head.id));
    }
    if (gameState.characterRooms.heels) {
      store.dispatch(roomExplored(gameState.characterRooms.heels.id));
    }
  }

  const loop = new MainLoop(app, gameState, spritesheetVariants).start();

  return {
    campaign,
    renderIn(containerElement) {
      containerElement.appendChild(app.canvas);
    },
    resizeTo(newSize: Xy, rot90: boolean) {
      // app.resizeTo is not very reliable - it only resizes if the window resizes. That's usually
      // fine, but if the upscale changes without a window resize it can mean that we get the wrong size initially
      // instead - be explicit about it:
      if (rot90) {
        // app.renderer can be null (despite what pixi types say) if the game was just reset
        // via the options menu 'reset all'
        app.renderer?.resize(newSize.y, newSize.x);
      } else {
        app.renderer?.resize(newSize.x, newSize.y);
      }
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
    reincarnateFrom(savedGame: SavedGame<RoomId>) {
      loadGameState({
        campaign,
        inputStateTracker,
        savedGame,
        writeInto: gameState,
      });
    },
    loseWebGlContext() {
      // the raw extension (not pixi's forceContextLoss) keeps this on pixi's
      // involuntary-loss path, so pixi won't self-restore - mimicking a real
      // driver reset. Restore after a perceptible gap to simulate a transient
      // loss the browser recovers from, firing webglcontextrestored ->
      // contextChange:
      const loseContextExtension =
        app.renderer.gl.getExtension("WEBGL_lose_context");
      loseContextExtension?.loseContext();
      setTimeout(() => {
        loseContextExtension?.restoreContext();
      }, 50);
    },
    stop() {
      console.warn("tearing down game");
      app.canvas.parentNode?.removeChild(app.canvas);
      loop.stop();
      // destroy the baked spritesheet RenderTextures while the renderer is still
      // alive, before it goes with the app:
      spritesheetVariants.destroy();
      app.destroy();
    },
  };
};

export default gameMain;
