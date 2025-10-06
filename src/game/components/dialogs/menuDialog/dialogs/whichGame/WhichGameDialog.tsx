import type { EmptyObject } from "type-fest";

import { originalCampaignLocator } from "../../../../../../model/modelTypes";
import {
  backToParentMenu,
  gameStarted,
  goToSubmenu,
} from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { spriteLeaderClasses } from "../controlOptions/spriteLeaderClasses";
import { MobileStyleBackButton } from "../MobileStyleBackButton";

// this uuid is the user id of jim@blockstack.ing on github for supabase
const jimAtBlockstackingUserId = "2924c962-99f1-4dd2-9b9c-fef832dc991b";

export const WhichGameDialog = (_emptyProps: EmptyObject) => {
  return (
    <DialogPortal>
      <Border
        className="bg-metallicBlueHalfbrite zx:bg-zxRed"
        onClick={useDispatchActionCallback(backToParentMenu)}
      />
      <Dialog
        tall
        className="bg-metallicBlueHalfbrite text-highlightBeige selectedMenuItem:text-white zx:bg-zxRed gap-y-2 resHandheld:gap-y-1 overflow-y-scroll"
      >
        <div className="flex flex-col gap-2">
          <MobileStyleBackButton className="text-highlightBeige " />
          <BitmapText className="text-midRed zx:text-zxYellow sprites-double-height pl-4">
            Select which game
          </BitmapText>
        </div>
        <div className="zx:text-zxCyan resHandheld:mt-half flex flex-col gap-1">
          <MenuItems className="gap-y-1">
            <MenuItem
              id="originalGame"
              label="Original Remastered"
              doubleHeightWhenFocussed
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
                  className="text-lightGrey sprites-normal-height"
                  markdown={`Remaster of the **300-some** rooms from the original game, lightly updated for modern play`}
                />
              }
            />
            <MenuItem
              id="remake"
              label="38 Years Later"
              doubleHeightWhenFocussed
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
                  className={`${spriteLeaderClasses} sprite texture-heels_walking_right_2 selectedMenuItem:texture-animated-heels_walking_right sprites-normal-height zx:sprite-revert-to-white`}
                />
              }
              hint={
                <BlockyMarkdown
                  className="text-lightGrey sprites-normal-height"
                  markdown={`Unofficial sequel - the empire is back! All-new levels designed for the remake. **work in progress**`}
                />
              }
            />
            <MenuItem
              id="community"
              label="Community contributed"
              doubleHeightWhenFocussed
              hintInline
              onSelect={useDispatchActionCallback(
                goToSubmenu,
                "communityGames",
              )}
              leader={
                <span
                  className={`${spriteLeaderClasses} sprite texture-charles_right sprites-normal-height zx:sprite-revert-to-white`}
                />
              }
              hint={
                <BlockyMarkdown
                  className="text-lightGrey sprites-normal-height"
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
