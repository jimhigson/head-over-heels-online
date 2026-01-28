import type { EmptyObject } from "type-fest";

import { repository } from "../../../../../../../package.json";
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
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { DialogTitleBar } from "../DialogTitleBar";

const discordInviteUrl = "https://discord.gg/Se5Jznc2jm";

export const AboutDialog = (_emptyProps: EmptyObject) => {
  return (
    <DialogPortal>
      <Border className="bg-metallicBlue zx:bg-zxRed" />
      <Dialog
        className="bg-metallicBlueHalfbrite zx:bg-zxRed gap-y-2 resHandheld:gap-y-1 justify-center"
        dialogId="about"
      >
        <div className="text-highlightBeige zx:text-zxCyan selectedMenuItem:text-white resHandheld:mt-half flex flex-col gap-1 ">
          <DialogTitleBar />
          <MenuItems className="w-24 mx-auto">
            <MenuItem
              id="manual"
              label="Read the manual"
              doubleHeightWhenFocussed
              onSelect={useDispatchActionCallback(goToSubmenu, "readTheManual")}
              opensSubMenu={true}
              hintInline
              hint={
                <BitmapText className="text-lightBeige">
                  The original game manual, readable online
                </BitmapText>
              }
            />
            <MenuItem
              id="discord"
              leader={<BitmapText>{nerdFontDiscordChar}</BitmapText>}
              label="Discord"
              doubleHeightWhenFocussed
              href={discordInviteUrl}
              hintInline
              hint={
                <BitmapText className="text-lightBeige">
                  Join the community on our Discord server
                </BitmapText>
              }
            />
            <MenuItem
              id="github"
              leader={<BitmapText>{nerdFontGithubChar}</BitmapText>}
              label="Github"
              doubleHeightWhenFocussed
              href={repository.url}
              hintInline
              hint={
                <BitmapText className="text-lightBeige">
                  View the source code on GitHub
                </BitmapText>
              }
            />
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
