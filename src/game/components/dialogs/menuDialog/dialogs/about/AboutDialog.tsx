import { type EmptyObject } from "type-fest";

import { repository } from "../../../../../../../package.json";
import { discordInviteUrl } from "../../../../../../gameInfo";
import {
  nerdFontDiscordChar,
  nerdFontGithubChar,
} from "../../../../../../sprites/spritesheet/spritesheetData/hudSritesheetData";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { mainMenuScrollClasses } from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { useCustomTextLeader } from "../CustomTextLeader";
import { DialogTitleBar } from "../DialogTitleBar";

export const AboutDialog = (_emptyProps: EmptyObject) => {
  return (
    <DialogPortal>
      <Border class="bg-metallicBlue zx:bg-zxRed toppy:bg-toppyCool3" />
      <Dialog
        class="bg-metallicBlueHalfbrite zx:bg-zxRed toppy:bg-toppyCool4 text-highlightBeige zx:text-zxCyan toppy:text-toppyWarm3 selectedMenuItem:text-white toppy:selectedMenuItem:text-toppyWarm1 gap-y-0 justify-center"
        dialogId="about"
      >
        <DialogTitleBar class="pl-1" />
        <div class={mainMenuScrollClasses}>
          <MenuItems>
            <MenuItem
              doubleHeight
              id="manual"
              label="Read the manual"
              subMenuId="readTheManual"
              hint={
                <span class="text-lightBeige zx:text-zxYellow toppy:text-toppyCool1 text-multi-line">
                  The original game manual, readable online
                </span>
              }
            />
            <MenuItem
              doubleHeight
              id="discord"
              leader={useCustomTextLeader(nerdFontDiscordChar)}
              label="Discord"
              href={discordInviteUrl}
              hint={
                <span class="text-lightBeige zx:text-zxYellow toppy:text-toppyCool1 text-multi-line">
                  Join the community - the game’s Discord server
                </span>
              }
            />
            <MenuItem
              doubleHeight
              id="github"
              leader={useCustomTextLeader(nerdFontGithubChar)}
              label="Github"
              href={repository.url}
              hint={
                <span class="text-lightBeige zx:text-zxYellow toppy:text-toppyCool1 text-multi-line">
                  View the source code on GitHub
                </span>
              }
            />
            <MenuItem
              doubleHeight
              id="changelog"
              leader={useCustomTextLeader(nerdFontGithubChar)}
              label="Changelog"
              href={`${repository.url}/releases`}
              hint={
                <span class="text-lightBeige zx:text-zxYellow toppy:text-toppyCool1 text-multi-line">
                  What's new?
                </span>
              }
            />
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
