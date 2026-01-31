import type { EmptyObject } from "type-fest";

import { repository } from "../../../../../../../package.json";
import { discordInviteUrl } from "../../../../../../gameInfo";
import {
  nerdFontDiscordChar,
  nerdFontGithubChar,
} from "../../../../../../sprites/spritesheet/spritesheetData/hudSritesheetData";
import { goToSubmenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
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
        className="bg-metallicBlueHalfbrite zx:bg-zxRed text-highlightBeige zx:text-zxCyan selectedMenuItem:text-white gap-y-2 resHandheld:gap-y-1 justify-center"
        dialogId="about"
      >
        <DialogTitleBar />
        <div className={mainMenuScrollClasses}>
          <MenuItems className="w-28 mx-auto">
            <MenuItem
              className="sprites-double-height"
              id="manual"
              label="Read the manual"
              doubleHeightWhenFocussed
              onSelect={useDispatchActionCallback(goToSubmenu, "readTheManual")}
              opensSubMenu={true}
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
              doubleHeightWhenFocussed
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
              doubleHeightWhenFocussed
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
              doubleHeightWhenFocussed
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
