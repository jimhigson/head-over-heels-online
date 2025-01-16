import { spritesheetPalette } from "gfx/spritesheetPalette";
import { BitmapText } from "../../../Sprite";
import type { Menu } from "../menus";

export const modernisationOptionsMenu: Menu = {
  background: "metallicBlue",
  itemColour: "lightGrey",
  selectedColour: "moss",
  hintColour: "moss",
  heading: (
    <BitmapText doubleHeight colour={spritesheetPalette.moss}>
      Modernisation options
    </BitmapText>
  ),
  items: [
    {
      type: "switch",
      label: "Colourise",
      selector: (store) => store.readerOptions.colourise,
      dispatch: { type: "gameMenus/toggleColourise", payload: undefined },
      hint: "Original two-tone graphics, or 16-colour colourised",
    },
    {
      type: "switch",
      label: "Extra items",
      hint: `toggle extra features in the rooms that modernise the gameplay slightly 
        - none of these fundamentally change the gameplay.
        
        Turn off to be completely faithful to the original rooms.`,
    },
    {
      type: "switch",
      label: "CRT TV effect",
      selector: (store) => store.readerOptions.crtFilter,
      dispatch: { type: "gameMenus/toggleCrtFilter", payload: undefined },
      hint: "Looks like an old tv",
    },
    {
      type: "todo",
      label: "Emulated resolution",
      hint: "zx spectrum (256x192) or Amiga/c64/Atari ST PAL (320x256)",
    },
  ],
};
