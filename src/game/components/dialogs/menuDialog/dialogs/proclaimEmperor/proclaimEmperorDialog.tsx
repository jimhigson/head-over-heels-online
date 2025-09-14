import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { BackMenuItem } from "../../BackMenuItem";
import { MenuItems } from "../../MenuItems";

export const ProclaimEmperorDialog = () => {
  return (
    <DialogPortal>
      <Border className="bg-pureBlack zx:bg-zxBlack" />
      <Dialog
        className="bg-pureBlack w-zx h-full block p-0"
        onClick={useDispatchActionCallback(backToParentMenu)}
      >
        <div className="flex flex-col gap-3 items-center">
          <div className="flex gap-7">
            <div className="flex flex-col gap-y-oneScaledPix items-center me-1">
              <span className="sprite texture-crown_blacktooth zx:sprite-revert-zxYellow" />
              <span className="sprite zx:sprite-revert-zxYellow texture-animated-head_idle_right hover:texture-animated-head_walking_right relative z-topSprite" />
            </div>
            <div className="flex flex-col items-center me-1">
              <span className="sprite texture-crown_blacktooth zx:sprite-revert-zxYellow" />
              <span className="sprite zx:sprite-revert-zxYellow texture-heels_walking_towards_2 hover:texture-animated-heels_walking_towards relative z-topSprite" />
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center text-lightGrey zx:text-zxCyan">
            <BitmapText>The people salute your heroism</BitmapText>
            <BitmapText>and proclaim you</BitmapText>
          </div>
          <BitmapText
            className="text-highlightBeige sprites-double-height"
            classnameCycle={[
              "text-pink zx:text-zxMagenta",
              "text-metallicBlue zx:text-zxCyan",
              "text-highlightBeige zx:text-zxYellow",
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
