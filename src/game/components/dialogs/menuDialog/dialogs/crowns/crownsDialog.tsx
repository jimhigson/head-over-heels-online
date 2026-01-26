import music from "../../../../../../../sounds/rock.mp3";
import { useIsGameLoading } from "../../../../../../store/hooks/loadingHooks";
import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { BackMenuItem } from "../../BackMenuItem";
import { MenuItems } from "../../MenuItems";
import { FiveCrownsDisplay } from "./FiveCrownsDisplay";

export const CrownsDialog = ({
  playMusic = false,
}: {
  playMusic?: boolean;
}) => {
  const isLoading = useIsGameLoading();

  const closeDialog = useDispatchActionCallback(backToParentMenu);
  return (
    <DialogPortal>
      <Border className="bg-pureBlack zx:bg-zxBlack" />

      <Dialog
        className="bg-pureBlack w-zx h-full block p-0"
        onClick={isLoading ? undefined : closeDialog}
        dialogId="crowns"
      >
        {playMusic && <audio src={music} autoPlay loop />}
        <FiveCrownsDisplay />
        {isLoading && (
          <div>
            <BitmapText className="animate-flash text-center sprites-double-height block text-midRed zx:text-zxRed bg-white top-4">
              LOADING
            </BitmapText>
          </div>
        )}
        {!isLoading && (
          <MenuItems className="hidden">
            <BackMenuItem />
          </MenuItems>
        )}
      </Dialog>
    </DialogPortal>
  );
};
