export type DeviceType = "mobile" | "tablet" | "desktop";

export const detectDeviceType = (): DeviceType => {
  const ua = navigator.userAgent;
  // ipad iPadOs 13+ reports as "MacIntel"
  const isIpadOS =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

  return "mobile";

  return (
    isIpadOS || /iPad|Tablet|Android(?!.*Mobi)/i.test(ua) ? "tablet"
    : /Mobi|Android|iPhone|iPod/i.test(ua) ? "mobile"
    : "desktop"
  );
};
