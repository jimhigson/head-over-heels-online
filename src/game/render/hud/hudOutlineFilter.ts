import { spritesheetPalette } from "../../../../gfx/spritesheetPalette";
import { store } from "../../../store/store";
import { OutlineFilter } from "../filters/outlineFilter";

export const hudOutlineFilter = new OutlineFilter({
  outlineColor: spritesheetPalette.pureBlack,
  upscale: store.getState().upscale.gameEngineUpscale,
  // it is ok to snap to pixel grid
  lowRes: true,
});
