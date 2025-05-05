import type { Application, Filter, Ticker } from "pixi.js";
import { Container } from "pixi.js";
import type { GameState } from "../gameState/GameState";
import { HudRenderer } from "../render/hud/HudRenderer";
import { progressGameState } from "./progressGameState";
import { RoomRenderer } from "../render/roomRenderer";
import { CRTFilter } from "pixi-filters/crt";
import { AdvancedBloomFilter } from "pixi-filters/advanced-bloom";
import { emptySet } from "../../utils/empty";
import { store } from "../../store/store";
import {
  selectInputDirectionMode,
  selectIsPaused,
  selectShouldRenderOnScreenControls,
} from "../../store/selectors";
import { defaultUserSettings } from "../../store/defaultUserSettings";
import {
  errorCaught,
  type DisplaySettings,
} from "../../store/slices/gameMenusSlice";
import { audioCtx } from "../../sound/audioCtx";
import { selectCurrentRoomState } from "../gameState/gameStateSelectors/selectCurrentRoomState";
import { progressWithSubTicks } from "./progressWithSubTicks";
import { maxSubTickDeltaMs } from "../physics/mechanicsConstants";
import { createSerialisableErrors } from "../../utils/redux/createSerialisableErrors";

const topLevelFilters = (
  { crtFilter }: DisplaySettings,
  paused: boolean,
): Filter[] => {
  return [
    crtFilter ?
      new CRTFilter({
        // this is only really being used for the vignette now, and could be
        // rewritten into a simpler filter:
        lineContrast: paused ? 0.3 : 0,
        vignetting: paused ? 0.4 : 0.2,
      })
    : undefined,
    crtFilter ?
      new AdvancedBloomFilter({
        threshold: 0.7,
        brightness: 0.9,
        bloomScale: 0.6,
        blur: 10,
      })
    : undefined,
  ].filter((f) => f !== undefined);
};

export class MainLoop<RoomId extends string> {
  #filtersWhenPaused!: Filter[];
  #filtersWhenUnpaused!: Filter[];
  #hudRenderer: HudRenderer<RoomId, string> | undefined;
  /**
   * room renderer can only be undefined if there is no current room - both
   * players have lost all lives
   */
  #roomRenderer: RoomRenderer<RoomId, string> | undefined;
  #worldGraphics: Container = new Container({
    label: "MainLoop/world",
  });
  #worldSound: AudioNode = audioCtx.createGain();
  #app: Application;
  #gameState: GameState<RoomId>;
  #physicsTicker = progressWithSubTicks(progressGameState, maxSubTickDeltaMs);

  constructor(
    private app: Application,
    gameState: GameState<RoomId>,
  ) {
    this.#app = app;
    this.#gameState = gameState;

    try {
      const storeState = store.getState();
      const {
        gameMenus: {
          upscale: { gameEngineUpscale },
        },
      } = storeState;

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
      const wrappedError = new Error("Error caught in main loop", {
        cause: thrown,
      });
      console.error(wrappedError);
      this.#handleError(wrappedError);
    }
  };

  private tick = ({ deltaMS }: Ticker): void => {
    const tickState = store.getState();
    const isPaused = selectIsPaused(tickState);
    const {
      gameMenus: {
        userSettings: {
          displaySettings: tickDisplaySettings,
          soundSettings: tickSoundSettings,
        },
        upscale: tickUpscale,
      },
    } = store.getState();

    const tickColourise =
      !isPaused &&
      !(
        tickDisplaySettings?.uncolourised ??
        defaultUserSettings.displaySettings.uncolourised
      );

    const tickOnScreenControls = selectShouldRenderOnScreenControls(tickState);
    const tickInputDirectionMode = selectInputDirectionMode(tickState);
    if (
      this.#hudRenderer?.renderContext.colourise !== tickColourise ||
      this.#hudRenderer?.renderContext.onScreenControls !==
        tickOnScreenControls ||
      this.#hudRenderer?.renderContext.inputDirectionMode !==
        tickInputDirectionMode
    ) {
      this.#hudRenderer?.destroy();
      this.#hudRenderer = new HudRenderer({
        colourise: tickColourise,
        gameState: this.#gameState,
        inputDirectionMode: tickInputDirectionMode,
        onScreenControls: tickOnScreenControls,
      });
      this.#app.stage.addChild(this.#hudRenderer.output);
    }

    const tickStartRoom = selectCurrentRoomState(this.#gameState);
    this.#hudRenderer.tick({
      screenSize: tickUpscale.gameEngineScreenSize,
      room: tickStartRoom,
    });

    // note that progressing the game state can change/reload the room,
    // so we need to do this before considering recreating the room renderer
    const movedItems =
      isPaused ? emptySet : this.#physicsTicker(this.#gameState, deltaMS);

    // the tick could end on a different room than it started on:
    const tickEndRoom = selectCurrentRoomState(this.#gameState);

    if (
      // for several things that change infrequently, we don't bother to try to adjust the room scene
      // graph if it changes - we simply destroy and recreate it entirely:
      this.#roomRenderer?.renderContext.room !== tickEndRoom ||
      this.#roomRenderer?.renderContext.upscale !== tickUpscale ||
      this.#roomRenderer?.renderContext.displaySettings !==
        tickDisplaySettings ||
      this.#roomRenderer?.renderContext.soundSettings !== tickSoundSettings ||
      this.#roomRenderer?.renderContext.paused !== isPaused
    ) {
      this.#roomRenderer?.destroy();

      if (tickEndRoom) {
        this.#roomRenderer = new RoomRenderer({
          gameState: this.#gameState,
          room: tickEndRoom,
          paused: isPaused,
          pixiRenderer: this.#app.renderer,
          displaySettings: tickDisplaySettings,
          soundSettings: tickSoundSettings,
          colourised: tickColourise,
          upscale: tickUpscale,
        });
        this.#worldGraphics.addChild(this.#roomRenderer.output.graphics);
        this.#roomRenderer.output.sound?.connect(this.#worldSound);
        // this isn't the ideal place to emit this from - it gets fired even if just the
        // display settings change. but only the cheats needs this currently
        this.#gameState.events.emit("roomChange", tickEndRoom.id);
      } else {
        this.#roomRenderer = undefined;
      }

      this.#app.stage.scale = tickUpscale.gameEngineUpscale;
      this.#initFilters();
    }

    // the room renderer runs even while paused - it is its responsibility to
    // exit quickly when nothing has changed
    this.#roomRenderer?.tick({
      progression: this.#gameState.progression,
      movedItems,
      deltaMS,
    });

    if (!isPaused) {
      this.#app.stage.filters = this.#filtersWhenUnpaused;
    } else {
      this.#app.stage.filters = this.#filtersWhenPaused;
    }
  };

  start() {
    this.#app.ticker.add(this.tickAndCatch);
    return this;
  }
  stop() {
    this.#app.stage.removeChild(this.#worldGraphics);
    this.#worldSound.disconnect();
    this.#roomRenderer?.destroy();
    this.#hudRenderer?.destroy();
    this.#app.ticker.remove(this.tickAndCatch);
  }
}
