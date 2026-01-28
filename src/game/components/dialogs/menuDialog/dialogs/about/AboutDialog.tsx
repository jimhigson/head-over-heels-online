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
import { useOpenExternalCallback } from "../../../../../../utils/tauri/openExternalLink";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";

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
          <MenuItems className="w-24 mx-auto">
            <MenuItem
              id="manual"
              label="Read the manual"
              doubleHeightWhenFocussed
              onSelect={useDispatchActionCallback(goToSubmenu, "readTheManual")}
              opensSubMenu={true}
              hintInline
              hint="The original game manual, readable online"
            />
            <MenuItem
              id="discord"
              leader={<BitmapText>{nerdFontDiscordChar}</BitmapText>}
              label={
                "Discord"
                // <a
                //   href={discordInviteUrl}
                //   onClick={linkOpenExternalClickHandler}
                //   target="_blank"
                // >
                //   <BitmapText>{`Discord`}</BitmapText>
                // </a>
              }
              doubleHeightWhenFocussed
              onSelect={useOpenExternalCallback(discordInviteUrl)}
              hintInline
              hint="Join the community on our Discord server"
            />
            <MenuItem
              id="github"
              leader={<BitmapText>{nerdFontGithubChar}</BitmapText>}
              label={
                "Github"
                // <a
                //   href={repository.url}
                //   onClick={linkOpenExternalClickHandler}
                //   target="_blank"
                // >
                //   <BitmapText>{`Github`}</BitmapText>
                // </a>
              }
              doubleHeightWhenFocussed
              onSelect={useOpenExternalCallback(repository.url)}
              hintInline
              hint="View the source code on GitHub"
            />
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
