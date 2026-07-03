import { type EmptyObject } from "type-fest";

import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { mainMenuScrollClasses } from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { DialogTitleBar } from "../DialogTitleBar";

const introMarkdown = `The game works on *any modern web browser*: phone, desktop, or tablet, including offline.

But, it is better to **install the game**, either as a PWA
or by downloading the app.`;

export const InstallDialog = (_emptyProps: EmptyObject) => {
  return (
    <DialogPortal>
      <Border class="bg-metallicBlue zx:bg-zxRed toppy:bg-toppyCool3" />
      <Dialog
        class="bg-metallicBlueHalfbrite zx:bg-zxRed toppy:bg-toppyCool4 text-highlightBeige zx:text-zxCyan toppy:text-toppyWarm3 selectedMenuItem:text-white toppy:selectedMenuItem:text-toppyWarm1 justify-center"
        dialogId="installGuide"
      >
        <DialogTitleBar class="pl-1" path={["Install instructions"]} />
        <div class={mainMenuScrollClasses}>
          <BlockyMarkdown
            class={"text-midGrey toppy:text-toppyGrey1 zx:text-zxWhite"}
            markdown={introMarkdown}
          />
          <MenuItems>
            <MenuItem
              doubleHeight
              id="manual"
              label="P.W.A. install guide"
              subMenuId="markdown/installPwa"
            />
            <MenuItem
              doubleHeight
              id="discord"
              label="Native builds (beta)"
              subMenuId="markdown/installNative"
            />
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
