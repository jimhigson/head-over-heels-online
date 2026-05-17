import { useState } from "preact/hooks";

import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import { clearAllData } from "../../../../../../store/slices/clearAllData";
import { reincarnationAccepted } from "../../../../../../store/slices/gameInPlay/gameInPlaySlice";
import { errorDismissed } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { ErrorDialog } from "../../../../../../ui/ErrorDialog";
import { type SerialisableError } from "../../../../../../utils/redux/createSerialisableErrors";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { BitmapText } from "../../../../tailwindSprites/BitmapText";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { multilineTextClass } from "../../multilineTextClass";

const markdownIntro = `## Uh-oh! The game crashed!
You could:

* Open an [issue on GitHub](https://github.com/jimhigson/head-over-heels-online/issues)
* Email [jim@blockstack.ing](mailto:jim@blockstack.ing)
* Rant on the [Discord server](https://discord.gg/XmV9QNWY)
* Play [the MSX remake](https://www.file-hunter.com/Homebrew/?id=headoverheels) instead`;

export const ErrorCaughtDialog = ({
  errors,
}: {
  errors: Array<SerialisableError>;
}) => {
  const hasReincarnationPoint = useAppSelector(
    (state) => state.gameInPlay.gameInPlay.reincarnationPoint !== undefined,
  );
  const [copied, setCopied] = useState<boolean>(false);
  const reincarnateCallback = useDispatchActionCallback(reincarnationAccepted);
  const dispatch = useAppDispatch();

  return (
    <ErrorDialog
      errors={errors}
      intro={<BlockyMarkdown markdown={markdownIntro} />}
    >
      {(errorsReportText) => (
        <MenuItems
          className={`text-lightGrey zx:text-zxWhite toppy:text-toppyGrey1 mt-1 resHandheld:mt-0 selectedMenuItem:text-midRed zx:selectedMenuItem:text-zxYellow toppy:selectedMenuItem:text-toppyPink2 resHandheld:!gap-y-1 ${multilineTextClass}`}
        >
          <MenuItem
            doubleHeightWhenFocussed
            id="tryContinue"
            label="Ignore, hope it goes away"
            onSelect={() => dispatch(errorDismissed())}
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
            label="Clear all data, reboot game"
            onSelect={() => dispatch(clearAllData())}
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
      )}
    </ErrorDialog>
  );
};
