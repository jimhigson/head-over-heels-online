import { PressToContinueBanner } from "../../PressToContinueBanner";
import { BitmapText } from "../../../Sprite";
import { multilineTextClass } from "../multilineTextClass";
import { Dialog } from "../../../../../ui/dialog";
import { DialogPortal } from "../../../../../ui/DialogPortal";
import { backToParentMenu } from "../../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../store/useDispatchCallback";

export const HoldDialog = () => {
  return (
    <DialogPortal>
      <Dialog
        className="!h-min !w-max text-center text-zxBlue p-0 bg-transparent"
        // need to be able to click/tap on the hold dialog to exit, or it
        // isn't possible to leave it on devices with no keyboard/gamepad:
        onClick={useDispatchActionCallback(backToParentMenu)}
      >
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
