import type { Menu } from "../menus";
import { BitmapText } from "../../../Sprite";
import { backMenuItem } from "../backMenuItem";
import { mainMenuCycle } from "./mainMenu";
import { MainMenuHeading } from "./MainMenuHeading";
import { MenuItems } from "../MenuItems";
import { useAppSelector } from "../../../../../store/hooks";
import { objectValues, size } from "iter-tools";
import { iterate } from "../../../../../utils/iterate";

const GameOverMenuContent = () => {
  const planetsLiberatedCount = useAppSelector((state) =>
    size(iterate(objectValues(state.planetsLiberated)).filter(Boolean)),
  );

  return (
    <>
      <MainMenuHeading />
      <BitmapText
        classnameCycle={mainMenuCycle}
        className="mt-2 block text-center mx-auto sprites-double-height"
      >
        Dummy
      </BitmapText>
      <BitmapText className="mt-4 block text-center mx-auto text-highlightBeige zx:text-zxYellow">
        Score -
      </BitmapText>
      <BitmapText className="mt-2 block text-center mx-auto text-pink zx:text-zxCyan">
        Explored - rooms
      </BitmapText>
      <BitmapText className="mt-2 block text-center mx-auto text-lightGrey zx:text-zxWhite">
        Liberated {String(planetsLiberatedCount)} planets
      </BitmapText>
      <MenuItems className="hidden" />
    </>
  );
};

export const gameOverMenu: Menu = {
  dialogClassName: "bg-metallicBlueHalfbrite zx:bg-zxRed w-zx h-full block",
  borderClassName: "bg-redShadow",
  Content: GameOverMenuContent,
  // back menu item in the (hidden) menu just allows exiting more easily by pressing any button that
  // would normally select an item
  items: [backMenuItem],
};
