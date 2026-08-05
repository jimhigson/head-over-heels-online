// type-only: erased at build time, so this doesn't pull the library into the
// bundle - the classes themselves are lazily loaded via loadCrtFilterLibrary
import {
  type GlowFilter,
  type RasterFilter,
  type SignalFilter,
  type SwitchOnClock,
  type TubeFilter,
  type TubeFilterOptions,
} from "@blockstacking/jims-shaders";
import { Container, type Filter, Rectangle } from "pixi.js";

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

// a PAL television drew the Spectrum's 7 MHz pixels this much wider than tall
const crtPixelAspect = 59 / 56;

/**
 * the filter classes from @blockstacking/jims-shaders, lazily loaded via
 * loadCrtFilterLibrary so this library never enters the bundle for players
 * who never turn the CRT filter on
 */
type CrtFilterClasses = {
  SignalFilter: typeof SignalFilter;
  RasterFilter: typeof RasterFilter;
  GlowFilter: typeof GlowFilter;
  TubeFilter: typeof TubeFilter;
};

const switchOnOptions = {
  warmUpDelay: 0,
  overscan: 0.15,
  overshoot: 0.4,
} satisfies TubeFilterOptions["switchOn"];

const tubeFilterOptions = (
  /**
   * the switch-on's timing, owned by CrtEffectContainer, which decides
   * whether the picture should play the coming-up-to-temperature effect again
   * (a fresh clock), carry on an already-playing one (the same clock), or have
   * none at all (undefined) - never made fresh in here, so that rebuilding the
   * filter chain for unrelated reasons (eg a room change) can't restart the effect
   */
  switchOnClock: SwitchOnClock | undefined,
): TubeFilterOptions => ({
  // the tube coming up to temperature, only present while playing that
  // effect - once it has finished, CrtEffectContainer takes it back
  // out of the chain, so it costs nothing for the rest of the game
  ...(switchOnClock ? { switchOn: switchOnOptions, switchOnClock } : {}),

  // cut to the shape of the screen before it is curved, so that the edge is already
  // faded and does not come out of the curve as a hard line
  roundedCorners: { cornerRadius: 0.06 },

  // all of the geometry at once - the curve of the glass and the stretch of the
  // raster under the beam current the picture is drawing
  screenGeometry: {
    curvatureX: 0.13,
    curvatureY: 0.12,
    curvatureExponent: 1.8,
    multisampling: true,
  },

  colorAdjustment: {
    gamma: 1.1,
    saturation: 1.35,
    brightness: (1 / inPipelineBrightness) * brightnessIncrease,
    brightnessBottom: -0.15,
  },
});

const topLevelFilters = (
  { SignalFilter, RasterFilter, GlowFilter, TubeFilter }: CrtFilterClasses,
  upscale: Upscale,
  switchOnClock: SwitchOnClock | undefined,
): Filter[] => [
  new SignalFilter({
    colorAdjustment: {
      brightness: inPipelineBrightness,
    },

    noise: {
      intensity: 0.01,
      fps: 29.97,
      // one scanline tall, the same as the scanlines below
      pixelHeight: upscale.gameEngineUpscale * 2,
      widthRatio: 5,
    },

    // the peaking of the set's luminance amplifier, which acts on the signal before
    // it reaches the tube - so before anything modelling the beam or the phosphors
    sharpen: {
      amount: 0.5,
      // the ringing of a set's luminance bandwidth lands over roughly half an
      // emulated pixel, so it follows the upscale rather than the output resolution
      radius: upscale.gameEngineUpscale * 0.5,
      asymmetry: 0.35,
      signalBlur: 0.25,
    },
  }),

  new RasterFilter({
    // Scanlines and phosphor mask first (applied to flat image)
    scanlines: {
      pixelHeight: upscale.gameEngineUpscale,
      gapBrightness: 0.5,
    },

    phosphorMask: {
      pixelWidth: upscale.gameEngineUpscale * 1.1,
      maskBrightness: 0.6,
      numSamples: 2,
      transitionWidth: 0.2,
    },

    // the phosphors dying away between passes of the beam, at the Spectrum's own
    // 50Hz - and so before the bloom that their light scatters into
    flicker: {
      hz: 50,
      depth: 0.12,
      persistence: 0.3,
    },
  }),

  new GlowFilter({
    // selectively blur just fairly light items on a small, intense radius:
    bloom: {
      radius: upscale.gameEngineUpscale / 6,
      intensity: 0.1,
      cutoff: 0.8,
      edgeBlur: 1,
    },

    vignette: {
      intensity: 0.7,
      radius: 0.8,
    },

    raiseBlackPoint: { blackPoint: 0.02 },
  }),

  new TubeFilter(tubeFilterOptions(switchOnClock)),
];

