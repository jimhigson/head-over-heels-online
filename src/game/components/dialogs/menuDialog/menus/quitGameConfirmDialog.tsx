import { Dialog } from "../../../../../components/ui/dialog";
import {
  backToParentMenu,
  gameOver,
} from "../../../../../store/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../store/useDispatchCallback";
import { BitmapText } from "../../../Sprite";
import { MenuItem } from "../MenuItem";
import { MenuItems } from "../MenuItems";
import { MenuItemSeparator } from "../MenuItemSeparator";
import { SelectedItemHint } from "../SelectedItemHint";
import { MainMenuHeading } from "./mainMenu/MainMenuHeading";

export const QuitGameConfirmDialog = () => {
  return (
    <Dialog className="bg-white zx:bg-zxRed" borderClassName="bg-shadow">
      <MainMenuHeading />
      <BitmapText
        className="ml-3 sprites-double-height"
        classnameCycle={[
          "text-redShadow zx:text-zxWhite",
          "text-shadow zx:text-zxYellow",
        ]}
      >
        Quit the game?
      </BitmapText>
      <MenuItems className="text-lightGrey zx:text-zxWhite selectedMenuItem:text-midRed zx:selectedMenuItem:text-zxYellow">
        <MenuItemSeparator />
        <MenuItem
          id="yes"
          label="Yes"
          onSelect={useDispatchActionCallback(gameOver)}
          hint="Warning! This game will end!"
        />
        <MenuItem
          id="no"
          label="No"
          onSelect={useDispatchActionCallback(backToParentMenu)}
          hint="Go back to the game"
        />
      </MenuItems>
      <SelectedItemHint className="text-midRed zx:text-zxWhite" />
    </Dialog>
  );
};
