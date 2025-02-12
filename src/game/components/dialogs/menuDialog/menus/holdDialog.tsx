import { PressToContinueBanner } from "../../PressToContinueBanner";
import { BitmapText } from "../../../Sprite";
import { multilineTextClass } from "../multilineTextClass";
import { Dialog } from "../../../../../components/ui/dialog";
import { DialogPortal } from "../../../../../components/ui/DialogPortal";

export const HoldDialog = () => {
  return (
    <DialogPortal>
      <Dialog className="!h-min !w-max text-center text-zxBlue p-0">
        <BitmapText className="block w-min mx-auto px-1 sprites-double-height bg-zxBlack py-oneScaledPix">
          hold
        </BitmapText>
        <span className="zx">
          <PressToContinueBanner
            className={`${multilineTextClass} px-1`}
            action="hold"
          />
        </span>
      </Dialog>
    </DialogPortal>
  );
};
