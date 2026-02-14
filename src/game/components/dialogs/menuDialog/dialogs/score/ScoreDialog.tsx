import { createSelector } from "@reduxjs/toolkit";
import { objectKeys, objectValues, size } from "iter-tools-es";

import type { IndividualCharacterName } from "../../../../../../model/modelTypes";
import type { RootState } from "../../../../../../store/store";

import { useAppSelector } from "../../../../../../store/hooks";
import {
  selectPlanetsLiberatedCount,
  useCurrentCampaign,
} from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { iterate } from "../../../../../../utils/iterate";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { BackMenuItem } from "../../BackMenuItem";
import { MenuItems } from "../../MenuItems";
import { multilineTextClass } from "../../multilineTextClass";
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
    if (proportion < upToProportion) return label;
  }
  // This should never be reached due to Infinity threshold
  return "completionist";
};

const selectFreeCharacters = createSelector(
  ({
    gameMenus: {
      gameInPlay: { freeCharacters },
    },
  }: RootState) => freeCharacters,
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
  <span className="block text-center mx-auto text-lightGrey zx:text-zxYellow">
    {freeCharacterName === "head" ?
      <BitmapText className="text-metallicBlue zx:text-zxBlue">Head</BitmapText>
    : <BitmapText className="text-pink zx:text-zxWhite">Heels</BitmapText>}
    <BitmapText> is</BitmapText>
    <BitmapText classnameCycle={mainMenuCycle}> free</BitmapText>
  </span>
);

export const ScoreDialog = () => {
  const campaign = useCurrentCampaign();

  const planetsLiberatedCount = useAppSelector(selectPlanetsLiberatedCount);
  const roomsExploredCount = useAppSelector(
    ({
      gameMenus: {
        gameInPlay: { roomsExplored },
      },
    }) => size(iterate(objectValues(roomsExplored))),
  );

  const freeCharacters = useAppSelector(selectFreeCharacters);

  const score = calculateScore(
    roomsExploredCount,
    planetsLiberatedCount,
    freeCharacters.length,
  );

  const roomCount = size(objectKeys(campaign.rooms));
  const maxScore = calculateScore(roomCount, 5, 2);

  const scoreLabel = getScoreLabel(score, maxScore);

  return (
    <DialogPortal>
      <Border className="bg-metallicBlue zx:bg-zxCyan" />
      <Dialog
        className="bg-metallicBlueHalfbrite zx:bg-zxRed w-zx h-full flex flex-col"
        onClick={useDispatchActionCallback(backToParentMenu)}
        dialogId="score"
      >
        <MainMenuHeading noSubtitle className="resHandheld:hidden" />
        <div className={`${multilineTextClass} my-auto`}>
          <BitmapText
            classnameCycle={mainMenuCycle}
            className="mt-1 resHandheld:mt-3 block text-center mx-auto sprites-double-height sprites-uppercase"
          >
            {scoreLabel}
          </BitmapText>
          <BitmapText className="mt-1 block text-center mx-auto text-highlightBeige zx:text-zxYellow">
            Score {score.toLocaleString()}
          </BitmapText>
          <div className="mt-1">
            {freeCharacters.map((fc) => (
              <FreeCharacterText key={fc} freeCharacterName={fc} />
            ))}
          </div>
          <BitmapText className="mt-1 block text-center mx-auto text-pink zx:text-zxCyan">
            Explored {roomsExploredCount} / {roomCount} rooms{" "}
            {`(${asPercentage(roomsExploredCount, roomCount)})`}
          </BitmapText>
          <BitmapText className="mt-1 block text-center mx-auto text-lightGrey zx:text-zxWhite">
            Liberated {planetsLiberatedCount} planets
          </BitmapText>
          <MenuItems className="hidden">
            <BackMenuItem />
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
