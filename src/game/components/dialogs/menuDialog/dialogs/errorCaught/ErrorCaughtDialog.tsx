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
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { multilineTextClass } from "../../multilineTextClass";

const markdown = `##The game crashed
Maybe:

* open an [issue on github](https://github.com/jimhigson/head-over-heels-online/issues)
* email [jim@blockstack.ing](mailto:jim@blockstack.ing)
* rant on the [discord](https://discord.gg/XmV9QNWY)
* play [this](https://www.file-hunter.com/Homebrew/?id=headoverheels) instead`;

export const ErrorCaughtDialog = ({
  message,
}: {
  message: string;
  stack?: string;
}) => {
  const hasReincarnationPoint = useAppSelector(
    (state) => state.gameMenus.reincarnationPoint !== undefined,
  );
  const reincarnateCallback = useDispatchActionCallback(reincarnationAccepted);

  return (
    <DialogPortal>
      <Border className="loading-border" />
      <Dialog className="bg-white zx:bg-zxRed gap-y-0 text-redShadow zx:text-zxBlack px-1">
        <div
          className={
            "overflow-y-scroll h-full " +
            "scrollbar scrollbar-w-1 pl-1 " +
            "scrollbar-thumb-midRed scrollbar-track-highlightBeige " +
            "zx:scrollbar-thumb-zxCyanDimmed zx:scrollbar-track-zxCyan"
          }
        >
          <BlockyMarkdown markdown={markdown} />
          <BitmapText className={`text-midRed ${multilineTextClass}`}>
            {message}
          </BitmapText>
          <MenuItems
            className={`text-lightGrey zx:text-zxWhite mt-1 resHandheld:mt-0 selectedMenuItem:text-midRed zx:selectedMenuItem:text-zxYellow resHandheld:!gap-y-1 ${multilineTextClass}`}
          >
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
              onSelect={useDispatchActionCallback(
                errorDismissed,
                "clearAllData",
              )}
            />
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
