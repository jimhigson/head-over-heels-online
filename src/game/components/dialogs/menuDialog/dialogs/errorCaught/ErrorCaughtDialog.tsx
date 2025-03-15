import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { Border } from "../../../../../../ui/Border";
import { BitmapText } from "../../../../Sprite";
import { MenuItems } from "../../MenuItems";
import { MenuItem } from "../../MenuItem";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";

const markdown = `
![](texture-animated-dalek?float-left)If you want to help, please:

* open an [issue on github](https://github.com/jimhigson/head-over-heels-online/issues)
* email to [jim@blockstack.ing](mailto:jim@blockstack.ing)

Please include the information below, and a description of what you were doing
`;

export const ErrorCaughtDialog = () => {
  return (
    <DialogPortal>
      <Border className="loading-border" />
      <Dialog className="!h-min !w-max text-center text-zxBlue p-0 bg-white">
        <BitmapText className="sprites-double-height mt-2 resGameboy:mt-0 text-redShadow zx:text-zxWhite">
          The game crashed
        </BitmapText>
        <span className="sprite texture-animated-dalek float-left" />
        <BlockyMarkdown markdown={markdown} />
        <MenuItems className="text-lightGrey zx:text-zxWhite mt-1 resGameboy:mt-0 selectedMenuItem:text-midRed zx:selectedMenuItem:text-zxYellow resGameboy:!gap-y-1">
          <MenuItem
            doubleHeightWhenFocussed
            id="tryContinue"
            label="Try to continue"
            //onSelect={}
          />
          <MenuItem
            doubleHeightWhenFocussed
            id="reload"
            label="Reload the game"
            //onSelect={}
          />
          <MenuItem
            doubleHeightWhenFocussed
            id="clearAndReload"
            label="Clear all data and reload"
            //onSelect={}
          />
        </MenuItems>
      </Dialog>
    </DialogPortal>
  );
};
