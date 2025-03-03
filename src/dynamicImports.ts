import { lazy } from "react";
import type Cheats from "./game/components/cheats/Cheats";
import { importOnce } from "./utils/importOnce";

/**
 * make sure things are only imported once (even if brought in by multiple files)
 * by using this dynamic import helper
 */
export const importEsIteratorPolyfillsOnce = importOnce(
  // TODO: this could be made smaller by only importing the methods we need
  () => import("es-iterator-helpers/auto"),
);
export const importAppOnce = importOnce(() => import("./game/components/App"));
const importCheats = importOnce(
  () => import("./game/components/cheats/Cheats.tsx"),
);
export const importGameMain = importOnce(() => import("./game/gameMain.ts"));
export const importOriginalCampaign = importOnce(
  () => import("./_generated/originalCampaign/campaign.ts"),
);
export const importTestCampaign = importOnce(() => import("./testCampaign.ts"));
export const importSpritesheet = importOnce(
  () => import("./sprites/spriteSheet.ts"),
);
export const LazyCheats = lazy(importCheats) as typeof Cheats;
