import { gameOver } from "../../../../../store/gameMenusSlice";
import { BitmapText } from "../../../Sprite";
import { MenuItems } from "../MenuItems";
import type { Menu } from "../menus";
import { MainMenuHeading } from "./mainMenu";

export const quitGameConfirmMenu: Menu = {
  dialogClassName: "bg-white",
  borderClassName: "bg-shadow",
  Content() {
    return (
      <>
        <MainMenuHeading />
        <BitmapText
          className="ml-3 sprites-double-height"
          classnameCycle={["text-redShadow", "text-shadow"]}
        >
          Quit the game?
        </BitmapText>
        <MenuItems className="text-lightGrey" selectedClassName="text-midRed" />
      </>
    );
  },
  items: [
    {
      label: "No",
      type: "back",
      className: "mt-0",
    },
    {
      label: "Yes",
      type: "dispatch",
      dispatch: () => gameOver(),
    },
  ],
};
