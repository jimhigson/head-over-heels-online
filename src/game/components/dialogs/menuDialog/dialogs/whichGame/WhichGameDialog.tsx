import type { EmptyObject } from "type-fest";

import type { TextureTailwindClass } from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";

import { jimAtBlockstackingUserId } from "../../../../../../gameInfo";
import { originalCampaignLocator } from "../../../../../../model/modelTypes";
import { gameStarted } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { usePlayableTailwindSpriteClassname } from "../../../../tailwindSprites/PlayableTailwindSprite";
import {
  mainMenuScrollClasses,
  selectGameHintMarkdownClassName,
  spriteLeaderClasses,
} from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { DialogTitleBar } from "../DialogTitleBar";

export const WhichGameDialog = (_emptyProps: EmptyObject) => {
  const spriteClassname = usePlayableTailwindSpriteClassname();
  return (
    <DialogPortal>
      <Dialog
        fullScreen
        className="bg-metallicBlueHalfbrite zx:text-zxCyan text-highlightBeige selectedMenuItem:text-white zx:bg-zxRed gap-y-2 resHandheld:gap-y-1 py-0 gap-y-0"
        dialogId="whichGame"
      >
        <DialogTitleBar
          path={["Select which game"]}
          className="mobile:px-4 pt-1"
        />
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
                  className={`${spriteLeaderClasses}
                    sprite
                    ${spriteClassname({ character: "head", action: "idle", facingXy8: "right" })}
                    selectedMenuItem:${spriteClassname({ character: "head", action: "walking", facingXy8: "right" })}
                    sprites-normal-height zx:sprite-revert-to-white`}
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
                  className={`${spriteLeaderClasses} 
                    sprite 
                    ${spriteClassname({ character: "heels", action: "idle", facingXy8: "right" })}
                    selectedMenuItem:${spriteClassname({ character: "heels", action: "walking", facingXy8: "right" })}
                    sprites-normal-height zx:sprite-revert-to-white`}
                />
              }
              hint={
                <BlockyMarkdown
                  className={selectGameHintMarkdownClassName}
                  markdown={`*Unofficial sequel* - The empire is back! All-new levels designed for the remake. **Work in progress!**`}
                />
              }
            />
            <MenuItem
              id="community"
              label="Community contributed"
              className="sprites-double-height"
              hintInline
              subMenuId="communityGames"
              leader={
                <span
                  className={`${spriteLeaderClasses} sprite ${"texture-charles_right" satisfies TextureTailwindClass} sprites-normal-height zx:sprite-revert-to-white`}
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
