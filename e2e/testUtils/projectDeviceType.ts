import { type DeviceType } from "../../src/utils/detectEnv/detectDeviceType";

/**
 * the device type a playwright project emulates - the test-side half of what
 * the app detects from the browser at runtime
 */
export const projectDeviceType = (projectName: string): DeviceType =>
  projectName.startsWith("mobile") ? "mobile" : "desktop";
