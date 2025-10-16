import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { detectDeviceType } from "../../../../../../utils/detectEnv/detectDeviceType";
import {
  BitmapText,
  MultipleBitmapText,
} from "../../../../tailwindSprites/Sprite";
import { CurrentKeyAssignments } from "../../CurrentKeyAssignment";
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
        dialogId="hold"
      >
        <BitmapText className="block w-min mx-auto px-1 sprites-double-height bg-zxBlack py-oneScaledPix sprites-uppercase">
          PAUSED
        </BitmapText>
        <span className="zx">
          {detectDeviceType() === "desktop" ?
            <div className="flex flex-col gap-1">
              <div
                className={`${multilineTextClass} px-1 bg-zxBlack py-oneScaledPix`}
              >
                <MultipleBitmapText>
                  Press to <span className="text-zxWhite">continue</span>:
                </MultipleBitmapText>
                <div className="flex flex-row gap-1 mx-auto">
                  <CurrentKeyAssignments
                    className="flex flex-row gap-1"
                    keyClassName="text-pink zx:text-zxRed"
                    action="hold"
                  />
                </div>
              </div>
              <div
                className={`${multilineTextClass} px-1 bg-zxBlack py-oneScaledPix`}
              >
                <MultipleBitmapText>
                  Press for <span className="text-zxWhite">Map</span>:
                </MultipleBitmapText>
                <div className="flex flex-row gap-1 mx-auto">
                  <CurrentKeyAssignments
                    className="flex flex-row gap-1"
                    keyClassName="text-pink zx:text-zxRed"
                    action="map"
                  />
                </div>
              </div>
            </div>
          : <div
              className={`${multilineTextClass} px-1 bg-zxBlack py-oneScaledPix`}
            >
              <BitmapText className="me-1 text-pink zx:text-zxRed">
                Tap screen
              </BitmapText>
              <BitmapText>to continue</BitmapText>
            </div>
          }
        </span>
      </Dialog>
    </DialogPortal>
  );
};
