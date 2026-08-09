import { SwitchOnFilter } from "@blockstacking/jims-shaders";
import {
  type Application,
  Container,
  type Filter,
  Rectangle,
  type Ticker,
} from "pixi.js";

import { audioCtx } from "../../sound/audioCtx";
import { ensureRoomSoundsLoaded } from "../../sound/ensureRoomSoundsLoaded";
import { spritesheetMetaForOption } from "../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { type Spritesheets } from "../../sprites/spritesheet/Spritesheets";
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
import {
  type DisplaySettings,
  type SoundSettings,
  type SpriteOption,
} from "../../store/slices/userSettings/userSettingsSlice";
import { store } from "../../store/store";
import { validateSceneGraph } from "../../utils/pixi/validateSceneGraph";
import { createSerialisableErrors } from "../../utils/redux/createSerialisableErrors";
import { type Xy } from "../../utils/vectors/vectors";
import { type GameState } from "../gameState/GameState";
import { selectCurrentRoomState } from "../gameState/gameStateSelectors/selectCurrentRoomState";
import { maxSubTickDeltaMs } from "../physics/mechanicsConstants";
import { ColourClashCircleEffectRenderer } from "../render/ColourClashCircleEffectRenderer";
import { noFilters } from "../render/filters/standardFilters";
import { HudRenderer } from "../render/hud/HudRenderer";
import { needsNewHudRenderer } from "../render/hud/needsNewHudRenderer";
import { needsNewRoomRenderer } from "../render/room/needsNewRoomRenderer";
import {
  type InGameGeneralRenderContext,
  type RoomRenderContextInGame,
} from "../render/room/RoomRenderContexts";
import { RoomRenderer } from "../render/room/RoomRenderer";
import { type RoomRendererType } from "../render/room/RoomRendererType";
import { RoomScrollRenderer } from "../render/room/RoomScrollRenderer";
import {
  loadedFrameTimingStats,
  loadFrameTimingStats,
} from "./frameTiming/lazyFrameTimingStats";
import { registerDetailedFpsGlobal } from "./frameTiming/registerDetailedFpsGlobal";
import { progressGameState } from "./progressGameState";
import { progressWithSubTicks } from "./progressWithSubTicks";
import { resolveCrtFilterEnabled } from "./resolveCrtFilterEnabled";
import { rotateCameraIfInput } from "./rotateCameraIfInput";
import { tickCameraTransition } from "./tickCameraTransition";
import { tickGameSpeed } from "./tickGameSpeed";
import { topLevelFilters } from "./topLevelFilters";
import { transitionCameraAngle } from "./transitionCameraAngle";

