import { PressToContinueBanner } from "../../PressToContinueBanner";
import type { Menu } from "../menus";
import { Dialog } from "../../../../../components/ui/dialog";
import { BitmapText } from "../../../Sprite";

const HoldDialogInner = () => {
  return (
    <Dialog className="text-center bg-pureBlack">
      <BitmapText className="block sprites-double-height text-moss">
        hold
      </BitmapText>
      <span>
        <PressToContinueBanner className="text-center" action="hold" />
      </span>
    </Dialog>
  );
};

export const holdMenu: Menu = {
  dialogClassName: "h-max",
  //borderClassName: "bg-midGrey",
  sections: [HoldDialogInner],
  items: [],
};
