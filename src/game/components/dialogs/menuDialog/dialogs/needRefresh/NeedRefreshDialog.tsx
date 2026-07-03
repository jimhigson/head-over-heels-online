import { continueWithRefresh } from "../../../../../../store/slices/continueWithRefresh";
import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogHeader } from "../../../../../../ui/DialogHeader";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";

const NeedRefreshDialog = () => {
  return (
    <DialogPortal>
      <Border
        class="bg-metallicBlue zx:bg-zxBlue toppy:bg-toppyCool3"
        onClick={useDispatchActionCallback(backToParentMenu)}
      />
      <Dialog
        class="bg-metallicBlueHalfbrite zx:bg-zxBlack toppy:bg-toppyCool4 px-1 py-1 w-max max-w-24"
        dialogId="needRefresh"
        small
      >
        <DialogHeader>Update required</DialogHeader>
        <BlockyMarkdown class="text-lightGrey">{`To see what’s new, go to *About* ➡ *Changelog* after updating`}</BlockyMarkdown>
        <MenuItems class="text-lightGrey zx:text-zxWhite toppy:text-toppyGrey1 mt-1 selectedMenuItem:text-white">
          <MenuItem
            id="yes"
            class="text-moss toppy:text-toppyWarm2 zx:text-zxGreen"
            label="Upgrade"
            onSelect={useDispatchActionCallback(continueWithRefresh)}
            doubleHeightWhenFocussed
          />
          <MenuItem
            id="no"
            label="Not now"
            onSelect={useDispatchActionCallback(backToParentMenu)}
            doubleHeightWhenFocussed
          />
        </MenuItems>
      </Dialog>
    </DialogPortal>
  );
};

export default NeedRefreshDialog;
