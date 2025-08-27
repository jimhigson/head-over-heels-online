import type { Xy } from "../../../utils/vectors/vectors";
import type { CalculateUpscaleOptions } from "./calculateUpscale";

import { type ResolutionName, resolutions } from "../../../originalGame";
import { detectDeviceType } from "../../../utils/detectDeviceType";

const gameRenderAreaSize = (targetElement?: HTMLElement): Xy => {
  const deviceType = detectDeviceType();
  return (
    deviceType === "server" ? resolutions.zxSpectrum
      // see also: window.visualViewport
      //: window.screen ? { x: window.screen.width, y: window.screen.height }
    : targetElement ?
      { x: targetElement.clientWidth, y: targetElement.clientHeight }
    : { x: window.innerWidth, y: window.innerHeight }
  );
};

/**
 * utility for scraping the device for data needed to calc the upscale. Since the upscale
 * slice is pure-functional, this provides the connection to the side-effect laden outside
 * world
 */
export const upscaleOptionsForCurrentDevice = (
  emulatedResolution: ResolutionName,
  targetElement?: HTMLElement,
): CalculateUpscaleOptions => {
  const deviceType = detectDeviceType();

  const renderAreaSize = gameRenderAreaSize(targetElement);
  return {
    renderAreaSize,
    emulatedResolutionName: emulatedResolution,
    devicePixelRatio: deviceType === "server" ? 1 : window.devicePixelRatio,
  };
};
