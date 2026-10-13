import { type Filter } from "pixi.js";

import { PaletteSwapFilter } from "./PaletteSwapFilter";

/** shared, keyed filters that item renderers/appearances stash and reuse */
export type FilterCache = Map<string, Filter>;

/** destroys every filter in the cache (with any lut textures), and empties it */
export const destroyFilterCache = (filterCache: FilterCache) => {
  for (const filter of filterCache.values()) {
    if (filter instanceof PaletteSwapFilter) {
      filter.destroy({ destroyLutTexture: true });
    } else {
      filter.destroy();
    }
  }
  filterCache.clear();
};
