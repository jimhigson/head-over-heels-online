import type { EmptyObject } from "type-fest";
import {
  gameStarted,
  backToParentMenu,
  goToSubmenu,
} from "../../../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { Border } from "../../../../../../ui/Border";
import { SelectedItemHint } from "../../SelectedItemHint";
import Portal from "@mutabazia/react-portal";
import { BackMenuItem } from "../../BackMenuItem";
import { MobileStyleBackButton } from "../MobileStyleBackButton";
import { isTouchDevice } from "../../../../../../utils/detectDeviceType";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { MenuItemSeparator } from "../../MenuItemSeparator";
import { spriteLeaderClasses } from "../controlOptions/spriteLeaderClasses";
import { originalCampaignLocator } from "../../../../../../model/modelTypes";

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
        className="bg-metallicBlueHalfbrite text-highlightBeige zx:bg-zxRed gap-y-2 resHandheld:gap-y-1 overflow-y-scroll"
      >
        <Portal.Provider>
          <div className="flex flex-col gap-2">
            {isTouchDevice() && (
              <MobileStyleBackButton className="text-highlightBeige" />
            )}
            <BitmapText className="text-midRed zx:text-zxYellow sprites-double-height pl-4">
              Select which game
            </BitmapText>
          </div>
          <div className="zx:text-zxCyan selectedMenuItem:text-white resHandheld:mt-half flex flex-col gap-1">
            <MenuItems className="gap-y-1">
              <MenuItem
                id="originalGame"
                label="original remastered"
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
                    markdown={`remaster of the **300-some** rooms from the original game`}
                  />
                }
              />
              <MenuItem
                id="remake"
                label="Sequel"
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
                    markdown={`unofficial; **work in progress**\n\nthe story continues **38 years later**: All-new levels designed for the remake`}
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
                    markdown={`check out what people have made in the editor`}
                  />
                }
              />
              <MenuItemSeparator />
              {isTouchDevice() || <BackMenuItem />}
            </MenuItems>
          </div>
          {isTouchDevice() || (
            <SelectedItemHint className="text-highlightBeige zx:text-zxCyan text-center max-w-32 mx-auto" />
          )}
        </Portal.Provider>
      </Dialog>
    </DialogPortal>
  );
};
