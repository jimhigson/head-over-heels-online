import type { Application, Ticker } from "pixi.js";

import { Container, Rectangle } from "pixi.js";

import type { GameState } from "../gameState/GameState";
import type { RoomRenderContextInGame } from "../render/room/RoomRenderContexts";
import type { RoomRendererType } from "../render/room/RoomRendererType";

import { audioCtx } from "../../sound/audioCtx";
import { defaultUserSettings } from "../../store/slices/gameMenus/defaultUserSettings";
import {
  selectInputDirectionMode,
  selectIsPaused,
  selectShouldRenderOnScreenControls,
  selectShowFps,
} from "../../store/slices/gameMenus/gameMenusSelectors";
import {
  errorCaught,
  selectHasError,
} from "../../store/slices/gameMenus/gameMenusSlice";
import { selectGameEngineUpscale } from "../../store/slices/upscale/upscaleSlice";
import { store } from "../../store/store";
import { emptySet } from "../../utils/empty";
import { validateSceneGraph } from "../../utils/pixi/validateSceneGraph";
import { createSerialisableErrors } from "../../utils/redux/createSerialisableErrors";
import { selectCurrentRoomState } from "../gameState/gameStateSelectors/selectCurrentRoomState";
import { maxFps, maxSubTickDeltaMs } from "../physics/mechanicsConstants";
import { HudRenderer } from "../render/hud/HudRenderer";
import { needsNewHudRenderer } from "../render/hud/needsNewHudRenderer";
import { needsNewRoomRenderer } from "../render/room/needsNewRoomRenderer";
import { RoomRenderer } from "../render/room/roomRenderer";
import { RoomScrollRenderer } from "../render/room/RoomScrollRenderer";
import { TeleportEffectRenderer } from "../render/TeleportEffectRenderer";
import { frameTimingStats } from "./frameTiming/FrameTimingStats";
import { textInterfaceToShowDetailedFrameTiming } from "./frameTiming/logFrameTimingStats";
import { progressGameState } from "./progressGameState";
import { progressWithSubTicks } from "./progressWithSubTicks";
import { tickSpritesheetVariants } from "./tickSpritesheetVariants";
import { topLevelFilters } from "./topLevelFilters";

textInterfaceToShowDetailedFrameTiming();

