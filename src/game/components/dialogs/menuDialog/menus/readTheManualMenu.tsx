import { Border, Dialog } from "../../../../../components/ui/dialog";
import type { ManualPageName } from "../../../../../manual/pages";
import { manualPages, pageTitle } from "../../../../../manual/pages";
import { goToSubmenu } from "../../../../../store/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../store/useDispatchCallback";
import { keys } from "../../../../../utils/entries";
import { iterate } from "../../../../../utils/iterate";
import { BitmapText } from "../../../Sprite";
import { MenuItem } from "../MenuItem";
import { BackMenuItem } from "../BackMenuItem";
import { MenuItemSeparator } from "../MenuItemSeparator";
import { MenuItems } from "../MenuItems";
import { multilineTextClass } from "../multilineTextClass";
import type { DialogId } from "../menus";

const MarkdownMenuItem = ({ pageName }: { pageName: ManualPageName }) => {
  const pageContent = manualPages[pageName];
  const title = pageTitle(pageContent);

  return (
    <MenuItem
      id={`markdown/${pageName}`}
      label={title}
      onSelect={useDispatchActionCallback(
        goToSubmenu,
        `markdown/${pageName}` as DialogId,
      )}
      doubleHeightWhenFocussed
    />
  );
};

export const ReadTheManualMenu = () => {
  return (
    <>
      <Border className="bg-midGrey zx:bg-zxCyan" />
      <Dialog className="bg-highlightBeige zx:bg-zxCyanDimmed">
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
        >
          {[
            ...iterate(keys(manualPages)).map((pageName) => {
              return <MarkdownMenuItem key={pageName} pageName={pageName} />;
            }),
          ]}

          <MenuItemSeparator />
          <BackMenuItem />
        </MenuItems>
      </Dialog>
    </>
  );
};
