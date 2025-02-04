import { BitmapText } from "../../../../Sprite";
import { MenuItems } from "../../MenuItems";
import { useAppSelector } from "../../../../../../store/hooks";
import { objectValues, size } from "iter-tools";
import { iterate } from "../../../../../../utils/iterate";
import { MainMenuHeading } from "../mainMenu/MainMenuHeading";
import { mainMenuCycle } from "../mainMenu/mainMenuCycle";
import { Dialog } from "../../../../../../components/ui/dialog";
import { BackMenuItem } from "../../BackMenuItem";

export const GameOverDialog = () => {
  const planetsLiberatedCount = useAppSelector((state) =>
    size(iterate(objectValues(state.planetsLiberated)).filter(Boolean)),
  );
  return (
    <Dialog
      className="bg-metallicBlueHalfbrite zx:bg-zxRed w-zx h-full block"
      borderClassName="bg-redShadow"
    >
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
      <MenuItems className="hidden">
        <BackMenuItem />
      </MenuItems>
    </Dialog>
  );
};
