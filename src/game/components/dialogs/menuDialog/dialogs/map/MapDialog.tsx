import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { ConnectedMap } from "./ConnectedMap";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { backToParentMenu } from "../../../../../../store/slices/gameMenusSlice";
import { useMapColours } from "./useMapColours";
import { useScrollingFromInput } from "../useScrollingFromInput";
import { useResizeDetector } from "react-resize-detector";

export const MapDialog = <RoomId extends string>() => {
  const { ref: dialogRef, width: dialogW } = useResizeDetector();
  const colours = useMapColours();
  const scrollingContentRef = useScrollingFromInput();

  return (
    <DialogPortal>
      <Dialog
        ref={dialogRef}
        fullScreen
        className={`bg-white zx:bg-zxBlack pr-0 p-0 mobile:pl-0 justify-center ${colours.containerClassName}`}
        onClick={useDispatchActionCallback(backToParentMenu)}
      >
        <div
          className={
            "overflow-y-scroll h-full " + "scrollbar scrollbar-w-1 h-min"
          }
          ref={scrollingContentRef}
        >
          {dialogW !== undefined && (
            <ConnectedMap<RoomId> containerWidth={dialogW} />
          )}
        </div>
      </Dialog>
    </DialogPortal>
  );
};
