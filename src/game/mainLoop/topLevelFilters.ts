import type { Filter } from "pixi.js";

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

import type { DisplaySettings } from "../../store/slices/gameMenus/gameMenusSlice";
import type { Upscale } from "../../store/slices/upscale/Upscale";

import { defaultUserSettings } from "../../store/slices/gameMenus/defaultUserSettings";
import { noFilters } from "../render/filters/standardFilters";

// darken initially, then re-lighten at the end. This helps some detail
// to be added into very light areas by compressing the dynamic range initially,
// giving the pipeline some headroom to go into
const inPipelineBrightness = 0.8;
// overall boost to brightness to come a the end:
const brightnessIncrease = 1.2;

export const topLevelFilters = (
  { crtFilter: crtFilterDisplaySetting }: DisplaySettings,
  upscale: Upscale,
): Filter[] => {
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
      radius: upscale.gameEngineUpscale / 6,
      intensity: 0.1,
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

    new RaiseBlackPointFilter({ blackPoint: 0.03 }),

    new ColorAdjustmentFilter({
      gamma: 1.1,
      saturation: 1.35,
      brightness: (1 / inPipelineBrightness) * brightnessIncrease,
      brightnessBottom: -0.15,
    }),
  ];
};
