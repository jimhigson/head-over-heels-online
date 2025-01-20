import { manualPages, titleRegex } from "../../../../../manual/pages";
import { objectEntriesIter } from "../../../../../utils/entries";
import { iterate } from "../../../../../utils/iterate";
import { BitmapText } from "../../../Sprite";
import type { MenuItem } from "../MenuItem";
import type { Menu } from "../menus";

export const readTheManualMenu: Menu = {
  backgroundClassName: "bg-highlightBeige",
  // weird-looking .sprite class makes items that break into multiple lines work by
  // putting a gap between the lines. line-height doesn't work great for the sprite-based text
  itemsClassName:
    "text-redShadow overflow-y-hidden [&_.sprite]:mb-oneScaledPix gap-y-0",
  selectedClassName: "text-shadow",
  borderClassName: "bg-midRed",
  hintClassName: "text-moss",
  heading: (
    <BitmapText className="text-moss sprites-double-height">
      Read the manual
    </BitmapText>
  ),
  items: [
    ...iterate(objectEntriesIter(manualPages)).map(
      ([pageName, pageContent]): MenuItem => {
        const match = pageContent.match(titleRegex);
        if (match === null) {
          throw new Error(`no title found in ${pageName}`);
        }
        const [, label] = match;

        return {
          type: "submenu",
          label,
          submenu: `manual/${pageName}`,
        };
      },
    ),
  ],
};
