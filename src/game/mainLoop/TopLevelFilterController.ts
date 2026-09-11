// type-only: erased at build time, so this doesn't pull the library into the
// bundle - the classes themselves are lazily loaded via loadCrtFilterLibrary
import {
  type BloomFilter,
  type ColorAdjustmentFilter,
  type FlickerFilter,
  type NoiseFilter,
  type PhosphorMaskFilter,
  type RaiseBlackPointFilter,
  type RoundedCornersFilter,
  type ScanlinesFilter,
  type ScreenGeometryFilter,
  type SharpenFilter,
  type SwitchOnFilter,
  type VignetteFilter,
} from "@blockstacking/jims-shaders";
import { type Container, type Filter } from "pixi.js";

import { type Upscale } from "../../store/slices/upscale/Upscale";
import { type DisplaySettings } from "../../store/slices/userSettings/userSettingsSlice";
import { type GameState } from "../gameState/GameState";
import { playerDiedRecently } from "../gameState/gameStateSelectors/playerDiedRecently";
import { selectCurrentPlayableItem } from "../gameState/gameStateSelectors/selectPlayableItem";
import { noFilters } from "../render/filters/standardFilters";
import { loadCrtFilterLibrary } from "./loadCrtFilterLibrary";
import { resolveCrtFilterEnabled } from "./resolveCrtFilterEnabled";

// darken initially, then re-lighten at the end. This helps some detail
// to be added into very light areas by compressing the dynamic range initially,
// giving the pipeline some headroom to go into
const inPipelineBrightness = 0.8;
// overall boost to brightness to come a the end:
const brightnessIncrease = 1.2;

/**
 * how long to hide the world for when the CRT filter is toggled, to ride out
 * the single incorrect frame the filter chain swap renders
 */
const crtFilterToggleHideMs = 100;

const topLevelFilters = (
  /**
   * the filter classes from @blockstacking/jims-shaders, lazily loaded via
   * loadCrtFilterLibrary so this library never enters the bundle for players
   * who never turn the CRT filter on
   */
  filterClasses: {
    BloomFilter: typeof BloomFilter;
    ColorAdjustmentFilter: typeof ColorAdjustmentFilter;
    FlickerFilter: typeof FlickerFilter;
    NoiseFilter: typeof NoiseFilter;
    PhosphorMaskFilter: typeof PhosphorMaskFilter;
    RaiseBlackPointFilter: typeof RaiseBlackPointFilter;
    RoundedCornersFilter: typeof RoundedCornersFilter;
    ScanlinesFilter: typeof ScanlinesFilter;
    ScreenGeometryFilter: typeof ScreenGeometryFilter;
    SharpenFilter: typeof SharpenFilter;
    VignetteFilter: typeof VignetteFilter;
  },
  upscale: Upscale,
  /**
   * the switch-on filter is owned by TopLevelFilterController, which decides
   * whether the picture should play the coming-up-to-temperature effect again
   * (a fresh instance), carry on an already-playing one (the same instance),
   * or have none at all (undefined) - never constructed fresh in here, so
   * that rebuilding the filter chain for unrelated reasons (eg a room change)
   * can't restart the effect
   */
  switchOnFilter: SwitchOnFilter | undefined,
): Filter[] => {
  const {
    BloomFilter,
    ColorAdjustmentFilter,
    FlickerFilter,
    NoiseFilter,
    PhosphorMaskFilter,
    RaiseBlackPointFilter,
    RoundedCornersFilter,
    ScanlinesFilter,
    ScreenGeometryFilter,
    SharpenFilter,
    VignetteFilter,
  } = filterClasses;

  return [
    new ColorAdjustmentFilter({
      brightness: inPipelineBrightness,
    }),

    new NoiseFilter({ intensity: 0.03, fps: 29.97, scale: 5 }),

    // the peaking of the set's luminance amplifier, which acts on the signal before
    // it reaches the tube - so before anything modelling the beam or the phosphors
    new SharpenFilter({
      amount: 0.45,
      // the ringing of a set's luminance bandwidth lands over roughly half an
      // emulated pixel, so it follows the upscale rather than the output resolution
      radius: upscale.gameEngineUpscale * 0.5,
      asymmetry: 0.35,
      signalBlur: 0.25,
    }),

    // Scanlines and phosphor mask first (applied to flat image)
    new ScanlinesFilter({
      pixelHeight: upscale.gameEngineUpscale,
      gapBrightness: 0.5,
    }),

    new PhosphorMaskFilter({
      pixelWidth: upscale.gameEngineUpscale * 1.1,
      maskBrightness: 0.6,
      numSamples: 2,
      transitionWidth: 0.2,
    }),

    // the phosphors dying away between passes of the beam, at the Spectrum's own
    // 50Hz - and so before the bloom that their light scatters into
    new FlickerFilter({
      hz: 50,
      depth: 0.12,
      persistence: 0.3,
    }),

    // selectively blur just fairly light items on a small, intense radius:
    new BloomFilter({
      radius: upscale.gameEngineUpscale / 6,
      intensity: 0.1,
      cutoff: 0.8,
      edgeBlur: 1,
    }),

    new VignetteFilter({
      intensity: 0.4,
      radius: 0.7,
    }),

    new RaiseBlackPointFilter({ blackPoint: 0.03 }),

    // the tube coming up to temperature, only present while playing that
    // effect - once it has finished, TopLevelFilterController takes it back
    // out of the chain, so it costs nothing for the rest of the game
    ...(switchOnFilter ? [switchOnFilter] : []),

    // cut to the shape of the screen before it is curved, so that the edge is already
    // faded and does not come out of the curve as a hard line
    new RoundedCornersFilter({ cornerRadius: 0.03 }),

    // all of the geometry at once - the curve of the glass and the stretch of the
    // raster under the beam current the picture is drawing
    new ScreenGeometryFilter({
      curvatureX: 0.13,
      curvatureY: 0.12,
      multisampling: true,
    }),

    new ColorAdjustmentFilter({
      gamma: 1.1,
      saturation: 1.35,
      brightness: (1 / inPipelineBrightness) * brightnessIncrease,
      brightnessBottom: -0.15,
    }),
  ];
};

