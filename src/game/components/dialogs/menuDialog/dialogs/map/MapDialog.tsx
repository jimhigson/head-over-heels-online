import { campaign } from "../../../../../../_generated/originalCampaign/campaign";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { useMaybeGameApi } from "../../../../GameApiContext";
import { MapSvg } from "./Map.svg";

export const MapDialog = () => {
  const gameApi = useMaybeGameApi();

  return (
    <DialogPortal>
      <Dialog fullScreen className="bg-midRed zx:bg-zxBlack pr-0 p-0 block">
        <MapSvg
          className="w-full h-full"
          campaign={campaign}
          startRoomId="blacktooth2"
          characterRooms={gameApi?.gameState.characterRooms}
        />
      </Dialog>
    </DialogPortal>
  );
};
