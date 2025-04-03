import { selectCurrentRoomState } from "../../../../../gameState/gameStateSelectors/selectCurrentRoomState";
import { useGameApi } from "../../../../GameApiContext";
import { mapColours } from "./mapColours";

export const useMapColours = <RoomId extends string>() => {
  const gameApi = useGameApi<RoomId>();
  const curRoom = gameApi && selectCurrentRoomState<RoomId>(gameApi?.gameState);

  return (
    (curRoom && mapColours[curRoom.roomJson.planet]) ?? {
      textClassName: "text-lightGrey",
      bgClassName: "text-shadow",
    }
  );
};
