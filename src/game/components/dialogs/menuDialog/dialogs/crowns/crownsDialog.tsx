import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { MenuItems } from "../../MenuItems";
import { BackMenuItem } from "../../BackMenuItem";
import { FiveCrownsDisplay } from "./FiveCrownsDisplay";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { backToParentMenu } from "../../../../../../store/slices/gameMenusSlice";
import { useIsLoading } from "../../../../LoadingContext";
import { LoadingBorder } from "../../../../../../ui/LoadingBorder";
import { Border } from "../../../../../../ui/Border";

export const CrownsDialog = () => {
  const isLoading = useIsLoading();

  const closeDialog = useDispatchActionCallback(backToParentMenu);
  return (
    <DialogPortal>
      {isLoading ?
        <LoadingBorder />
      : <Border className={"bg-pureBlack zx:bg-zxBlack"} />}

      <Dialog
        className="bg-pureBlack w-zx resGameboy:w-full h-full block p-0"
        onClick={isLoading ? undefined : closeDialog}
      >
        <FiveCrownsDisplay />
        <MenuItems className="hidden">
          {!isLoading && <BackMenuItem />}
        </MenuItems>
      </Dialog>
    </DialogPortal>
  );
};
