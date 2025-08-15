import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { MenuItems } from "../../MenuItems";
import { BackMenuItem } from "../../BackMenuItem";
import { FiveCrownsDisplay } from "./FiveCrownsDisplay";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { backToParentMenu } from "../../../../../../store/slices/gameMenusSlice";
import { useIsLoading } from "../../../../../../store/hooks/loadingHooks";
import { Border } from "../../../../../../ui/Border";
import music from "../../../../../../../sounds/rock.mp3";

export const CrownsDialog = ({
  playMusic = false,
}: {
  playMusic?: boolean;
}) => {
  const isLoading = useIsLoading();

  const closeDialog = useDispatchActionCallback(backToParentMenu);
  return (
    <DialogPortal>
      <Border className="bg-pureBlack zx:bg-zxBlack" />

      <Dialog
        className="bg-pureBlack w-zx h-full block p-0"
        onClick={isLoading ? undefined : closeDialog}
      >
        {playMusic && <audio src={music} autoPlay loop />}
        <FiveCrownsDisplay />
        <MenuItems className="hidden">
          {!isLoading && <BackMenuItem />}
        </MenuItems>
      </Dialog>
    </DialogPortal>
  );
};
