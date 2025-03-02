import { Border, Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BitmapText } from "../../../../Sprite";
import { multilineTextClass } from "../../multilineTextClass";

export const WrongOrientationDialog = () => {
  return (
    <DialogPortal>
      <Border className="loading-border" />
      <Dialog className="bg-pink text-zxBlack !h-tallDialog !w-wideDialog !py-1">
        <div className={`flex flex-col gap-y-1 ${multilineTextClass}`}>
          <BitmapText className="sprites-double-height text-white">
            Wrong Orientation!
          </BitmapText>
          <BitmapText>Your TV appears to be on its side!</BitmapText>
          <BitmapText>Put into landscape to play.</BitmapText>
          <BitmapText>
            If already in landscape, sorry, put into portrait and back again.
          </BitmapText>
        </div>
      </Dialog>
    </DialogPortal>
  );
};
