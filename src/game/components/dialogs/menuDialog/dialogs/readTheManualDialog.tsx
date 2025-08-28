import type { ManualPageName } from "../../../../../manual/pages";
import type { DialogId } from "../DialogId";

import { manualPages, pageTitle } from "../../../../../manual/pages";
import {
  backToParentMenu,
  goToSubmenu,
} from "../../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../ui/Border";
import { Dialog } from "../../../../../ui/dialog";
import { DialogPortal } from "../../../../../ui/DialogPortal";
import {
  detectDeviceType,
  isTouchDevice,
} from "../../../../../utils/detectDeviceType";
import { keysIter } from "../../../../../utils/entries";
import { iterate } from "../../../../../utils/iterate";
import { BitmapText } from "../../../tailwindSprites/Sprite";
import { BackMenuItem } from "../BackMenuItem";
import { MenuItem } from "../MenuItem";
import { MenuItems } from "../MenuItems";
import { MenuItemSeparator } from "../MenuItemSeparator";
import { multilineTextClass } from "../multilineTextClass";
import { MobileStyleBackButton } from "./MobileStyleBackButton";

const MarkdownMenuItem = ({ pageName }: { pageName: ManualPageName }) => {
  const pageContent = manualPages[pageName];
  const title = pageTitle(pageContent);
  // showing the focussed item is only really important on desktops - for touch devices it is less important
  const doubleHeightWhenFocussed = detectDeviceType() === "desktop";

  return (
    <MenuItem
      id={`markdown/${pageName}`}
      label={title}
      onSelect={useDispatchActionCallback(
        goToSubmenu,
        `markdown/${pageName}` as DialogId,
      )}
      doubleHeightWhenFocussed={doubleHeightWhenFocussed}
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
      <Dialog
        tall
        className="bg-highlightBeige zx:bg-zxCyanDimmed max-h-[calc(var(--block)*40)]"
      >
        <div
          className={
            `text-redShadow zx:text-zxWhite ${multilineTextClass} !gap-y-0 ` +
            "selectedMenuItem:text-shadow zx:selectedMenuItem:text-zxBlack " +
            // set up scrolling and the scroll bar:
            "overflow-y-scroll scrollbar scrollbar-w-1 pl-1 " +
            "scrollbar-thumb-moss scrollbar-track-highlightBeige " +
            "zx:scrollbar-thumb-zxBlack zx:scrollbar-track-zxCyanDimmed "
          }
        >
          {isTouchDevice() && <MobileStyleBackButton className="mb-1" />}
          <h1
            className={
              "text-moss zx:text-zxBlack mx-auto flex flex-row justify-center items-center w-full" +
              " mb-1"
            }
          >
            <span className="sprite texture-book_x zx:sprite-revert-to-white sprites-normal-height" />
            <BitmapText className="sprites-double-height mx-1">
              Read the manual
            </BitmapText>
            <span className="sprite texture-book_y zx:sprite-revert-to-white sprites-normal-height" />
          </h1>
          <MenuItems>
            {[
              ...iterate(keysIter(manualPages)).map((pageName) => {
                return <MarkdownMenuItem key={pageName} pageName={pageName} />;
              }),
            ]}

            <MenuItemSeparator />
            {isTouchDevice() || <BackMenuItem />}
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
