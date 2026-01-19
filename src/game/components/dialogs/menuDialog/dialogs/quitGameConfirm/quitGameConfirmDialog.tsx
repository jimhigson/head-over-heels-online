import Portal from "@mutabazia/react-portal";

import { useAppSelector } from "../../../../../../store/hooks";
import {
  backToParentMenu,
  gameOver,
} from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { useGameApi } from "../../../../GameApiContext";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { SelectedItemHint } from "../../SelectedItemHint";
import { spriteLeaderClasses } from "../controlOptions/spriteLeaderClasses";
import { reincarnateSelected } from "../offerReincarnation/OfferReincarnationDialog";

export const QuitGameConfirmDialog = () => {
  const hasReincarnationPoint = useAppSelector(
    (state) => state.gameMenus.gameInPlay.reincarnationPoint !== undefined,
  );
  const gameApi = useGameApi();
  return (
    <DialogPortal>
      <Border className="bg-midRed zx:bg-zxYellowDimmed" />
      <Dialog
        className="bg-white zx:bg-zxRedDimmed px-1"
        dialogId="quitGameConfirm"
      >
        <Portal.Provider>
          <div className="flex flex-col gap-y-2 mt-1 items-center h-full">
            <BitmapText className="sprites-double-height resHandheld:mt-0 text-midRed zx:text-zxWhite">
              Quit the Game?
            </BitmapText>
            <MenuItems className="text-lightGrey zx:text-zxWhite resHandheld:mt-0 resHandheld:!gap-y-1">
              <MenuItem
                doubleHeightWhenFocussed
                id="no"
                label="Back"
                className="selectedMenuItem:text-moss zx:selectedMenuItem:text-zxGreen"
                leader={
                  <span
                    className={`${spriteLeaderClasses} sprite texture-head_walking_awayLeft_2 selectedMenuItem:texture-animated-head_walking_towardsRight sprites-normal-height zx:sprite-revert-to-white`}
                  />
                }
                onSelect={useDispatchActionCallback(backToParentMenu)}
                hint="Back to the game"
                verticalAlignItemsCentre
              />
              {hasReincarnationPoint && (
                <MenuItem
                  doubleHeightWhenFocussed
                  id="reincarnate"
                  label="Reincarnate"
                  className="selectedMenuItem:text-metallicBlue zx:selectedMenuItem:text-zxBlue"
                  leader={
                    <span
                      className={`${spriteLeaderClasses} sprite texture-fish_1 selectedMenuItem:texture-animated-fish sprites-normal-height zx:sprite-revert-to-white`}
                    />
                  }
                  onSelect={() => reincarnateSelected(gameApi)}
                  hint={
                    <BlockyMarkdown
                      className="zx:[&_.strong]:text-zxYellow"
                      markdown="Go back and continue from the last **Reincarnation Fish** you ate"
                    />
                  }
                  verticalAlignItemsCentre
                />
              )}
              <MenuItem
                doubleHeightWhenFocussed
                id="yes"
                label="Quit"
                className="selectedMenuItem:text-midRed zx:selectedMenuItem:text-zxYellow"
                onSelect={useDispatchActionCallback(gameOver, {
                  offerReincarnation: false,
                })}
                leader={
                  <span
                    className={`${spriteLeaderClasses} sprite texture-bubbles_white_1 selectedMenuItem:texture-animated-bubbles_bounce_white sprites-normal-height zx:sprite-revert-to-white`}
                  />
                }
                hint={
                  <BlockyMarkdown
                    className="zx:[&_.strong]:text-zxYellow"
                    markdown="**Warning!** This game will end!"
                  />
                }
                verticalAlignItemsCentre
              />
            </MenuItems>
            <SelectedItemHint className="text-midGrey zx:text-zxWhite resHandheld:hidden" />
          </div>
        </Portal.Provider>
      </Dialog>
    </DialogPortal>
  );
};
