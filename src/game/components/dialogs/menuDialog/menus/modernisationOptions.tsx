import { spritesheetPalette } from "gfx/spritesheetPalette";
import { BitmapText } from "../../../Sprite";
import type { Menu } from "../menus";

export const modernisationOptions: Menu = {
  background: "metallicBlue",
  itemColour: "lightGrey",
  selectedColour: "moss",
  heading: (
    <BitmapText doubleHeight colour={spritesheetPalette.moss}>
      Modernisation options
    </BitmapText>
  ),
  items: [
    { type: "switch", label: "Colourised" },
    { type: "switch", label: "Extra items" },
    { type: "switch", label: "CRT (TV) effect" },
    { type: "switch", label: "Emulated resolution" },
  ],
};
