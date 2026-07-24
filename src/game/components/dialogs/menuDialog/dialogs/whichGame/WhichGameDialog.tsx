import { type EmptyObject } from "type-fest";

import {
  originalCampaignLocator,
  sequelCampaignLocator,
} from "../../../../../../gameInfo";
import { type TextureTailwindClass } from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { gameStarted } from "../../../../../../store/slices/gameInPlay/gameInPlaySlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { usePlayableTailwindSpriteClassname } from "../../../../tailwindSprites/playableTailwindSpriteClassname";
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
        class="bg-metallicBlueHalfbrite zx:text-zxCyan toppy:text-toppyWarm3 text-highlightBeige selectedMenuItem:text-white toppy:selectedMenuItem:text-toppyWarm1 zx:bg-zxRed toppy:bg-toppyCool4 gap-y-2 resHandheld:gap-y-1 py-0 gap-y-0"
        dialogId="whichGame"
      >
        <DialogTitleBar path={["Select which game"]} class="mobile:px-4 pt-1" />
        <div class={mainMenuScrollClasses}>
          <MenuItems class="gap-y-1">
            <MenuItem
              doubleHeight
              id="originalGame"
              label="Original Remastered"
              onSelect={useDispatchActionCallback(gameStarted, {
                campaignLocator: originalCampaignLocator,
              })}
              leader={
                <span
                  class={`${spriteLeaderClasses}
                    sprite
                    ${spriteClassname({ character: "head", action: "idle", facingXy8: "right" })}
                    selectedMenuItem:${spriteClassname({ character: "head", action: "walking", facingXy8: "right" })}
                    sprites-normal-height zx:sprite-revert-to-white`}
                />
              }
              hint={
                <BlockyMarkdown
                  class={selectGameHintMarkdownClassName}
                  markdown={`*Remaster* of the **300-some** rooms from the original game, lightly updated for modern play`}
                />
              }
            />
            <MenuItem
              id="remake"
              label="38 Years Later"
              doubleHeight
              onSelect={useDispatchActionCallback(gameStarted, {
                campaignLocator: sequelCampaignLocator,
              })}
              leader={
                <span
                  class={`${spriteLeaderClasses} 
                    sprite 
                    ${spriteClassname({ character: "heels", action: "idle", facingXy8: "right" })}
                    selectedMenuItem:${spriteClassname({ character: "heels", action: "walking", facingXy8: "right" })}
                    sprites-normal-height zx:sprite-revert-to-white`}
                />
              }
              hint={
                <BlockyMarkdown
                  class={selectGameHintMarkdownClassName}
                  markdown={`*Unofficial sequel* - The empire is back! All-new levels designed for the remake. **Work in progress!**`}
                />
              }
            />
            <MenuItem
              id="community"
              label="Community contributed"
              doubleHeight
              subMenuId="communityGames"
              leader={
                <span
                  class={`${spriteLeaderClasses} sprite ${"texture-charles_d4" satisfies TextureTailwindClass} sprites-normal-height zx:sprite-revert-to-white`}
                />
              }
              hint={
                <BlockyMarkdown
                  class={selectGameHintMarkdownClassName}
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