export type TopLevelFilterDecision = {
  /**
   * whether the tube should play its coming-up-to-temperature effect again -
   * true only for the reasons that actually warrant it (starting the game,
   * switching the CRT filter on, coming out of pause, respawning), not for
   * every reason the filter chain gets rebuilt (eg an ordinary room change)
   */
  shouldRestart: boolean;
  /** whether the CRT filter was switched on or off this tick, either way */
  toggled: boolean;
};

/**
 * Owns the stage-level CRT filter chain: building it (lazily, only once a
 * player turns the CRT filter on), replaying the switch-on effect at the
 * right moments, and hiding the world for the one incorrect frame a filter
 * chain swap renders when the CRT filter is toggled mid-game.
 *
 * Three calls per tick, in order - see MainLoop:
 * 1. {@link tickStart} - unconditional, before any early return
 * 2. {@link decide} - before the caller's shared render context is mutated
 *    in place for this tick (the comparisons inside need the old values)
 * 3. {@link rebuild} - once the caller knows whether it's rebuilding its own
 *    scene graph this tick too
 */
export class TopLevelFilterController<RoomId extends string> {
  #stage: Container;
  #mainContainer: Container;

  #topLevelFilters: Filter[] = noFilters;
  /**
   * held onto only so that the switch-on can be taken back out of the chain once the
   * picture has finished coming up, since it does nothing to it after that
   */
  #switchOnFilter: SwitchOnFilter | undefined;
  /**
   * bumped on every rebuild() call so a loadCrtFilterLibrary() resolution
   * superseded by a later call (before it finished loading) can be told apart
   * from the latest one and discarded rather than overwriting it
   */
  #requestId = 0;
  /**
   * set while #mainContainer is at zero opacity to ride out a CRT filter
   * toggle - a performance.now() deadline rather than a single-frame flag,
   * since frame duration varies and the toggle needs to stay hidden for a
   * minimum real time
   */
  #hideMainContainerUntil: number | undefined;
  /**
   * last tick's playerDiedRecently, so a respawn (the false-to-true edge) can
   * be told apart from every other tick of the post-respawn invulnerability
   * window it stays true for
   */
  #wasDiedRecently = false;

