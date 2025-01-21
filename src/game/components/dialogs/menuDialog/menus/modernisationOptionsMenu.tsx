import { BitmapText } from "../../../Sprite";
import { backMenuItem } from "../backMenuItem";
import { MenuItems } from "../MenuItems";
import type { Menu } from "../menus";
import { SelectedItemHint } from "../SelectedItemHint";

export const modernisationOptionsMenu: Menu = {
  dialogClassName: "bg-metallicBlue",
  borderClassName: "bg-moss",
  Content() {
    return (
      <>
        <BitmapText className="text-moss sprites-double-height">
          Modernisation options
        </BitmapText>
        <MenuItems className="text-lightGrey" selectedClassName="text-moss" />
        <SelectedItemHint className="text-moss" />
      </>
    );
  },
  items: [
    {
      type: "switch",
      label: "Colourise",
      selector: (store) => store.userSettings.renderOptions.colourise,
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
      selector: (store) => store.userSettings.renderOptions.crtFilter,
      dispatch: { type: "gameMenus/toggleCrtFilter", payload: undefined },
      hint: "Screen glows a bit like an old tv",
    },
    {
      type: "todo",
      label: "Emulated resolution",
      hint: "zx spectrum (256x192) or Amiga/c64/Atari ST PAL (320x256)",
    },
    backMenuItem,
  ],
};
