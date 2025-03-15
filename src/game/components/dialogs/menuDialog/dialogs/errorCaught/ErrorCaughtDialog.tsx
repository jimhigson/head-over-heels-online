import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { Border } from "../../../../../../ui/Border";
import { MenuItems } from "../../MenuItems";
import { MenuItem } from "../../MenuItem";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import {
  errorDismissed,
  reincarnationAccepted,
} from "../../../../../../store/slices/gameMenusSlice";
import { useAppSelector } from "../../../../../../store/hooks";

const markdown = `##The game crashed
Maybe:

* open an [issue on github](https://github.com/jimhigson/head-over-heels-online/issues)
* email [jim@blockstack.ing](mailto:jim@blockstack.ing)
* rant on the [discord](https://discord.gg/XmV9QNWY)
* play [this](https://www.file-hunter.com/Homebrew/?id=headoverheels) instead`;

export const ErrorCaughtDialog = () => {
  const hasReincarnationPoint = useAppSelector(
    (state) => state.gameMenus.reincarnationPoint !== undefined,
  );
  const reincarnateCallback = useDispatchActionCallback(reincarnationAccepted);

  return (
    <DialogPortal>
      <Border className="loading-border" />
      <Dialog className="bg-white zx:bg-zxRed gap-y-0 text-redShadow zx:text-zxBlack">
        <BlockyMarkdown markdown={markdown} />
        <MenuItems className="text-lightGrey zx:text-zxWhite mt-1 resGameboy:mt-0 selectedMenuItem:text-midRed zx:selectedMenuItem:text-zxYellow resGameboy:!gap-y-1">
          <MenuItem
            doubleHeightWhenFocussed
            id="tryContinue"
            label="Ignore, hope it goes away"
            onSelect={useDispatchActionCallback(errorDismissed, "ignore")}
          />
          {hasReincarnationPoint && (
            <MenuItem
              doubleHeightWhenFocussed
              id="reincarnate"
              label="Try reincarnating"
              onSelect={reincarnateCallback}
            />
          )}
          <MenuItem
            doubleHeightWhenFocussed
            id="clearAllData"
            label="Clear all data, start again"
            onSelect={useDispatchActionCallback(errorDismissed, "clearAllData")}
          />
        </MenuItems>
      </Dialog>
    </DialogPortal>
  );
};
