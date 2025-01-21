import { manualPages, pageTitle } from "../../../../../manual/pages";
import { objectEntriesIter } from "../../../../../utils/entries";
import { iterate } from "../../../../../utils/iterate";
import { BitmapText } from "../../../Sprite";
import { backMenuItem } from "../backMenuItem";
import type { MenuItem } from "../MenuItem";
import { MenuItems } from "../MenuItems";
import type { Menu } from "../menus";
import { withProps } from "../withClassName";

export const readTheManualMenu: Menu = {
  dialogClassName: "bg-highlightBeige",
  borderClassName: "bg-midGrey",
  sections: [
    <BitmapText className="text-moss sprites-double-height">
      Read the manual
    </BitmapText>,
    withProps(MenuItems, {
      // weird-looking .sprite class makes items that break into multiple lines work by
      // putting a gap between the lines. line-height doesn't work great for the sprite-based text
      className:
        "text-redShadow overflow-y-hidden [&_.sprite]:mb-oneScaledPix gap-y-0",
      selectedClassName: "text-shadow",
    }),
  ],
  items: [
    ...iterate(objectEntriesIter(manualPages)).map(
      ([pageName, pageContent]): MenuItem => {
        const title = pageTitle(pageContent);

        return {
          type: "submenu",
          label: title,
          submenu: `markdown/${pageName}`,
        };
      },
    ),
    backMenuItem,
  ],
};
