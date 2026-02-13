import type { EmptyObject } from "type-fest";

import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/dialog";
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
      <Border className="bg-metallicBlue zx:bg-zxRed" />
      <Dialog
        className="bg-metallicBlueHalfbrite zx:bg-zxRed text-highlightBeige zx:text-zxCyan selectedMenuItem:text-white justify-center"
        dialogId="installGuide"
      >
        <DialogTitleBar className="pl-1" path={["Install instructions"]} />
        <div className={mainMenuScrollClasses}>
          <BlockyMarkdown className={"text-midGrey"} markdown={introMarkdown} />
          <MenuItems>
            <MenuItem
              className="sprites-double-height"
              id="manual"
              label="P.W.A. install guide"
              subMenuId="installGuidePwa"
              hintInline
            />
            <MenuItem
              className="sprites-double-height"
              id="discord"
              label="Native builds (beta)"
              subMenuId="installGuideNative"
              hintInline
            />
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
