import { createSelector } from "@reduxjs/toolkit";

import { type IndividualCharacterName } from "../../../../../../model/modelTypes";
import { useAppSelector } from "../../../../../../store/hooks";
import { closeMenuThunk } from "../../../../../../store/slices/gameMenus/closeMenuThunk";
import {
  selectPlanetsLiberatedCount,
  useCurrentCampaign,
  usePickupsCollected,
} from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { type GameRootState } from "../../../../../../store/store";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { objectSize } from "../../../../../../utils/objectSize";
import { ColourCycleText } from "../../../../ColourCycleText";
import { BackMenuItem } from "../../BackMenuItem";
import { MenuItems } from "../../MenuItems";
import { mainMenuCycle } from "../mainMenu/mainMenuCycle";
import { mainMenuDialogColourClasses } from "../mainMenu/mainMenuDialogColourClasses";
import { MainMenuHeading } from "../mainMenu/MainMenuHeading";
import { countCampaignPickups } from "./countCampaignPickups";
import { countCollectedPickups } from "./countCollectedPickups";
import { scoreThresholds } from "./scoreThresholds.ts" with { type: "macro" };

const scoreThresholdsBuiltIn = scoreThresholds();

const calculateScore = (
  roomsExploredCount: number,
  planetsLiberatedCount: number,
  playersFree: number,
  pickupsCollectedCount: number,
) => {
  // source: https://github.com/dougmencken/HeadOverHeels/blob/0babd055e91dee980bedce403ef53a35c8c526ef/source/guiactions/CreateGameOverSlide.cpp#L74
  return (
    roomsExploredCount * 160 +
    planetsLiberatedCount * 10_000 +
    playersFree * 10_000 +
    // pickups are not in the original game's scoring, scored here like rooms:
    pickupsCollectedCount * 160
  );
};

const getScoreLabel = (score: number, maxScore: number): string => {
  const proportion = score / maxScore;

  for (const { upToProportion, label } of scoreThresholdsBuiltIn) {
    if (proportion < upToProportion) {
      return label;
    }
  }
  return proportion < 1 ? "liberator" : "completionist";
};

const selectFreeCharacters = createSelector(
  ({
    gameInPlay: {
      gameInPlay: { freeCharacters },
    },
  }: GameRootState) => freeCharacters,
  (freeCharacters) =>
    Object.keys(freeCharacters) as Array<keyof typeof freeCharacters>,
);

const asPercentage = (part: number, whole: number) =>
  `${((100 * part) / whole).toFixed(1)}%`;

const FreeCharacterText = ({
  freeCharacterName,
}: {
  freeCharacterName: IndividualCharacterName;
}) => (
  <span
    data-test-id={`free-${freeCharacterName}`}
    class="block text-center mx-auto text-lightGrey zx:text-zxYellow toppy:text-toppyWarm3"
  >
    {freeCharacterName === "head" ?
      <span class="text-metallicBlue zx:text-zxBlue toppy:text-toppyCool2">
        Head
      </span>
    : <span class="text-pink zx:text-zxWhite toppy:text-toppyPink1">Heels</span>
    }
    <span> is</span>
    <ColourCycleText classnameCycle={mainMenuCycle}>{" free"}</ColourCycleText>
  </span>
);

const ScoreDialog = () => {
  const campaign = useCurrentCampaign();

  const planetsLiberatedCount = useAppSelector(selectPlanetsLiberatedCount);
  const roomsExploredCount = useAppSelector(
    ({
      gameInPlay: {
        gameInPlay: { roomsExplored },
      },
    }) => objectSize(roomsExplored),
  );

  const freeCharacters = useAppSelector(selectFreeCharacters);

  const pickupsCollectedCount = countCollectedPickups(
    campaign,
    usePickupsCollected(),
  );
  const pickupsCount = countCampaignPickups(campaign);

  const score = calculateScore(
    roomsExploredCount,
    planetsLiberatedCount,
    freeCharacters.length,
    pickupsCollectedCount,
  );

  const roomCount = objectSize(campaign.rooms);
  const maxScore = calculateScore(roomCount, 5, 2, pickupsCount);

  const scoreLabel = getScoreLabel(score, maxScore);

  return (
    <DialogPortal>
      <Border class="bg-metallicBlue zx:bg-zxCyan toppy:bg-toppyCool3" />
      <Dialog
        class={`${mainMenuDialogColourClasses} w-zx h-full flex flex-col`}
        onClick={useDispatchActionCallback(closeMenuThunk, "score")}
        dialogId="score"
      >
        <MainMenuHeading noSubtitle class="resHandheld:hidden" />
        <div class="text-multi-line my-auto">
          <div class="mt-1 resHandheld:mt-3 text-center uppercase">
            <ColourCycleText
              classnameCycle={mainMenuCycle}
              class="text-double-height"
            >
              {scoreLabel}
            </ColourCycleText>
          </div>
          <span class="mt-1 block text-center mx-auto text-highlightBeige zx:text-zxYellow toppy:text-toppyWarm3">
            Score {score.toLocaleString()}
          </span>
          <div class="mt-1">
            {freeCharacters.map((fc) => (
              <FreeCharacterText key={fc} freeCharacterName={fc} />
            ))}
          </div>
          <span
            data-test-id="rooms-explored-summary"
            data-rooms-explored={roomsExploredCount}
            data-rooms-total={roomCount}
          >
            <span class="mt-1 block text-center mx-auto text-pink zx:text-zxCyan toppy:text-toppyPink1">
              Explored {roomsExploredCount} / {roomCount} rooms{" "}
              {`(${asPercentage(roomsExploredCount, roomCount)})`}
            </span>
          </span>
          {pickupsCount > 0 && (
            <span
              data-test-id="pickups-collected-summary"
              data-pickups-collected={pickupsCollectedCount}
              data-pickups-total={pickupsCount}
              class="mt-1 block text-center mx-auto text-metallicBlue zx:text-zxGreen toppy:text-toppyCool2"
            >
              Collected {pickupsCollectedCount} / {pickupsCount} items{" "}
              {`(${asPercentage(pickupsCollectedCount, pickupsCount)})`}
            </span>
          )}
          <span class="mt-1 block text-center mx-auto text-lightGrey zx:text-zxWhite toppy:text-toppyGrey1">
            Liberated {planetsLiberatedCount} planets
          </span>
          <MenuItems class="hidden">
            <BackMenuItem dialogId="score" />
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};

/** default export for preact/compat lazy() */
export default ScoreDialog;
