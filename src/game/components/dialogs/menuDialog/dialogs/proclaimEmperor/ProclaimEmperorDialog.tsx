import {
  type AnimatedTextureTailwindClass,
  type TextureTailwindClass,
} from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { ColourCycleText } from "../../../../ColourCycleText";
import { BackMenuItem } from "../../BackMenuItem";
import { MenuItems } from "../../MenuItems";
import { proclaimEmperorDialogColourClasses } from "./proclaimEmperorDialogColourClasses";

const crownClass = `sprite ${"texture-crown_blacktooth" satisfies TextureTailwindClass} ${"zx:texture-crown_uncolourised" satisfies TextureTailwindClass} zx:sprite-tinted zx:text-zxYellow toppy:text-toppyWarm1`;

export const ProclaimEmperorDialog = () => {
  return (
    <DialogPortal>
      <Border class="bg-pureBlack zx:bg-zxBlack toppy:bg-toppyBlack" />
      <Dialog
        class={`${proclaimEmperorDialogColourClasses} w-zx h-full block p-0`}
        onClick={useDispatchActionCallback(backToParentMenu)}
        dialogId="proclaimEmperor"
      >
        <div class="flex flex-col gap-3 items-center">
          <div class="flex gap-7">
            <div class="flex flex-col gap-y-oneScaledPix items-center me-1">
              <span class={crownClass} />
              <span
                class={`sprite zx:sprite-revert-zxYellow ${"texture-animated-head_idle_d4" satisfies AnimatedTextureTailwindClass} ${"hover:texture-animated-head_walking_d4" satisfies AnimatedTextureTailwindClass} relative z-topSprite`}
              />
            </div>
            <div class="flex flex-col items-center me-1">
              <span class={crownClass} />
              <span
                class={`sprite zx:sprite-revert-zxYellow ${"texture-animated-heels_idle_d6" satisfies AnimatedTextureTailwindClass} ${"hover:texture-animated-heels_walking_d6" satisfies AnimatedTextureTailwindClass} relative z-topSprite`}
              />
            </div>
          </div>
          <div class="flex flex-col gap-1 items-center text-lightGrey zx:text-zxCyan toppy:text-toppyCool1 text-single-line">
            <span>The people salute your heroism</span>
            <span>and proclaim you</span>
          </div>
          <ColourCycleText
            class="text-highlightBeige text-double-height"
            classnameCycle={[
              "text-pink zx:text-zxMagenta toppy:text-toppyPink1",
              "text-metallicBlue zx:text-zxCyan toppy:text-toppyCool2",
              "text-highlightBeige zx:text-zxYellow toppy:text-toppyWarm3",
            ]}
          >
            EMPEROR
          </ColourCycleText>
          <MenuItems class="hidden">
            <BackMenuItem />
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};

/** default export for preact/compat lazy() */
export default ProclaimEmperorDialog;
