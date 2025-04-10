import { useGameApi } from "../../../../GameApiContext";
import type { MapClasses } from "./mapColours";
import { mapClasses } from "./mapColours";
import { useTickingCurrentCharacterName } from "./useCurrentCharacterName";

export const useMapColours = <RoomId extends string>(): MapClasses => {
  const gameApi = useGameApi<RoomId>();
  // ⬇️ hook causes re-render if character swops since last frame
  const currentCharacterName = useTickingCurrentCharacterName();
  const curRoom = gameApi.gameState.characterRooms[currentCharacterName];

  return (
    (curRoom && mapClasses[curRoom.roomJson.planet]) ?? {
      bgClassName: "fill-shadow",
      containerClassName: "",
    }
  );
};
