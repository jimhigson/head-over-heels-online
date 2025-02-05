import { Dialog } from "../../../../../../components/ui/dialog";
import { MenuItems } from "../../MenuItems";
import { BackMenuItem } from "../../BackMenuItem";
import { FiveCrownsDisplay } from "./FiveCrownsDisplay";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { backToParentMenu } from "../../../../../../store/gameMenusSlice";

export const CrownsDialog = () => {
  return (
    <Dialog
      className="bg-pureBlack w-zx h-full block p-0"
      borderClassName="bg-pureBlack"
      onClick={useDispatchActionCallback(backToParentMenu)}
    >
      <FiveCrownsDisplay />
      <MenuItems className="hidden">
        <BackMenuItem />
      </MenuItems>
    </Dialog>
  );
};
