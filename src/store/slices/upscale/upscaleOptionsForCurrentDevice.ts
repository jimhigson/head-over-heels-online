import { resolutions, type ResolutionName } from "../../../originalGame";
import { detectDeviceType } from "../../../utils/detectDeviceType";
import type { CalculateUpscaleOptions } from "./calculateUpscale";

const currentScreenSize = () => {
  const deviceType = detectDeviceType();
  return deviceType === "server" ?
      resolutions.zxSpectrum
      // see also: window.visualViewport
      //: window.screen ? { x: window.screen.width, y: window.screen.height }
    : { x: window.innerWidth, y: window.innerHeight };
};

/**
 * utility for scraping the device for data needed to calc the upscale. Since the upscale
 * slice is pure-functional, this provides the connection to the side-effect laden outside
 * world
 */
export const upscaleOptionsForCurrentDevice = (
  emulatedResolution: ResolutionName,
): CalculateUpscaleOptions => {
  const deviceType = detectDeviceType();

  return {
    renderAreaSize: currentScreenSize(),
    emulatedResolutionName: emulatedResolution,
    devicePixelRatio: deviceType === "server" ? 1 : window.devicePixelRatio,
  };
};
