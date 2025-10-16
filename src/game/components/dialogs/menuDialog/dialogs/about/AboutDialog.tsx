import type { EmptyObject } from "type-fest";

import { useCallback } from "react";

import { nerdFontDiscordChar } from "../../../../../../sprites/spritesheet/spritesheetData/hudSritesheetData";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import {
  linkOpenExternalClickHandler,
  openExternal,
} from "../../../../../../utils/tauri/openExternalLink";
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
        <div className="text-highlightBeige zx:text-zxCyan selectedMenuItem:text-white resHandheld:mt-half flex flex-col gap-1 sprites-uppercase">
          <MenuItems className="w-24 mx-auto">
            <MenuItem
              id="discord"
              leader={<BitmapText>{nerdFontDiscordChar}</BitmapText>}
              label={
                <a
                  href={discordInviteUrl}
                  onClick={linkOpenExternalClickHandler}
                  target="_blank"
                >
                  <BitmapText>{`Discord`}</BitmapText>
                </a>
              }
              doubleHeightWhenFocussed
              onSelect={useCallback(() => {
                openExternal(discordInviteUrl);
              }, [])}
            />
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
