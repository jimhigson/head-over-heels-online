export type DeviceType = "mobile" | "tablet" | "desktop" | "server";

export const detectDeviceType = (): DeviceType => {
  if (typeof globalThis.window === "undefined") {
    return "server"; // probably running some tests
  }

  const deviceTypeOverride = new URLSearchParams(window.location.search).get(
    "device",
  );

  if (deviceTypeOverride !== null) {
    return deviceTypeOverride as DeviceType;
  }

  const ua = navigator.userAgent;
  // ipad iPadOs 13+ reports as "MacIntel"
  const isIpadOS =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

  return (
    isIpadOS || /iPad|Tablet|Android(?!.*Mobi)/i.test(ua) ? "tablet"
    : /Mobi|Android|iPhone|iPod/i.test(ua) ? "mobile"
    : "desktop"
  );
};
