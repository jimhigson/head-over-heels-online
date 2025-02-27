export type DeviceType = "mobile" | "tablet" | "desktop";

const deviceTypeOverride = (new URLSearchParams(window.location.search).get(
  "device",
) ?? undefined) as DeviceType | undefined;

export const detectDeviceType = (): DeviceType => {
  if (deviceTypeOverride !== undefined) {
    return deviceTypeOverride;
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
