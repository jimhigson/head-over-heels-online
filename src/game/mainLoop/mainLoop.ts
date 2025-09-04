import type { Application, Filter, Ticker } from "pixi.js";

import { Container } from "pixi.js";

import type { GameState } from "../gameState/GameState";
import type { RoomRenderContextInGame } from "../render/RoomRenderContexts";
import type { RoomRendererType } from "../render/RoomRendererType";

import { audioCtx } from "../../sound/audioCtx";
import { defaultUserSettings } from "../../store/defaultUserSettings";
import {
  selectInputDirectionMode,
  selectIsPaused,
  selectShouldRenderOnScreenControls,
} from "../../store/selectors";
import {
  type DisplaySettings,
  errorCaught,
  selectHasError,
} from "../../store/slices/gameMenusSlice";
import { selectGameEngineUpscale } from "../../store/slices/upscale/upscaleSlice";
import { store } from "../../store/store";
import { emptySet } from "../../utils/empty";
import { createSerialisableErrors } from "../../utils/redux/createSerialisableErrors";
import { selectCurrentRoomState } from "../gameState/gameStateSelectors/selectCurrentRoomState";
import { maxSubTickDeltaMs } from "../physics/mechanicsConstants";
import { noFilters } from "../render/filters/standardFilters";
import { HudRenderer } from "../render/hud/HudRenderer";
import { RoomRenderer } from "../render/roomRenderer";
import { RoomScrollRenderer } from "../render/RoomScrollRenderer";
import { getTimingStats } from "./FrameTimingStats";
import { progressGameState } from "./progressGameState";
import { progressWithSubTicks } from "./progressWithSubTicks";

const topLevelFilters = (
  _displaySettings: DisplaySettings,
  _paused: boolean,
): Filter[] => {
  // TODO: crt filter here if displaySettings allows it, but the old one
  // looked bad so disabled it for now
  return noFilters;
};

export class MainLoop<RoomId extends string> {
  #filtersWhenPaused!: Filter[];
  #filtersWhenUnpaused!: Filter[];
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

      this.#initFilters();
    } catch (e) {
      this.#handleError(e);
      return;
    }
  }

  #handleError(thrown: unknown) {
    console.error(thrown);
    store.dispatch(errorCaught(createSerialisableErrors(thrown)));
  }

  #initFilters() {
    const {
      gameMenus: {
        userSettings: { displaySettings },
      },
    } = store.getState();

    this.#filtersWhenPaused = topLevelFilters(displaySettings, true);
    this.#filtersWhenUnpaused = topLevelFilters(displaySettings, false);
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
    const timingStats = getTimingStats();
    const tickState = store.getState();

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
      },
      upscale: { upscale: tickUpscale },
    } = store.getState();

    const tickColourise =
      !isPaused &&
      !(
        tickDisplaySettings?.uncolourised ??
        defaultUserSettings.displaySettings.uncolourised
      );

    // render hud start
    timingStats?.startHudUpdate();
    const tickOnScreenControls = selectShouldRenderOnScreenControls(tickState);
    const tickInputDirectionMode = selectInputDirectionMode(tickState);
    if (
      this.#hudRenderer?.renderContext.general.colourised !== tickColourise ||
      this.#hudRenderer?.renderContext.onScreenControls !==
        tickOnScreenControls ||
      this.#hudRenderer?.renderContext.inputDirectionMode !==
        tickInputDirectionMode
    ) {
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

    const tickStartRoom = selectCurrentRoomState(this.gameState);
    this.#hudRenderer.tick({
      screenSize: tickUpscale.gameEngineScreenSize,
      room: tickStartRoom,
      deltaMS,
    });
    // render hud end
    timingStats?.endHudUpdate();

    // note that progressing the game state can change/reload the room,
    // so we need to tick physics considering recreating the room renderer
    timingStats?.startPhysics();
    const movedItems =
      isPaused ? emptySet : this.#physicsTicker(this.gameState, deltaMS);
    timingStats?.endPhysics();

    timingStats?.startUpdateSceneGraph();
    // the tick could end on a different room than it started on:
    const tickEndRoom = selectCurrentRoomState(this.gameState);

    if (
      // for several things that change infrequently, we don't bother to try to adjust the room scene
      // graph if it changes - we simply destroy and recreate it entirely:
      this.#roomRenderer?.renderContext.room !== tickEndRoom ||
      this.#roomRenderer?.renderContext.general.upscale !== tickUpscale ||
      this.#roomRenderer?.renderContext.general.displaySettings !==
        tickDisplaySettings ||
      this.#roomRenderer?.renderContext.general.soundSettings !==
        tickSoundSettings ||
      this.#roomRenderer?.renderContext.general.paused !== isPaused
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
          new RoomRenderer(roomRenderContext),
        );
        this.#worldGraphics.addChild(this.#roomRenderer.output.graphics);
        this.#roomRenderer.output.sound?.connect(this.#worldSound);
      } else {
        this.#roomRenderer = undefined;
      }

      this.app.stage.scale = tickUpscale.gameEngineUpscale;
      this.#initFilters();
    }

    // the room renderer runs even while paused - it is its responsibility to
    // exit quickly when nothing has changed

    this.#roomRenderer?.tick({
      progression: this.gameState.progression,
      movedItems,
      deltaMS,
    });

    if (!isPaused) {
      this.app.stage.filters = this.#filtersWhenUnpaused;
    } else {
      this.app.stage.filters = this.#filtersWhenPaused;
    }
    timingStats?.endUpdateSceneGraph();

    try {
      timingStats?.startPixiRender();
      this.app.render();
      timingStats?.endPixiRender();
    } catch (e) {
      throw new Error("Error in Pixi.js app.render()", { cause: e });
    }

    timingStats?.tickDone();
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