  constructor(stage: Container, mainContainer: Container) {
    this.#stage = stage;
    this.#mainContainer = mainContainer;
  }

  tickStart(): void {
    if (
      this.#hideMainContainerUntil !== undefined &&
      performance.now() >= this.#hideMainContainerUntil
    ) {
      this.#mainContainer.alpha = 1;
      this.#hideMainContainerUntil = undefined;
    }

    const switchOnFilter = this.#switchOnFilter;
    if (switchOnFilter !== undefined && switchOnFilter.finished) {
      this.#topLevelFilters = this.#topLevelFilters.filter(
        (filter) => filter !== switchOnFilter,
      );
      this.#stage.filters = this.#topLevelFilters;
      this.#switchOnFilter = undefined;
      switchOnFilter.destroy();
    }
  }

  decide(
    gameState: GameState<RoomId>,
    isPaused: boolean,
    displaySettings: DisplaySettings,
    /** the room renderer's last-built values, undefined before the first tick */
    previousPaused: boolean | undefined,
    previousDisplaySettings: DisplaySettings | undefined,
    roomRendererExists: boolean,
  ): TopLevelFilterDecision {
    const wasCrtFilterEnabled =
      previousDisplaySettings !== undefined &&
      resolveCrtFilterEnabled(previousDisplaySettings);
    const crtFilterEnabled = resolveCrtFilterEnabled(displaySettings);

    // the same state that drives the post-respawn invulnerability flash marks
    // a respawn - edge-detected since it stays true for the whole
    // invulnerability window, not just the tick the player respawns on
    const maybeCurrentPlayable = selectCurrentPlayableItem(gameState);
    if (import.meta.env.DEV && maybeCurrentPlayable === undefined) {
      throw new Error(
        "current playable was required here but was absent - selectCurrentPlayableItem " +
          "should only be undefined once selectCurrentRoomState is too, which the " +
          "caller should already have returned early for",
      );
    }
    const diedRecently = playerDiedRecently(maybeCurrentPlayable!);
    const justRespawned = diedRecently && !this.#wasDiedRecently;
    this.#wasDiedRecently = diedRecently;

    return {
      shouldRestart:
        !roomRendererExists || // starting the game
        (previousPaused === true && !isPaused) || // coming out of pause
        (!wasCrtFilterEnabled && crtFilterEnabled) || // switching the CRT filter on
        justRespawned, // respawning after losing a life
      toggled: roomRendererExists && wasCrtFilterEnabled !== crtFilterEnabled,
    };
  }

  rebuild(
    /** true when the caller is rebuilding its own scene graph this tick anyway */
    forceRebuild: boolean,
    decision: TopLevelFilterDecision,
    upscale: Upscale,
    displaySettings: DisplaySettings,
  ): void {
    if (!forceRebuild && !decision.shouldRestart) {
      return;
    }

    const requestId = ++this.#requestId;

    if (!resolveCrtFilterEnabled(displaySettings)) {
      this.#switchOnFilter?.destroy();
      this.#switchOnFilter = undefined;
      this.#topLevelFilters = noFilters;
      this.#stage.filters = this.#topLevelFilters;
    } else {
      // @blockstacking/jims-shaders is off the critical path - most players
      // never turn the CRT filter on, so it's only fetched once one does:
      loadCrtFilterLibrary().then(({ SwitchOnFilter, ...filterClasses }) => {
        if (requestId !== this.#requestId) {
          // superseded by a later call while this one was loading:
          return;
        }

        if (decision.shouldRestart) {
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
          filterClasses,
          upscale,
          this.#switchOnFilter,
        );
        this.#stage.filters = this.#topLevelFilters;
      });
    }

    if (decision.toggled) {
      this.#mainContainer.alpha = 0;
      this.#hideMainContainerUntil = performance.now() + crtFilterToggleHideMs;
    }
  }
}
