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
  dialogClassName: "bg-highlightBeige zx:bg-zxCyanDimmed",
  borderClassName: "bg-midGrey zx:bg-zxCyan",
  Content() {
    return (
      <>
        <BitmapText className="ml-3 text-moss zx:text-zxBlack sprites-double-height">
          Read the manual
        </BitmapText>
        <MenuItems
          className={
            `text-redShadow zx:text-zxWhite ${multilineTextClass} !gap-y-0 ` +
            "selectedMenuItem:text-shadow zx:selectedMenuItem:text-zxBlack " +
            "overflow-y-scroll scrollbar scrollbar-w-1 " +
            "scrollbar-thumb-moss scrollbar-track-highlightBeige " +
            "zx:scrollbar-thumb-zxBlack zx:scrollbar-track-zxCyanDimmed"
          }
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
