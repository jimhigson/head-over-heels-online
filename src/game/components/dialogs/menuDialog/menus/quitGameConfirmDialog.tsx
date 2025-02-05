import { Border, Dialog } from "../../../../../components/ui/dialog";
import {
  backToParentMenu,
  gameOver,
} from "../../../../../store/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../store/useDispatchCallback";
import { BlockyMarkdown } from "../../../BlockyMarkdown";
import { BitmapText } from "../../../Sprite";
import { MenuItem } from "../MenuItem";
import { MenuItems } from "../MenuItems";
import { MenuItemSeparator } from "../MenuItemSeparator";
import { SelectedItemHint } from "../SelectedItemHint";
import { MainMenuHeading } from "./mainMenu/MainMenuHeading";
import Portal from "@mutabazia/react-portal";

export const QuitGameConfirmDialog = () => {
  return (
    <>
      <Border className="bg-shadow zx:bg-zxYellow" />
      <Dialog className="bg-white zx:bg-zxRed">
        <Portal.Provider>
          <MainMenuHeading />
          <BitmapText
            className="ml-3 sprites-double-height"
            classnameCycle={[
              "text-redShadow zx:text-zxWhite",
              "text-midRed zx:text-zxYellow",
            ]}
          >
            Quit the game?
          </BitmapText>
          <MenuItems className="text-lightGrey zx:text-zxWhite selectedMenuItem:text-midRed zx:selectedMenuItem:text-zxYellow">
            <MenuItemSeparator />
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
              onSelect={useDispatchActionCallback(gameOver)}
              hint={
                <BlockyMarkdown
                  className="zx:[&_.strong]:text-zxYellow"
                  markdown="**Warning!** This game will end!"
                />
              }
            />
          </MenuItems>
          <SelectedItemHint className="text-shadow zx:text-zxWhite" />
        </Portal.Provider>
      </Dialog>
    </>
  );
};
