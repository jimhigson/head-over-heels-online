import type { Upscale } from "./render/calculateUpscale";

export type ShowBoundingBoxes = "none" | "all" | "non-wall";

export type RenderOptions = {
  showBoundingBoxes: ShowBoundingBoxes;
  showShadowMasks: boolean;
  upscale: Upscale;
  crtFilter: boolean;
  colourise: boolean;
};
