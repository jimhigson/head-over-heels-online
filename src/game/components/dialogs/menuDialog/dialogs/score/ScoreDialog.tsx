import { createSelector } from "@reduxjs/toolkit";

import { type IndividualCharacterName } from "../../../../../../model/modelTypes";
import { useAppSelector } from "../../../../../../store/hooks";
import {
  selectPlanetsLiberatedCount,
  useCurrentCampaign,
} from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
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
import { MainMenuHeading } from "../mainMenu/MainMenuHeading";

const ORIGINAL_GAME_MAX_SCORE = 94_000;

const calculateScore = (
  roomsExploredCount: number,
  planetsLiberatedCount: number,
  playersFree: number,
) => {
  // source: https://github.com/dougmencken/HeadOverHeels/blob/0babd055e91dee980bedce403ef53a35c8c526ef/source/guiactions/CreateGameOverSlide.cpp#L74
  return (
    roomsExploredCount * 160 +
    planetsLiberatedCount * 10_000 +
    playersFree * 10_000
  );
};

type ScoreThreshold = {
  /** Proportion of max score (0-1), exclusice of the upper limit */
  upToProportion: number;
  label: string;
};

// Thresholds from original game as proportions of the original game's max score
const scoreThresholds: ScoreThreshold[] = [
  { upToProportion: 8_000 / ORIGINAL_GAME_MAX_SCORE, label: "beginner" }, // ~0.085
  { upToProportion: 20_000 / ORIGINAL_GAME_MAX_SCORE, label: "novice" }, // ~0.213
  { upToProportion: 30_000 / ORIGINAL_GAME_MAX_SCORE, label: "spy" }, // ~0.319
  { upToProportion: 55_000 / ORIGINAL_GAME_MAX_SCORE, label: "master-spy" }, // ~0.585
  { upToProportion: 84_000 / ORIGINAL_GAME_MAX_SCORE, label: "hero" }, // ~0.894
  { upToProportion: 1.0, label: "liberator" },
  { upToProportion: Infinity, label: "completionist" },
];

const getScoreLabel = (score: number, maxScore: number): string => {
  const proportion = score / maxScore;

  for (const { upToProportion, label } of scoreThresholds) {
    if (proportion < upToProportion) {
      return label;
    }
  }
  // This should never be reached due to Infinity threshold
  return "completionist";
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

export const ScoreDialog = () => {
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

  const score = calculateScore(
    roomsExploredCount,
    planetsLiberatedCount,
    freeCharacters.length,
  );

  const roomCount = objectSize(campaign.rooms);
  const maxScore = calculateScore(roomCount, 5, 2);

  const scoreLabel = getScoreLabel(score, maxScore);

  return (
    <DialogPortal>
      <Border class="bg-metallicBlue zx:bg-zxCyan toppy:bg-toppyCool3" />
      <Dialog
        class="bg-metallicBlueHalfbrite zx:bg-zxRed toppy:bg-toppyCool4 w-zx h-full flex flex-col"
        onClick={useDispatchActionCallback(backToParentMenu)}
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
          <span class="mt-1 block text-center mx-auto text-lightGrey zx:text-zxWhite toppy:text-toppyGrey1">
            Liberated {planetsLiberatedCount} planets
          </span>
          <MenuItems class="hidden">
            <BackMenuItem />
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
