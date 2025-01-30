import { gameOver } from "../../../../../store/gameMenusSlice";
import { BitmapText } from "../../../Sprite";
import { MenuItems } from "../MenuItems";
import type { Menu } from "../menus";
import { SelectedItemHint } from "../SelectedItemHint";
import { MainMenuHeading } from "./MainMenuHeading";

export const quitGameConfirmMenu: Menu = {
  dialogClassName: "bg-white zx:bg-zxRed",
  borderClassName: "bg-shadow",
  Content() {
    return (
      <>
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
        <MenuItems className="text-lightGrey zx:text-zxWhite selectedMenuItem:text-midRed zx:selectedMenuItem:text-zxYellow" />
        <SelectedItemHint className="text-midRed zx:text-zxWhite" />
      </>
    );
  },
  items: [
    {
      label: "No",
      type: "back",
      className: "mt-0",
      hint: "Go back to the game",
    },
    {
      label: "Yes",
      type: "dispatch",
      dispatch: () => gameOver(),
      hint: "Warning! This game will end!",
    },
  ],
};
