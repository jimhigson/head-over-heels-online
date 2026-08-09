// type-only: erased at build time, so this doesn't pull the library into the
// bundle - the classes themselves are lazily loaded by MainLoop
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
import { type Filter } from "pixi.js";

import { type Upscale } from "../../store/slices/upscale/Upscale";

// darken initially, then re-lighten at the end. This helps some detail
// to be added into very light areas by compressing the dynamic range initially,
// giving the pipeline some headroom to go into
const inPipelineBrightness = 0.8;
// overall boost to brightness to come a the end:
const brightnessIncrease = 1.2;

export const topLevelFilters = (
  /**
   * the filter classes from @blockstacking/jims-shaders, lazily loaded by
   * MainLoop via loadCrtFilterLibrary so this library never enters the
   * bundle for players who never turn the CRT filter on
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
   * the switch-on filter is owned by MainLoop, which decides whether the picture
   * should play the coming-up-to-temperature effect again (a fresh instance),
   * carry on an already-playing one (the same instance), or have none at all
   * (undefined) - never constructed fresh in here, so that rebuilding the filter
   * chain for unrelated reasons (eg a room change) can't restart the effect
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

    // the tube coming up to temperature, only present while MainLoop is playing
    // that effect - once it has finished, MainLoop takes it back out of the
    // chain, so it costs nothing for the rest of the game
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
