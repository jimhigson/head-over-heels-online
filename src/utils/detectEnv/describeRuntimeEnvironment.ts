import { detectDeploymentType } from "./detectDeploymentType";
import { detectDeviceType } from "./detectDeviceType";

/**
 * Where the game is running — deployment type and raw user-agent — for the top
 * of a bug report, for technical users to analyse. Written to never throw,
 * since it runs while building an error report.
 */
export const describeRuntimeEnvironment = (): string => {
  if (detectDeviceType() === "server") {
    return "running as: server";
  }
  return `running as: ${detectDeploymentType()}\nuser agent: ${navigator.userAgent}`;
};
