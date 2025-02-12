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

  // source: https://github.com/dougmencken/HeadOverHeels/blob/0babd055e91dee980bedce403ef53a35c8c526ef/source/guiactions/CreateGameOverSlide.cpp#L74
  const score = roomsExploredCount * 160 + planetsLiberatedCount * 10_000;

  const scoreLabel =
    score < 8_000 ? "dummy"
    : score < 20_000 ? "novice"
    : score < 30_000 ? "spy"
    : score < 55_000 ? "master-spy"
    : score < 84_000 ? "hero"
    : "liberator";

  // we are assuming the original campaign - will need to be changed
  // when others are supported
  const roomCount = size(objectKeys(campaign.rooms));
  return (
    <DialogPortal>
      <Border className="bg-metallicBlue zx:bg-zxCyan" />
      <Dialog
        className="bg-metallicBlueHalfbrite zx:bg-zxRed w-zx h-full block"
        onClick={useDispatchActionCallback(backToParentMenu)}
      >
        <MainMenuHeading />
        <BitmapText
          classnameCycle={mainMenuCycle}
          className="mt-2 block text-center mx-auto sprites-double-height"
        >
          {scoreLabel}
        </BitmapText>
        <BitmapText className="mt-4 block text-center mx-auto text-highlightBeige zx:text-zxYellow">
          Score {score.toLocaleString()}
        </BitmapText>
        <BitmapText className="mt-2 block text-center mx-auto text-pink zx:text-zxCyan">
          Explored {roomsExploredCount} / {roomCount} rooms{" "}
          {`(${((100 * roomsExploredCount) / roomCount).toFixed(1)}%)`}
        </BitmapText>
        <BitmapText className="mt-2 block text-center mx-auto text-lightGrey zx:text-zxWhite">
          Liberated {planetsLiberatedCount} planets
        </BitmapText>
        <MenuItems className="hidden">
          <BackMenuItem />
        </MenuItems>
      </Dialog>
    </DialogPortal>
  );
};
