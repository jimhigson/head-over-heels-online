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
        class="!h-min !w-max text-center text-zxCyan toppy:text-toppyCool1 p-0 bg-transparent"
        // need to be able to click/tap on the hold dialog to exit, or it
        // isn't possible to leave it on devices with no keyboard/gamepad:
        onClick={useDispatchActionCallback(backToParentMenu)}
        dialogId="hold"
        ariaLabel="the game is paused, unpause it to continue playing (press the pause key, default 'p', or tap/click the dialog)"
      >
        <div class="w-min mx-auto px-1 bg-zxBlack py-oneScaledPix uppercase">
          <span class="text-double-height">PAUSED</span>
        </div>
        <span class="zx">
          {detectDeviceType() === "desktop" ?
            <div class="flex flex-col gap-1">
              <div class="text-multi-line px-1 bg-zxBlack py-oneScaledPix">
                <div class="text-single-line">
                  To <span class="text-zxWhite">continue</span> press:
                </div>
                <div class="flex flex-row gap-1 mx-auto">
                  <CurrentKeyAssignments
                    class="flex flex-row gap-1"
                    keyClassName="text-zxRed toppy:text-toppyPink2"
                    action="hold"
                  />
                </div>
              </div>
              <div class="text-multi-line px-1 bg-zxBlack py-oneScaledPix">
                <div class="text-single-line">
                  For <span class="text-zxWhite">Map</span> press:
                </div>
                <div class="flex flex-row gap-1 mx-auto">
                  <CurrentKeyAssignments
                    class="flex flex-row gap-1"
                    keyClassName="text-zxRed toppy:text-toppyPink2"
                    action="map"
                  />
                </div>
              </div>
            </div>
          : <div class="px-1 bg-zxBlack py-oneScaledPix">
              <span class="me-1 text-zxRed toppy:text-toppyPink2 text-single-line">
                Tap screen
              </span>
              <span class="text-single-line">to continue</span>
            </div>
          }
        </span>
      </Dialog>
    </DialogPortal>
  );
};

/** default export for preact/compat lazy() */
export default HoldDialog;
