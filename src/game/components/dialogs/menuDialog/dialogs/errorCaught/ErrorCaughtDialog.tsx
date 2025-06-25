import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { Border } from "../../../../../../ui/Border";
import { MenuItems } from "../../MenuItems";
import { MenuItem } from "../../MenuItem";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import type { SerialisableError } from "src/utils/redux/createSerialisableErrors";
import {
  errorDismissed,
  reincarnationAccepted,
} from "../../../../../../store/slices/gameMenusSlice";
import { useAppSelector } from "../../../../../../store/hooks";
import { multilineTextClass } from "../../multilineTextClass";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { useState } from "react";
import { StackTracesWithLinks } from "./StackTraceWithLinks";

const markdown = `##The game crashed
Maybe:

* open an [issue on github](https://github.com/jimhigson/head-over-heels-online/issues)
* email [jim@blockstack.ing](mailto:jim@blockstack.ing)
* rant on the [discord](https://discord.gg/XmV9QNWY)
* play [this](https://www.file-hunter.com/Homebrew/?id=headoverheels) instead`;

export const ErrorCaughtDialog = ({
  errors,
}: {
  errors: Array<SerialisableError>;
}) => {
  const hasReincarnationPoint = useAppSelector(
    (state) => state.gameMenus.reincarnationPoint !== undefined,
  );
  const [copied, setCopied] = useState<boolean>(false);
  const reincarnateCallback = useDispatchActionCallback(reincarnationAccepted);

  const errorsReportText = errors.toReversed().map(
    ({ stack, message }) =>
      // In Chrome the message is already included in stack, but not Safari and maybe others
      `
${message}

${stack}
  `,
  ).join(`
    
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
⬆⬆ CAUSE        RETHROWN IN ⬇⬇
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

`);

  return (
    <DialogPortal>
      <Border className="loading-border" />
      <Dialog
        className="bg-white zx:bg-zxRed gap-y-0 text-redShadow zx:text-zxBlack px-1"
        tall
      >
        <div
          className={
            "overflow-y-scroll h-full " +
            "scrollbar scrollbar-w-1 pl-1 " +
            "scrollbar-thumb-midRed scrollbar-track-highlightBeige " +
            "zx:scrollbar-thumb-zxCyanDimmed zx:scrollbar-track-zxCyan"
          }
        >
          <BlockyMarkdown markdown={markdown} />
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
            {copied ?
              <BitmapText className="text-metallicBlue col-span-2 sprites-double-height ml-3">
                Error report copied
              </BitmapText>
            : <MenuItem
                doubleHeightWhenFocussed
                id="copyClipboard"
                label="Copy error to clipboard"
                onSelect={() =>
                  navigator.clipboard
                    .writeText(errorsReportText)
                    .then(() => setCopied(true))
                }
              />
            }
          </MenuItems>
          <hr className="bg-pastelBlue zx:bg-zxWhite h-1 my-1 border-none" />
          <BitmapText className="block sprites-double-height my-1 text-midRed zx:text-zxWhite`">
            Error message for nerds:
          </BitmapText>
          <pre
            className={`text-midRed zx:text-zxWhite leading-[1em] [&_a]:text-metallicBlue`}
          >
            <StackTracesWithLinks>{errorsReportText}</StackTracesWithLinks>
          </pre>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
