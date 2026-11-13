import { readBuildInfo } from "./readBuildInfo.ts" with { type: "macro" };

/** what this build of the game is, fixed when it was built */
export const buildInfo = {
  ...readBuildInfo(),
  isDevBuild: import.meta.env.DEV,
};
