import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { PressToContinueBanner } from "../../../PressToContinueBanner";
import { multilineTextClass } from "../../multilineTextClass";

export const HoldDialog = () => {
  return (
    <DialogPortal>
      <Dialog
        // the original game is blue, but blue-on-black is poor contrast so using cyan:
        className="!h-min !w-max text-center text-zxCyan p-0 bg-transparent"
        // need to be able to click/tap on the hold dialog to exit, or it
        // isn't possible to leave it on devices with no keyboard/gamepad:
        onClick={useDispatchActionCallback(backToParentMenu)}
      >
        <BitmapText className="block w-min mx-auto px-1 sprites-double-height bg-zxBlack py-oneScaledPix sprites-uppercase">
          Hold
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
