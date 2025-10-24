import type { Xy } from "../../../utils/vectors/vectors";
import type { DisplaySettings } from "../gameMenus/gameMenusSlice";
import type { CalculateUpscaleOptions } from "./calculateUpscale";

import { type ResolutionName, resolutions } from "../../../originalGame";
import { detectDeviceType } from "../../../utils/detectEnv/detectDeviceType";

const gameRenderAreaSize = (targetElement?: HTMLElement): Xy => {
  const deviceType = detectDeviceType();
  return (
    deviceType === "server" ? resolutions.zxSpectrum.size
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
  displaySettings: DisplaySettings,
  targetElement?: HTMLElement,
): CalculateUpscaleOptions => {
  const deviceType = detectDeviceType();

  const renderAreaSize = gameRenderAreaSize(targetElement);
  return {
    renderAreaSize,
    emulatedResolutionName: emulatedResolution,
    devicePixelRatio: deviceType === "server" ? 1 : window.devicePixelRatio,
    maximumCanvasUpscale:
      // 8 without crt emulation (sharp, square pixels), or 6 with making the upscale smaller when crt emulation
      // is on compensates for the extra processing it requires
      displaySettings.crtFilter ? 6 : 8,
  };
};
