import { Border, Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { MenuItems } from "../../MenuItems";
import { BackMenuItem } from "../../BackMenuItem";
import { FiveCrownsDisplay } from "./FiveCrownsDisplay";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { backToParentMenu } from "../../../../../../store/gameMenusSlice";

export const CrownsDialog = () => {
  return (
    <DialogPortal>
      <Border className="bg-pureBlack zx:bg-zxBlack" />
      <Dialog
        className="bg-pureBlack w-zx h-full block p-0"
        onClick={useDispatchActionCallback(backToParentMenu)}
      >
        <FiveCrownsDisplay />
        <MenuItems className="hidden">
          <BackMenuItem />
        </MenuItems>
      </Dialog>
    </DialogPortal>
  );
};
