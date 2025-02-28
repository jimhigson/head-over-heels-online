import { Border, Dialog } from "../../../../../ui/dialog";
import type { ManualPageName } from "../../../../../manual/pages";
import { manualPages, pageTitle } from "../../../../../manual/pages";
import {
  backToParentMenu,
  goToSubmenu,
} from "../../../../../store/gameMenusSlice";
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
import { DialogPortal } from "../../../../../ui/DialogPortal";

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

export const ReadTheManualDialog = () => {
  return (
    <DialogPortal>
      <Border
        className="bg-midGrey zx:bg-zxCyan"
        onClick={useDispatchActionCallback(backToParentMenu)}
      />
      <Dialog className="bg-highlightBeige zx:bg-zxCyanDimmed !h-tallDialog mobile:!h-full max-h-[calc(var(--block)*40)] resGameboy:py-0">
        <div className="text-moss zx:text-zxBlack mx-auto">
          <span className="sprite texture-book.x zx:sprite-revert-to-white" />
          <BitmapText className="sprites-double-height mx-1">
            Read the manual
          </BitmapText>
          <span className="sprite texture-book.y zx:sprite-revert-to-white" />
        </div>
        <MenuItems
          className={
            `text-redShadow zx:text-zxWhite ${multilineTextClass} !gap-y-0 ` +
            "selectedMenuItem:text-shadow zx:selectedMenuItem:text-zxBlack " +
            "overflow-y-scroll scrollbar scrollbar-w-1 " +
            "scrollbar-thumb-moss scrollbar-track-highlightBeige " +
            "zx:scrollbar-thumb-zxBlack zx:scrollbar-track-zxCyanDimmed " +
            // more of a gap on touch devices, or the areas are hard to hit:
            "mobile:!gap-y-1"
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
    </DialogPortal>
  );
};
