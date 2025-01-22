import { manualPages, pageTitle } from "../../../../../manual/pages";
import { objectEntriesIter } from "../../../../../utils/entries";
import { iterate } from "../../../../../utils/iterate";
import { BitmapText } from "../../../Sprite";
import { backMenuItem } from "../backMenuItem";
import type { MenuItem } from "../MenuItem";
import { MenuItems } from "../MenuItems";
import type { Menu } from "../menus";
import { multilineTextClass } from "../multilineTextClass";

export const readTheManualMenu: Menu = {
  dialogClassName: "bg-highlightBeige",
  borderClassName: "bg-midGrey",
  Content() {
    return (
      <>
        <BitmapText className="ml-3 text-moss sprites-double-height">
          Read the manual
        </BitmapText>
        <MenuItems
          className={
            `text-redShadow ${multilineTextClass} !gap-y-0 ` +
            "overflow-y-scroll scrollbar scrollbar-thumb-midGrey scrollbar-w-1 scrollbar-track-highlightBeige"
          }
          selectedClassName="text-shadow"
        />
      </>
    );
  },
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
