import { BitmapText } from "../../../../Sprite";
import { MenuItems } from "../../MenuItems";
import { useAppSelector } from "../../../../../../store/hooks";
import { size, objectKeys, objectValues } from "iter-tools";
import { iterate } from "../../../../../../utils/iterate";
import { MainMenuHeading } from "../mainMenu/MainMenuHeading";
import { mainMenuCycle } from "../mainMenu/mainMenuCycle";
import { Border, Dialog } from "../../../../../../components/ui/dialog";
import { DialogPortal } from "../../../../../../components/ui/DialogPortal";
import { BackMenuItem } from "../../BackMenuItem";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { backToParentMenu } from "../../../../../../store/gameMenusSlice";
import { campaign } from "../../../../../../_generated/originalCampaign/campaign";

export const GameOverDialog = () => {
  const planetsLiberatedCount = useAppSelector((state) =>
    size(iterate(objectValues(state.planetsLiberated)).filter(Boolean)),
  );
  const roomsExploredCount = useAppSelector((state) =>
    size(iterate(objectValues(state.roomsExplored))),
  );
  // we are assuming the original campaign - will need to be changed
  // when others are supported
  const roomCount = size(objectKeys(campaign.rooms));
  return (
    <DialogPortal>
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
          Explored {String(roomsExploredCount)} / {String(roomCount)} rooms
        </BitmapText>
        <BitmapText className="mt-2 block text-center mx-auto text-lightGrey zx:text-zxWhite">
          Liberated {String(planetsLiberatedCount)} planets
        </BitmapText>
        <MenuItems className="hidden">
          <BackMenuItem />
        </MenuItems>
      </Dialog>
    </DialogPortal>
  );
};
