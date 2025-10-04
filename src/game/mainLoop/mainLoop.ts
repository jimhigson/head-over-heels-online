import type { Application, Filter, Ticker } from "pixi.js";

import {
  BloomFilter,
  ColorAdjustmentFilter,
  CurvatureFilter,
  NoiseFilter,
  PhosphorMaskFilter,
  RaiseBlackPointFilter,
  ScanlinesFilter,
  VignetteFilter,
} from "@blockstacking/jims-shaders";
import { Container, Rectangle } from "pixi.js";

import type { Upscale } from "../../store/slices/upscale/Upscale";
import type { GameState } from "../gameState/GameState";
import type { RoomRenderContextInGame } from "../render/RoomRenderContexts";
import type { RoomRendererType } from "../render/RoomRendererType";

import { audioCtx } from "../../sound/audioCtx";
import { defaultUserSettings } from "../../store/slices/gameMenus/defaultUserSettings";
import {
  selectInputDirectionMode,
  selectIsPaused,
  selectShouldRenderOnScreenControls,
} from "../../store/slices/gameMenus/gameMenusSelectors";
import {
  type DisplaySettings,
  errorCaught,
  selectHasError,
} from "../../store/slices/gameMenus/gameMenusSlice";
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
  { crtFilter: crtFilterDisplaySetting }: DisplaySettings,
  upscale: Upscale,
): Filter[] => {
  // darken initially, then re-lighten at the end. This helps some detail
  // to be added into very light areas by compressing the dynamic range initially,
  // giving the pipeline some headroom to go into
  const inPipelineBrightness = 0.8;

  const crtFilterEnabled =
    crtFilterDisplaySetting ?? defaultUserSettings.displaySettings.crtFilter;

  if (!crtFilterEnabled) {
    // this settings as false or undefined means no CRT filter
    return noFilters;
  }

  return [
    new ColorAdjustmentFilter({
      brightness: inPipelineBrightness,
    }),

    new NoiseFilter({ intensity: 0.03, fps: 29.97, scale: 5 }),

    // Scanlines and phosphor mask first (applied to flat image)
    new ScanlinesFilter({
      pixelHeight: upscale.gameEngineUpscale,
      gapBrightness: 0.66,
    }),

    new PhosphorMaskFilter({
      pixelWidth: upscale.gameEngineUpscale * 1.1,
      maskBrightness: 0.6,
      numSamples: 2,
      transitionWidth: 0.2,
    }),

    // selectively blur just fairly light items on a small, intense radius:
    new BloomFilter({
      radius: upscale.gameEngineUpscale / 4,
      intensity: 0.15,
      cutoff: 0.8,
      edgeBlur: 1,
    }),

    new VignetteFilter({
      intensity: 0.4,
      radius: 0.7,
    }),

    // Then curvature (curves everything including scanlines)
    new CurvatureFilter({
      curvatureX: 0.13,
      curvatureY: 0.12,
      multisampling: true,
    }),

    new RaiseBlackPointFilter({ blackPoint: 0.05 }),

    new ColorAdjustmentFilter({
      gamma: 1.1,
      saturation: 1.35,
      brightness: 1 / inPipelineBrightness,
      brightnessBottom: -0.1,
    }),
  ];
};

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
      freeCharacters: tickFreeCharacters,
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
    // the tick could end on a different room than it started on, eg if ticking
    // the physics caused the player to go through a door:
    const tickEndRoom = selectCurrentRoomState(this.gameState);

    const createNewRoomRenderer =
      this.#roomRenderer?.renderContext.room !== tickEndRoom ||
      this.#roomRenderer?.renderContext.general.upscale !== tickUpscale ||
      this.#roomRenderer?.renderContext.general.displaySettings !==
        tickDisplaySettings ||
      this.#roomRenderer?.renderContext.general.soundSettings !==
        tickSoundSettings ||
      this.#roomRenderer?.renderContext.general.paused !== isPaused;
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
          new RoomRenderer(roomRenderContext),
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
      progression: this.gameState.progression,
      movedItems,
      deltaMS,
    });

    timingStats?.endUpdateSceneGraph();

    try {
      timingStats?.startPixiRender();
      this.app.render();
      timingStats?.endPixiRender();
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
