import Portal from "@mutabazia/react-portal";
import { useCallback } from "react";

import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { isTouchDevice } from "../../../../../../utils/detectEnv/detectDeviceType";
import { openExternal } from "../../../../../../utils/tauri/openExternalLink";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { BackMenuItem } from "../../BackMenuItem";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { SelectedItemHint } from "../../SelectedItemHint";
import { MobileStyleBackButton } from "../MobileStyleBackButton";

const blurbMarkdown = `##*HohEd ➡* the Level Editor
I built an *editor* so I could make the **sequel levels**

![](texture-headlessBase?float-left)**Make puzzles**!

*Challenge* others to **solve them**!

**In beta**; expect *crashes* and *confusion*!`;

export const SureWantEditorDialog = () => {
  const goToEditor = useCallback(() => {
    openExternal(import.meta.env.VITE_EDITOR_URL);
  }, []);

  return (
    <DialogPortal>
      <Border
        className="bg-pureBlack zx:bg-zxBlack"
        onClick={useDispatchActionCallback(backToParentMenu)}
      />
      <Dialog
        className="bg-shadowHalfbrite zx:bg-zxBlack px-1 py-0"
        dialogId="sureWantEditor"
      >
        <Portal.Provider>
          <div className="flex flex-col gap-y-2 mt-1 h-full">
            {isTouchDevice() && (
              <MobileStyleBackButton className="text-midGrey zx:text-zxWhite" />
            )}
            <div>
              <BlockyMarkdown
                className={`text-midGrey zx:text-zxWhite`}
                markdown={blurbMarkdown}
              />
            </div>

            <MenuItems className="text-lightGrey zx:text-zxWhite resHandheld:mt-0 selectedMenuItem:text-metallicBlue zx:selectedMenuItem:text-zxCyan resHandheld:!gap-y-1">
              <MenuItem
                doubleHeightWhenFocussed
                id="yes"
                label="Edit the levels"
                onSelect={goToEditor}
              />
              {isTouchDevice() || (
                <BackMenuItem customLabel="I’m scared, go back" />
              )}
            </MenuItems>
            {isTouchDevice() || (
              <SelectedItemHint className="text-midGrey zx:text-zxWhite resHandheld:hidden" />
            )}
          </div>
        </Portal.Provider>
      </Dialog>
    </DialogPortal>
  );
};
