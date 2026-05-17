import {
  type AnimatedTextureTailwindClass,
  type TextureTailwindClass,
} from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { useAppSelector } from "../../../../../../store/hooks";
import { gameOver } from "../../../../../../store/slices/gameInPlay/gameInPlaySlice";
import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { useGameApi } from "../../../../GameApiContext";
import { BitmapText } from "../../../../tailwindSprites/BitmapText";
import { usePlayableTailwindSpriteClassname } from "../../../../tailwindSprites/playableTailwindSpriteClassname";
import { spriteLeaderClasses } from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { reincarnateSelected } from "../offerReincarnation/OfferReincarnationDialog";

const hintClassName =
  "zx:[&_.strong]:text-zxYellow toppy:[&_.strong]:text-toppyWarm1";

const QuitGameHint = () => {
  const focussedItemId = useAppSelector(
    (state) => state.gameMenus.openMenus.at(0)?.focussedItemId,
  );

  switch (focussedItemId) {
    case "no":
      return <BitmapText>Back to the game</BitmapText>;
    case "reincarnate":
      return (
        <BlockyMarkdown
          className={hintClassName}
          markdown="Go back and continue from the last **Reincarnation Fish** you ate"
        />
      );
    case "yes":
      return (
        <BlockyMarkdown
          className={hintClassName}
          markdown="**Warning!** This game will end!"
        />
      );
    default:
      return null;
  }
};

export const QuitGameConfirmDialog = () => {
  const spriteClassname = usePlayableTailwindSpriteClassname();
  const noUnselectedTextureClass = spriteClassname({
    character: "head",
    action: "idle",
    facingXy8: "awayLeft",
  });
  const noSelectedTextureClass = `selectedMenuItem:${spriteClassname({
    character: "head",
    action: "walking",
    facingXy8: "towardsRight",
  })}`;
  const hasReincarnationPoint = useAppSelector(
    (state) => state.gameInPlay.gameInPlay.reincarnationPoint !== undefined,
  );
  const gameApi = useGameApi();
  return (
    <DialogPortal>
      <Border className="bg-midRed zx:bg-zxYellowDimmed toppy:bg-toppyPink2" />
      <Dialog
        className="bg-white zx:bg-zxRedDimmed toppy:bg-toppyWarm6 px-1"
        dialogId="quitGameConfirm"
      >
        <div className="flex flex-col gap-y-2 mt-1 items-center h-full">
          <BitmapText className="sprites-double-height resHandheld:mt-0 text-midRed zx:text-zxWhite toppy:text-toppyWarm1">
            End the Game?
          </BitmapText>
          <MenuItems className="text-lightGrey zx:text-zxWhite toppy:text-toppyGrey1 resHandheld:mt-0 resHandheld:!gap-y-1">
            <MenuItem
              doubleHeightWhenFocussed
              id="no"
              label="Back"
              className="selectedMenuItem:text-moss zx:selectedMenuItem:text-zxGreen toppy:selectedMenuItem:text-toppyCool2"
              leader={
                <span
                  className={`${spriteLeaderClasses} sprite ${noUnselectedTextureClass} ${noSelectedTextureClass} sprites-normal-height zx:sprite-revert-to-white`}
                />
              }
              onSelect={useDispatchActionCallback(backToParentMenu)}
              verticalAlignItemsCentre
            />
            {hasReincarnationPoint && (
              <MenuItem
                doubleHeightWhenFocussed
                id="reincarnate"
                label="Reincarnate"
                className="selectedMenuItem:text-metallicBlue zx:selectedMenuItem:text-zxBlue toppy:selectedMenuItem:text-toppyCool3"
                leader={
                  <span
                    className={`${spriteLeaderClasses} sprite ${"texture-fish_1" satisfies TextureTailwindClass} ${"selectedMenuItem:texture-animated-fish" satisfies AnimatedTextureTailwindClass} sprites-normal-height zx:sprite-revert-to-white`}
                  />
                }
                onSelect={() => reincarnateSelected(gameApi)}
                verticalAlignItemsCentre
              />
            )}
            <MenuItem
              doubleHeightWhenFocussed
              id="yes"
              label="End game"
              className="selectedMenuItem:text-midRed zx:selectedMenuItem:text-zxYellow toppy:selectedMenuItem:text-toppyPink2"
              onSelect={useDispatchActionCallback(gameOver, {
                reincarnationDeclined: false,
              })}
              leader={
                <span
                  className={`${spriteLeaderClasses} sprite ${"texture-bubbles_white_1" satisfies TextureTailwindClass} ${"selectedMenuItem:texture-animated-bubbles_bounce_white" satisfies AnimatedTextureTailwindClass} sprites-normal-height zx:sprite-revert-to-white`}
                />
              }
              verticalAlignItemsCentre
            />
          </MenuItems>
          <div className="text-midGrey zx:text-zxWhite toppy:text-toppyGrey1 resHandheld:hidden">
            <QuitGameHint />
          </div>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
