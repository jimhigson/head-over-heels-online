import { Border, Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";

export const WrongOrientationDialog = () => {
  return (
    <DialogPortal>
      <Border className="bg-pureBlack zx:bg-zxBlack" />
      <Dialog className="bg-pink text-zxBlack">Wrong orientation!</Dialog>
    </DialogPortal>
  );
};
