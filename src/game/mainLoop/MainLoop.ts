import { type Application, Container, Rectangle, type Ticker } from "pixi.js";

import { audioCtx } from "../../sound/audioCtx";
import { spritesheetMetaForOption } from "../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { type SpritesheetVariants } from "../../sprites/spritesheet/variants/SpritesheetVariants";
import {
  selectInputDirectionMode,
  selectIsPaused,
  selectShouldRenderOnScreenControls,
  selectShowFps,
  selectSpritesOption,
} from "../../store/slices/gameMenus/gameMenusSelectors";
import {
  errorCaught,
  selectHasError,
} from "../../store/slices/gameMenus/gameMenusSlice";
import { type Upscale } from "../../store/slices/upscale/Upscale";
import { selectGameEngineUpscale } from "../../store/slices/upscale/upscaleSlice";
import { spriteOptionEquals } from "../../store/slices/userSettings/spriteOptionEquals";
import { type SpriteOption } from "../../store/slices/userSettings/userSettingsSlice";
import { store } from "../../store/store";
import { emptySet } from "../../utils/empty";
import { validateSceneGraph } from "../../utils/pixi/validateSceneGraph";
import { createSerialisableErrors } from "../../utils/redux/createSerialisableErrors";
import { type GameState } from "../gameState/GameState";
import { selectCurrentRoomState } from "../gameState/gameStateSelectors/selectCurrentRoomState";
import { maxFps, maxSubTickDeltaMs } from "../physics/mechanicsConstants";
import { ColourClashCircleEffectRenderer } from "../render/ColourClashCircleEffectRenderer";
import { HudRenderer } from "../render/hud/HudRenderer";
import { needsNewHudRenderer } from "../render/hud/needsNewHudRenderer";
import { needsNewRoomRenderer } from "../render/room/needsNewRoomRenderer";
import { type RoomRenderContextInGame } from "../render/room/RoomRenderContexts";
import { RoomRenderer } from "../render/room/RoomRenderer";
import { type RoomRendererType } from "../render/room/RoomRendererType";
import { RoomScrollRenderer } from "../render/room/RoomScrollRenderer";
import { frameTimingStats } from "./frameTiming/FrameTimingStats";
import { textInterfaceToShowDetailedFrameTiming } from "./frameTiming/textInterfaceToShowDetailedFrameTiming";
import { progressGameState } from "./progressGameState";
import { progressWithSubTicks } from "./progressWithSubTicks";
import { tickGameSpeed } from "./tickGameSpeed";
import { topLevelFilters } from "./topLevelFilters";

textInterfaceToShowDetailedFrameTiming();

const quarterTurnClockwise = Math.PI / 2;
const pausedDimTint = 0x99_99_99;
const noTint = 0xff_ff_ff;

