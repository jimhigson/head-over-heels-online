import { Dialog } from "../../../../../../components/ui/dialog";
import { MenuItems } from "../../MenuItems";
import { BackMenuItem } from "../../BackMenuItem";
import { FiveCrownsDisplay } from "./FiveCrownsDisplay";

export const CrownsDialog = () => {
  return (
    <Dialog
      className="bg-pureBlack w-zx h-full block p-0"
      borderClassName="bg-pureBlack"
    >
      <FiveCrownsDisplay />
      <MenuItems className="hidden">
        <BackMenuItem />
      </MenuItems>
    </Dialog>
  );
};
