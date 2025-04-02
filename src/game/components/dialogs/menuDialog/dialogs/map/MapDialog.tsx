import { useMemo } from "react";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { selectCurrentRoomState } from "../../../../../gameState/gameStateSelectors/selectCurrentRoomState";
import { startingRoomIds } from "../../../../../gameState/loadGameState";
import { useMaybeGameApi } from "../../../../GameApiContext";
import { MapSvg } from "./Map.svg";
import { selectCurrentPlayableItem } from "../../../../../gameState/gameStateSelectors/selectPlayableItem";
import { findSubRoomForItem } from "./itemIsInSubRoom";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { backToParentMenu } from "../../../../../../store/slices/gameMenusSlice";

export const MapDialog = <RoomId extends string>() => {
  const gameApi = useMaybeGameApi<RoomId>();
  const campaign = gameApi?.campaign;
  const curRoom = gameApi && selectCurrentRoomState<RoomId>(gameApi?.gameState);

  const curSubRoom = useMemo(() => {
    const gameState = gameApi?.gameState;

    if (!gameState) return "*";

    const subRooms = curRoom?.roomJson.meta?.subRooms;

    if (!subRooms) return "*";

    const curCharacterItem = selectCurrentPlayableItem<RoomId>(gameState);

    if (!curCharacterItem) return "*";

    return findSubRoomForItem(curCharacterItem, curRoom.roomJson);
  }, [curRoom?.roomJson, gameApi?.gameState]);

  return (
    <DialogPortal>
      <Dialog
        fullScreen
        className="bg-midRed zx:bg-zxBlack pr-0 p-0 block"
        onClick={useDispatchActionCallback(backToParentMenu)}
      >
        {campaign && (
          <MapSvg<RoomId>
            className="w-full h-full"
            campaign={campaign}
            startRoomId={
              curRoom?.roomJson.id ?? startingRoomIds(campaign).head!
            }
            startSubRoomId={curSubRoom}
            gameState={gameApi?.gameState}
          />
        )}
      </Dialog>
    </DialogPortal>
  );
};
