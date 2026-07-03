import { typedURLSearchParams } from "../../options/queryParams";

export type DeviceType = "desktop" | "mobile" | "server" | "tablet";

export const isTouchDevice = () => {
  return detectDeviceType() === "mobile" || detectDeviceType() === "tablet";
};

let cachedDeviceType: DeviceType | undefined;

export const detectDeviceType = (): DeviceType => {
  if (cachedDeviceType !== undefined) {
    return cachedDeviceType;
  }

  if (typeof globalThis.window === "undefined") {
    cachedDeviceType = "server"; // probably running some tests
    return cachedDeviceType;
  }

  const deviceTypeOverride = typedURLSearchParams().get("device");

  if (deviceTypeOverride !== null) {
    cachedDeviceType = deviceTypeOverride;
    return cachedDeviceType;
  }

  const ua = navigator.userAgent;
  // ipad iPadOs 13+ reports as "MacIntel"
  const isIpadOS =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

  cachedDeviceType =
    isIpadOS || /iPad|Tablet|Android(?!.*Mobi)/i.test(ua) ? "tablet"
    : /Mobi|Android|iPhone|iPod/i.test(ua) ? "mobile"
    : "desktop";

  return cachedDeviceType;
};
