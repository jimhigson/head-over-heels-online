import type { MapSettingsHooks } from "../map/MapContext";
import { useCurrentSpritesheetData } from "./slices/gameMenus/gameMenusSelectors";
import { useTotalUpscale } from "./slices/upscale/upscaleSelectors";
import { useCurrentSpritesheetArtUrl } from "./useCurrentSpritesheetArtUrl";

/**
 * the map's settings, read from the store
 */
export const mapSettingsHooks: MapSettingsHooks = {
  useSpritesheetData: useCurrentSpritesheetData,
  useSpritesheetArtUrl: useCurrentSpritesheetArtUrl,
  useTotalUpscale,
};
