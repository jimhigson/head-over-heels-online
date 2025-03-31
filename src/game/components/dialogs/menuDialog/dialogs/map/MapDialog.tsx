import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { campaign } from "../../../../../../_generated/originalCampaign/campaign";
import { Map } from "./Map";

export const MapDialog = () => {
  return (
    <DialogPortal>
      <Dialog fullScreen className="bg-pureBlack zx:bg-zxBlack pr-0 p-0 block">
        <Map campaign={campaign} fromRoomId="blacktooth1head" />
      </Dialog>
    </DialogPortal>
  );
};
