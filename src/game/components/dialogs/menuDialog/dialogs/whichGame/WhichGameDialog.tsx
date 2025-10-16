import type { EmptyObject } from "type-fest";

import { originalCampaignLocator } from "../../../../../../model/modelTypes";
import {
  gameStarted,
  goToSubmenu,
} from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { spriteLeaderClasses } from "../controlOptions/spriteLeaderClasses";
import { DialogTitleBar } from "../DialogTitleBar";
import { selectGameHintMarkdownClassName } from "./selectGameHintMarkdownClassName";

// this uuid is the user id of jim@blockstack.ing on github for supabase
const jimAtBlockstackingUserId = "2924c962-99f1-4dd2-9b9c-fef832dc991b";

export const WhichGameDialog = (_emptyProps: EmptyObject) => {
  return (
    <DialogPortal>
      <Dialog
        fullScreen
        className="bg-metallicBlueHalfbrite zx:text-zxCyan text-highlightBeige selectedMenuItem:text-white zx:bg-zxRed gap-y-2 resHandheld:gap-y-1 py-0 gap-y-0"
        dialogId="whichGame"
      >
        <DialogTitleBar path={["Select which game"]} className="mobile:px-4" />
        <div
          className={
            "flex flex-col gap-1 p-1 " +
            //"min-h-full " +
            "overflow-y-scroll scrollbar scrollbar-w-1 " +
            "scrollbar-thumb-lightGrey scrollbar-track-metallicBlueHalfbrite " +
            "zx:scrollbar-thumb-zxBlue zx:scrollbar-track-zxWhite " +
            // bring away from any 'notch' on mobile devices:
            "mobile:px-3 "
          }
        >
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
