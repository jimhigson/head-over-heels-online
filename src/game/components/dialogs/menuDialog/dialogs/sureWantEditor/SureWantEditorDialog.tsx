import { useCallback } from "react";
import { Dialog } from "../../../../../../ui/dialog";
import { Border } from "../../../../../../ui/Border";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { backToParentMenu } from "../../../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { SelectedItemHint } from "../../SelectedItemHint";
import Portal from "@mutabazia/react-portal";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { BackMenuItem } from "../../BackMenuItem";
import { MobileStyleBackButton } from "../MobileStyleBackButton";
import { isTouchDevice } from "../../../../../../utils/detectDeviceType";

const blurbMarkdown = `##*HoH-ed ➡* The Level editor
After porting the original game, I built an *editor* so I could make the **sequel levels**

![](texture-headlessBase?float-left)**Share puzzles** and *Challenge* others to **solve them**

hoh-ed is **in beta** - occasional crashes and frequent confusion`;

export const SureWantEditorDialog = () => {
  const goToEditor = useCallback(() => {
    window.location.href = import.meta.env.VITE_EDITOR_URL;
  }, []);

  return (
    <DialogPortal>
      <Border
        className="bg-metallicBlue zx:bg-zxCyan"
        onClick={useDispatchActionCallback(backToParentMenu)}
      />
      <Dialog className="bg-white zx:bg-zxBlack px-1">
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
              {isTouchDevice() || <BackMenuItem />}
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
