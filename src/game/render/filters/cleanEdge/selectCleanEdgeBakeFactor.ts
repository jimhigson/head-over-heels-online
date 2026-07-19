import { selectIsSmoothSprites } from "../../../../store/slices/gameMenus/gameMenusSelectors";
import { selectGameEngineUpscale } from "../../../../store/slices/upscale/upscaleSlice";
import { type GameRootState } from "../../../../store/store";
import { maxCleanEdgeBakeFactor } from "./bakeCleanEdgeTexture";

/**
 * how much larger than 1x everything the game engine draws is baked: matching
 * the engine's upscale exactly puts the baked texels 1:1 with canvas pixels,
 * capped for memory and guaranteed-supported texture size. 1 = no cleanEdge
 * processing, ie the plain art
 */
export const selectCleanEdgeBakeFactor = (state: GameRootState): number =>
  selectIsSmoothSprites(state) ?
    Math.min(selectGameEngineUpscale(state), maxCleanEdgeBakeFactor)
  : 1;
