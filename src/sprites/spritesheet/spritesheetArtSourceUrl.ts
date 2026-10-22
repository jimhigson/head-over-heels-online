import { selectSpritesheetOverrideBlobUrl } from "../../store/slices/spritesheetOverrideSlice";
import { type GameRootState } from "../../store/store";
import {
  spritesheetMetas,
  type SpritesheetName,
} from "./spritesheetData/spritesheetMetaData";

/**
 * where a sheet's art is loaded from: the player's override of it if they
 * have one, otherwise the sheet's own asset
 */
export const spritesheetArtSourceUrl = (
  state: GameRootState,
  spritesheetArtName: SpritesheetName,
): string =>
  (import.meta.env.VITE_APP === "editor" ?
    undefined
  : selectSpritesheetOverrideBlobUrl(state, spritesheetArtName)) ??
  spritesheetMetas[spritesheetArtName].artUrl;
