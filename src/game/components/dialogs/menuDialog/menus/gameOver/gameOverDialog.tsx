import { BitmapText } from "../../../../Sprite";
import { MenuItems } from "../../MenuItems";
import { useAppSelector } from "../../../../../../store/hooks";
import { objectValues, size } from "iter-tools";
import { iterate } from "../../../../../../utils/iterate";
import { MainMenuHeading } from "../mainMenu/MainMenuHeading";
import { mainMenuCycle } from "../mainMenu/mainMenuCycle";
import { Border, Dialog } from "../../../../../../components/ui/dialog";
import { BackMenuItem } from "../../BackMenuItem";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { backToParentMenu } from "../../../../../../store/gameMenusSlice";

export const GameOverDialog = () => {
  const planetsLiberatedCount = useAppSelector((state) =>
    size(iterate(objectValues(state.planetsLiberated)).filter(Boolean)),
  );
  const roomsExploredCount = useAppSelector((state) =>
    size(iterate(objectValues(state.roomsExplored))),
  );
  return (
    <>
      <Border className="bg-redShadow zx:bg-zxCyan" />
      <Dialog
        className="bg-metallicBlueHalfbrite zx:bg-zxRed w-zx h-full block"
        onClick={useDispatchActionCallback(backToParentMenu)}
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
          Explored {String(roomsExploredCount)} rooms
        </BitmapText>
        <BitmapText className="mt-2 block text-center mx-auto text-lightGrey zx:text-zxWhite">
          Liberated {String(planetsLiberatedCount)} planets
        </BitmapText>
        <MenuItems className="hidden">
          <BackMenuItem />
        </MenuItems>
      </Dialog>
    </>
  );
};
