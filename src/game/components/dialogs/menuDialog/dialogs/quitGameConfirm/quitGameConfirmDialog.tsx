import { Dialog } from "../../../../../../ui/dialog";
import { Border } from "../../../../../../ui/Border";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import {
  backToParentMenu,
  gameOver,
} from "../../../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { SelectedItemHint } from "../../SelectedItemHint";
import { MainMenuHeading } from "../mainMenu/MainMenuHeading";
import Portal from "@mutabazia/react-portal";

export const QuitGameConfirmDialog = () => {
  return (
    <DialogPortal>
      <Border className="bg-midRed zx:bg-zxYellow" />
      <Dialog className="bg-white zx:bg-zxRed">
        <Portal.Provider>
          <MainMenuHeading noSubtitle />
          <div className="flex flex-col gap-y-2 mt-1 items-center">
            <BitmapText className="sprites-double-height mt-2 resHandheld:mt-0 text-midRed zx:text-zxWhite">
              Quit the game?
            </BitmapText>
            <MenuItems className="text-lightGrey zx:text-zxWhite resHandheld:mt-0 selectedMenuItem:text-midRed zx:selectedMenuItem:text-zxYellow resHandheld:!gap-y-1">
              <MenuItem
                doubleHeightWhenFocussed
                id="no"
                label="No"
                onSelect={useDispatchActionCallback(backToParentMenu)}
                hint="Go back to the game"
              />
              <MenuItem
                doubleHeightWhenFocussed
                id="yes"
                label="Yes"
                onSelect={useDispatchActionCallback(gameOver, {
                  offerReincarnation: false,
                })}
                hint={
                  <BlockyMarkdown
                    className="zx:[&_.strong]:text-zxYellow"
                    markdown="**Warning!** This game will end!"
                  />
                }
              />
            </MenuItems>
            <SelectedItemHint className="text-midGrey zx:text-zxWhite resHandheld:hidden" />
          </div>
        </Portal.Provider>
      </Dialog>
    </DialogPortal>
  );
};
