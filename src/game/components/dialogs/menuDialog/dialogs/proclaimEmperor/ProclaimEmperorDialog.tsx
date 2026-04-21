import type {
  AnimatedTextureTailwindClass,
  TextureTailwindClass,
} from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";

import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BitmapText } from "../../../../tailwindSprites/BitmapText";
import { BackMenuItem } from "../../BackMenuItem";
import { MenuItems } from "../../MenuItems";

const crownClass = `sprite ${"texture-crown_blacktooth" satisfies TextureTailwindClass} ${"zx:texture-crown_uncolourised" satisfies TextureTailwindClass} zx:sprite-tinted zx:text-zxYellow toppy:text-toppyWarm1`;

export const ProclaimEmperorDialog = () => {
  return (
    <DialogPortal>
      <Border className="bg-pureBlack zx:bg-zxBlack toppy:bg-toppyBlack" />
      <Dialog
        className="bg-pureBlack w-zx h-full block p-0"
        onClick={useDispatchActionCallback(backToParentMenu)}
        dialogId="proclaimEmperor"
      >
        <div className="flex flex-col gap-3 items-center">
          <div className="flex gap-7">
            <div className="flex flex-col gap-y-oneScaledPix items-center me-1">
              <span className={crownClass} />
              <span
                className={`sprite zx:sprite-revert-zxYellow ${"texture-animated-head_idle_right" satisfies AnimatedTextureTailwindClass} ${"hover:texture-animated-head_walking_right" satisfies AnimatedTextureTailwindClass} relative z-topSprite`}
              />
            </div>
            <div className="flex flex-col items-center me-1">
              <span className={crownClass} />
              <span
                className={`sprite zx:sprite-revert-zxYellow ${"texture-animated-heels_idle_towards" satisfies AnimatedTextureTailwindClass} ${"hover:texture-animated-heels_walking_towards" satisfies AnimatedTextureTailwindClass} relative z-topSprite`}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center text-lightGrey zx:text-zxCyan toppy:text-toppyCool1">
            <BitmapText>The people salute your heroism</BitmapText>
            <BitmapText>and proclaim you</BitmapText>
          </div>
          <BitmapText
            className="text-highlightBeige sprites-double-height"
            classnameCycle={[
              "text-pink zx:text-zxMagenta toppy:text-toppyPink1",
              "text-metallicBlue zx:text-zxCyan toppy:text-toppyCool2",
              "text-highlightBeige zx:text-zxYellow toppy:text-toppyWarm3",
            ]}
          >
            EMPEROR
          </BitmapText>
          <MenuItems className="hidden">
            <BackMenuItem />
          </MenuItems>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
