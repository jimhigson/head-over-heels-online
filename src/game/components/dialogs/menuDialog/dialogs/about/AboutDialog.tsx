import type { EmptyObject } from "type-fest";

import { repository } from "../../../../../../../package.json";
import { discordInviteUrl } from "../../../../../../gameInfo";
import {
  nerdFontDiscordChar,
  nerdFontGithubChar,
} from "../../../../../../sprites/spritesheet/spritesheetData/hudSritesheetData";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { mainMenuScrollClasses } from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { multilineTextClass } from "../../multilineTextClass";
import { DialogTitleBar } from "../DialogTitleBar";

export const AboutDialog = (_emptyProps: EmptyObject) => {
  return (
    <DialogPortal>
      <Border className="bg-metallicBlue zx:bg-zxRed" />
      <Dialog
        className="bg-metallicBlueHalfbrite zx:bg-zxRed text-highlightBeige zx:text-zxCyan selectedMenuItem:text-white gap-y-0 justify-center"
        dialogId="about"
      >
        <DialogTitleBar className="pl-1" />
        <div className={mainMenuScrollClasses}>
          <MenuItems>
            <MenuItem
              className="sprites-double-height"
              id="manual"
              label="Read the manual"
              subMenuId="readTheManual"
              hintInline
              hint={
                <BitmapText
                  className={`text-lightBeige zx:text-zxYellow ${multilineTextClass}`}
                >
                  The original game manual, readable online
                </BitmapText>
              }
            />
            <MenuItem
              className="sprites-double-height"
              id="discord"
              leader={<BitmapText>{nerdFontDiscordChar}</BitmapText>}
              label="Discord"
              href={discordInviteUrl}
              hintInline
              hint={
                <BitmapText
                  className={`text-lightBeige zx:text-zxYellow ${multilineTextClass}`}
                >
                  Join the community - the game’s Discord server
                </BitmapText>
              }
            />
            <MenuItem
              className="sprites-double-height"
              id="github"
              leader={<BitmapText>{nerdFontGithubChar}</BitmapText>}
              label="Github"
              href={repository.url}
              hintInline
              hint={
                <BitmapText
                  className={`text-lightBeige zx:text-zxYellow ${multilineTextClass}`}
                >
                  View the source code on GitHub
                </BitmapText>
              }
            />
            <MenuItem
              className="sprites-double-height"
              id="changelog"
              leader={<BitmapText>{nerdFontGithubChar}</BitmapText>}
              label="Changelog"
              href={`${repository.url}/releases`}
              hintInline
              hint={
                <BitmapText
                  className={`text-lightBeige zx:text-zxYellow ${multilineTextClass}`}
                >
                  What's new?
                </BitmapText>
              }
            />
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
