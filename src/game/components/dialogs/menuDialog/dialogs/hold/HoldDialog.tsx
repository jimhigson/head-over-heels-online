import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { detectDeviceType } from "../../../../../../utils/detectEnv/detectDeviceType";
import { CurrentKeyAssignments } from "../../CurrentKeyAssignments";

export const HoldDialog = () => {
  return (
    <DialogPortal>
      <Dialog
        // the original game is blue, but blue-on-black is poor contrast so using cyan:
        className="!h-min !w-max text-center text-zxCyan toppy:text-toppyCool1 p-0 bg-transparent"
        // need to be able to click/tap on the hold dialog to exit, or it
        // isn't possible to leave it on devices with no keyboard/gamepad:
        onClick={useDispatchActionCallback(backToParentMenu)}
        dialogId="hold"
      >
        <div className="w-min mx-auto px-1 bg-zxBlack py-oneScaledPix uppercase">
          <span className="text-double-height">PAUSED</span>
        </div>
        <span className="zx">
          {detectDeviceType() === "desktop" ?
            <div className="flex flex-col gap-1">
              <div className="text-multi-line px-1 bg-zxBlack py-oneScaledPix">
                <div className="text-single-line">
                  To <span className="text-zxWhite">continue</span> press:
                </div>
                <div className="flex flex-row gap-1 mx-auto">
                  <CurrentKeyAssignments
                    className="flex flex-row gap-1"
                    keyClassName="text-zxRed toppy:text-toppyPink2"
                    action="hold"
                  />
                </div>
              </div>
              <div className="text-multi-line px-1 bg-zxBlack py-oneScaledPix">
                <div className="text-single-line">
                  For <span className="text-zxWhite">Map</span> press:
                </div>
                <div className="flex flex-row gap-1 mx-auto">
                  <CurrentKeyAssignments
                    className="flex flex-row gap-1"
                    keyClassName="text-zxRed toppy:text-toppyPink2"
                    action="map"
                  />
                </div>
              </div>
            </div>
          : <div className="px-1 bg-zxBlack py-oneScaledPix">
              <span className="me-1 text-zxRed toppy:text-toppyPink2 text-single-line">
                Tap screen
              </span>
              <span className="text-single-line">to continue</span>
            </div>
          }
        </span>
      </Dialog>
    </DialogPortal>
  );
};
