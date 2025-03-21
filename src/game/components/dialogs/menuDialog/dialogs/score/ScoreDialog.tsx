import { BitmapText } from "../../../../Sprite";
import { MenuItems } from "../../MenuItems";
import { useAppSelector } from "../../../../../../store/hooks";
import { size, objectKeys, objectValues } from "iter-tools";
import { iterate } from "../../../../../../utils/iterate";
import { MainMenuHeading } from "../mainMenu/MainMenuHeading";
import { mainMenuCycle } from "../mainMenu/mainMenuCycle";
import { Dialog } from "../../../../../../ui/dialog";
import { Border } from "../../../../../../ui/Border";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BackMenuItem } from "../../BackMenuItem";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { backToParentMenu } from "../../../../../../store/slices/gameMenusSlice";
import { selectPlanetsLiberatedCount } from "../../../../../../store/selectors";
import { Suspense, use } from "react";
import { importOriginalCampaign } from "../../../../../../_generated/originalCampaign/campaign.import";
import { LoadingBorder } from "../../../../../../ui/LoadingBorder";
import { multilineTextClass } from "../../multilineTextClass";

const calculateScore = (
  roomsExploredCount: number,
  planetsLiberatedCount: number,
) => {
  // source: https://github.com/dougmencken/HeadOverHeels/blob/0babd055e91dee980bedce403ef53a35c8c526ef/source/guiactions/CreateGameOverSlide.cpp#L74
  return roomsExploredCount * 160 + planetsLiberatedCount * 10_000;
};

const ScoreDialogContents = () => {
  // somehow, this is stopping when the promise is already resolved and throwing up to the suspense
  // boundary, even though to get here you must already have the campaign imported :-/
  const { campaign } = use(importOriginalCampaign());

  const planetsLiberatedCount = useAppSelector(selectPlanetsLiberatedCount);
  const roomsExploredCount = useAppSelector(
    ({ gameMenus: { roomsExplored } }) =>
      size(iterate(objectValues(roomsExplored))),
  );

  const score = calculateScore(roomsExploredCount, planetsLiberatedCount);

  // we are assuming the original campaign - will need to be changed
  // when others are supported
  const roomCount = size(objectKeys(campaign.rooms));

  const maxScore = calculateScore(roomCount, 5);

  const scoreLabel =
    score < 8_000 ? "dummy"
    : score < 20_000 ? "novice"
    : score < 30_000 ? "spy"
    : score < 55_000 ? "master-spy"
    : score < 84_000 ? "hero"
    : score < maxScore ? "liberator"
    : "completionist";

  return (
    <>
      <MainMenuHeading noSubtitle className="resHandheld:hidden" />
      <BitmapText
        classnameCycle={mainMenuCycle}
        className="mt-2 resHandheld:mt-3 block text-center mx-auto sprites-double-height"
      >
        {scoreLabel}
      </BitmapText>
      <div className={`contents ${multilineTextClass}`}>
        <BitmapText className="mt-2 resHandheld:mt-1 block text-center mx-auto text-highlightBeige zx:text-zxYellow">
          Score {score.toLocaleString()}
        </BitmapText>
        <BitmapText className="mt-2 resHandheld:mt-1 block text-center mx-auto text-pink zx:text-zxCyan">
          Explored {roomsExploredCount} / {roomCount} rooms{" "}
          {`(${((100 * roomsExploredCount) / roomCount).toFixed(1)}%)`}
        </BitmapText>
        <BitmapText className="mt-2 resHandheld:mt-1 block text-center mx-auto text-lightGrey zx:text-zxWhite">
          Liberated {planetsLiberatedCount} planets
        </BitmapText>
        <MenuItems className="hidden">
          <BackMenuItem />
        </MenuItems>
      </div>
    </>
  );
};

export const ScoreDialog = () => {
  return (
    <DialogPortal>
      <Suspense
        fallback={
          <>
            <LoadingBorder />
            <Dialog className="bg-metallicBlueHalfbrite zx:bg-zxRed h-full block" />
          </>
        }
      >
        <Border className="bg-metallicBlue zx:bg-zxCyan" />
        <Dialog
          className="bg-metallicBlueHalfbrite zx:bg-zxRed w-zx h-full block"
          onClick={useDispatchActionCallback(backToParentMenu)}
        >
          <ScoreDialogContents />
        </Dialog>
      </Suspense>
    </DialogPortal>
  );
};
