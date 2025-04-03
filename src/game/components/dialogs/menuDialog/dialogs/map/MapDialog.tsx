import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { ConnectedMap } from "./ConnectedMap";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { backToParentMenu } from "../../../../../../store/slices/gameMenusSlice";
import { useMapColours } from "./useMapColours";
import { useScrollingFromInput } from "../useScrollingFromInput";

export const MapDialog = <RoomId extends string>() => {
  const colours = useMapColours();
  const scrollingContentRef = useScrollingFromInput();

  return (
    <DialogPortal>
      <Dialog
        fullScreen
        className={`bg-white zx:bg-zxBlack pr-0 p-0 mobile:pl-0 justify-center ${colours.bgClassName}`}
        onClick={useDispatchActionCallback(backToParentMenu)}
      >
        <div
          className={
            "overflow-y-scroll h-full " + "scrollbar scrollbar-w-1 pl-1 h-min"
          }
          ref={scrollingContentRef}
        >
          <ConnectedMap<RoomId> className="mx-auto" />
        </div>
      </Dialog>
    </DialogPortal>
  );
};