registerDetailedFpsGlobal();

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

  /**
   * any load-sound-on-room-load sounds that are in the room:
   */
  #roomSoundsLoadPromise: Promise<void> | undefined;

  #mainContainer = new Container({
    label: "MainLoop/mainContainer",
    children: [this.#worldContainer],
  });

  #app: Application;
  #gameState: GameState<RoomId>;
  #spritesheets: Spritesheets;
  /**
   * the single general render context, owned and mutated in place
   * here for use in both the room and hud renderers
   */
  #generalRenderContext: InGameGeneralRenderContext<RoomId> | undefined =
    undefined;

  constructor(
    app: Application,
    gameState: GameState<RoomId>,
    spritesheets: Spritesheets,
  ) {
    this.#app = app;
    this.#gameState = gameState;
    this.#spritesheets = spritesheets;
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

      this.#initTopLevelFilters(true);
    } catch (e) {
      this.#handleError(e);
      return;
    }
  }

  #handleError(thrown: unknown) {
    console.error(thrown);
    store.dispatch(errorCaught(createSerialisableErrors(thrown)));
  }

  #topLevelFilters: Filter[] = noFilters;
  /**
   * held onto only so that the switch-on can be taken back out of the chain once the
   * picture has finished coming up, since it does nothing to it after that
   */
  #switchOnFilter: SwitchOnFilter | undefined;

  #initTopLevelFilters(
    /**
     * whether the tube should play its coming-up-to-temperature effect again -
     * true only for the reasons that actually warrant it (starting the game,
     * switching the CRT filter on, coming out of pause), not for every reason
     * the filter chain gets rebuilt (eg an ordinary room change)
     */
    restartSwitchOn: boolean,
  ) {
    const {
      userSettings: {
        userSettings: { displaySettings },
      },
      upscale: { upscale },
    } = store.getState();

    if (!resolveCrtFilterEnabled(displaySettings)) {
      this.#switchOnFilter?.destroy();
      this.#switchOnFilter = undefined;
    } else if (restartSwitchOn) {
      this.#switchOnFilter?.destroy();
      this.#switchOnFilter = new SwitchOnFilter({
        warmUpDelay: 0,
        duration: 270,
        overscan: 0.15,
        overshoot: 0.4,
        scaleOvershoot: 0.08,
        scaleSettleDuration: 265,
      });
    } else if (this.#switchOnFilter?.finished) {
      this.#switchOnFilter.destroy();
      this.#switchOnFilter = undefined;
    }

    this.#topLevelFilters = topLevelFilters(
      displaySettings,
      upscale,
      this.#switchOnFilter,
    );
    this.#app.stage.filters = this.#topLevelFilters;
  }

  #dropSwitchOnFilterWhenFinished() {
    const switchOnFilter = this.#switchOnFilter;

    if (switchOnFilter === undefined || !switchOnFilter.finished) {
      return;
    }

    this.#topLevelFilters = this.#topLevelFilters.filter(
      (filter) => filter !== switchOnFilter,
    );
    this.#app.stage.filters = this.#topLevelFilters;
    this.#switchOnFilter = undefined;
    switchOnFilter.destroy();
  }

  #firstFrameMarked = false;

  // set when the canvas regains its WebGL context after a loss; the next tick
  // refetches the spritesheet image and re-bakes the variants, whose
  // RenderTextures died with the old WebGL context:
  #webGlContextRestored = false;
  #onWebGlContextRestored = () => {
    this.#webGlContextRestored = true;
    // every baked RenderTexture died with the old context - dropping them also
    // resets the loaded sprite option, so the next tick's isTextureLoaded
    // check refetches the image and re-bakes the original from it:
    this.#spritesheets.invalidateBakedTextures();
  };

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

  /**
   * the single {@link InGameGeneralRenderContext} shared by the room and hud
   * renderers, mutated in place (never reassigned once created) so a renderer
   * not recreated this frame keeps reading live values from the same object.
   */
  #syncGeneralRenderContext(
    /**
     * rewrite the recreation-triggered fields below - pass true exactly when a
     * renderer is (re)created, the only time they can have changed
     */
    rebuildStable: boolean,
    paused: boolean,
    displaySettings: DisplaySettings,
    soundSettings: SoundSettings,
    spriteOption: SpriteOption,
    upscale: Upscale,
    /** whether the on-screen touch controls are shown */
    onScreenControls: boolean,
    /** continuous camera rotation, stepping through θ(t) mid-turn */
    cameraAngle: Xy,
    /** game-speed multiplier - <1 for slow-mo, 0 while paused */
    speedCoefficient: number,
  ): InGameGeneralRenderContext<RoomId> {
    const existing = this.#generalRenderContext;

    if (existing === undefined) {
      const created: InGameGeneralRenderContext<RoomId> = {
        gameState: this.#gameState,
        pixiRenderer: this.#app.renderer,
        spritesheets: this.#spritesheets,
        paused,
        displaySettings,
        soundSettings,
        spriteOption,
        spritesheetMeta: spritesheetMetaForOption(spriteOption),
        upscale,
        onScreenControls,
        cameraAngle,
        speedCoefficient,
      };
      this.#generalRenderContext = created;
      return created;
    }

    if (rebuildStable) {
      existing.paused = paused;
      existing.displaySettings = displaySettings;
      existing.soundSettings = soundSettings;
      existing.spriteOption = spriteOption;
      existing.spritesheetMeta = spritesheetMetaForOption(spriteOption);
      existing.upscale = upscale;
      existing.onScreenControls = onScreenControls;
    }

    existing.cameraAngle = cameraAngle;
    existing.speedCoefficient = speedCoefficient;
    return existing;
  }

  // elapsedMS, not deltaMS: elapsedMS is the raw time since the last frame,
  // while deltaMS has already been scaled by the ticker's speed. Taking the raw
  // lets us apply gamespeed ourselves, which leaves the ticker's speed as a pure
  // output - written for the animations to follow, never read back - so time
  // handed to ticker.update() always reaches the physics intact
  #tick = ({ elapsedMS }: Ticker): void => {
    // undoes any hide from a CRT filter toggle skipping last frame's draw -
    // done unconditionally and before any early return below, so the world
    // never stays hidden longer than the one frame that toggle skipped
    this.#mainContainer.visible = true;

    this.#dropSwitchOnFilterWhenFinished();

    const tickState = store.getState();
    const showFps = selectShowFps(tickState);
    const timingRecord = showFps ? loadedFrameTimingStats() : undefined;
    if (showFps && timingRecord === undefined) {
      // the frame-timing chunk is lazy-loaded - start (or continue) fetching
      // it; frames until it lands just go unmeasured
      loadFrameTimingStats();
    }

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

    const gameSpeed = tickGameSpeed(tickState, this.#gameState);
    // the ticker's minFPS is the slowest frame rate it will report time for.
    // Similarly use it to cap our non-pixi deltaMS:
    const maxStepMs = 1_000 / this.#app.ticker.minFPS;
    const deltaMS = Math.min(elapsedMS, maxStepMs) * gameSpeed;

    // set the ticker speed so Animated Sprites run at the right speed, otherwise
    // we don't use the ticker's speed in our app:
    this.#app.ticker.speed = gameSpeed;

    if (import.meta.env.MODE === "visual-regression" && deltaMS !== 0) {
      // screenshots are taken with the world frozen, so every advance of game
      // time is either a deliberate fast-forward or the reason a capture came
      // out non-deterministic. The e2e run forwards the browser console into
      // its own log, so this is the record of what actually moved and when
      // roomTime is the clock the simulation's own decisions key off (eg when a
      // monster next turns), so it is what has to match between machines for a
      // capture to match its baseline - log where this step starts from
      console.log(
        `[game-speed] physics advanced ${deltaMS}ms (elapsed ${elapsedMS}ms × gameSpeed ${gameSpeed}) from roomTime ${selectCurrentRoomState(this.#gameState)?.roomTime}`,
      );
    }

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

    // the rotation advances on the game-speed-scaled clock, so slow-motion
    // (or a zero game speed) slows/freezes a rotation mid-turn for
    // inspection; tests never rely on the transition playing out - they set
    // the angle they want and run at zero speed, so it stays there:
    if (!isPaused) {
      rotateCameraIfInput(this.#gameState);
      tickCameraTransition(this.#gameState, deltaMS);
    }

    // note that progressing the game state can change/reload the room,
    // so we need to tick physics considering recreating the room renderer
    timingRecord?.startPhysics();
    if (deltaMS !== 0) {
      this.#physicsTicker(this.#gameState, deltaMS);
    }
    timingRecord?.endPhysics();

    // read after the rotate-input read above, so a rotation input this frame
    // takes effect immediately:
    const tickCameraAngle = this.#gameState.targetCameraAngle;

    timingRecord?.startUpdateSceneGraph();
    // the tick could end on a different room than it started on, eg if ticking
    // the physics caused the player to go through a door:
    const tickEndRoom = selectCurrentRoomState(this.#gameState);

    if (tickEndRoom === undefined) {
      // the game is over - there's no need to do any more in this loop, and the loop should
      // soon terminate:
      return;
    }

    const roomChanged = this.#roomRenderer?.renderContext.room !== tickEndRoom;

    const spritesheetVariantsStale =
      (roomChanged ||
        this.#webGlContextRestored ||
        (this.#roomRenderer !== undefined &&
          !spriteOptionEquals(
            tickSpriteOption,
            this.#roomRenderer.renderContext.general.spriteOption,
          ))) &&
      tickEndRoom !== undefined &&
      this.#spritesheetLoadPromise === undefined;

    if (spritesheetVariantsStale) {
      if (!this.#spritesheets.isTextureLoaded(tickSpriteOption.name)) {
        this.#spritesheetLoadPromise = this.#spritesheets
          .loadImage(this.#app.renderer, tickSpriteOption.name)
          .then(() => {
            this.#spritesheetLoadPromise = undefined;
          })
          .catch((e) => {
            this.#spritesheetLoadPromise = undefined;
            this.#handleError(e);
          });
      } else {
        const rebuildStartMs = performance.now();
        this.#spritesheets.rebuild(
          this.#app.renderer,
          tickEndRoom.planet,
          tickEndRoom.color,
          tickSpriteOption,
        );
        timingRecord?.recordSpritesheetRebuild(
          performance.now() - rebuildStartMs,
        );
      }
    }

    if (
      roomChanged &&
      tickEndRoom !== undefined &&
      this.#roomSoundsLoadPromise === undefined
    ) {
      // the room entry tunes are excluded from the initial sound load - if
      // this room names one that isn't loaded yet, hold off rendering until
      // it is, like a spritesheet variant load
      const roomSoundsPromise = ensureRoomSoundsLoaded(tickEndRoom);
      if (roomSoundsPromise !== undefined) {
        this.#roomSoundsLoadPromise = roomSoundsPromise
          .then(() => {
            this.#roomSoundsLoadPromise = undefined;
          })
          .catch((e) => {
            this.#roomSoundsLoadPromise = undefined;
            this.#handleError(e);
          });
      }
    }

    if (
      this.#spritesheetLoadPromise !== undefined ||
      this.#roomSoundsLoadPromise !== undefined
    ) {
      // still loading a spritesheet or the room's sounds — skip rendering
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
      this.#webGlContextRestored,
    );

    // read before #syncGeneralRenderContext below overwrites them in place:
    // wasPaused/wasCrtFilterEnabled are the values the room renderer was last
    // built with, needed to tell "coming out of pause"/"switching the CRT on"
    // apart from the many other reasons the filter chain gets rebuilt
    const wasPaused = this.#generalRenderContext?.paused;
    const wasCrtFilterEnabled =
      this.#generalRenderContext !== undefined &&
      resolveCrtFilterEnabled(this.#generalRenderContext.displaySettings);
    const crtFilterEnabled = resolveCrtFilterEnabled(tickDisplaySettings);
    const shouldRestartSwitchOn =
      this.#roomRenderer === undefined || // starting the game
      (wasPaused === true && !isPaused) || // coming out of pause
      (!wasCrtFilterEnabled && crtFilterEnabled); // switching the CRT filter on
    // toggling the CRT filter either way swaps the whole top-level filter
    // chain in mid-tick, which renders one incorrect frame - skip drawing
    // that single frame rather than show it:
    const crtFilterToggled =
      this.#roomRenderer !== undefined &&
      wasCrtFilterEnabled !== crtFilterEnabled;

    // a rebuild is fine mid-transition: the fresh renderer builds against the
    // discrete (nearest-quarter) angle like any renderer, and the playing
    // transition carries on over it - eg a turn continues through a door into
    // the next room (rooms share a world orientation under the angle-free
    // model):
    const createNewRoomRenderer = needsNewRoomRenderer(
      this.#roomRenderer,
      roomChanged,
      tickUpscale,
      tickDisplaySettings,
      tickSoundSettings,
      isPaused,
      this.#webGlContextRestored,
    );

    const { cameraTransition } = this.#gameState;

    // continuous θ(t) angle while a rotation animates, settled quarter-angle otherwise:
    const cameraAngle =
      cameraTransition === undefined ? tickCameraAngle : (
        transitionCameraAngle(
          cameraTransition.fromAngle,
          cameraTransition.arc,
          cameraTransition.progress,
          cameraTransition.startSlope,
        )
      );

    const general = this.#syncGeneralRenderContext(
      createNewHudRenderer || createNewRoomRenderer,
      isPaused,
      tickDisplaySettings,
      tickSoundSettings,
      tickSpriteOption,
      tickUpscale,
      tickOnScreenControls,
      cameraAngle,
      gameSpeed,
    );

    if (createNewHudRenderer) {
      this.#hudRenderer?.destroy();
      this.#hudRenderer = new HudRenderer({
        general,
        inputDirectionMode: tickInputDirectionMode,
      });
      this.#mainContainer.addChild(this.#hudRenderer.output);
    }

    this.#hudRenderer!.tick({
      screenSize: tickUpscale.gameEngineScreenSize,
      deltaMS,
      room: tickEndRoom,
      freeCharacters: tickFreeCharacters,
    });
    timingRecord?.endHudUpdate();

    if (
      // for several things that change infrequently, we don't bother to try to adjust the room scene
      // graph if it changes - we simply destroy and recreate it entirely:
      createNewRoomRenderer
    ) {
      this.#roomRenderer?.destroy();

      if (tickEndRoom) {
        const roomRenderContext: RoomRenderContextInGame<RoomId, string> = {
          general,
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
      this.#initTopLevelFilters(shouldRestartSwitchOn);

      if (crtFilterToggled) {
        this.#mainContainer.visible = false;
      }

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

    // WebGL-context-loss recovery for this tick is done: the variants are
    // re-baked and the hud/room renderers recreated, so they no longer reference
    // the dead textures - clear the flag:
    this.#webGlContextRestored = false;

    // the room renderer runs even while paused
    if (this.#roomRenderer !== undefined) {
      this.#roomRenderer.tick({ deltaMS, timingRecord });
    }

    timingRecord?.endUpdateSceneGraph();

    // inline env reads so this is statically dead at tree-shake time and the
    // checker never ships in a production build; also check in the
    // visual-regression build so the e2e suite catches broken invariants
    // (destroyed/null textures) instead of an opaque pixi crash
    if (import.meta.env.DEV || import.meta.env.MODE === "visual-regression") {
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
            new CustomEvent("_e2e_firstRenderOfRoom", {
              detail: { roomId: tickEndRoom.id },
            }),
          );
        }
        // the sprite option that this rendered frame actually reflects - lets
        // playwright wait for a sprite option change to land in the output rather
        // than guessing with a fixed delay:
        window.dispatchEvent(
          new CustomEvent("_e2e_spriteOptionRendered", {
            detail: { spriteOption: tickSpriteOption },
          }),
        );
      }
    } catch (e) {
      throw new Error("Error in Pixi.js app.render()", { cause: e });
    }

    timingRecord?.tickDone();
  };

  start() {
    this.#app.canvas.addEventListener(
      "webglcontextrestored",
      this.#onWebGlContextRestored,
    );
    this.#app.ticker.add(this.#tickAndCatch);
    return this;
  }
  stop() {
    this.#app.canvas.removeEventListener(
      "webglcontextrestored",
      this.#onWebGlContextRestored,
    );
    this.#app.stage.removeChild(this.#mainContainer);
    this.#worldSound.disconnect();
    this.#roomRenderer?.destroy();
    this.#roomRenderer = undefined;
    this.#hudRenderer?.destroy();
    this.#app.ticker.remove(this.#tickAndCatch);
  }
}