export type CrtEffectDecision = {
  /**
   * whether the tube should play its coming-up-to-temperature effect again -
   * true only for the reasons that actually warrant it (starting the game,
   * switching the CRT filter on, respawning), not for
   * every reason the filter chain gets rebuilt (eg an ordinary room change)
   */
  shouldRestart: boolean;
  /** whether the CRT filter was switched on or off this tick, either way */
  toggled: boolean;
};

/**
 * Wraps the whole picture to give it the look of a CRT television: owns the
 * stage-level CRT filter chain (building it lazily, only once a player turns
 * the CRT filter on), replays the switch-on effect at the right moments, hides
 * the picture for the one incorrect frame a filter chain swap renders when the
 * CRT filter is toggled mid-game, and squashes the picture to the non-square
 * pixels of a PAL television while the CRT filter is on.
 *
 * Four calls per tick, in order - see MainLoop:
 * 1. {@link tickStart} - unconditional, before any early return
 * 2. {@link decide} - before the caller's shared render context is mutated
 *    in place for this tick (the comparisons inside need the old values)
 * 3. {@link tickPixelAspect} - every tick, so the squash follows the setting
 * 4. {@link rebuild} - once the caller knows whether it's rebuilding its own
 *    scene graph this tick too
 */
export class CrtEffectContainer<RoomId extends string> extends Container {
  #stage: Container;
  /** holds the picture, squashed to the non-square pixels of a PAL television */
  #squashContainer = new Container({ label: "CrtEffectContainer/squash" });
  /** the whole screen, in stage coordinates, whatever the squash */
  #screenBounds = new Rectangle();

  #topLevelFilters: Filter[] = noFilters;
  /** the loaded filter classes, once the CRT filter has been turned on */
  #filterClasses: CrtFilterClasses | undefined;
  /**
   * held onto so that the switch-on carries on across rebuilds of the chain, and
   * is taken back out once the picture has finished coming up, since it does
   * nothing to it after that
   */
  #switchOnClock: SwitchOnClock | undefined;
  /**
   * bumped on every rebuild() call so a loadCrtFilterLibrary() resolution
   * superseded by a later call (before it finished loading) can be told apart
   * from the latest one and discarded rather than overwriting it
   */
  #requestId = 0;
  /**
   * set while this container is at zero opacity to ride out a CRT filter
   * toggle - a performance.now() deadline rather than a single-frame flag,
   * since frame duration varies and the toggle needs to stay hidden for a
   * minimum real time
   */
  #hideUntil: number | undefined;
  /**
   * last tick's playerDiedRecently, so a respawn (the false-to-true edge) can
   * be told apart from every other tick of the post-respawn invulnerability
   * window it stays true for
   */
  #wasDiedRecently = false;

