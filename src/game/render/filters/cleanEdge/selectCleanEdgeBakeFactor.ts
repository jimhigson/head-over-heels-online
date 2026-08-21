import { selectIsSmoothSprites } from "../../../../store/slices/gameMenus/gameMenusSelectors";
import { selectTotalUpscale } from "../../../../store/slices/upscale/upscaleSlice";
import { type GameRootState } from "../../../../store/store";
import { maxCleanEdgeBakeFactor } from "./maxCleanEdgeBakeFactor";

/**
 * how much larger than 1x everything the game engine draws is baked: matching
 * the screen's whole upscale puts the baked texels 1:1 with the pixels they
 * end up as, however that upscale is split between the engine and css. Capped
 * only by what the hardware will hold. 1 = no cleanEdge processing, ie the
 * plain art
 */
export const selectCleanEdgeBakeFactor = (state: GameRootState): number =>
  selectIsSmoothSprites(state) ?
    Math.min(Math.floor(selectTotalUpscale(state)), maxCleanEdgeBakeFactor())
  : 1;