export class MainLoop<RoomId extends string> {
  #hudRenderer: HudRenderer<RoomId, string> | undefined;
  /**
   * room renderer can only be undefined if there is no current room - both
   * players have lost all lives
   */
  #roomRenderer: RoomRendererType<RoomId, string> | undefined;
  #worldGraphics: Container = new Container({
    label: "MainLoop/world",
  });
  #worldSound: AudioNode = audioCtx.createGain();
  #physicsTicker = progressWithSubTicks(progressGameState, maxSubTickDeltaMs);

  constructor(
    private app: Application,
    private gameState: GameState<RoomId>,
  ) {
    try {
      const storeState = store.getState();

      const gameEngineUpscale = selectGameEngineUpscale(storeState);

      this.#worldSound.connect(audioCtx.destination);
      app.stage.addChild(this.#worldGraphics);
      app.stage.scale = gameEngineUpscale;

      const startingRoom = selectCurrentRoomState(gameState);
      if (startingRoom === undefined) {
        throw new Error("main loop with no starting room");
      }

      this.#initTopLevelFilters();
    } catch (e) {
      this.#handleError(e);
      return;
    }
  }

  #handleError(thrown: unknown) {
    console.error(thrown);
    store.dispatch(errorCaught(createSerialisableErrors(thrown)));
  }

  #initTopLevelFilters() {
    const {
      gameMenus: {
        userSettings: { displaySettings },
      },
      upscale: { upscale },
    } = store.getState();

    this.app.stage.filters = topLevelFilters(displaySettings, upscale);
  }

  private tickAndCatch = (
    options: Parameters<InstanceType<typeof MainLoop>["tick"]>[0],
  ): void => {
    try {
      this.tick(options);
    } catch (thrown) {
      const wrappedError = new Error("Error caught in main loop tick", {
        cause: thrown,
      });
      this.#handleError(wrappedError);
    }
  };

  private tick = ({ deltaMS }: Ticker): void => {
    const tickState = store.getState();
    const timingRecord =
      selectShowFps(tickState) ? frameTimingStats : undefined;

    if (selectHasError(tickState)) {
      // if there is an error, we don't want to tick the game state
      // as it will probably cause the same error again - do not tick
      // until the error is dismissed
      return;
    }

    const isPaused = selectIsPaused(tickState);
    const {
      gameMenus: {
        userSettings: {
          displaySettings: tickDisplaySettings,
          soundSettings: tickSoundSettings,
        },
        gameInPlay: { freeCharacters: tickFreeCharacters },
      },
      upscale: { upscale: tickUpscale },
    } = store.getState();

    const tickColourise =
      !isPaused &&
      !(
        tickDisplaySettings?.uncolourised ??
        defaultUserSettings.displaySettings.uncolourised
      );

    // note that progressing the game state can change/reload the room,
    // so we need to tick physics considering recreating the room renderer
    timingRecord?.startPhysics();
    const movedItems =
      isPaused ? emptySet : this.#physicsTicker(this.gameState, deltaMS);
    timingRecord?.endPhysics();

    timingRecord?.startUpdateSceneGraph();
    // the tick could end on a different room than it started on, eg if ticking
    // the physics caused the player to go through a door:
    const tickEndRoom = selectCurrentRoomState(this.gameState);

    const roomChanged = this.#roomRenderer?.renderContext.room !== tickEndRoom;
    if (
      (roomChanged ||
        tickColourise !==
          this.#roomRenderer?.renderContext.general.colourised) &&
      tickEndRoom !== undefined
    ) {
      tickSpritesheetVariants(
        this.app.renderer,
        tickColourise,
        tickEndRoom.planet,
        tickEndRoom.color,
      );
    }

    // render hud start
    timingRecord?.startHudUpdate();
    const tickOnScreenControls = selectShouldRenderOnScreenControls(tickState);
    const tickInputDirectionMode = selectInputDirectionMode(tickState);

    const createNewHudRenderer = needsNewHudRenderer(
      this.#hudRenderer,
      tickColourise,
      tickOnScreenControls,
      tickInputDirectionMode,
    );

    if (createNewHudRenderer) {
      this.#hudRenderer?.destroy();
      this.#hudRenderer = new HudRenderer({
        general: {
          gameState: this.gameState,
          paused: isPaused,
          pixiRenderer: this.app.renderer,
          displaySettings: tickDisplaySettings,
          soundSettings: tickSoundSettings,
          colourised: tickColourise,
          upscale: tickUpscale,
          editor: false,
        },

        inputDirectionMode: tickInputDirectionMode,
        onScreenControls: tickOnScreenControls,
      });
      this.app.stage.addChild(this.#hudRenderer.output);
    }

    this.#hudRenderer!.tick({
      screenSize: tickUpscale.gameEngineScreenSize,
      deltaMS,
      room: tickEndRoom,
      freeCharacters: tickFreeCharacters,
    });
    timingRecord?.endHudUpdate();
    // render hud end

    const createNewRoomRenderer = needsNewRoomRenderer(
      this.#roomRenderer,
      roomChanged,
      tickUpscale,
      tickDisplaySettings,
      tickSoundSettings,
      isPaused,
    );
    if (
      // for several things that change infrequently, we don't bother to try to adjust the room scene
      // graph if it changes - we simply destroy and recreate it entirely:
      createNewRoomRenderer
    ) {
      this.#roomRenderer?.destroy();

      if (tickEndRoom) {
        const roomRenderContext: RoomRenderContextInGame<RoomId, string> = {
          general: {
            gameState: this.gameState,
            paused: isPaused,
            pixiRenderer: this.app.renderer,
            displaySettings: tickDisplaySettings,
            soundSettings: tickSoundSettings,
            colourised: tickColourise,
            upscale: tickUpscale,
            editor: false,
          },
          room: tickEndRoom,
        };
        this.#roomRenderer = new RoomScrollRenderer(
          roomRenderContext,
          new TeleportEffectRenderer(
            roomRenderContext,
            new RoomRenderer(roomRenderContext),
          ),
        );
        this.#worldGraphics.addChild(this.#roomRenderer.output.graphics);
        this.#roomRenderer.output.sound?.connect(this.#worldSound);
      } else {
        this.#roomRenderer = undefined;
      }

      this.app.stage.scale = tickUpscale.gameEngineUpscale;
      this.#initTopLevelFilters();

      // setting static boundsArea helps if a filter is put over the whole output container, since the bounds of the
      // container won't change. Eg, a lift going vertically up into a screen y-coord where previously nothing was
      // rendered does not stretch the container upwards
      this.app.stage.boundsArea = new Rectangle(
        0,
        0,
        tickUpscale.gameEngineScreenSize.x,
        tickUpscale.gameEngineScreenSize.y,
      );
    }

    // the room renderer runs even while paused - it is its responsibility to
    // exit quickly when nothing has changed

    this.#roomRenderer?.tick({
      movedItems,
      deltaMS,
    });

    timingRecord?.endUpdateSceneGraph();

    if (import.meta.env.DEV) {
      validateSceneGraph(this.app.stage);
    }

    try {
      timingRecord?.startPixiRender();
      this.app.render();
      timingRecord?.endPixiRender();
      if (createNewRoomRenderer && tickEndRoom) {
        const event = new CustomEvent("firstRenderOfRoom", {
          detail: { roomId: tickEndRoom.id },
        });
        // for playwright:
        window.dispatchEvent(event);
      }
    } catch (e) {
      throw new Error("Error in Pixi.js app.render()", { cause: e });
    }

    timingRecord?.tickDone();

    // throttle framerate when paused to reduce CPU/GPU load (nothing is moving anyway)
    this.app.ticker.maxFPS = isPaused ? 10 : maxFps;
  };

  start() {
    this.app.ticker.add(this.tickAndCatch);
    return this;
  }
  stop() {
    this.app.stage.removeChild(this.#worldGraphics);
    this.#worldSound.disconnect();
    this.#roomRenderer?.destroy();
    this.#hudRenderer?.destroy();
    this.app.ticker.remove(this.tickAndCatch);
  }
}