  constructor(
    /** carries the filter chain, so it filters the whole screen */
    stage: Container,
    /** the picture the CRT effect is applied to */
    picture: Container,
  ) {
    super({ label: "CrtEffectContainer" });
    this.#stage = stage;
    this.#squashContainer.addChild(picture);
    this.addChild(this.#squashContainer);
    // fixed to the whole screen, so the filters cover the glass however the picture is squashed
    this.boundsArea = this.#screenBounds;
  }

  tickStart(): void {
    if (this.#hideUntil !== undefined && performance.now() >= this.#hideUntil) {
      this.alpha = 1;
      this.#hideUntil = undefined;
    }

    const filterClasses = this.#filterClasses;
    if (
      this.#switchOnClock?.finished &&
      filterClasses !== undefined &&
      this.#topLevelFilters.length > 0
    ) {
      this.#switchOnClock = undefined;
      // the tube is last in the chain - swapped for one without the switch-on
      const tubeIndex = this.#topLevelFilters.length - 1;
      const finishedTube = this.#topLevelFilters[tubeIndex];
      this.#topLevelFilters = this.#topLevelFilters.with(
        tubeIndex,
        new filterClasses.TubeFilter(tubeFilterOptions(undefined)),
      );
      this.#stage.filters = this.#topLevelFilters;
      finishedTube.destroy();
    }
  }

  tickPixelAspect(
    { rotate90, gameEngineScreenSize }: Upscale,
    displaySettings: DisplaySettings,
  ): void {
    // the picture's vertical runs along the stage's x when turned a quarter
    const axis = rotate90 ? "x" : "y";
    // the middle of the picture's height, on that axis, either way round
    const centre = gameEngineScreenSize.y / 2;

    this.#screenBounds.width =
      rotate90 ? gameEngineScreenSize.y : gameEngineScreenSize.x;
    this.#screenBounds.height =
      rotate90 ? gameEngineScreenSize.x : gameEngineScreenSize.y;

    const squash = this.#squashContainer;
    squash.scale.set(1);
    squash.pivot.set(0);
    squash.position.set(0);

    if (resolveCrtFilterEnabled(displaySettings)) {
      // squashed about the middle, uncovering more of the world above and below
      squash.pivot[axis] = centre;
      squash.position[axis] = centre;
      squash.scale[axis] = 1 / crtPixelAspect;
    }
  }

  decide(
    gameState: GameState<RoomId>,
    displaySettings: DisplaySettings,
    /** the room renderer's last-built value, undefined before the first tick */
    previousDisplaySettings: DisplaySettings | undefined,
    roomRendererExists: boolean,
  ): CrtEffectDecision {
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
        (!wasCrtFilterEnabled && crtFilterEnabled) || // switching the CRT filter on
        justRespawned, // respawning after losing a life
      toggled: roomRendererExists && wasCrtFilterEnabled !== crtFilterEnabled,
    };
  }

  rebuild(
    /** true when the caller is rebuilding its own scene graph this tick anyway */
    forceRebuild: boolean,
    decision: CrtEffectDecision,
    upscale: Upscale,
    displaySettings: DisplaySettings,
  ): void {
    if (!forceRebuild && !decision.shouldRestart) {
      return;
    }

    const requestId = ++this.#requestId;

    if (!resolveCrtFilterEnabled(displaySettings)) {
      this.#switchOnClock = undefined;
      this.#topLevelFilters = noFilters;
      this.#stage.filters = this.#topLevelFilters;
    } else {
      // @blockstacking/jims-shaders library is only fetched if on:
      loadCrtFilterLibrary().then((filterLibrary) => {
        if (requestId !== this.#requestId) {
          // superseded by a later call while this one was loading:
          return;
        }
        this.#filterClasses = filterLibrary;

        if (decision.shouldRestart) {
          this.#switchOnClock = new filterLibrary.SwitchOnClock(
            switchOnOptions,
          );
        } else if (this.#switchOnClock?.finished) {
          this.#switchOnClock = undefined;
        }

        this.#topLevelFilters = topLevelFilters(
          filterLibrary,
          upscale,
          this.#switchOnClock,
        );
        this.#stage.filters = this.#topLevelFilters;
      });
    }

    if (decision.toggled) {
      this.alpha = 0;
      this.#hideUntil = performance.now() + crtFilterToggleHideMs;
    }
  }
}
