import { PressToContinueBanner } from "../../PressToContinueBanner";
import { BitmapText } from "../../../Sprite";
import { multilineTextClass } from "../multilineTextClass";
import { Dialog } from "../../../../../components/ui/dialog";

export const HoldDialog = () => {
  return (
    <Dialog className="!h-min !w-max text-center text-zxBlue p-0">
      <BitmapText className="block sprites-double-height bg-zxBlack py-oneScaledPix">
        hold
      </BitmapText>
      <span className="zx">
        <PressToContinueBanner className={multilineTextClass} action="hold" />
      </span>
    </Dialog>
  );
};
