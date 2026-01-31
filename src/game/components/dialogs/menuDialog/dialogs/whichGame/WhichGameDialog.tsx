import type { EmptyObject } from "type-fest";

import { jimAtBlockstackingUserId } from "../../../../../../gameInfo";
import { originalCampaignLocator } from "../../../../../../model/modelTypes";
import {
  gameStarted,
  goToSubmenu,
} from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import {
  mainMenuScrollClasses,
  selectGameHintMarkdownClassName,
  spriteLeaderClasses,
} from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { DialogTitleBar } from "../DialogTitleBar";

export const WhichGameDialog = (_emptyProps: EmptyObject) => {
  return (
    <DialogPortal>
      <Dialog
        fullScreen
        className="bg-metallicBlueHalfbrite zx:text-zxCyan text-highlightBeige selectedMenuItem:text-white zx:bg-zxRed gap-y-2 resHandheld:gap-y-1 py-0 gap-y-0"
        dialogId="whichGame"
      >
        <DialogTitleBar path={["Select which game"]} className="mobile:px-4" />
        <div className={mainMenuScrollClasses}>
          <MenuItems className="gap-y-1">
            <MenuItem
              className="sprites-double-height"
              id="originalGame"
              label="Original Remastered"
              hintInline
              onSelect={useDispatchActionCallback(gameStarted, {
                campaignLocator: originalCampaignLocator,
              })}
              leader={
                <span
                  className={`${spriteLeaderClasses} sprite texture-head_walking_right_2 selectedMenuItem:texture-animated-head_walking_right sprites-normal-height zx:sprite-revert-to-white`}
                />
              }
              hint={
                <BlockyMarkdown
                  className={selectGameHintMarkdownClassName}
                  markdown={`*Remaster* of the **300-some** rooms from the original game, lightly updated for modern play`}
                />
              }
            />
            <MenuItem
              id="remake"
              label="38 Years Later"
              className="sprites-double-height"
              hintInline
              onSelect={useDispatchActionCallback(gameStarted, {
                campaignLocator: {
                  userId: jimAtBlockstackingUserId,
                  campaignName: "sequel",
                  version: -1,
                },
              })}
              leader={
                <span
                  className={`${spriteLeaderClasses} sprite texture-heels_standing_right selectedMenuItem:texture-animated-heels_walking_right sprites-normal-height zx:sprite-revert-to-white`}
                />
              }
              hint={
                <BlockyMarkdown
                  className={selectGameHintMarkdownClassName}
                  markdown={`*Unofficial sequel* - the empire is back! All-new levels designed for the remake. **Work in progress!**`}
                />
              }
            />
            <MenuItem
              id="community"
              label="Community contributed"
              className="sprites-double-height"
              hintInline
              onSelect={useDispatchActionCallback(
                goToSubmenu,
                "communityGames",
              )}
              opensSubMenu={true}
              leader={
                <span
                  className={`${spriteLeaderClasses} sprite texture-charles_right sprites-normal-height zx:sprite-revert-to-white`}
                />
              }
              hint={
                <BlockyMarkdown
                  className={selectGameHintMarkdownClassName}
                  markdown={`Check out what people have made in the editor`}
                />
              }
            />
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
