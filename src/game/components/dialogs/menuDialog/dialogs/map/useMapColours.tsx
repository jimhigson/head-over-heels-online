import { useGameApi } from "../../../../GameApiContext";
import { mapColours } from "./mapColours";
import { useCurrentCharacterName } from "./useCurrentCharacterName";

export const useMapColours = <RoomId extends string>() => {
  const gameApi = useGameApi<RoomId>();
  // ⬇️ hook causes re-render if character swops since last frame
  const currentCharacterName = useCurrentCharacterName();
  const curRoom = gameApi.gameState.characterRooms[currentCharacterName];

  return (
    (curRoom && mapColours[curRoom.roomJson.planet]) ?? {
      textClassName: "text-lightGrey",
      bgClassName: "text-shadow",
    }
  );
};