export class MainLoop<RoomId extends string> {
  #hudRenderer: HudRenderer<RoomId, string> | undefined;
  /**
   * room renderer can only be undefined if there is no current room - both
   * players have lost all lives
   */
  #roomRenderer: RoomRendererType<RoomId, string> | undefined;
  #worldContainer: Container = new Container({
    label: "MainLoop/worldContainer",
  });
  #worldSound: AudioNode = audioCtx.createGain();
  #physicsTicker = progressWithSubTicks(progressGameState, maxSubTickDeltaMs);
  /**
   * promise - if any async spritesheet generation is currently happening, the main loop should
   * hold up ticking until this is resolved. Once resolved this goes back to undefined and rendering
   * resumes on the next tick
   */
  #spritesheetLoadPromise: Promise<void> | undefined;

  #mainContainer = new Container({
    label: "MainLoop/mainContainer",
    children: [this.#worldContainer],
  });

  #app: Application;
  #gameState: GameState<RoomId>;
  #spritesheetVariants: SpritesheetVariants;

  /**
   * set when the WebGL context has been restored after being lost. Every
   * render texture's contents died with the old context, so the next tick
   * must rebuild everything baked at runtime: the spritesheets, the room
   * renderer, and the hud (including its baked text)
   */
  #contextRestored = false;

  /**
   * called by pixi's contextChange runner. The initial context creation
   * happens during app.init(), before this MainLoop is constructed, so any
   * call here is a restore after a lost context.
   */
  contextChange() {
    this.#contextRestored = true;
  }

  constructor(
    app: Application,
    gameState: GameState<RoomId>,
    spritesheetVariants: SpritesheetVariants,
  ) {
    this.#app = app;
    this.#gameState = gameState;
    this.#spritesheetVariants = spritesheetVariants;
    app.renderer.runners.contextChange.add(this);
    try {
      const storeState = store.getState();

      const gameEngineUpscale = selectGameEngineUpscale(storeState);

      this.#worldSound.connect(audioCtx.destination);
      app.stage.addChild(this.#mainContainer);
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
      userSettings: {
        userSettings: { displaySettings },
      },
      upscale: { upscale },
    } = store.getState();

    this.#app.stage.filters = topLevelFilters(displaySettings, upscale);
  }

  #firstFrameMarked = false;

  #tickAndCatch = (ticker: Ticker): void => {
    try {
      this.#tick(ticker);
    } catch (thrown) {
      const wrappedError = new Error("Error caught in main loop tick", {
        cause: thrown,
      });
      this.#handleError(wrappedError);
    }
  };

  #tickRootContainer({
    gameEngineUpscale,
    rotate90,
    gameEngineScreenSize,
  }: Upscale) {
    const { stage } = this.#app;

    stage.scale = gameEngineUpscale;
    this.#mainContainer.rotation = rotate90 ? quarterTurnClockwise : 0;
    this.#mainContainer.position.x = rotate90 ? gameEngineScreenSize.y : 0;
  }

  #tick = ({ deltaMS: tickerDeltaMS }: Ticker): void => {
    const tickState = store.getState();
    const timingRecord =
      selectShowFps(tickState) ? frameTimingStats : undefined;

    if (!tickState.gameInPlay.gameRunning) {
      // the effect that starts this loop may not unmount exactly when the game stops due
      // to react/preact being async, so we may get a few ticks after the game has stopped
      return;
    }

    if (selectHasError(tickState)) {
      // if there is an error, we don't want to tick the game state
      // as it will probably cause the same error again - do not tick
      // until the error is dismissed
      return;
    }

    const {
      userSettings: {
        userSettings: {
          displaySettings: tickDisplaySettings,
          soundSettings: tickSoundSettings,
        },
      },
      gameInPlay: {
        gameInPlay: { freeCharacters: tickFreeCharacters },
      },
      upscale: { upscale: tickUpscale },
    } = tickState;

    tickGameSpeed(this.#app.ticker, tickState, this.#gameState);
    // tickGameSpeed can only set for the next frame - is the current frame's speed should be zero
    // but isn't, make sure one frame's worth of physics movement doesn't happen here:
    const deltaMS = this.#app.ticker.speed === 0 ? 0 : tickerDeltaMS;

    const isPaused = selectIsPaused(tickState);

    const selectedSpriteOption = selectSpritesOption(tickState);
    const tickSpriteOption: SpriteOption =
      (
        isPaused &&
        spritesheetMetaForOption(selectedSpriteOption).supportsUncolourised
      ) ?
        ({ ...selectedSpriteOption, uncolourised: true } as SpriteOption)
      : selectedSpriteOption;

    this.#mainContainer.tint =
      isPaused && !tickSpriteOption.uncolourised ? pausedDimTint : noTint;

    // note that progressing the game state can change/reload the room,
    // so we need to tick physics considering recreating the room renderer
    timingRecord?.startPhysics();
    const movedItems =
      deltaMS === 0 ? emptySet : this.#physicsTicker(this.#gameState, deltaMS);
    timingRecord?.endPhysics();

    timingRecord?.startUpdateSceneGraph();
    // the tick could end on a different room than it started on, eg if ticking
    // the physics caused the player to go through a door:
    const tickEndRoom = selectCurrentRoomState(this.#gameState);

    if (tickEndRoom === undefined) {
      // the game is over - there's no need to do any more in this loop, and the loop should
      // soon terminate:
      return;
    }

    if (this.#contextRestored) {
      this.#contextRestored = false;
      // destroy before invalidating the sheets the renderers reference:
      this.#hudRenderer?.destroy();
      this.#hudRenderer = undefined;
      this.#roomRenderer?.destroy();
      this.#roomRenderer = undefined;
      this.#spritesheetVariants.invalidate();
    }

    const roomChanged = this.#roomRenderer?.renderContext.room !== tickEndRoom;
    if (
      (roomChanged ||
        (this.#roomRenderer !== undefined &&
          !spriteOptionEquals(
            tickSpriteOption,
            this.#roomRenderer.renderContext.general.spriteOption,
          ))) &&
      tickEndRoom !== undefined &&
      this.#spritesheetLoadPromise === undefined
    ) {
      if (!this.#spritesheetVariants.isTextureLoaded(tickSpriteOption.name)) {
        this.#spritesheetLoadPromise = this.#spritesheetVariants
          .loadImage(tickSpriteOption.name)
          .then(() => {
            this.#spritesheetLoadPromise = undefined;
          })
          .catch((e) => {
            this.#spritesheetLoadPromise = undefined;
            this.#handleError(e);
          });
      } else {
        this.#spritesheetVariants.rebuild(
          this.#app.renderer,
          tickEndRoom.planet,
          tickEndRoom.color,
          tickSpriteOption,
        );
      }
    }

    if (this.#spritesheetLoadPromise !== undefined) {
      // still loading a spritesheet — skip rendering
      return;
    }

    // render hud start
    timingRecord?.startHudUpdate();
    const tickOnScreenControls = selectShouldRenderOnScreenControls(tickState);
    const tickInputDirectionMode = selectInputDirectionMode(tickState);

    const createNewHudRenderer = needsNewHudRenderer(
      this.#hudRenderer,
      tickSpriteOption,
      tickOnScreenControls,
      tickInputDirectionMode,
      tickUpscale,
    );

    if (createNewHudRenderer) {
      this.#hudRenderer?.destroy();
      this.#hudRenderer = new HudRenderer({
        general: {
          gameState: this.#gameState,
          paused: isPaused,
          pixiRenderer: this.#app.renderer,
          displaySettings: tickDisplaySettings,
          soundSettings: tickSoundSettings,
          spriteOption: tickSpriteOption,
          spritesheetMeta: spritesheetMetaForOption(tickSpriteOption),
          upscale: tickUpscale,
          onScreenControls: tickOnScreenControls,
          speedCoefficient: this.#app.ticker.speed,
          spritesheetVariants: this.#spritesheetVariants,
        },

        inputDirectionMode: tickInputDirectionMode,
      });
      this.#mainContainer.addChild(this.#hudRenderer.output);
    }

    this.#hudRenderer!.tick({
      screenSize: tickUpscale.gameEngineScreenSize,
      deltaMS,
      paused: isPaused,
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
            gameState: this.#gameState,
            paused: isPaused,
            pixiRenderer: this.#app.renderer,
            displaySettings: tickDisplaySettings,
            soundSettings: tickSoundSettings,
            spriteOption: tickSpriteOption,
            spritesheetMeta: spritesheetMetaForOption(tickSpriteOption),
            upscale: tickUpscale,
            onScreenControls: tickOnScreenControls,
            speedCoefficient: this.#app.ticker.speed,
            spritesheetVariants: this.#spritesheetVariants,
          },
          room: tickEndRoom,
        };
        this.#roomRenderer = new RoomScrollRenderer(
          roomRenderContext,
          new ColourClashCircleEffectRenderer(
            roomRenderContext,
            new RoomRenderer(roomRenderContext),
          ),
        );
        this.#worldContainer.addChild(this.#roomRenderer.output.graphics);
        this.#roomRenderer.output.sound?.connect(this.#worldSound);
      } else {
        this.#roomRenderer = undefined;
      }

      this.#tickRootContainer(tickUpscale);
      this.#initTopLevelFilters();

      // setting static boundsArea helps if a filter is put over the whole output container, since the bounds of the
      // container won't change. Eg, a lift going vertically up into a screen y-coord where previously nothing was
      // rendered does not stretch the container upwards
      this.#mainContainer.boundsArea = new Rectangle(
        0,
        0,
        tickUpscale.rotate90 ?
          tickUpscale.gameEngineScreenSize.y
        : tickUpscale.gameEngineScreenSize.x,
        tickUpscale.rotate90 ?
          tickUpscale.gameEngineScreenSize.x
        : tickUpscale.gameEngineScreenSize.y,
      );
    }

    // the room renderer runs even while paused - it is its responsibility to
    // exit quickly when nothing has changed
    if (this.#roomRenderer) {
      this.#roomRenderer.renderContext.general.speedCoefficient =
        this.#app.ticker.speed;
    }

    this.#roomRenderer?.tick({
      movedItems,
      deltaMS,
    });

    timingRecord?.endUpdateSceneGraph();

    if (import.meta.env.DEV) {
      validateSceneGraph(this.#app.stage);
    }

    try {
      timingRecord?.startPixiRender();
      this.#app.render();
      timingRecord?.endPixiRender();
      if (!this.#firstFrameMarked) {
        this.#firstFrameMarked = true;
        // readiness signal for network-cost measurement (true-site-size)
        performance.mark("first-gameplay");
      }
      if (import.meta.env.MODE === "visual-regression") {
        if (createNewRoomRenderer && tickEndRoom) {
          window.dispatchEvent(
            new CustomEvent("firstRenderOfRoom", {
              detail: { roomId: tickEndRoom.id },
            }),
          );
        }
        // the sprite option that this rendered frame actually reflects - lets
        // playwright wait for a sprite option change to land in the output rather
        // than guessing with a fixed delay:
        window.dispatchEvent(
          new CustomEvent("spriteOptionRendered", {
            detail: { spriteOption: tickSpriteOption },
          }),
        );
      }
    } catch (e) {
      throw new Error("Error in Pixi.js app.render()", { cause: e });
    }

    timingRecord?.tickDone();

    // throttle framerate when paused to reduce CPU/GPU load (nothing is moving anyway)
    this.#app.ticker.maxFPS = this.#app.ticker.speed === 0 ? 10 : maxFps;
  };

  start() {
    this.#app.ticker.add(this.#tickAndCatch);
    return this;
  }
  stop() {
    this.#app.stage.removeChild(this.#mainContainer);
    this.#worldSound.disconnect();
    this.#roomRenderer?.destroy();
    this.#hudRenderer?.destroy();
    this.#app.renderer.runners.contextChange.remove(this);
    this.#app.ticker.remove(this.#tickAndCatch);
  }
}
