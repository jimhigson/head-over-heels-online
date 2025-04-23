import { Dialog } from "../../../../../../ui/dialog";
import { Border } from "../../../../../../ui/Border";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import {
  backToParentMenu,
  gameOver,
} from "../../../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { SelectedItemHint } from "../../SelectedItemHint";
import Portal from "@mutabazia/react-portal";
import { useAppSelector } from "../../../../../../store/hooks";
import { reincarnateSelected } from "../offerReincarnation/OfferReincarnationDialog";
import { useGameApi } from "../../../../GameApiContext";

export const QuitGameConfirmDialog = () => {
  const hasReincarnationPoint = useAppSelector(
    (state) => state.gameMenus.reincarnationPoint !== undefined,
  );
  const gameApi = useGameApi();
  return (
    <DialogPortal>
      <Border className="bg-midRed zx:bg-zxYellow" />
      <Dialog className="bg-white zx:bg-zxRed px-1">
        <Portal.Provider>
          <div className="flex flex-col gap-y-2 mt-1 items-center h-full">
            <BitmapText className="sprites-double-height resHandheld:mt-0 text-midRed zx:text-zxWhite">
              Quit the game?
            </BitmapText>
            <MenuItems className="text-lightGrey zx:text-zxWhite resHandheld:mt-0 selectedMenuItem:text-midRed zx:selectedMenuItem:text-zxYellow resHandheld:!gap-y-1">
              <MenuItem
                doubleHeightWhenFocussed
                id="no"
                label="Don’t quit"
                leader={
                  <span className="sprite texture-head.walking.awayLeft.2 selectedMenuItem:texture-animated-head.walking.towardsRight sprites-normal-height zx:sprite-revert-to-white" />
                }
                onSelect={useDispatchActionCallback(backToParentMenu)}
                hint="Back to the game"
              />
              {hasReincarnationPoint && (
                <MenuItem
                  doubleHeightWhenFocussed
                  id="reincarnate"
                  label="Reincarnate"
                  leader={
                    <span className="sprite texture-fish.1 selectedMenuItem:texture-animated-fish sprites-normal-height zx:sprite-revert-to-white" />
                  }
                  onSelect={() => reincarnateSelected(gameApi)}
                  hint="Go back and continue from the last reincarnation fish you ate"
                />
              )}
              <MenuItem
                doubleHeightWhenFocussed
                id="yes"
                label="Yes: quit"
                onSelect={useDispatchActionCallback(gameOver, {
                  offerReincarnation: false,
                })}
                leader={
                  <span className="sprite texture-bubbles.white.1 selectedMenuItem:texture-animated-bubbles.white sprites-normal-height zx:sprite-revert-to-white" />
                }
                hint={
                  <BlockyMarkdown
                    className="zx:[&_.strong]:text-zxYellow"
                    markdown="**Warning!** This game will end!"
                  />
                }
              />
            </MenuItems>
            <SelectedItemHint className="text-midGrey zx:text-zxWhite resHandheld:hidden" />
          </div>
        </Portal.Provider>
      </Dialog>
    </DialogPortal>
  );
};
