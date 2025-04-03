import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { ConnectedMap } from "./ConnectedMap";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { backToParentMenu } from "../../../../../../store/slices/gameMenusSlice";

export const MapDialog = <RoomId extends string>() => {
  return (
    <DialogPortal>
      <Dialog
        fullScreen
        className="bg-white zx:bg-zxBlack pr-0 p-0 block mobile:pl-0"
        onClick={useDispatchActionCallback(backToParentMenu)}
      >
        <ConnectedMap<RoomId> />
      </Dialog>
    </DialogPortal>
  );
};
