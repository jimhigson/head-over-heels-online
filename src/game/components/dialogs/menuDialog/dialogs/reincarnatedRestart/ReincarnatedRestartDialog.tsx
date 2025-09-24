import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { BackMenuItem } from "../../BackMenuItem";
import { MenuItems } from "../../MenuItems";
import { multilineTextClass } from "../../multilineTextClass";

export const ReincarnatedRestartDialog = () => {
  return (
    <DialogPortal>
      <Dialog
        // the original game is blue, but blue-on-black is poor contrast so using cyan:
        className="!h-min !w-max text-center p-0 bg-transparent"
        // need to be able to click/tap on the hold dialog to exit, or it
        // isn't possible to leave it on devices with no keyboard/gamepad:
        onClick={useDispatchActionCallback(backToParentMenu)}
      >
        <BitmapText
          className={`${multilineTextClass} text-zxRed block w-24 mx-auto px-1 bg-zxBlack py-oneScaledPix`}
        >
          You don’t go towards the light
        </BitmapText>
        <BitmapText
          className={`${multilineTextClass} block text-zxYellow w-24 mx-auto px-1 bg-zxBlack py-oneScaledPix`}
        >
          You have a horrible taste in your mouth
        </BitmapText>
        <BitmapText
          className={`${multilineTextClass} block text-zxGreen w-24 mx-auto px-1 sprites-double-height bg-zxBlack py-oneScaledPix`}
        >
          You have reincarnated!
        </BitmapText>
        <BitmapText
          className={`${multilineTextClass} block text-zxCyan w-24 mx-auto px-1 bg-zxBlack py-oneScaledPix`}
        >
          Everything is back to how it was when you ate the fish
        </BitmapText>
        <span className="sprite mx-auto  bg-zxBlack texture-animated-fish sprite-revert-to-white" />
        <MenuItems className="hidden">
          <BackMenuItem />
        </MenuItems>
      </Dialog>
    </DialogPortal>
  );
};
