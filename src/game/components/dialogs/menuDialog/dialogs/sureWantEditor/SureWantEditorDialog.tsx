import { type TextureTailwindClass } from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { DialogTitleBar } from "../DialogTitleBar";

const blurbMarkdown = `The Blockstacking Head over Heels level editor

![]( ${`${"texture-headlessBase" satisfies TextureTailwindClass} float-left`} )**Design puzzles**!

**Create adventures**!

*Challenge* others to **solve them**!`;

const editorUrl = import.meta.env.VITE_EDITOR_URL;

export const SureWantEditorDialog = () => {
  return (
    <DialogPortal>
      <Border
        className="bg-pureBlack zx:bg-zxBlack toppy:bg-toppyBlack"
        onClick={useDispatchActionCallback(backToParentMenu)}
      />
      <Dialog
        className="bg-shadowHalfbrite zx:bg-zxBlack toppy:bg-toppyGrey3 px-1 py-1 selectedMenuItem:text-metallicBlue toppy:selectedMenuItem:text-toppyCool2"
        dialogId="sureWantEditor"
      >
        <DialogTitleBar className="pl-0 text-midGrey" path={["Hoh-Ed"]} />
        <div className="flex flex-col gap-y-2 mt-1 h-full">
          <div>
            <BlockyMarkdown
              className={`text-midGrey zx:text-zxWhite toppy:text-toppyGrey1`}
              markdown={blurbMarkdown}
            />
          </div>

          <MenuItems className="text-lightGrey zx:text-zxWhite toppy:text-toppyGrey1 resHandheld:mt-0 zx:selectedMenuItem:text-zxCyan toppy:selectedMenuItem:text-toppyCool2 resHandheld:!gap-y-1">
            <MenuItem
              className="sprites-double-height"
              id="yes"
              label="Take me to the editor"
              href={editorUrl}
            />
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
