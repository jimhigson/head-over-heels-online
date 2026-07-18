import { type AnimatedTextureTailwindClass } from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BackMenuItem } from "../../BackMenuItem";
import { MenuItems } from "../../MenuItems";

export const ReincarnatedRestartDialog = () => {
  return (
    <DialogPortal>
      <Dialog
        // the original game is blue, but blue-on-black is poor contrast so using cyan:
        class="!h-min !w-max text-center p-0 bg-transparent"
        // need to be able to click/tap on the hold dialog to exit, or it
        // isn't possible to leave it on devices with no keyboard/gamepad:
        onClick={useDispatchActionCallback(backToParentMenu)}
        dialogId="reincarnatedRestart"
      >
        <span class="text-multi-line text-midRed zx:text-zxRed toppy:text-toppyPink2 block w-24 mx-auto px-1 bg-zxBlack py-oneScaledPix">
          You don’t go towards the light
        </span>
        <span class="text-multi-line block text-highlightBeige zx:text-zxYellow toppy:text-toppyWarm3 w-24 mx-auto px-1 bg-zxBlack py-oneScaledPix">
          You have a horrible taste in your mouth
        </span>
        <div class="text-moss zx:text-zxGreen toppy:text-toppyCool2 w-24 mx-auto px-1 bg-zxBlack py-oneScaledPix leading-[calc(22px*var(--scale,1))]">
          <span class="text-double-height inline-block max-w-full whitespace-normal">
            You have reincarnated!
          </span>
        </div>
        <span class="text-multi-line block text-pastelBlue zx:text-zxCyan toppy:text-toppyCool1 w-24 mx-auto px-1 bg-zxBlack py-oneScaledPix">
          Everything is back to how it was when you ate the fish
        </span>
        <span
          class={`sprite mx-auto bg-zxBlack ${"texture-animated-fish" satisfies AnimatedTextureTailwindClass} zx:sprite-revert-to-white`}
        />
        <MenuItems class="hidden">
          <BackMenuItem />
        </MenuItems>
      </Dialog>
    </DialogPortal>
  );
};

/** default export for preact/compat lazy() */
export default ReincarnatedRestartDialog;
